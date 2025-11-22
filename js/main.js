// Main JavaScript - Salon Landing Page

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeader();
    initSmoothScroll();
    initFormHandler();
});

// Mobile Navigation Toggle
function initNavigation() {
    const toggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navList.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Header Scroll Effect
function initHeader() {
    const header = document.getElementById('header');

    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('header--scrolled');
                header.classList.remove('header--transparent');
            } else {
                header.classList.remove('header--scrolled');
                header.classList.add('header--transparent');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handler
function initFormHandler() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simple feedback
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Gesendet!';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
            }, 2000);

            console.log('Form submitted:', data);
        });
    }
}
