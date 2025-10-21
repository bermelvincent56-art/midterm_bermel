function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    
    // Update the mode text
    const modeText = document.getElementById("modeText");
    if (document.body.classList.contains("dark-mode")) {
        modeText.textContent = "Welcome to the Dark Side!";
    } else {
        modeText.textContent = "Light and Dark Mode Toggle Example";
    }
}
