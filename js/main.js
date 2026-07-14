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
        const staggerContainers = document.querySelectorAll('.feature-grid, .reviews-list, .services-grid, .process-grid, .featured-work-grid, .why-choose-grid, .trusted-logos-grid, .work-grid');
        staggerContainers.forEach(container => {
            const children = container.querySelectorAll('.reveal');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 90}ms`;
            });
        });

        // Global Section-level Scroll Reveal Observer
        const sectionsToAnimate = document.querySelectorAll('section, main, header.hero, footer.footer');
        const sectionRevealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: isMobile ? '0px 0px 80px 0px' : '0px 0px 150px 0px'
        });

        sectionsToAnimate.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            // Reveal immediately on page load if the section is already in or near viewport
            if (rect.top < window.innerHeight) {
                sec.classList.add('section-reveal', 'section-revealed');
            } else {
                sec.classList.add('section-reveal');
                sectionRevealObserver.observe(sec);
            }
        });
    } else {
        // Reduced motion: instantly reveal all elements
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            el.classList.add('revealed');
        });

        const sectionsToAnimate = document.querySelectorAll('section, main, header.hero, footer.footer');
        sectionsToAnimate.forEach(sec => {
            sec.classList.add('section-reveal', 'section-revealed');
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
            role: 'Digital Marketing Specialist',
            bio: 'Experienced Digital Marketing Specialist with expertise in SEO Optimization, Performance Marketing, Search Engine Marketing, AI & Automation, Social Media Management, Content Creation, Brand Identity, and Business Promotions. Dedicated to helping businesses increase their online presence, generate quality leads, and achieve measurable growth.',
            img: 'img/avatar_naimat.jpg'
        },
        'SO': {
            name: 'Sohail',
            role: 'App Developer',
            bio: 'Experienced App Developer with expertise in Android and iOS application development. Skilled in creating scalable, feature-rich, and user-friendly mobile applications with smooth performance.',
            img: 'img/avatar_sohail.jpg'
        },
        'HA': {
            name: 'Haseeb',
            role: 'Website Designer',
            bio: 'Creative Website Designer specializing in UI/UX design, responsive layouts, wireframing, and modern web interfaces. Focused on delivering visually appealing designs that enhance user experience and strengthen brand identity.',
            img: 'img/avatar_haseeb.jpg'
        },
        'HM': {
            name: 'Hamza',
            role: 'Website Developer',
            bio: 'Experienced Website Developer specializing in responsive websites, custom web solutions, and website optimization. Passionate about building secure, high-performance, and user-friendly websites for businesses.',
            img: 'img/avatar_hamza.jpg'
        },
        'IR': {
            name: 'Irfan',
            role: 'Website Management & Support Specialist',
            bio: 'Experienced Website Management & Support Specialist skilled in website maintenance, security monitoring, performance optimization, backups, troubleshooting, and technical support. Committed to keeping websites secure, updated, and running efficiently at all times.',
            img: 'img/avatar_irfan.jpg'
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
    const dotsContainer = document.querySelector('.slider-dots');

    if (track && cards.length > 0 && prevBtn && nextBtn && dotsContainer) {
        // Dynamically build slider dots
        dotsContainer.innerHTML = '';
        cards.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = `slider-dot${idx === 0 ? ' active' : ''}`;
            dot.setAttribute('data-index', idx);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');
        let currentIndex = 0;
        
        const getVisibleCardsCount = () => {
            if (window.innerWidth <= 580) return 1;
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

    // Hero Title Loop Typing Effect
    const typingTarget = document.querySelector('.hero-typing-target');
    if (typingTarget) {
        const fullText = "Actually Work";
        let isDeleting = false;
        let charIndex = fullText.length;
        
        const typeLoop = () => {
            if (isDeleting) {
                charIndex--;
                typingTarget.textContent = fullText.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    setTimeout(typeLoop, 400);
                } else {
                    setTimeout(typeLoop, 60);
                }
            } else {
                charIndex++;
                typingTarget.textContent = fullText.substring(0, charIndex);
                if (charIndex === fullText.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, 2500);
                } else {
                    setTimeout(typeLoop, 100);
                }
            }
        };
        setTimeout(typeLoop, 1500);
    }

    // Featured Work mobile horizontal scroll controls
    const workGrid = document.querySelector('.featured-work-grid');
    const workPrev = document.querySelector('.work-prev-btn');
    const workNext = document.querySelector('.work-next-btn');
    const workDots = document.querySelectorAll('.work-dot');
    const workCards = document.querySelectorAll('.featured-work-card');

    if (workGrid && workPrev && workNext && workDots.length > 0) {
        const updateWorkControls = () => {
            const scrollLeft = workGrid.scrollLeft;
            const maxScroll = workGrid.scrollWidth - workGrid.clientWidth;
            
            // Disable buttons if at boundary
            workPrev.disabled = scrollLeft <= 10;
            workNext.disabled = scrollLeft >= maxScroll - 10;
            
            // Update active dot based on scroll position
            if (workCards.length > 0) {
                const cardWidth = workCards[0].offsetWidth + parseFloat(window.getComputedStyle(workGrid).gap || 0);
                const activeIndex = Math.round(scrollLeft / cardWidth);
                workDots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === activeIndex);
                });
            }
        };

        // Scroll listener to update dots/buttons dynamically when swiping
        workGrid.addEventListener('scroll', updateWorkControls);
        window.addEventListener('resize', updateWorkControls);

        // Click listeners on buttons
        workPrev.addEventListener('click', () => {
            const cardWidth = workCards[0].offsetWidth + parseFloat(window.getComputedStyle(workGrid).gap || 0);
            workGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        workNext.addEventListener('click', () => {
            const cardWidth = workCards[0].offsetWidth + parseFloat(window.getComputedStyle(workGrid).gap || 0);
            workGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        // Click listeners on dots
        workDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = workCards[0].offsetWidth + parseFloat(window.getComputedStyle(workGrid).gap || 0);
                workGrid.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
            });
        });

        // Initial setup
        setTimeout(updateWorkControls, 300);
    }

    // 7. Dynamic Scroll-to-Top Button
    const createScrollToTopButton = () => {
        const btn = document.createElement('button');
        btn.id = 'scroll-to-top';
        btn.className = 'scroll-to-top-btn';
        btn.setAttribute('aria-label', 'Scroll to Top');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    createScrollToTopButton();

    // 7.5. Dynamic Read More / Read Less for Services Page (Mobile View Only)
    const initServicesCollapse = () => {
        const servicePageGrid = document.querySelector('.services-page-grid');
        if (!servicePageGrid) return;
        
        const pageCards = servicePageGrid.querySelectorAll('.service-page-card');
        pageCards.forEach(card => {
            const descPara = card.querySelector('.service-page-content p');
            const pageList = card.querySelector('.service-page-list');
            
            if (descPara) {
                const text = descPara.textContent.trim();
                const firstDotIndex = text.indexOf('. ');
                
                if (firstDotIndex !== -1) {
                    const firstSentence = text.substring(0, firstDotIndex + 1);
                    const remainingText = text.substring(firstDotIndex + 1);
                    descPara.innerHTML = `${firstSentence} <span class="mobile-hidden-text">${remainingText}</span>`;
                }
                
                if (pageList) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'mobile-hidden-details';
                    pageList.parentNode.insertBefore(wrapper, pageList);
                    wrapper.appendChild(pageList);
                }
                
                card.classList.add('mobile-collapsed');
                
                const btn = document.createElement('button');
                btn.className = 'read-more-btn';
                btn.setAttribute('aria-expanded', 'false');
                btn.innerHTML = 'Read More <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; transition: transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                
                descPara.parentNode.insertBefore(btn, descPara.nextSibling);
                
                btn.addEventListener('click', () => {
                    const isCollapsed = card.classList.toggle('mobile-collapsed');
                    btn.setAttribute('aria-expanded', !isCollapsed);
                    if (isCollapsed) {
                        btn.innerHTML = 'Read More <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; transition: transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                    } else {
                        btn.innerHTML = 'Read Less <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; transform: rotate(180deg); transition: transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                    }
                });
            }
        });
    };
    initServicesCollapse();

    // 8. Preloader Fade-out
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }
    };

    // 9. Scroll-Triggered Rating Count-Up Animation
    const ratingNumEl = document.getElementById('rating-number');
    if (ratingNumEl) {
        const animateRating = () => {
            let start = 1.0;
            const end = 4.9;
            const duration = 1600; // 1.6 seconds for smooth animation
            const startTime = performance.now();

            const updateRating = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic for a more natural slowdown at the end
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentVal = start + (end - start) * easeOutCubic;
                
                ratingNumEl.textContent = currentVal.toFixed(1);

                if (progress < 1) {
                    requestAnimationFrame(updateRating);
                } else {
                    ratingNumEl.textContent = end.toFixed(1);
                }
            };

            requestAnimationFrame(updateRating);
        };

        if (prefersReduced) {
            ratingNumEl.textContent = "4.9";
        } else {
            const isMobile = window.innerWidth <= 768;
            const ratingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateRating();
                        ratingObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: isMobile ? 0.01 : 0.1 });

            ratingObserver.observe(ratingNumEl);
        }
    }

    // 6.5. Hero Background Particle Animation
    const initHeroParticles = () => {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.2 + 0.08;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                const theme = document.documentElement.classList.contains('dark-theme') || !document.documentElement.classList.contains('light-theme') ? 'rgba(0, 196, 179,' : 'rgba(8, 21, 39,';
                ctx.fillStyle = `${theme}${this.opacity})`;
                ctx.fill();
            }
        }

        const init = () => {
            const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connecting lines
            const isDark = document.documentElement.classList.contains('dark-theme') || !document.documentElement.classList.contains('light-theme');
            const lineColor = isDark ? 'rgba(0, 196, 179, 0.04)' : 'rgba(8, 21, 39, 0.02)';
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        init();
        animate();

        // Re-init on resize to adjust particle density
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                init();
            }, 200);
        });
    };

    initHeroParticles();

    // 3D Title Interactive Mouse Tilt Effect
    const titlesToTilt = document.querySelectorAll('.inner-page-title, .hero-title');
    titlesToTilt.forEach(title => {
        const header = title.closest('.inner-header, .hero-section');
        if (!header) return;

        header.addEventListener('mousemove', (e) => {
            if (prefersReduced) return;
            const rect = header.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Maximum rotation angle in degrees
            const maxRotation = 12;
            const rotateX = -(y / (rect.height / 2)) * maxRotation;
            const rotateY = (x / (rect.width / 2)) * maxRotation;

            title.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Slightly shift shadows based on mouse position to enhance 3D effect
            const shadowX = -(x / (rect.width / 2)) * 8;
            const shadowY = -(y / (rect.height / 2)) * 8;
            
            if (document.documentElement.classList.contains('dark-theme')) {
                title.style.textShadow = `
                    ${shadowX * 0.1}px ${shadowY * 0.1 + 1}px 0 rgba(0, 196, 179, 0.35),
                    ${shadowX * 0.2}px ${shadowY * 0.2 + 2}px 0 rgba(0, 196, 179, 0.3),
                    ${shadowX * 0.3}px ${shadowY * 0.3 + 3}px 0 rgba(0, 196, 179, 0.25),
                    ${shadowX * 0.4}px ${shadowY * 0.4 + 4}px 0 rgba(21, 79, 147, 0.4),
                    ${shadowX * 0.5}px ${shadowY * 0.5 + 5}px 0 rgba(21, 79, 147, 0.3),
                    ${shadowX * 0.6}px ${shadowY * 0.6 + 6}px 0 rgba(21, 79, 147, 0.25),
                    ${shadowX * 0.8}px ${shadowY * 0.8 + 8}px 1px rgba(0, 0, 0, 0.4),
                    0 0 10px rgba(0, 196, 179, 0.15),
                    ${shadowX}px ${shadowY + 12}px 15px rgba(0, 0, 0, 0.5),
                    ${shadowX * 1.5}px ${shadowY + 20}px 30px rgba(0, 196, 179, 0.25)
                `;
            } else {
                title.style.textShadow = `
                    ${shadowX * 0.1}px ${shadowY * 0.1 + 1}px 0 #e2e8f0,
                    ${shadowX * 0.2}px ${shadowY * 0.2 + 2}px 0 #cbd5e1,
                    ${shadowX * 0.3}px ${shadowY * 0.3 + 3}px 0 #94a3b8,
                    ${shadowX * 0.4}px ${shadowY * 0.4 + 4}px 0 #64748b,
                    ${shadowX * 0.5}px ${shadowY * 0.5 + 5}px 0 #475569,
                    ${shadowX * 0.6}px ${shadowY * 0.6 + 6}px 1px rgba(11, 30, 61, 0.1),
                    0 0 5px rgba(11, 30, 61, 0.05),
                    ${shadowX}px ${shadowY + 10}px 12px rgba(11, 30, 61, 0.15),
                    ${shadowX * 1.5}px ${shadowY + 18}px 25px rgba(11, 30, 61, 0.2)
                `;
            }
        });

        header.addEventListener('mouseleave', () => {
            title.style.transform = '';
            title.style.textShadow = '';
        });
    });

    // Hide preloader when window fully loads
    window.addEventListener('load', hidePreloader);

    // Fallback: hide preloader after 2.5 seconds
    setTimeout(hidePreloader, 2500);
});
