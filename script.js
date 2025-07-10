// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on the button
            this.classList.toggle('active');
            
            // Toggle active class on the navigation
            mainNav.classList.toggle('active');
            
            // Toggle body scroll
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav && mainNav.classList.contains('active') && mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery functionality (if on gallery page)
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            galleryContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-content`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Category Filter Functionality (if on gallery page)
    const categoryTabs = document.querySelectorAll('.category-tab');
    const photoItems = document.querySelectorAll('.photo-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter photos
            photoItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Photo Modal Functionality (if on gallery page)
    const photoModal = document.getElementById('photo-modal');
    const photoItemsModal = document.querySelectorAll('.photo-item');
    
    if (photoModal && photoItemsModal.length > 0) {
        const modalImage = photoModal.querySelector('.modal-image');
        const modalTitle = photoModal.querySelector('#modal-title');
        const modalDescription = photoModal.querySelector('#modal-description');
        const closeModal = photoModal.querySelector('.close-modal');
        
        photoItemsModal.forEach(item => {
            item.addEventListener('click', () => {
                const image = item.querySelector('img').src;
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;
                
                if (modalImage) modalImage.src = image;
                if (modalImage) modalImage.alt = title;
                if (modalTitle) modalTitle.textContent = title;
                if (modalDescription) modalDescription.textContent = description;
                
                photoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                photoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === photoModal) {
                photoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Testimonial Slider (if on testimonials page)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        if (testimonials.length > 0) {
            showTestimonial(currentIndex);
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                    showTestimonial(currentIndex);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                });
            }
        }
    }

    // Form validation (if on contact or donate page)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Add error styling
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    // Remove error styling
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        
                        let errorMsg = field.parentNode.querySelector('.error-message');
                        if (!errorMsg) {
                            errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Please enter a valid email address';
                            field.parentNode.appendChild(errorMsg);
                        } else {
                            errorMsg.textContent = 'Please enter a valid email address';
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Clear error styling on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    });

    // Donation amount selection (if on donate page)
    const donationAmounts = document.querySelectorAll('.donation-amount');
    const customAmountInput = document.getElementById('custom-amount');
    
    if (donationAmounts.length > 0 && customAmountInput) {
        donationAmounts.forEach(amount => {
            amount.addEventListener('click', function() {
                // Remove active class from all amounts
                donationAmounts.forEach(a => a.classList.remove('active'));
                
                // Add active class to clicked amount
                this.classList.add('active');
                
                // Update hidden input with selected amount
                const amountValue = this.getAttribute('data-amount');
                const amountInput = document.getElementById('amount');
                if (amountInput) {
                    amountInput.value = amountValue;
                }
                
                // Clear custom amount input
                customAmountInput.value = '';
            });
        });
        
        // Handle custom amount input
        customAmountInput.addEventListener('input', function() {
            // Remove active class from all preset amounts
            donationAmounts.forEach(a => a.classList.remove('active'));
            
            // Update hidden input with custom amount
            const amountInput = document.getElementById('amount');
            if (amountInput && this.value) {
                amountInput.value = this.value;
            }
        });
    }

    // Initialize any counters or animations
    const counters = document.querySelectorAll('.counter');
    
    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Start counters when they come into view
    if (counters.length > 0) {
        let counterStarted = false;
        
        function checkCounters() {
            if (!counterStarted && counters.length > 0 && isInViewport(counters[0])) {
                startCounters();
                counterStarted = true;
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkCounters);
        
        // Check on page load
        checkCounters();
    }
});

// Immediately check if the mobile menu toggle works when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Mobile Menu Toggle Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    console.log("Mobile menu toggle:", mobileMenuToggle);
    console.log("Main nav:", mainNav);
    
    // Create overlay element if it doesn't exist
    let mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    if (!mobileMenuOverlay) {
        mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        document.body.appendChild(mobileMenuOverlay);
        console.log("Created mobile menu overlay");
    }
    
    if (mobileMenuToggle && mainNav) {
        // Remove any existing event listeners (in case they're duplicated)
        const newMobileMenuToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newMobileMenuToggle, mobileMenuToggle);
        
        // Add event listener to the new element
        newMobileMenuToggle.addEventListener('click', function(e) {
            console.log("Mobile menu toggle clicked");
            e.preventDefault();
            
            // Toggle active class on the button
            this.classList.toggle('active');
            console.log("Toggle button active:", this.classList.contains('active'));
            
            // Toggle active class on the navigation
            mainNav.classList.toggle('active');
            console.log("Main nav active:", mainNav.classList.contains('active'));
            
            // Toggle overlay
            mobileMenuOverlay.classList.toggle('active');
            
            // Toggle body scroll
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        console.log("Added click event listener to mobile menu toggle");
    } else {
        console.error("Mobile menu toggle or main nav not found");
    }
    
    // Rest of your existing code...
    // (Keep all the other functionality intact)
});