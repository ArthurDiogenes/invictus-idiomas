
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        navbar.style.transform = 'translateY(0)'; // Ensure it stays visible
    } else {
        navbar.classList.remove('scrolled');
    }

    // Keep navbar always visible (remove any hide behavior)
    navbar.style.transform = 'translateY(0)';
    
    lastScroll = currentScroll;
});

// FAQ toggle
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Close all other FAQs
    document.querySelectorAll('.faq-button').forEach(btn => {
        if (btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
            btn.nextElementSibling.style.height = '0';
        }
    });

    // Toggle current FAQ
    button.setAttribute('aria-expanded', !isExpanded);
    if (!isExpanded) {
        content.style.height = content.scrollHeight + 'px';
    } else {
        content.style.height = '0';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    // Implementation for mobile menu if needed
    console.log('Mobile menu toggle');
}

// Add loading animation to CTA buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }
    });
});

// Logo click handler - scroll to top
document.querySelector('.nav-logo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});