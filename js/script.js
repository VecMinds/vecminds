/**
 * ========================================
 * VECMINDS TECHNOLOGIES - CENTRALIZED SCRIPTS
 * ========================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeIcons();
    initializeHeader();
    initializeMobileMenu();
    initializeAccordion();
});

/**
 * ========================================
 * ICON INITIALIZATION
 * ========================================
 */
function initializeIcons() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * ========================================
 * HEADER SCROLL BEHAVIOR
 * ========================================
 */
function initializeHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const headerHeight = header.offsetHeight;

        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
            header.style.top = `-${headerHeight}px`;
        } else {
            header.style.top = '0';
        }

        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    });
}

/**
 * ========================================
 * MOBILE MENU FUNCTIONALITY
 * ========================================
 */
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileMenu) return;

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            // Open menu
            mobileMenu.classList.remove('hidden');
            setTimeout(() => mobileMenu.classList.add('opacity-100'), 10); // Fade in
            openIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            // Close menu
            mobileMenu.classList.remove('opacity-100');
            setTimeout(() => mobileMenu.classList.add('hidden'), 300); // Fade out and then hide
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        }
    });
}

/**
 * ========================================
 * ACCORDION FUNCTIONALITY
 * ========================================
 */
function initializeAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            if (!content) return;

            button.classList.toggle('active');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

/**
 * ========================================
 * SMOOTH SCROLLING FOR ANCHOR LINKS
 * ========================================
 */
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * ========================================
 * UTILITY FUNCTIONS
 * ========================================
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to wait
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ========================================
 * PERFORMANCE OPTIMIZATIONS
 * ========================================
 */

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(() => {
    // Any additional scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

/**
 * ========================================
 * ERROR HANDLING
 * ========================================
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting logic here
});

/**
 * ========================================
 * EXPORT FUNCTIONS FOR GLOBAL ACCESS
 * ========================================
 */
window.VecmindsScripts = {
    initializeIcons,
    initializeHeader,
    initializeMobileMenu,
    initializeAccordion,
    initializeSmoothScrolling,
    debounce,
    throttle
};
