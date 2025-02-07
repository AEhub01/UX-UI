// ฟังก์ชันสำหรับแสดงฟอร์มรายงาน
function showReportForm(videoId) {
    document.getElementById('videoId').value = videoId;
    document.getElementById('reportForm').style.display = 'flex';
}

// ฟังก์ชันสำหรับปิดฟอร์มรายงาน
function closeReportForm() {
    document.getElementById('reportForm').style.display = 'none';
}
// ฟังก์ชันเพื่อปิดป็อปอัพ
function closePopup() {
  const popup = document.getElementById("reportPopup");
  popup.style.display = "none";  // ซ่อนป็อปอัพ
}

function closePopup() {
    popup.style.display = 'none';
}

// เมื่อกดปุ่ม submit
form.addEventListener('submit', (event) => {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มถูกส่งแบบปกติ

    // ส่งข้อมูลฟอร์มไปยังเซิร์ฟเวอร์
    fetch('/submit-report', {
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