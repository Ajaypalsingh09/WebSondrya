// Enhanced Main JavaScript functionality with dynamic effects

// Particle background effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        heroSection.appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                life: Math.random() * 100 + 100
            });
        }
    }

    getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }

            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(102, 126, 234, ${(100 - distance) / 100 * 0.2})`;
                        this.ctx.stroke();
                    }
                }
            });

            // Update life
            particle.life--;
            if (particle.life <= 0) {
                this.particles[index] = {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    color: this.getRandomColor(),
                    life: Math.random() * 100 + 100
                };
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Razorpay payment function with better UX
function payNow(amount, planName = 'Service') {
    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
        showErrorAnimation("Payment system is not loaded. Please check your internet connection and try again.");
        return;
    }

    // Show loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center; color: white;">
                <div style="width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p>Initializing payment...</p>
            </div>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
        // Check for valid Razorpay key
        const razorpayKey = "YOUR_RAZORPAY_KEY_ID"; // Replace with your actual Razorpay key

        if (razorpayKey === "YOUR_RAZORPAY_KEY_ID") {
            document.body.removeChild(loadingOverlay);
            showErrorAnimation("Payment system not configured. Please contact support or check back later.");
            return;
        }

        var options = {
            key: razorpayKey, // Replace with your actual Razorpay key
            amount: amount * 100, // Amount in paisa
            currency: "INR",
            name: "Web Sondrya",
            description: `${planName} Payment`,
            handler: function (response) {
                document.body.removeChild(loadingOverlay);
                showSuccessAnimation(response.razorpay_payment_id);
                setTimeout(() => {
                    window.location.href = "payment-success.html";
                }, 2000);
            },
            prefill: {
                name: document.getElementById('name')?.value || "",
                email: document.getElementById('email')?.value || "",
                contact: document.getElementById('phone')?.value || ""
            },
            notes: {
                address: "Web Sondrya Office",
                plan: planName
            },
            theme: {
                color: "#667eea",
                backdrop_color: "rgba(102, 126, 234, 0.8)"
            },
            modal: {
                ondismiss: function() {
                    document.body.removeChild(loadingOverlay);
                    showErrorAnimation("Payment was cancelled");
                    setTimeout(() => {
                        window.location.href = "payment-failed.html";
                    }, 2000);
                },
                confirm_close: true,
                animation: true
            },
            retry: {
                enabled: true,
                max_count: 3
            }
        };

        try {
            var razorpay = new Razorpay(options);
            document.body.removeChild(loadingOverlay);
            razorpay.open();
        } catch (error) {
            document.body.removeChild(loadingOverlay);
            console.error('Razorpay error:', error);
            showErrorAnimation("Failed to initialize payment. Please try again or contact support.");
        }
    }, 1500);
}

function showSuccessAnimation(paymentId) {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 10000; text-align: center; animation: successPopup 0.5s ease-out;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #48bb78, #38a169); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; animation: checkmark 0.8s ease-out 0.5s both;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            </div>
            <h3 style="color: #48bb78; margin-bottom: 1rem;">Payment Successful!</h3>
            <p style="color: #666; margin-bottom: 1rem;">Payment ID: ${paymentId}</p>
            <p style="color: #999; font-size: 0.9rem;">Redirecting to success page...</p>
        </div>
        <style>
            @keyframes successPopup {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes checkmark {
                0% { transform: scale(0) rotate(-180deg); }
                50% { transform: scale(1.2) rotate(-90deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
        </style>
    `;
    document.body.appendChild(successDiv);
}

function showErrorAnimation(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 10000; text-align: center; animation: errorPopup 0.5s ease-out;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #e53e3e, #c53030); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; animation: errorIcon 0.8s ease-out 0.5s both;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <h3 style="color: #e53e3e; margin-bottom: 1rem;">Payment Failed</h3>
            <p style="color: #666;">${message}</p>
        </div>
        <style>
            @keyframes errorPopup {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes errorIcon {
                0% { transform: scale(0) rotate(-180deg); }
                50% { transform: scale(1.2) rotate(-90deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
        </style>
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}

// Enhanced blog posts loading with lazy loading and animations
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (blogContainer && typeof blogPosts !== 'undefined') {
        blogContainer.innerHTML = ''; // Clear existing content

        blogPosts.forEach((post, index) => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.style.animationDelay = `${index * 0.2}s`;
            blogCard.innerHTML = `
                <div class="blog-image-container">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <div class="blog-overlay">
                        <span class="blog-category">${post.category || 'Web Design'}</span>
                    </div>
                </div>
                <div class="blog-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="date">${post.date}</span>
                        <span class="read-time">${post.readTime || '5 min read'}</span>
                    </div>
                    <a href="#" class="read-more-btn">Read More</a>
                </div>
            `;

            // Add click event for read more
            const readMoreBtn = blogCard.querySelector('.read-more-btn');
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showBlogModal(post);
            });

            blogContainer.appendChild(blogCard);
        });
    }
}

// Enhanced portfolio items loading with improved interactions
function loadPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid && typeof portfolioItems !== 'undefined') {
        portfolioGrid.innerHTML = '';

        portfolioItems.forEach((item, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            portfolioItem.style.animationDelay = `${index * 0.1}s`;

            portfolioItem.innerHTML = `
                <div class="portfolio-image-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="portfolio-overlay">
                        <div class="portfolio-content">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="portfolio-tags">
                                ${item.tags ? item.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                            </div>
                            <div class="portfolio-actions">
                                <button class="view-btn" data-item='${JSON.stringify(item).replace(/'/g, "&apos;")}'>View Details</button>
                                <button class="like-btn" onclick="toggleLike(this)">
                                    <i class="fas fa-heart"></i>
                                    <span class="like-count">${item.likes || 0}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            portfolioGrid.appendChild(portfolioItem);
        });
    }
}

// Enhanced testimonials loading with ratings
function loadTestimonials() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && typeof testimonials !== 'undefined') {
        testimonialSlider.innerHTML = '';

        testimonials.forEach((testimonial, index) => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.className = 'testimonial';
            testimonialDiv.style.animationDelay = `${index * 0.3}s`;

            const rating = testimonial.rating || 5;
            const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

            testimonialDiv.innerHTML = `
                <div class="testimonial-header">
                    <div class="testimonial-avatar">
                        <img src="${testimonial.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2NjdlZWEiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcgMjAgMjAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+'}" alt="${testimonial.author}">
                    </div>
                    <div class="testimonial-info">
                        <h4>${testimonial.author}</h4>
                        <div class="rating">${stars}</div>
                        <span class="position">${testimonial.position || 'Client'}</span>
                    </div>
                </div>
                <p>"${testimonial.text}"</p>
                <div class="testimonial-footer">
                    <span class="company">${testimonial.company || 'Web Sondrya Client'}</span>
                </div>
            `;

            testimonialSlider.appendChild(testimonialDiv);
        });
    }
}

// Blog modal functionality
function showBlogModal(post) {
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="blog-modal-content">
            <div class="blog-modal-header">
                <h2>${post.title}</h2>
                <button class="close-blog-modal">&times;</button>
            </div>
            <div class="blog-modal-body">
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-meta">
                    <span class="date">${post.date}</span>
                    <span class="read-time">${post.readTime || '5 min read'}</span>
                    <span class="category">${post.category || 'Web Design'}</span>
                </div>
                <div class="blog-content">
                    ${post.content || post.excerpt}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-blog-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Like functionality for portfolio items
function toggleLike(button) {
    const icon = button.querySelector('i');
    const count = button.querySelector('.like-count');
    const currentCount = parseInt(count.textContent);

    if (icon.classList.contains('fas')) {
        // Unlike
        icon.classList.remove('fas');
        icon.classList.add('far');
        count.textContent = currentCount - 1;
        button.classList.remove('liked');
    } else {
        // Like
        icon.classList.remove('far');
        icon.classList.add('fas');
        count.textContent = currentCount + 1;
        button.classList.add('liked');

        // Add heart animation
        createHeartAnimation(button);
    }
}

function createHeartAnimation(button) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'floatHeart 1s ease-out forwards';
            button.appendChild(heart);

            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
}

// Initialize dynamic content and effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle background
    new ParticleBackground();

    // Load dynamic content
    loadBlogPosts();
    // loadPortfolioItems(); // Commented out to prevent clearing portfolio
    loadTestimonials();

    // Add CSS for additional effects
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-tags {
            display: flex;
            gap: 0.5rem;
            margin: 1rem 0;
            flex-wrap: wrap;
        }

        .tag {
            background: rgba(102, 126, 234, 0.2);
            color: #667eea;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .portfolio-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .like-btn {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            padding: 0.5rem;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .like-btn:hover {
            transform: scale(1.1);
        }

        .like-btn.liked {
            background: #e53e3e;
            color: white;
        }

        .like-btn.liked i {
            color: white;
        }

        @keyframes floatHeart {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(1.5);
            }
        }

        .blog-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        }

        .blog-modal-content {
            background: white;
            border-radius: 16px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            margin: 2rem;
            animation: slideIn 0.3s ease-out;
        }

        .blog-modal-header {
            padding: 2rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .blog-modal-body {
            padding: 2rem;
        }

        .close-blog-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }

        .testimonial-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }

        .testimonial-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1rem;
            border: 3px solid #667eea;
        }

        .testimonial-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .rating {
            color: #ffd700;
            font-size: 1.2rem;
            margin: 0.25rem 0;
        }

        .position {
            color: #666;
            font-size: 0.9rem;
        }

        .testimonial-footer {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
        }

        .company {
            color: #667eea;
            font-weight: 600;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});

// Load portfolio items dynamically
function loadPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid && typeof portfolioItems !== 'undefined') {
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <button class="view-btn">View Details</button>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
}

// Load testimonials dynamically
function loadTestimonials() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && typeof testimonials !== 'undefined') {
        testimonialSlider.innerHTML = '';
        testimonials.forEach(testimonial => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.className = 'testimonial';
            testimonialDiv.innerHTML = `
                <p>"${testimonial.text}"</p>
                <span>- ${testimonial.author}</span>
            `;
            testimonialSlider.appendChild(testimonialDiv);
        });
    }
}

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    loadPortfolioItems();
    loadTestimonials();
});

// Advanced Chatbot with Real AI Integration
class Chatbot {
    constructor() {
        this.widget = document.getElementById('chatbot-widget');
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.close = document.getElementById('chatbot-close');
        this.messages = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-text');
        this.send = document.getElementById('chatbot-send');
        this.typingIndicator = null;
        this.conversationHistory = [];
        this.sessionId = this.generateSessionId();
        this.apiEndpoint = 'http://localhost:5000/api/chatbot/chat';
        this.isWaitingForResponse = false;
        this.init();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    init() {
        this.toggle.addEventListener('click', () => this.openChat());
        this.close.addEventListener('click', () => this.closeChat());
        this.send.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isWaitingForResponse) this.sendMessage();
        });
        
        // Disable send button while waiting
        this.input.addEventListener('keypress', (e) => {
            if (this.isWaitingForResponse && e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    openChat() {
        this.window.style.display = 'flex';
        this.toggle.style.display = 'none';
        this.input.focus();
        
        if (this.conversationHistory.length === 0) {
            const greeting = "Hi! Welcome to Web Sondrya. I'm your advanced AI assistant. I can help you with information about our digital services like Web Development, Design, Marketing, SEO, and more. What brings you here today?";
            this.addMessage(greeting, 'bot');
            this.conversationHistory.push({role: 'assistant', content: greeting});
        }
    }

    closeChat() {
        this.window.style.display = 'none';
        this.toggle.style.display = 'flex';
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isWaitingForResponse) return;

        this.addMessage(message, 'user');
        this.conversationHistory.push({role: 'user', content: message});
        this.input.value = '';
        this.send.disabled = true;
        this.isWaitingForResponse = true;

        this.showTypingIndicator();

        try {
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.conversationHistory.push({role: 'assistant', content: response});
        } catch (error) {
            console.error('Error generating response:', error);
            this.hideTypingIndicator();
            const errorMessage = "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment, or feel free to contact us directly through our contact page.";
            this.addMessage(errorMessage, 'bot');
        } finally {
            this.send.disabled = false;
            this.isWaitingForResponse = false;
            this.input.focus();
        }
    }

    async getAIResponse(message) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: this.sessionId
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.response || "I couldn't generate a response. Please try again.";
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to intelligent local response
            return this.generateLocalResponse(message);
        }
    }

    generateLocalResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Enhanced local response library
        const responseLibrary = {
            greeting: {
                keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'how are you'],
                responses: [
                    "Hello! I'm here to help. What would you like to know about Web Sondrya?",
                    "Hi! Welcome. How can I assist you with our services today?",
                    "Great to see you! Feel free to ask about our digital solutions."
                ]
            },
            pricing: {
                keywords: ['pricing', 'price', 'cost', 'how much', 'fee', 'rates', 'plans', 'budget'],
                responses: [
                    "We have three main pricing plans: Basic (₹5,000), Pro (₹15,000), and Enterprise (₹50,000). Which plan interests you?"
                ]
            },
            services: {
                keywords: ['services', 'what do you do', 'what do you offer', 'offerings', 'can you help'],
                responses: [
                    "We offer Web Development, Web Designing, Graphic Designing, Digital Marketing, Branding, SEO Services, and Social Media Management. What service interests you most?"
                ]
            },
            contact: {
                keywords: ['contact', 'get started', 'quote', 'hire', 'work with', 'proposal', 'meeting'],
                responses: [
                    "Excellent! You can reach us through our contact page on the website. We respond within 24 hours with customized quotes and proposals."
                ]
            },
            portfolio: {
                keywords: ['portfolio', 'work', 'projects', 'examples', 'case studies', 'showcase'],
                responses: [
                    "Check out our portfolio section to see examples of our recent projects and client successes!"
                ]
            }
        };

        // Find matching response
        for (const [key, category] of Object.entries(responseLibrary)) {
            for (const keyword of category.keywords) {
                if (lowerMessage.includes(keyword)) {
                    return category.responses[Math.floor(Math.random() * category.responses.length)];
                }
            }
        }

        // Default response
        return "That's a great question! To give you the best answer, could you provide more details about what you're looking for? I'm here to help with all aspects of digital services.";
    }

    showTypingIndicator() {
        this.typingIndicator = document.createElement('div');
        this.typingIndicator.className = 'message bot-message typing';
        this.typingIndicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.messages.appendChild(this.typingIndicator);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.remove();
            this.typingIndicator = null;
        }
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        // Enhanced message rendering with better formatting
        const sanitizedText = this.sanitizeText(text);
        messageDiv.innerHTML = `<p>${sanitizedText}</p>`;
        
        this.messages.appendChild(messageDiv);
        
        // Smooth scroll to latest message
        setTimeout(() => {
            this.messages.scrollTop = this.messages.scrollHeight;
        }, 100);
    }

    sanitizeText(text) {
        // Prevent XSS attacks
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Chatbot();
});