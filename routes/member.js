const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const cookie = require('cookie-parser');

require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 3307,
});

router.use(cookie());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route to render the login page
router.get('/login', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.redirect('/member'); // เส้นทางควรใช้ '/'
    } else {
        res.render('member/login');
    }
});


// Route to render the register page
router.get('/register', (req, res) => {
    res.render('member/register'); // หน้าลงทะเบียน
});

// Handle login verification
router.post('/verify', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    pool.query(sql, [username, password], (err, results) => {
        if (err) {
            console.log(err);
            res.render('member/login', { msg: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' }); // แสดงข้อความข้อผิดพลาด
        } else {
            if (results.length === 0) {
                res.render('member/login', { msg: 'Wrong Username or Password' });
            } else {
                res.cookie('username', username, { maxAge: 900000 }); // คุกกี้หมดอายุใน 15 นาที
                res.redirect('/member/member'); // รีไดเรกต์ไปหน้า member
            }
        }
    });
});


// Handle register (registration)
router.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // เช็คว่ารหัสผ่านตรงกับการยืนยันรหัสผ่านหรือไม่
    if (password !== confirmPassword) {
        return res.render('member/register', { msg: 'Passwords do not match!' });
    }

    // แฮชรหัสผ่านก่อนเก็บในฐานข้อมูล
    
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    // ตรวจสอบว่ามีผู้ใช้นี้ในฐานข้อมูลหรือยัง
    pool.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.render('member/register', { msg: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
        }
        if (results.length > 0) {
            return res.render('member/register', { msg: 'Username already exists!' });
        }

        // ถ้าไม่พบชื่อผู้ใช้ในฐานข้อมูล, ทำการเพิ่มผู้ใช้ใหม่
        pool.query(sql, [username, password], (err, results) => {
            if (err) {
                console.log(err);
                return res.render('member/register', { msg: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
            }
            
            res.render('member/member', { username: username }); 
        });
    });
});


// ดูบทความทั้งหมด (เปิดให้สมาชิกเข้าถึงได้)
router.get('/articles', (req, res) => {
    pool.query("SELECT * FROM articles", (err, results) => {
        if (err) console.log(err);
        res.render('member/articles', { articles: results });
    });
});

// ดูบทความแบบเฉพาะ ID
router.get('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    pool.query("SELECT * FROM articles WHERE id = ?", [articleId], (err, result) => {
        if (err) console.log(err);
        if (result.length === 0) return res.status(404).send('บทความไม่พบ');
        res.render('member/article_detail', { article: result[0] });
    });
});


// Route to render the member page
router.get('/member', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.render('member/member', { username: username });
    } else {
        res.redirect('/member/login'); // ถ้าไม่มีคุกกี้ username ให้ไปหน้า login
    }
});

// Route to logout and clear the cookie
router.get('/logout', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.clearCookie('username');
    }
    res.redirect('/member/login'); // รีไดเรกต์ไปหน้า login
});


module.exports = router;
