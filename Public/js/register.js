document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    // ตรวจสอบข้อมูลจาก LocalStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (username === storedUsername && password === storedPassword) {
        // ล็อกอินสำเร็จ -> ไปที่หน้าคำนวณ BMI
        window.location.href = 'bmi.html';
    }else if (username && password) {
        // เก็บข้อมูลผู้ใช้ใน LocalStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // แสดงข้อความสำเร็จ
        document.getElementById('register-success').textContent = 'Registration successful!';

        // เคลียร์ฟอร์ม
        document.getElementById('reg-username').value = '';
        document.getElementById('reg-password').value = '';
    }else {
        alert('Please enter a valid username and password.');
    }
});