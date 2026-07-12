/* ==========================================================================
   NEXZEAL TECHNOLOGIES - CUSTOM SCRIPTS & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initStickyHeader();
    initScrollReveal();
    initMobileNav();
    initActiveNav();
    initHomepageRedesign();
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

/* ==========================================================================
   1. DARK / LIGHT THEME MANAGER
   ========================================================================== */
function initThemeManager() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to Light Mode unless set or preferred
    let currentTheme = 'light';
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        currentTheme = 'dark';
    }
    
    // Apply theme
    applyTheme(currentTheme);
    
    // Event listener for toggle click
    themeToggle.addEventListener('click', () => {
        const targetTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(targetTheme);
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

/* ==========================================================================
   2. STICKY HEADER WITH BLUR ON SCROLL
   ========================================================================== */
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial scroll check
}

/* ==========================================================================
   3. NATIVE INTERSECTION OBSERVER SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }
}

/* ==========================================================================
   4. MOBILE NAV TOGGLE & DRAW DRAWER
   ========================================================================== */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== toggle) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking menu links
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

/* ==========================================================================
   5. AUTO NAV LINK HIGHLIGHT FOR MULTI-PAGE SETUP
   ========================================================================== */
function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Match home page
        if (href === '#' || href === 'index.html' || href === '/') {
            if (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '' || currentPath.endsWith('/')) {
                link.classList.add('active');
                return;
            }
        }
        
        // Match sub-pages
        if (href && href !== '#' && href !== '/' && href !== 'index.html') {
            if (currentPath.endsWith(href) || currentPath.includes('/' + href)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

/* ==========================================================================
   6. HOMEPAGE REDESIGN CONTROLLERS
   ========================================================================== */
function initHomepageRedesign() {
    // 1. Scroll Snap Carousel (Core Offerings)
    const carousel = document.querySelector('.offerings-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (carousel) {
        const updateDots = () => {
            const width = carousel.offsetWidth;
            const index = Math.round(carousel.scrollLeft / width);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        carousel.addEventListener('scroll', updateDots, { passive: true });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const width = carousel.offsetWidth;
                carousel.scrollTo({
                    left: i * width,
                    behavior: 'smooth'
                });
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const width = carousel.offsetWidth;
                carousel.scrollBy({ left: -width, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const width = carousel.offsetWidth;
                carousel.scrollBy({ left: width, behavior: 'smooth' });
            });
        }
    }

    // 2. Project Slider (Selected Case Studies)
    const track = document.querySelector('.project-slides-track');
    const slides = document.querySelectorAll('.project-slide-item');
    const projectPrev = document.getElementById('project-prev');
    const projectNext = document.getElementById('project-next');
    const progressFill = document.querySelector('.slider-progress-bar-fill');
    let currentIdx = 0;

    function updateProjectSlider() {
        if (!track || slides.length === 0) return;
        track.style.transform = `translateX(-${currentIdx * 100}%)`;
        if (progressFill) {
            progressFill.style.width = `${((currentIdx + 1) / slides.length) * 100}%`;
        }
    }

    if (track && slides.length > 0) {
        updateProjectSlider();

        if (projectPrev) {
            projectPrev.addEventListener('click', () => {
                currentIdx = (currentIdx - 1 + slides.length) % slides.length;
                updateProjectSlider();
            });
        }

        if (projectNext) {
            projectNext.addEventListener('click', () => {
                currentIdx = (currentIdx + 1) % slides.length;
                updateProjectSlider();
            });
        }
    }

    // 3. Testimonials Carousel
    const tTrack = document.querySelector('.testimonials-track');
    const tSlides = document.querySelectorAll('.testimonial-slide-premium');
    const tDots = document.querySelectorAll('.testimonial-dot');
    let tIdx = 0;
    let autoplayTimer;

    function showTestimonial(idx) {
        if (!tTrack || tSlides.length === 0) return;
        tTrack.style.transform = `translateX(-${idx * 100}%)`;
        tDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        tIdx = idx;
    }

    if (tTrack && tSlides.length > 0) {
        showTestimonial(0);

        const startAutoplay = () => {
            autoplayTimer = setInterval(() => {
                let next = (tIdx + 1) % tSlides.length;
                showTestimonial(next);
            }, 6000);
        };

        const resetAutoplay = () => {
            clearInterval(autoplayTimer);
            startAutoplay();
        };

        startAutoplay();

        tDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showTestimonial(i);
                resetAutoplay();
            });
        });
    }

    // 4. Process Timeline Animation
    const nodes = document.querySelectorAll('.process-flow-node');
    if ('IntersectionObserver' in window && nodes.length > 0) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        nodes.forEach(n => obs.observe(n));
    }
}

