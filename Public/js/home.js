// เมื่อคลิกที่เมนู Contact
document.getElementById('contactBtn').addEventListener('click', function() {
    document.getElementById('contactPopup').style.display = 'flex'; // เปิดป็อปอัพ
});

// เมื่อคลิกที่ปุ่มปิด
document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('contactPopup').style.display = 'none'; // ปิดป็อปอัพ
});

// เมื่อคลิกภายนอกป็อปอัพ
window.onclick = function(event) {
    if (event.target === document.getElementById('contactPopup')) {
        document.getElementById('contactPopup').style.display = 'none'; // ปิดป็อปอัพ
    }
};
const form = document.querySelector('form');
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('.close-btn');

    // ฟังก์ชั่นปิดป็อปอัพ
    function closePopup() {
        popup.style.display = 'none';
    }

    // เมื่อกดปุ่ม submit
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // ป้องกันไม่ให้ฟอร์มถูกส่งแบบปกติ

        // ส่งข้อมูลฟอร์มไปยังเซิร์ฟเวอร์
        fetch('/submit-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(form))
        })
        .then(response => {
            if (response.ok) {
                // ปิดป็อปอัพเมื่อข้อมูลถูกส่งสำเร็จ
                closePopup();
                alert('ข้อมูลถูกบันทึกสำเร็จ');
            } else {
                alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาด:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        });
    });

    // ปิดป็อปอัพเมื่อคลิกที่ปุ่มปิด
    closeBtn.addEventListener('click', closePopup);