document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบข้อมูลจาก LocalStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        // ล็อกอินสำเร็จ -> ไปที่หน้าคำนวณ BMI
        window.location.href = 'bmi.html';
    } else {
         //แสดงข้อผิดพลาด
        document.getElementById('login-error').textContent = 'Invalid username or password!';
    }
});