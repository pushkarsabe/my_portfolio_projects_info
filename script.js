document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            mobileNav.classList.remove('is-active');
        });
    });

    const projects = [
        {
            title: "Book Library Manager",
            description: "A robust book lending and review platform with role-based access for users and administrators.",
            github: "https://github.com/pushkarsabe/bookLendingAndReview"
        },
        {
            title: "Expense Tracker",
            description: "A daily expense tracker with user authentication and premium features for data visualization.",
            github: "https://github.com/pushkarsabe/Expense-Tracker-MongoDB-Node.js-Project/tree/main"
        },
        {
            title: "Group Chat App",
            description: "A real-time messenger web application for both group and one-on-one conversations.",
            github: "https://github.com/pushkarsabe/group-chat-app"
        },
        {
            title: "Charity Donation Site",
            description: "A platform for users to donate to charities, featuring payment integration and an admin dashboard.",
            github: "https://github.com/pushkarsabe/3-day-test-project-sharpener-charity-donation"
        },
        {
            title: "Job Application Tracker",
            description: "A tool for users to manage and track their job applications with persistent filtering and search.",
            github: "https://github.com/pushkarsabe/3-day-test-project-sharpener-Job-Application-Tracker"
        },
    ];

    const projectGrid = document.getElementById('project-grid');
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;
    const projectsPerPage = 3;

    function displayProjects(page) {
        projectGrid.innerHTML = '';
        page--;

        const start = projectsPerPage * page;
        const end = start + projectsPerPage;
        const paginatedProjects = projects.slice(start, end);

        paginatedProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.github}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            `;
            projectGrid.appendChild(projectCard);
        });
    }

    function setupPagination() {
        if (projects.length <= projectsPerPage) return;

        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(projects.length / projectsPerPage);

        const prevButton = document.createElement('button');
        prevButton.innerText = 'Prev';
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProjects(currentPage);
                updatePaginationButtons();
            }
        });
        paginationContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => {
            if (currentPage < pageCount) {
                currentPage++;
                displayProjects(currentPage);
                updatePaginationButtons();
            }
        });
        paginationContainer.appendChild(nextButton);

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const pageCount = Math.ceil(projects.length / projectsPerPage);
        const prevButton = paginationContainer.querySelector('button:first-child');
        const nextButton = paginationContainer.querySelector('button:last-child');

        if (prevButton) prevButton.disabled = currentPage === 1;
        if (nextButton) nextButton.disabled = currentPage === pageCount;
    }

    displayProjects(currentPage);
    setupPagination();
});