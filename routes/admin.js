const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // เปลี่ยนเป็น promise-based
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { isAdmin } = require('../middleware/auth');
require('dotenv').config();

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 3307,
});

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/login', (req, res) => {
    const username = req.cookies.username;
    const role = req.cookies.role;
    
    // ตรวจสอบว่าผู้ใช้มีคุกกี้ที่ถูกต้องแล้ว
    if (username && role === 'admin') {
        return res.redirect('/admin/articles'); // ถ้ามีคุกกี้และเป็น admin ให้ไปหน้า articles
    } else {
        return res.render('admin/login');
    }
});

// 🔹 แอดมินล็อคอิน
router.post('/verify', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [results] = await pool.query("SELECT * FROM admin WHERE username = ? AND password = ?", [username, password]);

        if (results.length === 0) {
            return res.render('admin/login', { msg: 'Wrong Username or Password' });
        }

        res.cookie('username', username, { maxAge: 900000 });
        res.cookie('role', 'admin', { maxAge: 900000 }); // กำหนด role เป็น admin
        res.redirect('/admin/dashboard');

    } catch (err) {
        console.log(err);
        res.render('admin/login', { msg: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
    }
});

// 🔹 แสดงหน้าแดชบอร์ด
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard', { username: req.cookies.username });
});

// 🔹 ออกจากระบบ
router.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('role');
    res.redirect('/admin/login');
});

// 🔹 แสดงหน้า Dashboard พร้อมข้อมูลผู้ใช้
router.get('/dashboard', isAdmin, async (req, res) => {
    try {
        // 🔹 ดึงข้อมูลเฉพาะ `username` จากตาราง users
        const [users] = await pool.query("SELECT username FROM users");

        console.log("Users Data:", users); // Debug เช็กค่าที่ได้จากฐานข้อมูล

        res.render('admin/dashboard', { users }); // ส่งข้อมูลไปยัง dashboard.ejs
    } catch (err) {
        console.log("Database Error:", err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});


// 🔹 ลบผู้ใช้
router.get('/dashboard/delete/:id', isAdmin, async (req, res) => {
    try {
        await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        res.redirect('/admin/dashboard'); // รีเฟรชหลังจากลบ
    } catch (err) {
        console.log(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

//🔹 ดูบทความทั้งหมด (Protected สำหรับ Admin)
router.get('/articles', isAdmin, async (req, res) => {
    try {
        const [articles] = await pool.query("SELECT * FROM articles");
        res.render('admin/articles', { articles });
    } catch (err) {
        console.log(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

// 🔹 ดูบทความแบบเฉพาะ ID
router.get('/articles', isAdmin, async (req, res) => {
    
});
// router.get('/articles', isAdmin, (req, res) => {
//     res.render('admin/articles'); // เรียกใช้ view ที่จะแสดงฟอร์ม
// });

// 🔹 ตั้งค่าการอัปโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Only PNG and JPG are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });


// 🔹 เพิ่มบทความใหม่
router.get('/admin/articles/add', isAdmin, (req, res) => {
    res.render('admin/add'); // เรียกใช้ view ที่จะแสดงฟอร์ม
});
router.post('/articles/add', isAdmin, upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; // ถ้ามีไฟล์ภาพก็ใช้ชื่อไฟล์

    try {
        await pool.query("INSERT INTO articles (title, content, image) VALUES (?, ?, ?)", [title, content, image]);
        res.redirect('/admin/articles'); // หลังจากเพิ่มบทความสำเร็จให้รีไดเรกต์ไปหน้า articles
    } catch (err) {
        console.log(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

// 🔹 แก้ไขบทความ
router.post('/articles/edit/:id', isAdmin, upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : req.body.oldImage;

    try {
        await pool.query("UPDATE articles SET title = ?, content = ?, image = ? WHERE id = ?", [title, content, image, req.params.id]);
        res.redirect('/admin/articles');
    } catch (err) {
        console.log(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

// 🔹 ลบบทความ
router.get('/articles/delete/:id', isAdmin, async (req, res) => {
    try {
        await pool.query("DELETE FROM articles WHERE id = ?", [req.params.id]);
        res.redirect('/admin/articles');
    } catch (err) {
        console.log(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

module.exports = router;
