/**
 * NEXZEAL TECHNOLOGIES - CLIENT INTERACTIVE FUNCTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-Triggered Reveal Animations using Intersection Observer
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
        const isMobile = window.innerWidth <= 768;
        const observerOptions = {
            threshold: isMobile ? 0.01 : 0.1,
            rootMargin: isMobile ? '0px 0px -10px 0px' : '0px 0px -50px 0px'
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
        const staggerContainers = document.querySelectorAll('.feature-grid, .reviews-grid, .services-grid, .process-grid, .featured-work-grid, .why-choose-grid, .trusted-logos, .work-grid');
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
            bio: 'Naimat launched NexZeal in 2020 with a mission to deliver clean code architectures directly to businesses. He oversees web frameworks and systems engineering, ensuring every site is fast, robust, and search-optimized.',
            img: 'img/avatar_naimat.jpg'
        },
        'SO': {
            name: 'Sohail',
            role: 'App Developer',
            bio: 'Sohail is our mobile app engineer. He translates complex requirements into sleek, native mobile flows, working direct-to-client on iOS, Android, and cross-platform architecture.',
            img: 'img/avatar_sohail.jpg'
        },
        'HA': {
            name: 'Haseeb',
            role: 'UI/UX Designer',
            bio: 'Haseeb shapes how users interact with our software. He creates geometric, accessible wireframes and design systems configured strictly around high conversion and plain-spoken ease of use.',
            img: 'img/avatar_haseeb.jpg'
        },
        'HM': {
            name: 'Hamza',
            role: 'SEO & Growth',
            bio: 'Hamza bakes discoverability into every digital project from day one. He configures lightweight metadata, sets search indexing benchmarks, and ensures sub-second speed profiles that keep bounce rates near zero.',
            img: 'img/avatar_hamza.jpg'
        }
    };

    if (teamNodes.length > 0 && detailAvatar && detailName && detailRole && detailBio) {
        teamNodes.forEach(node => {
            const circle = node.querySelector('.team-badge-circle');
            
            const handleSelection = () => {
                teamNodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                const key = node.getAttribute('data-member');
                const member = teamData[key];

                if (member) {
                    const card = document.querySelector('.team-details-card');
                    card.style.opacity = '0.3';
                    
                    setTimeout(() => {
                        const avatarImg = detailAvatar.querySelector('img');
                        if (avatarImg) {
                            avatarImg.src = member.img;
                            avatarImg.alt = member.name;
                        }
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
                            currentLineDiv.style.color = '#ffffff';
                        } else if (line.text.startsWith('✓')) {
                            currentLineDiv.style.color = '#00c4b3';
                        } else {
                            currentLineDiv.style.color = '#00e5d0';
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

    // 5. Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    });

    // 6. Services Slider & Touch Swipe Logic
    const track = document.querySelector('.services-track');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dot');

    if (track && cards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        const getVisibleCardsCount = () => {
            if (window.innerWidth <= 580) return 2;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        const updateSlider = () => {
            const visibleCards = getVisibleCardsCount();
            const maxIndex = Math.max(0, cards.length - visibleCards);
            
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            if (currentIndex < 0) {
                currentIndex = 0;
            }

            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
            const step = cardWidth + gap;
            const translate = -currentIndex * step;

            track.style.transform = `translateX(${translate}px)`;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === maxIndex;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
                if (index > maxIndex) {
                    dot.style.display = 'none';
                } else {
                    dot.style.display = 'inline-block';
                }
            });
        };

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            const maxIndex = cards.length - visibleCards;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Touch Swipe Gestures
        let startX = 0;
        let diffX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            diffX = currentX - startX;
            
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
            const step = cardWidth + gap;
            const currentTranslate = -currentIndex * step;
            
            let translate = currentTranslate + diffX;
            const visibleCards = getVisibleCardsCount();
            const maxIndex = cards.length - visibleCards;
            
            if (currentIndex === 0 && diffX > 0) {
                translate = diffX * 0.3;
            } else if (currentIndex === maxIndex && diffX < 0) {
                translate = currentTranslate + diffX * 0.3;
            }
            
            track.style.transform = `translateX(${translate}px)`;
        }, { passive: true });

        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
            const step = cardWidth + gap;
            const threshold = step * 0.2;

            const visibleCards = getVisibleCardsCount();
            const maxIndex = cards.length - visibleCards;

            if (diffX < -threshold && currentIndex < maxIndex) {
                currentIndex++;
            } else if (diffX > threshold && currentIndex > 0) {
                currentIndex--;
            }
            
            diffX = 0;
            updateSlider();
        });

        window.addEventListener('resize', updateSlider);
        
        // Initial setup update after DOM settles
        setTimeout(updateSlider, 100);
    }
});
