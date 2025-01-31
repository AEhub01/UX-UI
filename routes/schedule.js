const express = require('express');
const router = express.Router();

// Route สำหรับหน้าคำนวณ BMI
router.get('/', (req, res) => {
    res.render('schedule', { title: 'Table a progarm' });
});

module.exports = router;