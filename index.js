const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const app = express();

const PORT = 3000;
// ตั้งค่า View Engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//let root_path = path.resolve(__dirname,'views');
// เสิร์ฟ Static Files เช่น CSS, JS, รูปภาพ
// เสิร์ฟ Static Files
app.use(express.static(path.join(__dirname, 'Public')));

//app.use(express.static(root_path));

// Import Route หลัก
const indexRoute = require('./routes/index');
app.use('/', indexRoute); // เชื่อม Route หลัก

const bmiRoute = require('./routes/bmi');
app.use('/bmi', bmiRoute);

const bmi1Route = require('./routes/bmi1');
app.use('/bmi1', bmi1Route);

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const proRoute = require('./routes/pro');
app.use('/pro', proRoute);

const scheduleRoute = require('./routes/schedule');
app.use('/schedule', scheduleRoute);

const levelprogramRoute = require('./routes/levelprogram');
app.use('/levelprogram', levelprogramRoute);



// เริ่มต้นเซิร์ฟเวอร์

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

