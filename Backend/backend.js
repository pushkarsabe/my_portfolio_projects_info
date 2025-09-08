document.addEventListener('DOMContentLoaded', function () {
    const projects = [
        {
            name: "Book Library Manager",
            description: "A book lending and review platform with role-based access for users and administrators.",
            link: "https://github.com/pushkarsabe/bookLendingAndReview"
        },
        {
            name: "Expense Tracker",
            description: "A daily expense tracker with user authentication, premium features, and data visualization.",
            link: "https://github.com/pushkarsabe/Expense-Tracker-MongoDB-Node.js-Project/tree/main"
        },
        {
            name: "Group Chat",
            description: "A real-time messenger web app where users can create groups and chat with individuals.",
            link: "https://github.com/pushkarsabe/group-chat-app"
        },
        {
            name: "Charity Site",
            description: "A donation tracking website with Razorpay integration, user dashboards, and admin panels.",
            link: "https://github.com/pushkarsabe/3-day-test-project-sharpener-charity-donation"
        },
        {
            name: "Job Tracker",
            description: "A tool for users to add, manage, and delete job applications with filter and search functionality.",
            link: "https://github.com/pushkarsabe/3-day-test-project-sharpener-Job-Application-Tracker"
        }
    ];

    const projectsContainer = document.getElementById('projects-container');
    const paginationContainer = document.getElementById('pagination-container');
    const projectsPerPage = 10;
    let currentPage = 1;

    function displayProjects() {
        projectsContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const paginatedProjects = projects.slice(startIndex, endIndex);

        paginatedProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;

            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="button" target="_blank">Visit GitHub Repo</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    function setupPagination() {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(projects.length / projectsPerPage);

        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination-btn';
            btn.innerText = i;
            if (i === currentPage) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                currentPage = i;
                displayProjects();
                updatePaginationButtons();
            });
            paginationContainer.appendChild(btn);
        }
    }

    function updatePaginationButtons() {
        const buttons = document.querySelectorAll('.pagination-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.innerText) === currentPage) {
                button.classList.add('active');
            }
        });
    }

    const themeToggle = document.getElementById('theme-toggle');

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('header').classList.toggle('black_theme');
        document.getElementById('backendProjects').classList.toggle('dark-theme');
        document.getElementById('contact').classList.toggle('dark-theme');
    }

    themeToggle.addEventListener('click', toggleTheme);
    displayProjects();
    setupPagination();
});