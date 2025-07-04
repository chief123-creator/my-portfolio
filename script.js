// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Set up theme toggle
    setupThemeToggle();
    
    // Set up scroll effects
    setupScrollEffects();
    
    // Set up contact form
    setupContactForm();
    
    // Set up project filtering
    setupProjectFiltering();
    
    // Set up animations
    setupAnimations();
    
    // Set up cursor glow effect
    setupCursorGlow();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Set up scroll to top button
    setupScrollToTop();
}

/**
 * Set up navigation functionality
 */
function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-neon-blue');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-neon-blue');
            }
        });
    });
}

/**
 * Set up theme toggle functionality
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light');
        themeToggle.classList.add('dark');
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light');
        themeToggle.classList.toggle('dark');
        
        // Save theme preference
        const theme = body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

/**
 * Set up scroll effects
 */
function setupScrollEffects() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollIndicator.style.transform = `scaleX(${progress / 100})`;
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animate-float');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Set up contact form functionality
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form data
            if (validateForm(name, email, message)) {
                // Show success alert as requested
                showAlert();
                
                // Add visual feedback
                showSubmissionSuccess();
                
                // Reset form after successful submission
                setTimeout(() => {
                    contactForm.reset();
                }, 2000);
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

/**
 * Show alert function as requested
 */
function showAlert() {
    alert("Thanks for reaching out!");
}

/**
 * Validate form data
 */
function validateForm(name, email, message) {
    let isValid = true;
    
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    if (!email || !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch(field.name) {
        case 'name':
            if (!value || value.length < 2) {
                errorMessage = 'Please enter a valid name (at least 2 characters)';
                isValid = false;
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                errorMessage = 'Please enter a message (at least 10 characters)';
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        clearFieldError(field.name);
        field.classList.remove('error');
        field.style.borderColor = '';
    } else {
        showFieldError(field.name, errorMessage);
    }
    
    return isValid;
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show field error
 */
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    clearFieldError(fieldName);
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-400 text-sm mt-1';
    errorElement.textContent = message;
    errorElement.id = `error-${fieldName}`;
    
    field.parentElement.appendChild(errorElement);
}

/**
 * Clear field error
 */
function clearFieldError(fieldName) {
    const existingError = document.getElementById(`error-${fieldName}`);
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Show submission success feedback
 */
function showSubmissionSuccess() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Change button appearance temporarily
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
    submitBtn.disabled = true;
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);
}

/**
 * Set up project filtering
 */
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'neon-glow');
                btn.style.background = '';
            });
            this.classList.add('active', 'neon-glow');
            this.style.background = 'linear-gradient(45deg, #00d4ff, #a855f7)';
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Set up animations
 */
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        setTimeout(() => {
                            skillBar.style.transform = 'scaleX(1)';
                        }, 200);
                    }
                }
                
                // Animate tech stack bars
                if (entry.target.classList.contains('project-card')) {
                    const techBars = entry.target.querySelectorAll('.tech-stack-bar');
                    techBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.classList.add('animate');
                        }, 300 + (index * 100));
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.glass, .project-card, .skill-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate skill bars on scroll
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.transform = 'scaleX(0)';
        bar.style.transition = 'transform 1s ease-out';
        bar.style.transformOrigin = 'left';
    });
    
    // Typewriter effect for hero title
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        typewriterText.style.borderRight = '3px solid #00d4ff';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typewriterText.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

/**
 * Set up cursor glow effect
 */
function setupCursorGlow() {
    if (window.innerWidth > 768) { // Only on desktop
        const cursor = document.createElement('div');
        cursor.className = 'fixed w-6 h-6 pointer-events-none z-50 rounded-full';
        cursor.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(0, 212, 255, 0.2) 50%, transparent 70%)';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.transition = 'opacity 0.2s ease';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Show default cursor on interactive elements
        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'pointer';
                cursor.style.opacity = '0';
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'none';
                cursor.style.opacity = '1';
            });
        });
    }
}

/**
 * Set up mobile menu
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate button
            mobileMenuBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                mobileMenuBtn.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Close mobile menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * Set up scroll to top button
 */
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click effect
            scrollToTopBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                scrollToTopBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', function() {
    // Recalculate animations on resize
    if (window.innerWidth <= 768) {
        // Mobile optimizations
        document.body.style.cursor = 'auto';
        const cursor = document.querySelector('.fixed.w-6.h-6');
        if (cursor) {
            cursor.remove();
        }
    }
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Resume animations when page becomes visible
        console.log('Page is now visible');
    } else {
        // Pause animations when page is hidden
        console.log('Page is now hidden');
    }
});

/**
 * Performance optimization
 */
// Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);