function calculateBMI() {
    // รับค่า height และ weight
    const height = parseFloat(document.getElementById("height").value) / 100; // แปลงจาก cm เป็น m
    const weight = parseFloat(document.getElementById("weight").value);

    // ตรวจสอบว่าผู้ใช้กรอกค่าถูกต้องหรือไม่
    if (!height || !weight || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight!");
        return;
    }

    // คำนวณค่า BMI
    const bmi = (weight / (height * height)).toFixed(2);

    // แสดงค่า BMI
    document.getElementById("bmi-value").textContent = bmi;

    // แสดงสถานะตามค่า BMI
    const status = document.getElementById("bmi-status");
    if (bmi < 18.5) {
        status.textContent = "Underweight";
        status.style.color = "#FFA500"; // สีส้ม
    } else if (bmi >= 18.5 && bmi < 24.9) {
        status.textContent = "Normal weight";
        status.style.color = "#4CAF50"; // สีเขียว
    } else if (bmi >= 25 && bmi < 29.9) {
        status.textContent = "Overweight";
        status.style.color = "#FF8C00"; // สีส้มเข้ม
    } else {
        status.textContent = "Obesity";
        status.style.color = "#FF0000"; // สีแดง
    }
     // แสดงปุ่มไปยังหน้าเลือกโปรแกรมการฝึก
    const programLink = document.getElementById('program-link');
    programLink.style.display = 'block';
}

 // ฟังก์ชันสำหรับการไปยังหน้าเลือกโปรแกรมการฝึก
function goToPrograms() {
    window.location.href = '/pro';
}