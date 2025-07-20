// Enhanced Portfolio JavaScript
document.addEventListener(
    "DOMContentLoaded",
    function () {
        console.log(
            "🚀 Enhanced Portfolio Loaded!"
        );

        // Get DOM elements
        const navbar =
            document.getElementById(
                "navbar"
            );
        const hamburger =
            document.getElementById(
                "hamburger"
            );
        const navMenu =
            document.getElementById(
                "nav-menu"
            );
        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );
        const typingElement =
            document.getElementById(
                "typing-text"
            );
        const form =
            document.getElementById(
                "contact-form"
            );

        // Configuration
        const config =
            {
                github: {
                    username:
                        "EthanPeters96", // Your actual GitHub username
                },
                typingTexts:
                    [
                        "Full Stack Developer",
                        "Frontend Specialist",
                        "Backend Engineer",
                        "UI/UX Enthusiast",
                        "Problem Solver",
                    ],
            };

        // Navigation functionality
        function initNavigation() {
            // Mobile menu toggle
            hamburger.addEventListener(
                "click",
                () => {
                    hamburger.classList.toggle(
                        "active"
                    );
                    navMenu.classList.toggle(
                        "active"
                    );
                }
            );

            // Close mobile menu when clicking on a link
            navLinks.forEach(
                (
                    link
                ) => {
                    link.addEventListener(
                        "click",
                        () => {
                            hamburger.classList.remove(
                                "active"
                            );
                            navMenu.classList.remove(
                                "active"
                            );
                        }
                    );
                }
            );

            // Navbar scroll effect
            window.addEventListener(
                "scroll",
                () => {
                    if (
                        window.scrollY >
                        100
                    ) {
                        navbar.classList.add(
                            "scrolled"
                        );
                    } else {
                        navbar.classList.remove(
                            "scrolled"
                        );
                    }
                }
            );

            // Active navigation link
            window.addEventListener(
                "scroll",
                () => {
                    const sections =
                        document.querySelectorAll(
                            "section[id]"
                        );
                    const scrollPos =
                        window.scrollY +
                        100;

                    sections.forEach(
                        (
                            section
                        ) => {
                            const sectionTop =
                                section.offsetTop;
                            const sectionHeight =
                                section.offsetHeight;
                            const sectionId =
                                section.getAttribute(
                                    "id"
                                );

                            if (
                                scrollPos >=
                                    sectionTop &&
                                scrollPos <
                                    sectionTop +
                                        sectionHeight
                            ) {
                                navLinks.forEach(
                                    (
                                        link
                                    ) => {
                                        link.classList.remove(
                                            "active"
                                        );
                                        if (
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                            `#${sectionId}`
                                        ) {
                                            link.classList.add(
                                                "active"
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }

        // Typing animation
        function initTypingAnimation() {
            if (
                !typingElement
            )
                return;

            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeWriter() {
                const currentText =
                    config
                        .typingTexts[
                        textIndex
                    ];

                if (
                    isDeleting
                ) {
                    typingElement.textContent =
                        currentText.substring(
                            0,
                            charIndex -
                                1
                        );
                    charIndex--;
                } else {
                    typingElement.textContent =
                        currentText.substring(
                            0,
                            charIndex +
                                1
                        );
                    charIndex++;
                }

                let typeSpeed =
                    isDeleting
                        ? 50
                        : 100;

                if (
                    !isDeleting &&
                    charIndex ===
                        currentText.length
                ) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (
                    isDeleting &&
                    charIndex ===
                        0
                ) {
                    isDeleting = false;
                    textIndex =
                        (textIndex +
                            1) %
                        config
                            .typingTexts
                            .length;
                    typeSpeed = 500;
                }

                setTimeout(
                    typeWriter,
                    typeSpeed
                );
            }

            typeWriter();
        }

        // Scroll animations
        function initScrollAnimations() {
            const observerOptions =
                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -50px 0px",
                };

            const observer =
                new IntersectionObserver(
                    (
                        entries
                    ) => {
                        entries.forEach(
                            (
                                entry
                            ) => {
                                if (
                                    entry.isIntersecting
                                ) {
                                    entry.target.classList.add(
                                        "visible"
                                    );
                                }
                            }
                        );
                    },
                    observerOptions
                );

            document
                .querySelectorAll(
                    ".fade-in"
                )
                .forEach(
                    (
                        el
                    ) => {
                        observer.observe(
                            el
                        );
                    }
                );
        }

        // Contact form handling
        function initContactForm() {
            if (
                !form
            )
                return;

            form.addEventListener(
                "submit",
                function (
                    e
                ) {
                    e.preventDefault();

                    const submitButton =
                        form.querySelector(
                            'button[type="submit"]'
                        );
                    const originalText =
                        submitButton.textContent;

                    submitButton.textContent =
                        "Sending...";
                    submitButton.disabled = true;

                    // Simulate form submission
                    setTimeout(
                        () => {
                            alert(
                                "Thank you for your message! I'll get back to you soon."
                            );
                            form.reset();
                            submitButton.textContent =
                                originalText;
                            submitButton.disabled = false;
                        },
                        2000
                    );
                }
            );
        }

        // GitHub data fetching with enhanced language analysis
        async function fetchGitHubData() {
            try {
                console.log(
                    "🔍 Fetching GitHub data for:",
                    config
                        .github
                        .username
                );

                // Set up 3-second timeout to show fallback quickly
                const timeoutId =
                    setTimeout(
                        () => {
                            console.warn(
                                "⏰ API timeout after 3 seconds, showing fallback"
                            );
                            updateProjectsFallback();
                            updateSkillsFallback();
                            updateAboutSectionFallback();
                        },
                        3000
                    );

                // Fetch user data with better error handling and timeout
                const userResponse =
                    await fetch(
                        `https://api.github.com/users/${config.github.username}`,
                        {
                            timeout: 5000,
                        }
                    );

                if (
                    !userResponse.ok
                ) {
                    throw new Error(
                        `GitHub user API failed: ${userResponse.status} ${userResponse.statusText}`
                    );
                }

                const userData =
                    await userResponse.json();
                console.log(
                    "✅ User data fetched:",
                    userData.login,
                    `- ${userData.public_repos} public repos`
                );

                // Fetch repositories data
                const reposResponse =
                    await fetch(
                        `https://api.github.com/users/${config.github.username}/repos?per_page=100&sort=updated`
                    );

                if (
                    !reposResponse.ok
                ) {
                    throw new Error(
                        `GitHub repos API failed: ${reposResponse.status} ${reposResponse.statusText}`
                    );
                }

                const reposData =
                    await reposResponse.json();
                console.log(
                    "✅ Repositories fetched:",
                    reposData.length,
                    "total repos"
                );

                // Filter out forks and get only user's repositories
                const userRepos =
                    reposData.filter(
                        (
                            repo
                        ) =>
                            !repo.fork
                    );
                console.log(
                    "✅ User repos (no forks):",
                    userRepos.length,
                    "repos"
                );
                console.log(
                    "📋 Repository names:",
                    userRepos.map(
                        (
                            r
                        ) =>
                            r.name
                    )
                );

                // Check if user has any public repos
                if (
                    userRepos.length ===
                    0
                ) {
                    console.warn(
                        "⚠️ No public repositories found, using fallback"
                    );
                    throw new Error(
                        "No public repositories found"
                    );
                }

                // Fetch language statistics for each repository
                const languageStats =
                    await fetchLanguageStatistics(
                        userRepos
                    );

                // Update stats
                updateGitHubStats(
                    userData,
                    userRepos
                );

                // Update skills with real data
                updateSkillsWithGitHubData(
                    userRepos,
                    languageStats
                );

                // Update about section with real data
                updateAboutSection(
                    userData,
                    userRepos,
                    languageStats
                );

                // Update projects
                updateProjects(
                    userRepos
                );

                console.log(
                    "🎉 GitHub data loaded successfully!"
                );
                clearTimeout(
                    timeoutId
                ); // Clear timeout on success
            } catch (error) {
                clearTimeout(
                    timeoutId
                ); // Clear timeout on error
                console.error(
                    "❌ GitHub API error:",
                    error.message
                );
                console.log(
                    "🔄 Loading fallback data..."
                );

                // Fallback data if API fails
                updateGitHubStats(
                    {
                        public_repos: 12,
                        created_at:
                            "2020-01-01T00:00:00Z",
                    },
                    []
                );
                updateProjectsFallback();
                updateSkillsFallback();
                updateAboutSectionFallback();
            }
        }

        // Update GitHub stats in the UI
        function updateGitHubStats(
            userData,
            repos
        ) {
            // Update repository count
            const reposElement =
                document.getElementById(
                    "repos-count"
                );
            if (
                reposElement
            ) {
                animateCounter(
                    reposElement,
                    userData.public_repos ||
                        12
                );
            }

            // Estimate commits based on repos and account age
            const accountAge =
                new Date() -
                new Date(
                    userData.created_at
                );
            const yearsActive =
                Math.max(
                    1,
                    Math.floor(
                        accountAge /
                            (1000 *
                                60 *
                                60 *
                                24 *
                                365)
                    )
                );
            const estimatedCommits =
                Math.min(
                    999,
                    repos.length *
                        15 +
                        yearsActive *
                            50
                );

            const commitsElement =
                document.getElementById(
                    "commits-count"
                );
            if (
                commitsElement
            ) {
                animateCounter(
                    commitsElement,
                    estimatedCommits
                );
            }

            // Count unique languages
            const languages =
                new Set();
            repos.forEach(
                (
                    repo
                ) => {
                    if (
                        repo.language
                    ) {
                        languages.add(
                            repo.language
                        );
                    }
                }
            );

            const languagesElement =
                document.getElementById(
                    "languages-count"
                );
            if (
                languagesElement
            ) {
                animateCounter(
                    languagesElement,
                    Math.max(
                        languages.size,
                        8
                    )
                );
            }

            // Update years coding
            const yearsElement =
                document.getElementById(
                    "years-coding"
                );
            if (
                yearsElement
            ) {
                yearsElement.textContent = `${yearsActive}+`;
            }

            // Update total stars
            const totalStars =
                repos.reduce(
                    (
                        sum,
                        repo
                    ) =>
                        sum +
                        (repo.stargazers_count ||
                            0),
                    0
                );
            const starsElement =
                document.getElementById(
                    "total-stars"
                );
            if (
                starsElement
            ) {
                if (
                    totalStars >
                    0
                ) {
                    animateCounter(
                        starsElement,
                        totalStars
                    );
                } else {
                    starsElement.textContent =
                        "⭐";
                }
            }
        }

        // Animate counter numbers
        function animateCounter(
            element,
            target
        ) {
            let current = 0;
            const increment =
                target /
                50;
            const timer =
                setInterval(
                    () => {
                        current +=
                            increment;
                        if (
                            current >=
                            target
                        ) {
                            current =
                                target;
                            clearInterval(
                                timer
                            );
                        }
                        element.textContent =
                            Math.floor(
                                current
                            );
                    },
                    30
                );
        }

        // Update projects with real GitHub repositories
        function updateProjects(
            repos
        ) {
            const projectsGrid =
                document.getElementById(
                    "projects-grid"
                );
            if (
                !projectsGrid
            )
                return;

            // Sort repos by stars and updated date
            const sortedRepos =
                repos
                    .filter(
                        (
                            repo
                        ) =>
                            !repo.private &&
                            repo.description
                    ) // Only public repos with descriptions
                    .sort(
                        (
                            a,
                            b
                        ) => {
                            // Prioritize repos with more stars and recent updates
                            const scoreA =
                                (a.stargazers_count ||
                                    0) +
                                new Date(
                                    a.updated_at
                                ).getTime() /
                                    1000000000;
                            const scoreB =
                                (b.stargazers_count ||
                                    0) +
                                new Date(
                                    b.updated_at
                                ).getTime() /
                                    1000000000;
                            return (
                                scoreB -
                                scoreA
                            );
                        }
                    )
                    .slice(
                        0,
                        6
                    ); // Take top 6 projects

            projectsGrid.innerHTML =
                sortedRepos
                    .map(
                        (
                            repo
                        ) => `
                <div class="project-card fade-in">
                    <div class="project-image">
                        <div class="project-overlay">
                            <a href="${
                                repo.html_url
                            }" target="_blank" rel="noopener" class="project-link">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            ${
                                repo.homepage
                                    ? `
                                <a href="${repo.homepage}" target="_blank" rel="noopener" class="project-link">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                            `
                                    : ""
                            }
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${
                            repo.name
                                .charAt(
                                    0
                                )
                                .toUpperCase() +
                            repo.name
                                .slice(
                                    1
                                )
                                .replace(
                                    /-/g,
                                    " "
                                )
                        }</h3>
                        <p class="project-description">${
                            repo.description ||
                            "No description available"
                        }</p>
                        <div class="project-meta">
                            <div class="project-stats">
                                ${
                                    repo.stargazers_count >
                                    0
                                        ? `<span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>`
                                        : ""
                                }
                                ${
                                    repo.forks_count >
                                    0
                                        ? `<span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>`
                                        : ""
                                }
                                <span><i class="fas fa-clock"></i> ${formatDate(
                                    repo.updated_at
                                )}</span>
                            </div>
                        </div>
                        <div class="project-tags">
                            ${
                                repo.language
                                    ? `<span class="project-tag">${repo.language}</span>`
                                    : ""
                            }
                            ${repo.topics
                                .slice(
                                    0,
                                    3
                                )
                                .map(
                                    (
                                        topic
                                    ) =>
                                        `<span class="project-tag">${topic}</span>`
                                )
                                .join(
                                    ""
                                )}
                        </div>
                    </div>
                </div>
            `
                    )
                    .join(
                        ""
                    );

            // Re-observe new elements for animations
            document
                .querySelectorAll(
                    ".project-card"
                )
                .forEach(
                    (
                        card
                    ) => {
                        const observer =
                            new IntersectionObserver(
                                (
                                    entries
                                ) => {
                                    entries.forEach(
                                        (
                                            entry
                                        ) => {
                                            if (
                                                entry.isIntersecting
                                            ) {
                                                entry.target.classList.add(
                                                    "visible"
                                                );
                                            }
                                        }
                                    );
                                },
                                {
                                    threshold: 0.1,
                                }
                            );
                        observer.observe(
                            card
                        );
                    }
                );
        }

        // Fallback projects if GitHub API fails
        function updateProjectsFallback() {
            const projectsGrid =
                document.getElementById(
                    "projects-grid"
                );
            if (
                !projectsGrid
            )
                return;

            projectsGrid.innerHTML = `
                <div class="project-card fade-in">
                    <div class="project-image">
                        <div class="project-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-exclamation-triangle" style="color: #f39c12; font-size: 2rem; margin-bottom: 1rem;"></i>
                                <p style="color: white; text-align: center; margin: 0;">GitHub API Unavailable</p>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">GitHub Projects</h3>
                        <p class="project-description">
                            Unable to load projects from GitHub API (likely due to rate limiting). 
                            Please visit my GitHub profile directly to view my repositories and projects.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">GitHub</span>
                            <span class="project-tag">API Rate Limited</span>
                        </div>
                        <div style="margin-top: 1rem;">
                            <a href="https://github.com/${config.github.username}" target="_blank" rel="noopener" class="btn btn-primary">
                                <i class="fab fa-github"></i> View GitHub Profile
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-card fade-in">
                    <div class="project-image">
                        <div class="project-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-globe" style="color: #3498db; font-size: 2rem; margin-bottom: 1rem;"></i>
                                <p style="color: white; text-align: center; margin: 0;">Portfolio Website</p>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">This Portfolio</h3>
                        <p class="project-description">
                            A modern, responsive portfolio website built with HTML, CSS, and JavaScript. 
                            Features dynamic GitHub integration, animated UI, and responsive design.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">JavaScript</span>
                            <span class="project-tag">HTML/CSS</span>
                            <span class="project-tag">Portfolio</span>
                            <span class="project-tag">Responsive</span>
                        </div>
                                          </div>
                  </div>
              `;
        }

        // Format date for display
        function formatDate(
            dateString
        ) {
            const date =
                new Date(
                    dateString
                );
            const now =
                new Date();
            const diffTime =
                Math.abs(
                    now -
                        date
                );
            const diffDays =
                Math.ceil(
                    diffTime /
                        (1000 *
                            60 *
                            60 *
                            24)
                );

            if (
                diffDays ===
                1
            )
                return "1 day ago";
            if (
                diffDays <
                30
            )
                return `${diffDays} days ago`;
            if (
                diffDays <
                365
            )
                return `${Math.floor(
                    diffDays /
                        30
                )} months ago`;
            return `${Math.floor(
                diffDays /
                    365
            )} years ago`;
        }

        // Hover effects for cards
        function initHoverEffects() {
            // Skill cards hover effect
            document
                .querySelectorAll(
                    ".skill-card"
                )
                .forEach(
                    (
                        card
                    ) => {
                        card.addEventListener(
                            "mouseenter",
                            () => {
                                card.style.transform =
                                    "translateY(-5px)";
                            }
                        );
                        card.addEventListener(
                            "mouseleave",
                            () => {
                                card.style.transform =
                                    "translateY(0)";
                            }
                        );
                    }
                );

            // Project cards hover effect
            document
                .querySelectorAll(
                    ".project-card"
                )
                .forEach(
                    (
                        card
                    ) => {
                        card.addEventListener(
                            "mouseenter",
                            () => {
                                card.style.transform =
                                    "translateY(-10px)";
                            }
                        );
                        card.addEventListener(
                            "mouseleave",
                            () => {
                                card.style.transform =
                                    "translateY(0)";
                            }
                        );
                    }
                );

            // Stat cards hover effect
            document
                .querySelectorAll(
                    ".stat-card"
                )
                .forEach(
                    (
                        card
                    ) => {
                        card.addEventListener(
                            "mouseenter",
                            () => {
                                card.style.transform =
                                    "translateY(-5px)";
                            }
                        );
                        card.addEventListener(
                            "mouseleave",
                            () => {
                                card.style.transform =
                                    "translateY(0)";
                            }
                        );
                    }
                );
        }

        // Progress bar animations
        function initProgressBars() {
            const progressBars =
                document.querySelectorAll(
                    ".skill-progress-bar"
                );

            const progressObserver =
                new IntersectionObserver(
                    (
                        entries
                    ) => {
                        entries.forEach(
                            (
                                entry
                            ) => {
                                if (
                                    entry.isIntersecting
                                ) {
                                    const progressBar =
                                        entry.target;
                                    const width =
                                        progressBar
                                            .style
                                            .width;
                                    progressBar.style.width =
                                        "0%";

                                    setTimeout(
                                        () => {
                                            progressBar.style.width =
                                                width;
                                        },
                                        500
                                    );
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.5,
                    }
                );

            progressBars.forEach(
                (
                    bar
                ) => {
                    progressObserver.observe(
                        bar
                    );
                }
            );
        }

        // Fetch language statistics from repositories
        async function fetchLanguageStatistics(
            repos
        ) {
            const languageStats =
                {};
            let totalBytes = 0;

            // Limit API calls to avoid rate limiting
            const reposToAnalyze =
                repos.slice(
                    0,
                    20
                );

            for (const repo of reposToAnalyze) {
                try {
                    const response =
                        await fetch(
                            `https://api.github.com/repos/${config.github.username}/${repo.name}/languages`
                        );
                    if (
                        response.ok
                    ) {
                        const languages =
                            await response.json();

                        for (const [
                            language,
                            bytes,
                        ] of Object.entries(
                            languages
                        )) {
                            languageStats[
                                language
                            ] =
                                (languageStats[
                                    language
                                ] ||
                                    0) +
                                bytes;
                            totalBytes +=
                                bytes;
                        }
                    }
                } catch (error) {
                    console.warn(
                        `Failed to fetch languages for ${repo.name}:`,
                        error
                    );
                }
            }

            // Calculate percentages
            const languagePercentages =
                {};
            for (const [
                language,
                bytes,
            ] of Object.entries(
                languageStats
            )) {
                languagePercentages[
                    language
                ] =
                    {
                        bytes: bytes,
                        percentage:
                            (
                                (bytes /
                                    totalBytes) *
                                100
                            ).toFixed(
                                1
                            ),
                        repoCount:
                            repos.filter(
                                (
                                    repo
                                ) =>
                                    repo.language ===
                                    language
                            )
                                .length,
                    };
            }

            return languagePercentages;
        }

        // Update skills section with real GitHub data
        function updateSkillsWithGitHubData(
            repos,
            languageStats
        ) {
            updateGitHubLanguagesSection(
                languageStats
            );
            updateSkillProgressBars(
                repos,
                languageStats
            );
        }

        // Update GitHub Languages section with real data
        function updateGitHubLanguagesSection(
            languageStats
        ) {
            const githubSkillsContainer =
                document.querySelector(
                    ".github-skills"
                );
            if (
                !githubSkillsContainer
            )
                return;

            // Language colors mapping
            const languageColors =
                {
                    JavaScript:
                        "#f1e05a",
                    TypeScript:
                        "#2b7489",
                    Python: "#3572A5",
                    Java: "#b07219",
                    HTML: "#e34c26",
                    CSS: "#1572B6",
                    PHP: "#4F5D95",
                    "C++": "#f34b7d",
                    "C#": "#239120",
                    Go: "#00ADD8",
                    Rust: "#dea584",
                    Swift: "#ffac45",
                    Kotlin: "#F18E33",
                    Ruby: "#701516",
                    Shell: "#89e051",
                    Dockerfile:
                        "#384d54",
                    Vue: "#4FC08D",
                    React: "#61DAFB",
                    Sass: "#a9669c",
                    Less: "#1d365d",
                    SCSS: "#c6538c",
                };

            // Sort languages by usage percentage
            const sortedLanguages =
                Object.entries(
                    languageStats
                )
                    .sort(
                        (
                            [
                                ,
                                a,
                            ],
                            [
                                ,
                                b,
                            ]
                        ) =>
                            parseFloat(
                                b.percentage
                            ) -
                            parseFloat(
                                a.percentage
                            )
                    )
                    .slice(
                        0,
                        8
                    ); // Show top 8 languages

            if (
                sortedLanguages.length ===
                0
            ) {
                githubSkillsContainer.innerHTML = `
                    <div class="github-skill fade-in">
                        <div class="language-color" style="background-color: #6c757d;"></div>
                        <span style="font-weight: 500;">Loading languages...</span>
                    </div>
                `;
                return;
            }

            githubSkillsContainer.innerHTML =
                sortedLanguages
                    .map(
                        ([
                            language,
                            data,
                        ]) => `
                <div class="github-skill fade-in" style="animation-delay: ${
                    sortedLanguages.indexOf(
                        [
                            language,
                            data,
                        ]
                    ) *
                    0.1
                }s;">
                    <div class="language-color" style="background-color: ${
                        languageColors[
                            language
                        ] ||
                        "#6c757d"
                    };"></div>
                    <span style="font-weight: 500;">${language}</span>
                    <span style="opacity: 0.7;">(${
                        data.percentage
                    }%)</span>
                    <span style="opacity: 0.5; font-size: 0.8em;">${
                        data.repoCount
                    } repos</span>
                </div>
            `
                    )
                    .join(
                        ""
                    );
        }

        // Update skill progress bars with calculated percentages
        function updateSkillProgressBars(
            repos,
            languageStats
        ) {
            // Calculate skill levels based on repository data
            const skillLevels =
                calculateSkillLevels(
                    repos,
                    languageStats
                );

            // Update progress bars
            Object.entries(
                skillLevels
            ).forEach(
                ([
                    skill,
                    level,
                ]) => {
                    const skillCard =
                        Array.from(
                            document.querySelectorAll(
                                ".skill-card"
                            )
                        ).find(
                            (
                                card
                            ) =>
                                card.querySelector(
                                    ".skill-name"
                                )
                                    ?.textContent ===
                                skill
                        );

                    if (
                        skillCard
                    ) {
                        const progressBar =
                            skillCard.querySelector(
                                ".skill-progress-bar"
                            );
                        const skillLevelElement =
                            skillCard.querySelector(
                                ".skill-level"
                            );
                        const experienceElement =
                            skillCard.querySelector(
                                ".skill-experience"
                            );

                        if (
                            progressBar
                        ) {
                            // Update progress bar width and color based on level
                            const percentage =
                                level.percentage;
                            const color =
                                getSkillColor(
                                    percentage
                                );
                            progressBar.style.width = `${percentage}%`;
                            progressBar.style.background =
                                color;
                        }

                        if (
                            skillLevelElement
                        ) {
                            skillLevelElement.textContent =
                                level.levelName;
                        }

                        if (
                            experienceElement
                        ) {
                            experienceElement.textContent =
                                level.description;
                        }
                    }
                }
            );
        }

        // Calculate skill levels based on GitHub data with comprehensive technology detection
        function calculateSkillLevels(
            repos,
            languageStats
        ) {
            const skillLevels =
                {};

            // JavaScript/TypeScript
            const jsRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.language ===
                            "JavaScript" ||
                        repo.language ===
                            "TypeScript"
                );
            const jsPercentage =
                languageStats[
                    "JavaScript"
                ]
                    ? parseFloat(
                          languageStats[
                              "JavaScript"
                          ]
                              .percentage
                      )
                    : 0;
            const tsPercentage =
                languageStats[
                    "TypeScript"
                ]
                    ? parseFloat(
                          languageStats[
                              "TypeScript"
                          ]
                              .percentage
                      )
                    : 0;
            const totalJsPercentage =
                jsPercentage +
                tsPercentage;

            skillLevels[
                "JavaScript"
            ] =
                {
                    percentage:
                        Math.min(
                            95,
                            60 +
                                totalJsPercentage *
                                    2
                        ),
                    levelName:
                        totalJsPercentage >
                        30
                            ? "Advanced"
                            : totalJsPercentage >
                              15
                            ? "Intermediate"
                            : "Beginner",
                    description: `Used in ${
                        jsRepos.length
                    } repositories (${totalJsPercentage.toFixed(
                        1
                    )}% of code)`,
                };

            // TypeScript
            const tsRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.language ===
                        "TypeScript"
                );
            skillLevels[
                "TypeScript"
            ] =
                {
                    percentage:
                        Math.min(
                            85,
                            40 +
                                tsPercentage *
                                    3
                        ),
                    levelName:
                        tsPercentage >
                        15
                            ? "Advanced"
                            : tsPercentage >
                              5
                            ? "Intermediate"
                            : "Beginner",
                    description: `${
                        tsRepos.length
                    } TypeScript projects (${tsPercentage.toFixed(
                        1
                    )}% of code)`,
                };

            // React (estimate based on JS repos and package.json analysis)
            const reactRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.name
                            .toLowerCase()
                            .includes(
                                "react"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "react"
                            )
                );
            skillLevels[
                "React"
            ] =
                {
                    percentage:
                        Math.min(
                            90,
                            50 +
                                reactRepos.length *
                                    10
                        ),
                    levelName:
                        reactRepos.length >=
                        3
                            ? "Advanced"
                            : reactRepos.length >=
                              1
                            ? "Intermediate"
                            : "Beginner",
                    description: `${reactRepos.length} React-based projects identified`,
                };

            // Vue.js
            const vueRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.name
                            .toLowerCase()
                            .includes(
                                "vue"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "vue"
                            )
                );
            skillLevels[
                "Vue.js"
            ] =
                {
                    percentage:
                        Math.min(
                            80,
                            35 +
                                vueRepos.length *
                                    12
                        ),
                    levelName:
                        vueRepos.length >=
                        2
                            ? "Intermediate"
                            : vueRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${vueRepos.length} Vue.js projects identified`,
                };

            // HTML/CSS
            const htmlPercentage =
                languageStats[
                    "HTML"
                ]
                    ? parseFloat(
                          languageStats[
                              "HTML"
                          ]
                              .percentage
                      )
                    : 0;
            const cssPercentage =
                languageStats[
                    "CSS"
                ]
                    ? parseFloat(
                          languageStats[
                              "CSS"
                          ]
                              .percentage
                      )
                    : 0;
            const totalWebPercentage =
                htmlPercentage +
                cssPercentage;

            skillLevels[
                "HTML/CSS"
            ] =
                {
                    percentage:
                        Math.min(
                            98,
                            70 +
                                totalWebPercentage *
                                    1.5
                        ),
                    levelName:
                        totalWebPercentage >
                        20
                            ? "Advanced"
                            : totalWebPercentage >
                              8
                            ? "Intermediate"
                            : "Beginner",
                    description: `${totalWebPercentage.toFixed(
                        1
                    )}% of codebase, responsive design`,
                };

            // Sass/SCSS
            const sassPercentage =
                languageStats[
                    "SCSS"
                ]
                    ? parseFloat(
                          languageStats[
                              "SCSS"
                          ]
                              .percentage
                      )
                    : 0;
            const sassRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.language ===
                            "SCSS" ||
                        repo.language ===
                            "Sass" ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "sass"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "sass"
                            )
                );
            skillLevels[
                "Sass/SCSS"
            ] =
                {
                    percentage:
                        Math.min(
                            90,
                            65 +
                                sassPercentage *
                                    2 +
                                sassRepos.length *
                                    5
                        ),
                    levelName:
                        sassPercentage >
                            5 ||
                        sassRepos.length >=
                            2
                            ? "Advanced"
                            : sassRepos.length >=
                              1
                            ? "Intermediate"
                            : "Beginner",
                    description: `CSS preprocessing with ${sassRepos.length} projects using Sass`,
                };

            // Python
            const pythonPercentage =
                languageStats[
                    "Python"
                ]
                    ? parseFloat(
                          languageStats[
                              "Python"
                          ]
                              .percentage
                      )
                    : 0;
            const pythonRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.language ===
                        "Python"
                );

            skillLevels[
                "Python"
            ] =
                {
                    percentage:
                        Math.min(
                            85,
                            40 +
                                pythonPercentage *
                                    2
                        ),
                    levelName:
                        pythonPercentage >
                        20
                            ? "Advanced"
                            : pythonPercentage >
                              10
                            ? "Intermediate"
                            : "Beginner",
                    description: `${
                        pythonRepos.length
                    } Python projects (${pythonPercentage.toFixed(
                        1
                    )}% of code)`,
                };

            // Node.js (estimate based on JS repos and server-related keywords)
            const nodeRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.language ===
                            "JavaScript" &&
                        (repo.name
                            .toLowerCase()
                            .includes(
                                "api"
                            ) ||
                            repo.name
                                .toLowerCase()
                                .includes(
                                    "server"
                                ) ||
                            repo.name
                                .toLowerCase()
                                .includes(
                                    "backend"
                                ) ||
                            repo.description
                                ?.toLowerCase()
                                .includes(
                                    "node"
                                ) ||
                            repo.description
                                ?.toLowerCase()
                                .includes(
                                    "express"
                                ))
                );

            skillLevels[
                "Node.js"
            ] =
                {
                    percentage:
                        Math.min(
                            90,
                            50 +
                                nodeRepos.length *
                                    8
                        ),
                    levelName:
                        nodeRepos.length >=
                        3
                            ? "Advanced"
                            : nodeRepos.length >=
                              1
                            ? "Intermediate"
                            : "Beginner",
                    description: `${nodeRepos.length} server-side JavaScript projects`,
                };

            // Express.js
            const expressRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "express"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "express"
                            ) ||
                        (repo.language ===
                            "JavaScript" &&
                            repo.description
                                ?.toLowerCase()
                                .includes(
                                    "api"
                                ))
                );
            skillLevels[
                "Express.js"
            ] =
                {
                    percentage:
                        Math.min(
                            88,
                            45 +
                                expressRepos.length *
                                    10
                        ),
                    levelName:
                        expressRepos.length >=
                        3
                            ? "Advanced"
                            : expressRepos.length >=
                              1
                            ? "Intermediate"
                            : "Beginner",
                    description: `${expressRepos.length} Express.js or API projects`,
                };

            // GraphQL
            const graphqlRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "graphql"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "graphql"
                            )
                );
            skillLevels[
                "GraphQL"
            ] =
                {
                    percentage:
                        Math.min(
                            75,
                            30 +
                                graphqlRepos.length *
                                    20
                        ),
                    levelName:
                        graphqlRepos.length >=
                        2
                            ? "Intermediate"
                            : graphqlRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${graphqlRepos.length} GraphQL projects identified`,
                };

            // REST APIs
            const apiRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "api"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "rest"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "api"
                            )
                );
            skillLevels[
                "REST APIs"
            ] =
                {
                    percentage:
                        Math.min(
                            95,
                            60 +
                                apiRepos.length *
                                    8
                        ),
                    levelName:
                        apiRepos.length >=
                        4
                            ? "Advanced"
                            : apiRepos.length >=
                              2
                            ? "Intermediate"
                            : "Beginner",
                    description: `${apiRepos.length} API projects with RESTful design`,
                };

            // JSON (high level since it's fundamental)
            skillLevels[
                "JSON"
            ] =
                {
                    percentage: 95,
                    levelName:
                        "Advanced",
                    description: `Data interchange in ${
                        jsRepos.length +
                        apiRepos.length
                    } projects`,
                };

            // Git (based on total repositories and commits)
            skillLevels[
                "Git"
            ] =
                {
                    percentage:
                        Math.min(
                            95,
                            70 +
                                repos.length *
                                    2
                        ),
                    levelName:
                        repos.length >=
                        10
                            ? "Advanced"
                            : repos.length >=
                              5
                            ? "Intermediate"
                            : "Beginner",
                    description: `${repos.length} repositories with version control`,
                };

            // VS Code (always high since it's the primary editor)
            skillLevels[
                "VS Code"
            ] =
                {
                    percentage: 95,
                    levelName:
                        "Advanced",
                    description:
                        "Primary development environment",
                };

            // npm/yarn (high level for JavaScript developers)
            skillLevels[
                "npm/yarn"
            ] =
                {
                    percentage:
                        Math.min(
                            90,
                            65 +
                                jsRepos.length *
                                    3
                        ),
                    levelName:
                        jsRepos.length >=
                        5
                            ? "Advanced"
                            : jsRepos.length >=
                              2
                            ? "Intermediate"
                            : "Beginner",
                    description: `Package management for ${jsRepos.length} JavaScript projects`,
                };

            // Webpack
            const webpackRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "webpack"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "webpack"
                            )
                );
            skillLevels[
                "Webpack"
            ] =
                {
                    percentage:
                        Math.min(
                            75,
                            40 +
                                webpackRepos.length *
                                    15
                        ),
                    levelName:
                        webpackRepos.length >=
                        2
                            ? "Intermediate"
                            : webpackRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${webpackRepos.length} projects using Webpack bundling`,
                };

            // Vite
            const viteRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "vite"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "vite"
                            )
                );
            skillLevels[
                "Vite"
            ] =
                {
                    percentage:
                        Math.min(
                            80,
                            35 +
                                viteRepos.length *
                                    18
                        ),
                    levelName:
                        viteRepos.length >=
                        2
                            ? "Intermediate"
                            : viteRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${viteRepos.length} projects using Vite build tool`,
                };

            // ESLint (common for JavaScript projects)
            skillLevels[
                "ESLint"
            ] =
                {
                    percentage:
                        Math.min(
                            90,
                            60 +
                                jsRepos.length *
                                    4
                        ),
                    levelName:
                        jsRepos.length >=
                        5
                            ? "Advanced"
                            : jsRepos.length >=
                              2
                            ? "Intermediate"
                            : "Beginner",
                    description: `Code quality enforcement across ${jsRepos.length} JS projects`,
                };

            // Database Skills
            const dbRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "database"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "db"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "mongo"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "sql"
                            )
                );

            // MongoDB
            const mongoRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "mongo"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "mongo"
                            )
                );
            skillLevels[
                "MongoDB"
            ] =
                {
                    percentage:
                        Math.min(
                            80,
                            40 +
                                mongoRepos.length *
                                    15
                        ),
                    levelName:
                        mongoRepos.length >=
                        2
                            ? "Intermediate"
                            : mongoRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${mongoRepos.length} MongoDB projects`,
                };

            // PostgreSQL
            const postgresRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "postgres"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "postgresql"
                            )
                );
            skillLevels[
                "PostgreSQL"
            ] =
                {
                    percentage:
                        Math.min(
                            75,
                            35 +
                                postgresRepos.length *
                                    18
                        ),
                    levelName:
                        postgresRepos.length >=
                        2
                            ? "Intermediate"
                            : postgresRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${postgresRepos.length} PostgreSQL projects`,
                };

            // MySQL
            const mysqlRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "mysql"
                            )
                );
            skillLevels[
                "MySQL"
            ] =
                {
                    percentage:
                        Math.min(
                            78,
                            38 +
                                mysqlRepos.length *
                                    17
                        ),
                    levelName:
                        mysqlRepos.length >=
                        2
                            ? "Intermediate"
                            : mysqlRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${mysqlRepos.length} MySQL database projects`,
                };

            // Redis
            const redisRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "redis"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "cache"
                            )
                );
            skillLevels[
                "Redis"
            ] =
                {
                    percentage:
                        Math.min(
                            60,
                            25 +
                                redisRepos.length *
                                    20
                        ),
                    levelName:
                        redisRepos.length >=
                        1
                            ? "Beginner"
                            : "Learning",
                    description: `${redisRepos.length} projects using Redis caching`,
                };

            // Cloud & DevOps
            const dockerRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.name
                            .toLowerCase()
                            .includes(
                                "docker"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "docker"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "container"
                            )
                );

            skillLevels[
                "Docker"
            ] =
                {
                    percentage:
                        Math.min(
                            75,
                            30 +
                                dockerRepos.length *
                                    15
                        ),
                    levelName:
                        dockerRepos.length >=
                        2
                            ? "Intermediate"
                            : dockerRepos.length >=
                              1
                            ? "Beginner"
                            : "Learning",
                    description: `${dockerRepos.length} containerized projects`,
                };

            // GitHub Actions (estimate based on workflow files)
            const ciRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "ci"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "workflow"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "action"
                            )
                );
            skillLevels[
                "GitHub Actions"
            ] =
                {
                    percentage:
                        Math.min(
                            80,
                            35 +
                                ciRepos.length *
                                    15 +
                                (repos.length >
                                5
                                    ? 20
                                    : 0)
                        ),
                    levelName:
                        ciRepos.length >=
                            2 ||
                        repos.length >
                            8
                            ? "Intermediate"
                            : repos.length >=
                              3
                            ? "Beginner"
                            : "Learning",
                    description: `CI/CD automation across ${repos.length} repositories`,
                };

            // AWS
            const awsRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "aws"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "lambda"
                            )
                );
            skillLevels[
                "AWS"
            ] =
                {
                    percentage:
                        Math.min(
                            65,
                            25 +
                                awsRepos.length *
                                    20
                        ),
                    levelName:
                        awsRepos.length >=
                        1
                            ? "Beginner"
                            : "Learning",
                    description: `${awsRepos.length} AWS cloud projects`,
                };

            // Netlify (high for frontend developers)
            skillLevels[
                "Netlify"
            ] =
                {
                    percentage:
                        Math.min(
                            90,
                            60 +
                                Math.min(
                                    repos.filter(
                                        (
                                            r
                                        ) =>
                                            r.language ===
                                                "JavaScript" ||
                                            r.language ===
                                                "HTML"
                                    )
                                        .length,
                                    8
                                ) *
                                    4
                        ),
                    levelName:
                        "Advanced",
                    description:
                        "Static site deployment and hosting platform",
                };

            // Vercel
            const vercelRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "vercel"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "vercel"
                            )
                );
            skillLevels[
                "Vercel"
            ] =
                {
                    percentage:
                        Math.min(
                            88,
                            55 +
                                vercelRepos.length *
                                    10 +
                                reactRepos.length *
                                    3
                        ),
                    levelName:
                        vercelRepos.length >=
                            1 ||
                        reactRepos.length >=
                            2
                            ? "Advanced"
                            : "Intermediate",
                    description: `Frontend deployment platform for ${reactRepos.length} React projects`,
                };

            // Linux
            skillLevels[
                "Linux"
            ] =
                {
                    percentage:
                        Math.min(
                            80,
                            45 +
                                repos.length *
                                    2
                        ),
                    levelName:
                        repos.length >=
                        8
                            ? "Intermediate"
                            : repos.length >=
                              4
                            ? "Beginner"
                            : "Learning",
                    description: `Command line proficiency across ${repos.length} projects`,
                };

            return skillLevels;
        }

        // Get skill color based on percentage
        function getSkillColor(
            percentage
        ) {
            if (
                percentage >=
                85
            ) {
                return "linear-gradient(135deg, #10b981, #06d6a0)"; // Green for advanced
            } else if (
                percentage >=
                60
            ) {
                return "linear-gradient(135deg, #f59e0b, #fbbf24)"; // Orange for intermediate
            } else {
                return "linear-gradient(135deg, #6366f1, #8b5cf6)"; // Purple for beginner
            }
        }

        // Update About section with real GitHub data
        function updateAboutSection(
            userData,
            repos,
            languageStats
        ) {
            updateAboutDescription(
                userData,
                repos,
                languageStats
            );
            updateTopLanguage(
                languageStats
            );
            updateCodePreview(
                repos,
                languageStats
            );
        }

        // Generate dynamic about description
        function updateAboutDescription(
            userData,
            repos,
            languageStats
        ) {
            const aboutElement =
                document.getElementById(
                    "about-description"
                );
            if (
                !aboutElement
            )
                return;

            const accountAge =
                new Date() -
                new Date(
                    userData.created_at
                );
            const yearsActive =
                Math.max(
                    1,
                    Math.floor(
                        accountAge /
                            (1000 *
                                60 *
                                60 *
                                24 *
                                365)
                    )
                );
            const topLanguages =
                Object.keys(
                    languageStats
                ).slice(
                    0,
                    3
                );
            const recentActivity =
                repos.filter(
                    (
                        repo
                    ) => {
                        const lastUpdate =
                            new Date(
                                repo.updated_at
                            );
                        const monthsAgo =
                            (new Date() -
                                lastUpdate) /
                            (1000 *
                                60 *
                                60 *
                                24 *
                                30);
                        return (
                            monthsAgo <
                            6
                        ); // Updated in last 6 months
                    }
                ).length;

            // Generate dynamic description based on real data
            let description = `I'm a passionate developer with ${yearsActive}+ years of experience, `;

            if (
                topLanguages.length >
                0
            ) {
                description += `specializing in ${topLanguages.join(
                    ", "
                )}. `;
            }

            description += `With ${repos.length} public repositories on GitHub, I focus on building `;

            // Analyze repo types for better description
            const webRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.language ===
                            "JavaScript" ||
                        repo.language ===
                            "HTML" ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "web"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "web"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "app"
                            )
                ).length;

            const apiRepos =
                repos.filter(
                    (
                        repo
                    ) =>
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "api"
                            ) ||
                        repo.name
                            .toLowerCase()
                            .includes(
                                "api"
                            ) ||
                        repo.description
                            ?.toLowerCase()
                            .includes(
                                "backend"
                            )
                ).length;

            if (
                webRepos >
                apiRepos
            ) {
                description +=
                    "modern web applications and user-centric interfaces. ";
            } else if (
                apiRepos >
                0
            ) {
                description +=
                    "robust APIs and backend solutions. ";
            } else {
                description +=
                    "innovative software solutions. ";
            }

            if (
                recentActivity >
                0
            ) {
                description += `I maintain an active development schedule with ${recentActivity} repositories updated recently, `;
                description +=
                    "continuously learning new technologies and improving my craft.";
            } else {
                description +=
                    "I'm always eager to take on new challenges and create meaningful digital experiences.";
            }

            aboutElement.textContent =
                description;
        }

        // Update top language stat
        function updateTopLanguage(
            languageStats
        ) {
            const topLangElement =
                document.getElementById(
                    "top-language"
                );
            if (
                !topLangElement
            )
                return;

            const topLanguage =
                Object.entries(
                    languageStats
                ).sort(
                    (
                        [
                            ,
                            a,
                        ],
                        [
                            ,
                            b,
                        ]
                    ) =>
                        parseFloat(
                            b.percentage
                        ) -
                        parseFloat(
                            a.percentage
                        )
                )[0];

            if (
                topLanguage
            ) {
                let shortName =
                    topLanguage[0];
                // Shorten long language names for display
                if (
                    shortName ===
                    "JavaScript"
                )
                    shortName =
                        "JS";
                if (
                    shortName ===
                    "TypeScript"
                )
                    shortName =
                        "TS";
                if (
                    shortName ===
                    "Python"
                )
                    shortName =
                        "PY";
                topLangElement.textContent =
                    shortName;
            }
        }

        // Update code preview with real technologies
        function updateCodePreview(
            repos,
            languageStats
        ) {
            const codeElement =
                document.getElementById(
                    "code-content"
                );
            const filenameElement =
                document.getElementById(
                    "code-filename"
                );
            if (
                !codeElement ||
                !filenameElement
            )
                return;

            const languages =
                Object.keys(
                    languageStats
                ).slice(
                    0,
                    5
                );
            const topLanguage =
                languages[0];

            // Determine filename and content based on top language
            let filename =
                "developer.js";
            let content =
                "";

            if (
                topLanguage ===
                    "JavaScript" ||
                topLanguage ===
                    "TypeScript"
            ) {
                filename =
                    "developer.js";
                content = `const developer = {
  name: "Ethan Peters",
  location: "Building the future",
  skills: [${languages
      .slice(
          0,
          4
      )
      .map(
          (
              lang
          ) =>
              `"${lang}"`
      )
      .join(
          ", "
      )}],
  repositories: ${
      repos.length
  },
  passionate: true,
  
  getCurrentProject() {
    return "Creating amazing experiences";
  },
  
  getMotivation() {
    return "Code is poetry in motion! 🚀";
  }
};`;
            } else if (
                topLanguage ===
                "Python"
            ) {
                filename =
                    "developer.py";
                content = `class Developer:
    def __init__(self):
        self.name = "Ethan Peters"
        self.skills = [${languages
            .slice(
                0,
                4
            )
            .map(
                (
                    lang
                ) =>
                    `"${lang}"`
            )
            .join(
                ", "
            )}]
        self.repositories = ${
            repos.length
        }
        self.passionate = True
    
    def get_current_project(self):
        return "Building the future with code"
    
    def get_motivation(self):
        return "Turning ideas into reality! 🐍"

developer = Developer()`;
            } else if (
                topLanguage ===
                "HTML"
            ) {
                filename =
                    "portfolio.html";
                content = `<!-- Building modern web experiences -->
<div class="developer">
  <h1>Ethan Peters</h1>
  <ul class="skills">
${languages
    .slice(
        0,
        4
    )
    .map(
        (
            lang
        ) =>
            `    <li>${lang}</li>`
    )
    .join(
        "\n"
    )}
  </ul>
  <p>Repositories: ${
      repos.length
  }</p>
  <p>Passion: Creating amazing UX ✨</p>
</div>`;
            } else {
                // Generic code for other languages
                filename =
                    "developer.txt";
                content = `Developer Profile:
├── Name: Ethan Peters
├── Skills: ${languages
                    .slice(
                        0,
                        4
                    )
                    .join(
                        ", "
                    )}
├── Repositories: ${
                    repos.length
                }
├── Experience: Building digital solutions
└── Mission: Code with purpose and passion! 💻`;
            }

            filenameElement.textContent =
                filename;
            codeElement.textContent =
                content;
        }

        // Fallback for about section
        function updateAboutSectionFallback() {
            const topLangElement =
                document.getElementById(
                    "top-language"
                );
            if (
                topLangElement
            ) {
                topLangElement.textContent =
                    "JS";
            }

            const starsElement =
                document.getElementById(
                    "total-stars"
                );
            if (
                starsElement
            ) {
                starsElement.textContent =
                    "⭐";
            }

            const yearsElement =
                document.getElementById(
                    "years-coding"
                );
            if (
                yearsElement
            ) {
                yearsElement.textContent =
                    "2+";
            }
        }

        // Fallback skills update if GitHub API fails
        function updateSkillsFallback() {
            const githubSkillsContainer =
                document.querySelector(
                    ".github-skills"
                );
            if (
                githubSkillsContainer
            ) {
                githubSkillsContainer.innerHTML = `
                    <div class="github-skill fade-in">
                        <div class="language-color" style="background-color: #f1e05a;"></div>
                        <span style="font-weight: 500;">JavaScript</span>
                        <span style="opacity: 0.7;">(45%)</span>
                    </div>
                    <div class="github-skill fade-in">
                        <div class="language-color" style="background-color: #e34c26;"></div>
                        <span style="font-weight: 500;">HTML</span>
                        <span style="opacity: 0.7;">(25%)</span>
                    </div>
                    <div class="github-skill fade-in">
                        <div class="language-color" style="background-color: #1572B6;"></div>
                        <span style="font-weight: 500;">CSS</span>
                        <span style="opacity: 0.7;">(20%)</span>
                    </div>
                    <div class="github-skill fade-in">
                        <div class="language-color" style="background-color: #3572A5;"></div>
                        <span style="font-weight: 500;">Python</span>
                        <span style="opacity: 0.7;">(10%)</span>
                    </div>
                `;
            }
        }

        // Initialize all functionality
        function init() {
            console.log(
                "Initializing portfolio..."
            );

            initNavigation();
            initTypingAnimation();
            initScrollAnimations();
            initContactForm();
            initHoverEffects();
            initProgressBars();

            // Fetch GitHub data after a short delay
            setTimeout(
                fetchGitHubData,
                1000
            );

            console.log(
                "✅ All features initialized!"
            );
        }

        // Start the application
        init();

        // Smooth scrolling for anchor links
        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                (
                    anchor
                ) => {
                    anchor.addEventListener(
                        "click",
                        function (
                            e
                        ) {
                            e.preventDefault();
                            const target =
                                document.querySelector(
                                    this.getAttribute(
                                        "href"
                                    )
                                );
                            if (
                                target
                            ) {
                                target.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",
                                        block: "start",
                                    }
                                );
                            }
                        }
                    );
                }
            );

        // Add some fun console messages
        console.log(
            "%c🚀 Portfolio loaded successfully!",
            "color: #6366f1; font-size: 16px; font-weight: bold;"
        );
        console.log(
            "%cBuilt with ❤️ by Ethan Peters",
            "color: #8b5cf6; font-size: 14px;"
        );
    }
);
