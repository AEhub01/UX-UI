const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const PORT = 3000;

require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.SERVER_PORT || 3000;
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // localhost
  user: process.env.DB_USER,       // root
  password: process.env.DB_PASS,   // 1234
  database: process.env.DB_NAME,   // workout
  port: process.env.DB_PORT || 3306, // 3307 หรือ 3306 หากไม่มีการตั้งค่า
  port: 3307,
});

//เชื่อมต่อกับฐานข้อมูล MySQL
db.connect(err => {
  if (err) {
      console.error('❌ Database connection failed:', err.stack);
      return;
  }
  console.log('✅ Connected to MySQL database.');
});




// ตั้งค่า View Engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//let root_path = path.resolve(__dirname,'views');
// เสิร์ฟ Static Files เช่น CSS, JS, รูปภาพ
// เสิร์ฟ Static Files
app.use(express.static(path.join(__dirname, 'Public')));

//app.use(express.static(root_path));

// Import Route หลัก
const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

const indexRoute = require('./routes/index');
app.use('/', indexRoute); // เชื่อม Route หลัก

const bmiRoute = require('./routes/bmi');
app.use('/bmi', bmiRoute);

const bmi1Route = require('./routes/bmi1');
app.use('/bmi1', bmi1Route);

const memberRoute = require('./routes/member');
app.use('/member', memberRoute);

const proRoute = require('./routes/pro');
app.use('/pro', proRoute);

const levelprogramRoute = require('./routes/levelprogram');
app.use('/levelprogram', levelprogramRoute);

app.get('/contract', (req, res) => {
  res.send(`
    <form action="/submit-contract" method="POST">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" required><br><br>

      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" required><br><br>

      <label for="terms">Accept Terms:</label>
      <input type="checkbox" id="terms" name="terms" value="accepted" required><br><br>

      <input type="submit" value="Submit">
    </form>
  `);
});

// เส้นทางรับข้อมูลฟอร์ม
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;

  // คำสั่ง SQL เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

  db.query(query, [name, email, message], (err, results) => {
      if (err) {
          console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + err);
          return res.status(500).send('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
      console.log('ข้อมูลถูกบันทึกสำเร็จ:', results);
      res.send('ข้อมูลถูกบันทึกสำเร็จ');
  });
});

// รับฟอร์มการรายงาน
app.post('/submit-report', (req, res) => {
  const { videoId, reason, email } = req.body;
  
  // เก็บข้อมูลการรายงานลงในฐานข้อมูล
  const query = 'INSERT INTO reports (video_id, reason, email) VALUES (?, ?, ?)';
  db.query(query, [videoId, reason, email], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('มีข้อผิดพลาดในการบันทึกข้อมูล');
      }
      res.send('รายงานถูกส่งแล้ว!');
  });
});

// เริ่มต้นเซิร์ฟเวอร์

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

