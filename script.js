// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Add loading state
        contactForm.classList.add('loading');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual form handling)
        try {
            // This is where you would send the data to your backend
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Remove loading state
            contactForm.classList.remove('loading');
        }
    });
}

// Simulate form submission (replace with actual implementation)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Log the form data (in a real implementation, this would be sent to your server)
        console.log('Form submission data:', data);
        
        // Simulate network delay
        setTimeout(() => {
            // Simulate successful submission
            resolve('Form submitted successfully');
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(450px);
            transition: transform 0.3s ease;
            border-left: 4px solid #2563eb;
        }
        
        .notification-success {
            border-left-color: #10b981;
        }
        
        .notification-error {
            border-left-color: #ef4444;
        }
        
        .notification-content {
            padding: 20px;
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .notification-message {
            flex: 1;
            color: #374151;
            line-height: 1.5;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            color: #9ca3af;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #374151;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        @media (max-width: 480px) {
            .notification {
                left: 20px;
                right: 20px;
                max-width: none;
                transform: translateY(-100px);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    
    // Add styles if they don't exist
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    const hideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form validation enhancements
function enhanceFormValidation() {
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    clearFieldError(e);
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Floating animation for hero cards
function setupFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random delays and durations for more natural movement
        card.style.animationDuration = `${6 + (index * 0.5)}s`;
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormValidation();
    setupScrollAnimations();
    setupFloatingAnimation();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Restart animations when page becomes visible
        setupFloatingAnimation();
    }
});

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();
