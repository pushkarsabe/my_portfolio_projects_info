const theme_toggle = document.querySelector("#theme-toggle");

theme_toggle.addEventListener("click", toggleTheme)

function toggleTheme() {
    theme_toggle.classList.toggle("dark_theme");
    document.querySelector("#home").classList.toggle("dark_theme");
    document.querySelector("#portfolio").classList.toggle("dark_theme");
    document.querySelector("#dashboard").classList.toggle("dark_theme");
    document.querySelector("#contact").classList.toggle("dark_theme");
    document.querySelector('header').classList.toggle('black_theme');
}