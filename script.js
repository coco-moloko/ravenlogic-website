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
        
        // Make cards draggable
        makeDraggable(card);
    });
}

// Ultra-smooth return to origin using requestAnimationFrame and easing
function startReturnToOrigin(card) {
    // Get starting position
    const currentTransform = card.style.transform;
    const translateMatch = currentTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
    
    let startX = 0, startY = 0;
    if (translateMatch) {
        startX = parseFloat(translateMatch[1]) || 0;
        startY = parseFloat(translateMatch[2]) || 0;
    }
    
    // If already close to origin, don't bother
    const distanceFromOrigin = Math.sqrt(startX * startX + startY * startY);
    if (distanceFromOrigin < 3) {
        return;
    }
    
    // Cancel any existing animation
    if (card.returnAnimation) {
        cancelAnimationFrame(card.returnAnimation);
        card.returnAnimation = null;
    }
    
    // Animation parameters
    const duration = 3000; // 3 seconds for return journey
    const startTime = performance.now();
    
    // Store initial position
    const initialX = startX;
    const initialY = startY;
    
    // Smooth easing function (ease-out cubic)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function animateReturn(currentTime) {
        // Stop if being dragged
        if (card.dataset.isDragging === 'true') {
            card.returnAnimation = null;
            return;
        }
        
        // Calculate progress (0 to 1)
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = easeOutCubic(progress);
        
        // Calculate current position (interpolate from start to origin)
        const currentX = initialX * (1 - easedProgress);
        const currentY = initialY * (1 - easedProgress);
        
        // Apply position without transition for smooth 60fps movement
        card.style.transition = 'none';
        const scale = card.style.transform.includes('scale') ? ' scale(1.05)' : ' scale(1)';
        card.style.transform = `translate(${currentX}px, ${currentY}px)${scale}`;
        
        // Continue animation or finish
        if (progress < 1) {
            card.returnAnimation = requestAnimationFrame(animateReturn);
        } else {
            // Animation complete - snap to exact origin
            card.style.transition = 'transform 0.2s ease-out';
            card.style.transform = `translate(0px, 0px)${scale}`;
            
            // Resume floating animation after a brief moment
            setTimeout(() => {
                card.style.transition = '';
                card.style.animation = ''; // Resume floating animation
            }, 200);
            
            card.returnAnimation = null;
        }
    }
    
    // Start the smooth animation
    card.returnAnimation = requestAnimationFrame(animateReturn);
}

// Simple bumper car collision - instant, smooth bump with simple boundary constraints
function bumpCard(card, deltaX, deltaY) {
    // Get current position
    const currentTransform = card.style.transform;
    const translateMatch = currentTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
    
    let currentX = 0, currentY = 0;
    if (translateMatch) {
        currentX = parseFloat(translateMatch[1]) || 0;
        currentY = parseFloat(translateMatch[2]) || 0;
    }
    
    // Calculate new position
    let newX = currentX + deltaX;
    let newY = currentY + deltaY;
    
    // Simple boundary check using current card position
    const cardRect = card.getBoundingClientRect();
    const heroSection = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const heroRect = heroSection.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();
    
    // Calculate where the card would be after the bump
    const futureCardLeft = cardRect.left + deltaX;
    const futureCardRight = cardRect.right + deltaX;
    const futureCardTop = cardRect.top + deltaY;
    const futureCardBottom = cardRect.bottom + deltaY;
    
    // Define safe boundaries with padding
    const leftBoundary = heroRect.left + (heroRect.width * 0.5) + 20; // Right 50% + padding
    const rightBoundary = heroRect.right - 20; // Right edge - padding
    const topBoundary = heroRect.top + navbarRect.height + 20; // Below navbar + padding
    const bottomBoundary = heroRect.bottom - 20; // Bottom - padding
    
    // Constrain movement if it would go outside boundaries
    if (futureCardLeft < leftBoundary) {
        newX = currentX; // Don't move if it would go too far left
    }
    if (futureCardRight > rightBoundary) {
        newX = currentX; // Don't move if it would go too far right
    }
    if (futureCardTop < topBoundary) {
        newY = currentY; // Don't move if it would go too high
    }
    if (futureCardBottom > bottomBoundary) {
        newY = currentY; // Don't move if it would go too low
    }
    
    // Apply with smooth transition
    card.style.transition = 'transform 0.2s ease-out';
    const scale = card.style.transform.includes('scale') ? ' scale(1.05)' : ' scale(1)';
    card.style.transform = `translate(${newX}px, ${newY}px)${scale}`;
    
    // Clear transition quickly
    setTimeout(() => {
        card.style.transition = '';
    }, 200);
}

// Smoothly push a card with very gentle animation to prevent jerkiness
function pushCardSmoothly(card, deltaX, deltaY) {
    // Skip very small movements to prevent micro-jitters
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) return;
    
    // Throttle pushes per card to prevent over-animation
    if (!card.lastPushTime) card.lastPushTime = 0;
    const now = Date.now();
    if (now - card.lastPushTime < 50) return; // Max 20 pushes per second per card
    card.lastPushTime = now;
    
    // Get current transform values
    const currentTransform = card.style.transform;
    const translateMatch = currentTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
    
    let currentX = 0, currentY = 0;
    if (translateMatch) {
        currentX = parseFloat(translateMatch[1]) || 0;
        currentY = parseFloat(translateMatch[2]) || 0;
    }
    
    // Calculate new position with heavy dampening for ultra-smooth movement
    const dampening = 0.3; // Heavy dampening for smooth movement
    const newX = currentX + (deltaX * dampening);
    const newY = currentY + (deltaY * dampening);
    
    // Get boundary constraints for the pushed card
    const heroSection = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const heroRect = heroSection.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();
    
    // Get card's original position
    const tempTransform = card.style.transform;
    card.style.transform = 'none';
    const originalRect = card.getBoundingClientRect();
    card.style.transform = tempTransform;
    
    const heroWidth = heroRect.width;
    const leftBoundary = heroRect.left + (heroWidth * 0.5);
    const rightBoundary = heroRect.right;
    const topBoundary = heroRect.top + navbarRect.height;
    const bottomBoundary = heroRect.bottom;
    
    // Calculate movement limits
    const leftEdgeDistance = originalRect.left - leftBoundary;
    const topEdgeDistance = originalRect.top - topBoundary;
    const rightEdgeDistance = rightBoundary - originalRect.right;
    const bottomEdgeDistance = bottomBoundary - originalRect.bottom;
    
    const padding = 20;
    const minX = -leftEdgeDistance + padding;
    const maxX = rightEdgeDistance - padding;
    const minY = -topEdgeDistance + padding;
    const maxY = bottomEdgeDistance - padding;
    
    // Constrain the new position
    const constrainedX = Math.max(minX, Math.min(newX, maxX));
    const constrainedY = Math.max(minY, Math.min(newY, maxY));
    
    // Apply ultra-smooth transition
    card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smooth easing
    const scale = card.style.transform.includes('scale') ? ' scale(1.05)' : ' scale(1)';
    card.style.transform = `translate(${constrainedX}px, ${constrainedY}px)${scale}`;
    
    // Remove transition after animation
    setTimeout(() => {
        if (card.dataset.isDragging !== 'true') {
            card.style.transition = '';
        }
    }, 300);
}

// Legacy function kept for compatibility
function pushCardGently(card, deltaX, deltaY) {
    // Allow pushing even if being dragged for more interactive feel
    
    // Get current transform values
    const currentTransform = card.style.transform;
    const translateMatch = currentTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
    
    let currentX = 0, currentY = 0;
    if (translateMatch) {
        currentX = parseFloat(translateMatch[1]) || 0;
        currentY = parseFloat(translateMatch[2]) || 0;
    }
    
    // Calculate new position with minimal dampening for more responsive pushing
    const dampening = 0.6; // Less dampening for more noticeable movement
    const newX = currentX + (deltaX * dampening);
    const newY = currentY + (deltaY * dampening);
    
    // Get boundary constraints for the pushed card
    const heroSection = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const heroRect = heroSection.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();
    
    // Get card's original position
    const tempTransform = card.style.transform;
    card.style.transform = 'none';
    const originalRect = card.getBoundingClientRect();
    card.style.transform = tempTransform;
    
    const heroWidth = heroRect.width;
    const leftBoundary = heroRect.left + (heroWidth * 0.5);
    const rightBoundary = heroRect.right;
    const topBoundary = heroRect.top + navbarRect.height;
    const bottomBoundary = heroRect.bottom;
    
    // Calculate movement limits
    const leftEdgeDistance = originalRect.left - leftBoundary;
    const topEdgeDistance = originalRect.top - topBoundary;
    const rightEdgeDistance = rightBoundary - originalRect.right;
    const bottomEdgeDistance = bottomBoundary - originalRect.bottom;
    
    const padding = 20;
    const minX = -leftEdgeDistance + padding;
    const maxX = rightEdgeDistance - padding;
    const minY = -topEdgeDistance + padding;
    const maxY = bottomEdgeDistance - padding;
    
    // Constrain the new position
    const constrainedX = Math.max(minX, Math.min(newX, maxX));
    const constrainedY = Math.max(minY, Math.min(newY, maxY));
    
    // Apply the new position with very smooth animation
    card.style.transition = 'transform 0.15s ease-out';
    const scale = card.style.transform.includes('scale') ? ' scale(1.05)' : ' scale(1)';
    card.style.transform = `translate(${constrainedX}px, ${constrainedY}px)${scale}`;
    
    // Remove transition after animation
    setTimeout(() => {
        if (card.dataset.isDragging !== 'true') {
            card.style.transition = '';
        }
    }, 150);
}

// Make floating cards draggable
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let currentX = 0, currentY = 0;
    let isHovered = false;
    
    // Add cursor pointer to indicate interactivity
    element.style.cursor = 'grab';
    element.style.userSelect = 'none';
    element.style.position = 'relative';
    element.style.zIndex = '100'; // Same z-index for all cards to ensure equal interaction
    
    // Mouse events
    element.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events for mobile
    element.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', endDrag);
    
    function updateTransform() {
        const scale = isHovered && !isDragging ? 'scale(1.05)' : 'scale(1)';
        element.style.transform = `translate(${currentX}px, ${currentY}px) ${scale}`;
    }
    
    function startDrag(e) {
        isDragging = true;
        element.dataset.isDragging = 'true'; // Mark as being dragged for collision system
        element.style.cursor = 'grabbing';
        element.style.animation = 'none'; // Pause floating animation while dragging
        element.style.transition = 'none'; // Remove transitions for smooth dragging
        element.style.zIndex = '101'; // Slightly higher when being dragged
        
        // Cancel any return-to-origin animation
        if (element.returnAnimation) {
            cancelAnimationFrame(element.returnAnimation);
            element.returnAnimation = null;
        }
        
        // Get the actual current position from the transform (in case of animation interruption)
        const currentTransform = element.style.transform;
        const translateMatch = currentTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
        
        if (translateMatch) {
            currentX = parseFloat(translateMatch[1]) || 0;
            currentY = parseFloat(translateMatch[2]) || 0;
        }
        
        // Get initial positions
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        
        startX = clientX;
        startY = clientY;
        initialX = currentX;
        initialY = currentY;
        
        updateTransform();
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        
        // Calculate new position
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        const newX = initialX + deltaX;
        const newY = initialY + deltaY;
        
        // Get boundary containers
        const heroSection = document.querySelector('.hero');
        const navbar = document.querySelector('.navbar');
        const heroRect = heroSection.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        // Get the element's original position (before any transforms)
        const tempTransform = element.style.transform;
        element.style.transform = 'none';
        const originalRect = element.getBoundingClientRect();
        element.style.transform = tempTransform;
        
        // Calculate boundaries for full hero height but only right 50% width
        const heroWidth = heroRect.width;
        
        // Right 50% of the hero section (where visual content should stay)
        const leftBoundary = heroRect.left + (heroWidth * 0.5); // Start at 50% mark
        const rightBoundary = heroRect.right;
        
        // Top boundary should be below the navbar to avoid overlap
        const navbarHeight = navbarRect.height;
        const topBoundary = heroRect.top + navbarHeight; // Start below navbar
        const bottomBoundary = heroRect.bottom;
        
        // Calculate how far the element can move from its original position
        const leftEdgeDistance = originalRect.left - leftBoundary;
        const topEdgeDistance = originalRect.top - topBoundary;
        const rightEdgeDistance = rightBoundary - originalRect.right;
        const bottomEdgeDistance = bottomBoundary - originalRect.bottom;
        
        // Set boundaries with padding
        const padding = 20; // 20px padding from edges
        let minX = -leftEdgeDistance + padding; // Can't go into left 50%
        let maxX = rightEdgeDistance - padding; // Stay within right boundary
        let minY = -topEdgeDistance + padding; // Stay below navbar
        let maxY = bottomEdgeDistance - padding; // Can move to bottom of hero
        
        // Apply initial boundary constraints
        let constrainedX = Math.max(minX, Math.min(newX, maxX));
        let constrainedY = Math.max(minY, Math.min(newY, maxY));
        
        // Simple bumper car physics - check for overlaps and gently separate
        const otherCards = document.querySelectorAll('.floating-card');
        
        otherCards.forEach(otherCard => {
            if (otherCard === element) return; // Skip self
            
            // Get current positions
            const otherRect = otherCard.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            
            // Calculate where this element will be
            const futureLeft = originalRect.left + constrainedX;
            const futureTop = originalRect.top + constrainedY;
            const futureRight = futureLeft + elementRect.width;
            const futureBottom = futureTop + elementRect.height;
            
            // Check for actual overlap with some padding
            const padding = 30; // Cards start pushing when 30px apart
            const overlapping = futureLeft < otherRect.right + padding &&
                               futureRight > otherRect.left - padding &&
                               futureTop < otherRect.bottom + padding &&
                               futureBottom > otherRect.top - padding;
            
            if (overlapping) {
                // Calculate centers
                const futureCenterX = futureLeft + elementRect.width / 2;
                const futureCenterY = futureTop + elementRect.height / 2;
                const otherCenterX = otherRect.left + otherRect.width / 2;
                const otherCenterY = otherRect.top + otherRect.height / 2;
                
                // Calculate separation direction
                const deltaX = otherCenterX - futureCenterX;
                const deltaY = otherCenterY - futureCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance > 0) {
                    // Normalize direction
                    const dirX = deltaX / distance;
                    const dirY = deltaY / distance;
                    
                    // Push the other card away with gentle force
                    const pushForce = 15; // Fixed, gentle push
                    bumpCard(otherCard, dirX * pushForce, dirY * pushForce);
                }
            }
        });
        
        // Final boundary check after collision resolution
        currentX = Math.max(minX, Math.min(constrainedX, maxX));
        currentY = Math.max(minY, Math.min(constrainedY, maxY));
        
        updateTransform();
    }
    
    function endDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        element.dataset.isDragging = 'false'; // Mark as no longer being dragged
        element.style.cursor = 'grab';
        element.style.zIndex = '100'; // Back to normal z-index
        
        // Add some bounce-back animation
        element.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        updateTransform();
        
        // Remove transition after animation completes
        setTimeout(() => {
            if (!isDragging) {
                element.style.transition = 'transform 0.2s ease';
            }
        }, 300);
        
        // Start gradual return to origin after a delay
        setTimeout(() => {
            if (!isDragging) {
                startReturnToOrigin(element);
            }
        }, 2000); // Wait 2 seconds before starting return
    }
    
    // Add hover effects with proper transform handling
    element.addEventListener('mouseenter', () => {
        if (!isDragging) {
            isHovered = true;
            element.style.transition = 'transform 0.2s ease';
            updateTransform();
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (!isDragging) {
            isHovered = false;
            element.style.transition = 'transform 0.2s ease';
            updateTransform();
        }
    });
    
    // Double-click to reset position
    element.addEventListener('dblclick', () => {
        currentX = 0;
        currentY = 0;
        isHovered = false;
        element.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        updateTransform();
        
        setTimeout(() => {
            element.style.animation = ''; // Resume floating animation
            element.style.transition = 'transform 0.2s ease';
        }, 500);
    });
    
    // Initialize transform
    updateTransform();
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
