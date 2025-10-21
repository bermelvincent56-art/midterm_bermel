function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    let p = document.getElementById("modeText");
    const btnIcon = document.querySelector(".btn-icon");
    const btnText = document.querySelector(".btn-text");

    if (document.body.classList.contains("dark-mode")) {
        p.innerText = "Welcome to the Dark Side! 🌙";
        btnText.textContent = "Switch to Light";
        btnIcon.textContent = "☀️";
    } else {
        p.innerText = "Enjoying the Light Mode! ☀️";
        btnText.textContent = "Toggle Dark Mode";
        btnIcon.textContent = "🌙";
    }
}
