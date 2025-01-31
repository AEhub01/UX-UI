const express = require('express');
const router = express.Router();

// Route สำหรับหน้าคำนวณ BMI
router.get('/level', (req, res) => {
    res.render('level', { title: 'level workout' });
});

router.get('/easy', (req, res) => {
    res.render('easy', { title: 'level easy' });
});

router.get('/easy/easy-car', (req, res) => {
    res.render('easy/easy-car', { title: 'level easy' });
});

router.get('/easy/easy-str', (req, res) => {
    res.render('easy/easy-str', { title: 'level easy' });
});

router.get('/easy/easy-hiit', (req, res) => {
    res.render('easy/easy-hiit', { title: 'level easy' });
});

router.get('/normal', (req, res) => {
    res.render('normal', { title: 'level normal' });
});

router.get('/normal/normal-car', (req, res) => {
    res.render('normal/normal-car', { title: 'level normal' });
});

router.get('/normal/normal-hiit', (req, res) => {
    res.render('normal/normal-hiit', { title: 'level normal' });
});

router.get('/normal/normal-str', (req, res) => {
    res.render('normal/normal-str', { title: 'level normal' });
});

router.get('/hard', (req, res) => {
    res.render('hard', { title: 'level hard' });
});

router.get('/hard/hard-car', (req, res) => {
    res.render('hard/hard-car', { title: 'level hard' });
});

router.get('/hard/hard-hiit', (req, res) => {
    res.render('hard/hard-hiit', { title: 'level hard' });
});

router.get('/hard/hard-str', (req, res) => {
    res.render('hard/hard-str', { title: 'level hard' });
});
module.exports = router;