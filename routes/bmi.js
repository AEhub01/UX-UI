const express = require('express');
const router = express.Router();

// Route สำหรับหน้าคำนวณ BMI
router.get('/', (req, res) => {
    res.render('bmi', { title: 'BMI Calculator' });
});

module.exports = router;