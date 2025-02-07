module.exports = {
    isAdmin: (req, res, next) => {
        const username = req.cookies.username;
    const role = req.cookies.role;

    // เช็คว่า username และ role เป็น admin หรือไม่
    if (username && role === 'admin') {
        return next(); // ถ้าเป็น admin ให้ผ่านไปยัง route ที่ต้องการ
    } else {
        return res.redirect('/admin/login'); // ถ้าไม่ใช่ admin ให้กลับไปหน้า login
    }
    }
    
};
