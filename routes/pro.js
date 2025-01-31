const express = require('express');
const router = express.Router();

// Route สำหรับหน้าคำนวณ BMI
router.get('/', (req, res) => {
    res.render('pro', { title: 'Program Workout' });
});

module.exports = router;