const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
});

// Close the mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
}));

// --- YOUR ORIGINAL JAVASCRIPT ---
const theme_toggle = document.querySelector("#theme-toggle");

theme_toggle.addEventListener("click", toggleTheme);

function toggleTheme() {
    theme_toggle.classList.toggle("dark_theme");
    document.querySelector("#home").classList.toggle("dark_theme");
    document.querySelector("#about").classList.toggle("dark_theme");
    document.querySelector("#portfolio").classList.toggle("dark_theme");
    document.querySelector("#dashboard").classList.toggle("dark_theme");
    document.querySelector("#contact").classList.toggle("dark_theme");
    document.querySelector('header').classList.toggle('black_theme');
}

const skills = {
    "Web Development": ["HTML", "CSS", "JavaScript", "ES6", "DOM Manipulation", "Node"],
    "Frameworks & Templating": ["Express.js"],
    "Programming Languages": ["Java", "JavaScript"],
    "Databases": ["SQL (MySQL)", "NoSQL (MongoDB)"],
    "Cloud & DevOps": ["AWS (EC2)"]
};

function loadSkills() {
    const skillsContainer = document.querySelector('#skills-container');

    for (const category in skills) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('skill-category');

        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const skillsList = document.createElement('ul');
        skillsList.classList.add('skills-list');

        skills[category].forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });

        categoryDiv.appendChild(skillsList);
        skillsContainer.appendChild(categoryDiv);
    }
}

document.addEventListener('DOMContentLoaded', loadSkills);