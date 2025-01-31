const express = require('express');
const router = express.Router();
const path = require('path');
// Route สำหรับหน้าหลัก
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'Home Page', 
        //message: 'Welcome to My Website!' 
    });
});

module.exports = router;