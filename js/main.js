/* ==========================================================================
   NEXZEAL TECHNOLOGIES - CUSTOM SCRIPTS & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initStickyHeader();
    initScrollReveal();
    initMobileNav();
    initActiveNav();
    
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
