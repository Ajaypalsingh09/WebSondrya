// Enhanced Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle with enhanced animation
    const themeToggle = document.getElementById('theme-toggle-btn');
    console.log('Theme toggle button found:', themeToggle);
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            console.log('Before toggle - Body classes:', document.body.className);
            console.log('Has dark-mode class:', document.body.classList.contains('dark-mode'));
            alert('Theme toggle clicked!'); // Temporary alert for testing
            document.body.classList.toggle('dark-mode');
            console.log('After toggle - Body classes:', document.body.className);
            console.log('Has dark-mode class:', document.body.classList.contains('dark-mode'));
            
            // Force style change for testing
            if (document.body.classList.contains('dark-mode')) {
                document.body.style.background = '#ff0000';
                document.body.style.color = '#ffffff';
                alert('Applied red background via JavaScript!');
            } else {
                document.body.style.background = '';
                document.body.style.color = '';
            }
            
            const icon = this.textContent;
            this.textContent = icon === '🌙' ? '☀️' : '🌙';
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');

            // Add ripple effect
            createRippleEffect(this);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        console.log('Saved theme:', savedTheme);
        if (savedTheme === 'dark') {
            alert('Loading dark theme from localStorage!'); // Temporary alert for testing
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            console.log('Applied dark mode from localStorage');
        }
    }

    // Mobile menu toggle with smooth animation
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');

            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Enhanced smooth scrolling with offset for fixed header
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu after clicking
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Advanced scroll reveal animation with stagger effect
    const revealElements = document.querySelectorAll('.service-card, .why-item, .pricing-card, .team-member, .blog-card, .testimonial');
    let revealIndex = 0;

    const revealOnScroll = () => {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100 && !element.classList.contains('revealed')) {
                setTimeout(() => {
                    element.classList.add('fade-in-up', 'revealed');
                    element.style.animationDelay = `${index * 0.1}s`;
                }, index * 100);
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Enhanced testimonial slider with smooth transitions
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.children;
        const totalTestimonials = testimonials.length;
        let autoSlideInterval;

        function showTestimonial(index, direction = 'next') {
            const slideWidth = testimonials[0].offsetWidth + 48; // 48px gap
            testimonialSlider.style.transform = `translateX(-${index * slideWidth}px)`;

            // Add slide animation class
            testimonialSlider.classList.add('sliding');
            setTimeout(() => {
                testimonialSlider.classList.remove('sliding');
            }, 500);
        }

        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        }

        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentIndex);
        }

        // Auto slide
        autoSlideInterval = setInterval(nextTestimonial, 6000);

        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextTestimonial, 6000);
        });
    }

    // Enhanced portfolio filter with smooth transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter portfolio items with animation
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                        }, index * 50);
                    } else {
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 100);
                    }
                });
            });
        });
    }

    // Enhanced portfolio modal with smooth animations
    const modal = document.getElementById('portfolio-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');

    if (modal && closeModal) {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-btn')) {
                const item = e.target.closest('.portfolio-item');
                const img = item.querySelector('img');
                const title = item.querySelector('h3').textContent;
                const desc = item.querySelector('p').textContent;

                modalImage.src = img.src;
                modalTitle.textContent = title;
                modalDescription.textContent = desc;
                modal.classList.add('show');

                // Animate modal entrance
                modal.style.animation = 'modalFadeIn 0.3s ease-out';
            }
        });

        closeModal.addEventListener('click', function() {
            modal.style.animation = 'modalFadeOut 0.3s ease-out';
            setTimeout(() => {
                modal.classList.remove('show');
            }, 300);
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.animation = 'modalFadeOut 0.3s ease-out';
                setTimeout(() => {
                    modal.classList.remove('show');
                }, 300);
            }
        });
    }

    // Enhanced contact form with real-time validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
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

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success animation
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;

        // Remove previous error messages
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        field.classList.remove('error', 'success');

        switch (fieldName) {
            case 'name':
                if (!value) {
                    showError(field, 'Name is required');
                    isValid = false;
                } else if (value.length < 2) {
                    showError(field, 'Name must be at least 2 characters');
                    isValid = false;
                }
                break;
            case 'email':
                if (!value) {
                    showError(field, 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    showError(field, 'Please enter a valid email');
                    isValid = false;
                }
                break;
            case 'subject':
                if (!value) {
                    showError(field, 'Subject is required');
                    isValid = false;
                }
                break;
            case 'message':
                if (!value) {
                    showError(field, 'Message is required');
                    isValid = false;
                } else if (value.length < 10) {
                    showError(field, 'Message must be at least 10 characters');
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            field.classList.add('success');
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
        contactForm.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Create ripple effect for buttons
    function createRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';

        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to all buttons
    document.querySelectorAll('.btn, .filter-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this);
        });
    });

    // Mouse follow effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const heroPlaceholder = document.querySelector('.hero-placeholder');
            if (heroPlaceholder) {
                heroPlaceholder.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px) scale(1.05)`;
            }
        });

        heroSection.addEventListener('mouseleave', function() {
            const heroPlaceholder = document.querySelector('.hero-placeholder');
            if (heroPlaceholder) {
                heroPlaceholder.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(2deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Pricing cards interactive effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'scale(1.05) translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '';
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-out';
        });
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
            z-index: 9999;
            transition: width 0.3s ease;
        }

        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .error-message {
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: slideDown 0.3s ease-out;
        }

        .success-message {
            background: #48bb78;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            animation: slideDown 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        input.error, textarea.error {
            border-color: #e53e3e;
            box-shadow: 0 0 0 1px #e53e3e;
        }

        input.success, textarea.success {
            border-color: #48bb78;
            box-shadow: 0 0 0 1px #48bb78;
        }

        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes modalFadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.9);
            }
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .testimonial-slider.sliding {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});
    const revealElements = document.querySelectorAll('.service-card, .why-item, .pricing-card, .team-member, .blog-card');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('reveal', 'active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.children;
        const totalTestimonials = testimonials.length;

        function showTestimonial(index) {
            testimonialSlider.style.transform = `translateX(-${index * 420}px)`;
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        }, 5000);
    }

    
    // Portfolio modal
    const modal = document.getElementById('portfolio-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');

    if (modal && closeModal) {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-btn')) {
                const item = e.target.closest('.portfolio-item');
                const img = item.querySelector('img');
                const title = item.querySelector('h3').textContent;
                const desc = item.querySelector('p').textContent;

                modalImage.src = img.src;
                modalTitle.textContent = title;
                modalDescription.textContent = desc;
                modal.classList.add('show');
            }
        });

        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }