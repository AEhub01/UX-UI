// ดึงข้อมูล BMI ที่บันทึกไว้จาก localStorage และแสดงผล
window.onload = function() {
    const userBmi = localStorage.getItem('bmi');
    if (userBmi) {
        document.getElementById('user-bmi').textContent = userBmi;
    } else {
        document.getElementById('user-bmi').textContent = 'N/A';
    }
};

function goToBMIPage(program) {
    // Save the selected program to localStorage
    localStorage.setItem("selectedProgram", program);

    // Redirect to the BMI selection page
    window.location.href = "/bmi1";
}