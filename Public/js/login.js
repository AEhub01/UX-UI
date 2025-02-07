document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("login-error");

    try {
        const response = await fetch("/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // ✅ ล็อกอินสำเร็จ → ไปหน้า index
            window.location.href = "/index";
        } else {
            // ❌ ล็อกอินไม่ผ่าน
            errorMessage.textContent = result.msg || "Login failed";
        }
    } catch (error) {
        console.error("Login error:", error);
        errorMessage.textContent = "Something went wrong. Please try again.";
    }
});
