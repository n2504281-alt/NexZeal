/**
 * NEXZEAL TECHNOLOGIES - CLIENT INTERACTIVE FUNCTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-Triggered Reveal Animations using Intersection Observer
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // trigger animation only once
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });

        // Dynamic Stagger Setup for grids
        const staggerContainers = document.querySelectorAll('.feature-grid, .reviews-grid, .services-grid, .process-grid, .featured-work-grid, .why-choose-grid, .trusted-logos');
        staggerContainers.forEach(container => {
            const children = container.querySelectorAll('.reveal');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 90}ms`;
            });
        });
    } else {
        // Reduced motion: instantly reveal all elements
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            el.classList.add('revealed');
        });
    }

    // 2. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 3. Mobile Responsive Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = '';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = 'var(--color-white)';
                navMenu.style.padding = '2rem';
                navMenu.style.borderBottom = '1px solid var(--border-color)';
                navMenu.style.gap = '1.5rem';
                navMenu.style.zIndex = '999';
            }
        });
    }

    // 4. Monogram Badge Interaction for Team Details
    const teamNodes = document.querySelectorAll('.team-badge-node');
    const detailAvatar = document.getElementById('detail-avatar');
    const detailName = document.getElementById('detail-name');
    const detailRole = document.getElementById('detail-role');
    const detailBio = document.getElementById('detail-bio');

    const teamData = {
        'NA': {
            name: 'Naimat',
            role: 'Founder & Web Developer',
            bio: 'Naimat launched NexZeal in 2020 with a mission to deliver clean code architectures directly to businesses. He oversees web frameworks and systems engineering, ensuring every site is fast, robust, and search-optimized.'
        },
        'SO': {
            name: 'Sohail',
            role: 'App Developer',
            bio: 'Sohail is our mobile app engineer. He translates complex requirements into sleek, native mobile flows, working direct-to-client on iOS, Android, and cross-platform architecture.'
        },
        'HA': {
            name: 'Haseeb',
            role: 'UI/UX Designer',
            bio: 'Haseeb shapes how users interact with our software. He creates geometric, accessible wireframes and design systems configured strictly around high conversion and plain-spoken ease of use.'
        },
        'HM': {
            name: 'Hamza',
            role: 'SEO & Growth',
            bio: 'Hamza bakes discoverability into every digital project from day one. He configures lightweight metadata, sets search indexing benchmarks, and ensures sub-second speed profiles that keep bounce rates near zero.'
        }
    };

    if (teamNodes.length > 0 && detailAvatar && detailName && detailRole && detailBio) {
        teamNodes.forEach(node => {
            const circle = node.querySelector('.team-badge-circle');
            
            const handleSelection = () => {
                teamNodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                const key = circle.textContent.trim();
                const member = teamData[key];

                if (member) {
                    const card = document.querySelector('.team-details-card');
                    card.style.opacity = '0.3';
                    
                    setTimeout(() => {
                        detailAvatar.textContent = key;
                        detailName.textContent = member.name;
                        detailRole.textContent = member.role;
                        detailBio.textContent = member.bio;
                        card.style.opacity = '1';
                    }, 150);
                }
            };

            circle.addEventListener('mouseenter', handleSelection);
            circle.addEventListener('click', handleSelection);
        });
    }

    // 5. Interactive Typing Console Simulation in Hero Illustration
    const consoleLines = [
        { text: '$ nexzeal new client-project', delay: 100 },
        { text: '✓ scaffolding web app...', delay: 600 },
        { text: '✓ optimizing for search...', delay: 800 },
        { text: '✓ deploying...', delay: 600 },
        { text: 'Live in 12s 🚀', delay: 400 }
    ];

    const consoleOutput = document.getElementById('console-output');

    if (consoleOutput) {
        if (prefersReduced) {
            consoleOutput.innerHTML = consoleLines.map(line => `<div>${line.text}</div>`).join('');
        } else {
            let lineIndex = 0;
            let charIndex = 0;
            let currentLineDiv = null;

            const typeChar = () => {
                if (lineIndex < consoleLines.length) {
                    const line = consoleLines[lineIndex];
                    
                    if (charIndex === 0) {
                        currentLineDiv = document.createElement('div');
                        currentLineDiv.className = 'console-line';
                        if (line.text.startsWith('$')) {
                            currentLineDiv.style.color = 'var(--color-white)';
                        } else if (line.text.startsWith('✓')) {
                            currentLineDiv.style.color = 'var(--color-teal)';
                        } else {
                            currentLineDiv.style.color = 'var(--color-teal-bright)';
                        }
                        consoleOutput.appendChild(currentLineDiv);
                    }

                    if (charIndex < line.text.length) {
                        currentLineDiv.textContent += line.text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, 35 + Math.random() * 20);
                    } else {
                        lineIndex++;
                        charIndex = 0;
                        setTimeout(typeChar, line.delay);
                    }
                } else {
                    setTimeout(() => {
                        consoleOutput.innerHTML = '';
                        lineIndex = 0;
                        charIndex = 0;
                        typeChar();
                    }, 3000);
                }
            };

            typeChar();
        }
    }
});
