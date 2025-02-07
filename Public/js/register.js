document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("register-success").innerText = "✅ Registration successful!";
        setTimeout(() => {
            window.location.href = "/auth/login"; // ไปหน้า Login หลังสมัครเสร็จ
        }, 1500);
    } else {
        document.getElementById("register-success").innerText = `❌ ${data.msg}`;
    }
});
