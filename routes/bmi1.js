const express = require('express');
const router = express.Router();

// Route สำหรับหน้าคำนวณ BMI
router.get('/', (req, res) => {
    res.render('bmi1', { title: 'BMI resualt' });
});

module.exports = router;