/**
 * Chukwuemeka Ewurum - Portfolio
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initTypingEffect();
});

function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow || window.matchMedia('(max-width: 768px)').matches) return;
    
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

function initNavigation() {
    const nav = document.getElementById('nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        nav.classList.toggle('scrolled', currentScroll > 50);
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    if (!toggle || !mobileMenu) return;
    
    let isOpen = false;
    
    function toggleMenu() {
        isOpen = !isOpen;
        mobileMenu.classList.toggle('active', isOpen);
        toggle.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        const spans = toggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(span => { span.style.transform = ''; span.style.opacity = ''; });
        }
    }
    
    toggle.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => isOpen && toggleMenu()));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && isOpen && toggleMenu());
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), parseInt(entry.target.dataset.delay || 0));
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - document.getElementById('nav').offsetHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initTypingEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const roles = ['Backend Software Engineer', 'Cloud Architect', 'Systems Designer', 'AWS Specialist', 'Problem Solver'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        const currentRole = roles[roleIndex];
        typedElement.textContent = currentRole.substring(0, isDeleting ? --charIndex : ++charIndex);
        
        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1500);
}

// Parallax
(function() {
    const heroGradient = document.querySelector('.hero-gradient');
    if (!heroGradient || window.matchMedia('(max-width: 768px)').matches) return;
    window.addEventListener('scroll', () => {
        heroGradient.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
})();

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

