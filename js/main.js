// Main JavaScript - Interactive Features

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when user scrolls down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || '0s';
                
                element.style.animationDelay = delay;
                element.classList.add('animate-' + animationType);
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        observer.observe(card);
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonials Carousel
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Move the track
        if (testimonialTrack) {
            testimonialTrack.style.transform = `translateX(-${index * 50}%)`;
        }
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Activate current indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }
    
    // Auto-advance testimonials
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    // Set up automatic testimonial rotation
    let testimonialInterval;
    if (testimonialCards.length > 1) {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    // Add click handlers for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            
            // Reset interval
            if (testimonialInterval) {
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 5000);
            }
        });
    });
    
    // Video play button interactions
    const videoOverlays = document.querySelectorAll('.video-overlay, .image-overlay');
    videoOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            // Add click animation
            const playButton = this.querySelector('.play-button, .play-button-large');
            if (playButton) {
                playButton.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    playButton.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        playButton.style.transform = 'scale(1)';
                    }, 150);
                }, 100);
            }
            
            // Here you would typically integrate with a video player
            console.log('Video play clicked');
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .hero-cta, .method-cta, .locations-cta, .testimonials-cta');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroContent && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const rate = scrollTop * -0.5;
            const imageRate = scrollTop * -0.3;
            
            if (scrollTop < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroImage.style.transform = `translateY(${imageRate}px)`;
            }
        });
    }
    
    // Add loading animation to images when they come into view
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '0';
                element.style.transform = 'scale(0.9)';
                element.style.transition = 'all 0.6s ease';
                
                // Simulate image loading
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                }, 100);
                
                imageObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe image placeholders
    const imagePlaceholders = document.querySelectorAll('.hero-image-placeholder, .video-placeholder, .locations-image-placeholder');
    imagePlaceholders.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.benefit-card, .location-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Dynamic typing effect for hero title (optional enhancement)
    function typeEffect(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
    
    // Lazy loading for background animations
    let backgroundAnimationEnabled = true;
    
    // Disable expensive animations on slower devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        backgroundAnimationEnabled = false;
        document.querySelector('.animated-bg').style.animation = 'none';
        document.querySelectorAll('.floating-element').forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function throttle(func, delay) {
        if (!ticking) {
            requestAnimationFrame(function() {
                func();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Console welcome message
    console.log(`
    🎉 Welcome to Invictus Idiomas! 
    ✨ Modern landing page loaded successfully
    🚀 Built with modern CSS and vanilla JavaScript
    `);
    
});