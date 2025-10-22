// Scroll Progress Bar
window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content, .skills-section');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Skills progress bar animation
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 200);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        });
        skillsObserver.observe(skillsSection);
    }

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories && cardCategories.includes(filterValue)) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Typing effect for hero subtitle
    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const words = ['Developer', 'Programmer', 'Problem Solver', 'Tech Enthusiast'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeEffect, 1000);
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        statsObserver.observe(statsSection);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Project card hover effects (reuse existing projectCards variable)
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animate-in');
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Cursor Trail Effect
    const cursorTrail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorTrail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursorTrail.style.opacity = '0';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Enhanced scroll animations for new sections
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        enhancedObserver.observe(el);
    });

    // Parallax effect for particles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });


    // Initialize all interactive features
    initializeInteractiveFeatures();
});


function initializeInteractiveFeatures() {
    // Konami Code Easter Egg
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showKonamiModal();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function showKonamiModal() {
        const modal = document.getElementById('konami-modal');
        modal.classList.remove('hidden');
    }

    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelector('.theme-options');
    const themeButtons = document.querySelectorAll('.theme-option');

    themeToggle.addEventListener('click', function() {
        themeOptions.classList.toggle('hidden');
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            switchTheme(theme);
            themeOptions.classList.add('hidden');
        });
    });

    function switchTheme(theme) {
        document.body.className = '';
        if (theme !== 'default') {
            document.body.classList.add(theme + '-theme');
        }
        
        // Update active theme option
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            }
        });
        
        // Update current theme display
        const themeDisplay = document.querySelector('.current-theme-display');
        if (themeDisplay) {
            themeDisplay.textContent = `Current: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
        }
        
        // Save theme preference
        localStorage.setItem('portfolio-theme', theme);
        
        // Add visual feedback
        showNotification(`Switched to ${theme} theme! ✨`);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && savedTheme !== 'default') {
        document.body.classList.add(savedTheme + '-theme');
    }

    // Enhanced Cursor Effects
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursorOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = outlineX - 15 + 'px';
        cursorOutline.style.top = outlineY - 15 + 'px';
        
        requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline();

    // Cursor effects on hover
    const interactiveElements = document.querySelectorAll('button, a, .interactive-text');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });

    // Floating Action Buttons - New Modal Functions
    const calculatorBtn = document.getElementById('calculator-btn');
    const gameBtn = document.getElementById('game-btn');
    const notesBtn = document.getElementById('notes-btn');

    // Modal functionality will be handled by onclick attributes in HTML

    function triggerSurprise() {
        const surprises = [
            () => {
                document.body.style.transform = 'rotate(360deg)';
                document.body.style.transition = 'transform 2s ease';
                setTimeout(() => {
                    document.body.style.transform = 'rotate(0deg)';
                    setTimeout(() => document.body.style.transition = '', 100);
                }, 2000);
                showNotification('Wheeee! 🎢');
            },
            () => {
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
                let colorIndex = 0;
                const interval = setInterval(() => {
                    document.body.style.filter = `hue-rotate(${colorIndex * 60}deg)`;
                    colorIndex++;
                    if (colorIndex > 6) {
                        clearInterval(interval);
                        document.body.style.filter = '';
                    }
                }, 200);
                showNotification('Rainbow mode activated! 🌈');
            },
            () => {
                const elements = document.querySelectorAll('*');
                elements.forEach(el => {
                    el.style.animation = 'bounce 1s ease';
                });
                setTimeout(() => {
                    elements.forEach(el => el.style.animation = '');
                }, 1000);
                showNotification('Bounce party! 🎉');
            }
        ];
        
        const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
        randomSurprise();
    }

    function triggerConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#a55eea'];
        const confettiContainer = document.getElementById('confetti-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
        
        showNotification('Celebration time! 🎊');
    }

    let musicPlaying = false;
    function toggleMusic() {
        if (!musicPlaying) {
            // Create a simple audio context for background music simulation
            showNotification('🎵 Background music would play here! (Audio not implemented)');
            musicBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #4ecdc4)';
            musicPlaying = true;
        } else {
            showNotification('🔇 Music paused');
            musicBtn.style.background = 'linear-gradient(135deg, #a8edea, #fed6e3)';
            musicPlaying = false;
        }
    }

    // Interactive Tooltips
    const tooltip = document.getElementById('interactive-tooltip');
    const interactiveTexts = document.querySelectorAll('.interactive-text');

    interactiveTexts.forEach(text => {
        text.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.classList.remove('hidden');
            updateTooltipPosition(e);
        });

        text.addEventListener('mousemove', updateTooltipPosition);

        text.addEventListener('mouseleave', function() {
            tooltip.classList.add('hidden');
        });

        text.addEventListener('click', function() {
            const funFacts = [
                "Did you know? I debug code in my dreams! 💭",
                "Fun fact: My favorite debugging tool is console.log()! 🔍",
                "Secret: I talk to my code when it's not working! 🗣️",
                "True story: I once spent 3 hours debugging a missing semicolon! 😅",
                "Confession: I have more programming books than novels! 📚"
            ];
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            showNotification(randomFact);
        });
    });

    function updateTooltipPosition(e) {
        tooltip.style.left = e.clientX + 10 + 'px';
        tooltip.style.top = e.clientY - 40 + 'px';
    }

    // Notification System
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Add notification animations to CSS
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(notificationStyle);

    // Double-click anywhere for secret message
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            showNotification("You're a persistent clicker! 🖱️✨");
            clickCount = 0;
        }
        setTimeout(() => clickCount = 0, 2000);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            triggerConfetti();
        }
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            triggerSurprise();
            showNotification('Ctrl+S for surprise! 🎁');
        }
    });
}

// Global function for modal close
function closeModal(modalId) {
    if (modalId) {
        document.getElementById(modalId).style.display = 'none';
    } else {
        document.getElementById('konami-modal').classList.add('hidden');
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    if (modalId === 'gameModal') {
        initGame();
    }
    if (modalId === 'notesModal') {
        loadNotes();
    }
}

// Calculator Functions
let calcDisplay = '';

function appendToCalc(value) {
    calcDisplay += value;
    document.getElementById('calcDisplay').value = calcDisplay;
}

function clearCalc() {
    calcDisplay = '';
    document.getElementById('calcDisplay').value = '';
}

function deleteLast() {
    calcDisplay = calcDisplay.slice(0, -1);
    document.getElementById('calcDisplay').value = calcDisplay;
}

function calculateResult() {
    try {
        const result = eval(calcDisplay.replace('×', '*'));
        document.getElementById('calcDisplay').value = result;
        calcDisplay = result.toString();
    } catch (error) {
        document.getElementById('calcDisplay').value = 'Error';
        calcDisplay = '';
    }
}

// Memory Game Functions
let gameBoard = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let gameTimer = 0;
let timerInterval;

const gameSymbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎵'];

function initGame() {
    resetGameState();
    createGameBoard();
    startTimer();
}

function resetGameState() {
    gameBoard = [];
    flippedCards = [];
    moves = 0;
    matches = 0;
    gameTimer = 0;
    updateStats();
    if (timerInterval) clearInterval(timerInterval);
}

function createGameBoard() {
    const symbols = [...gameSymbols, ...gameSymbols];
    symbols.sort(() => Math.random() - 0.5);
    
    const boardElement = document.getElementById('gameBoard');
    boardElement.innerHTML = '';
    
    symbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = '?';
        card.addEventListener('click', flipCard);
        boardElement.appendChild(card);
        gameBoard.push(card);
    });
}

function flipCard(e) {
    const card = e.target;
    
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
        return;
    }
    
    card.classList.add('flipped');
    card.innerHTML = card.dataset.symbol;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        
        if (matches === 8) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`Congratulations! You won in ${moves} moves and ${formatTime(gameTimer)}!`), 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '?';
        card2.innerHTML = '?';
    }
    
    flippedCards = [];
    updateStats();
}

function resetGame() {
    resetGameState();
    createGameBoard();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        gameTimer++;
        updateStats();
    }, 1000);
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matches;
    document.getElementById('timer').textContent = formatTime(gameTimer);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Notes Functions
function saveNotes() {
    const notes = document.getElementById('notesArea').value;
    localStorage.setItem('portfolioNotes', notes);
    alert('Notes saved successfully!');
}

function loadNotes() {
    const savedNotes = localStorage.getItem('portfolioNotes') || '';
    document.getElementById('notesArea').value = savedNotes;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Enhanced Theme Switcher Functions
let autoThemeEnabled = false;
let autoThemeInterval;
let previewTheme = null;

function randomTheme() {
    const themes = ['default', 'dark', 'neon', 'ocean', 'sunset', 'forest', 'royal', 'cyberpunk'];
    const currentTheme = localStorage.getItem('portfolio-theme') || 'default';
    let randomTheme;
    
    do {
        randomTheme = themes[Math.floor(Math.random() * themes.length)];
    } while (randomTheme === currentTheme);
    
    switchTheme(randomTheme);
    showNotification(`🎲 Random theme: ${randomTheme}!`);
}

function toggleAutoTheme() {
    const autoBtn = document.querySelector('.auto-theme-btn');
    
    if (!autoThemeEnabled) {
        autoThemeEnabled = true;
        autoBtn.classList.add('active');
        autoBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Auto';
        
        autoThemeInterval = setInterval(() => {
            randomTheme();
        }, 10000); // Change theme every 10 seconds
        
        showNotification('🔄 Auto theme switching enabled!');
    } else {
        autoThemeEnabled = false;
        autoBtn.classList.remove('active');
        autoBtn.innerHTML = '<i class="fas fa-clock"></i> Auto Switch';
        
        if (autoThemeInterval) {
            clearInterval(autoThemeInterval);
        }
        
        showNotification('⏹️ Auto theme switching disabled');
    }
}

function previewThemeOnHover(theme) {
    if (!autoThemeEnabled) {
        previewTheme = theme;
        document.body.style.filter = 'brightness(0.8)';
        setTimeout(() => {
            if (previewTheme === theme) {
                switchTheme(theme);
                document.body.style.filter = '';
            }
        }, 1000);
    }
}

function applyPreviewTheme() {
    if (previewTheme) {
        switchTheme(previewTheme);
        closeThemePreview();
    }
}

function closeThemePreview() {
    document.getElementById('theme-preview-overlay').classList.add('hidden');
    document.body.style.filter = '';
    previewTheme = null;
}

// Add theme option hover effects
document.addEventListener('DOMContentLoaded', function() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            const theme = this.getAttribute('data-theme');
            const preview = this.getAttribute('data-preview');
            
            // Add subtle preview effect
            this.style.transform = 'translateY(-5px) scale(1.05)';
            
            // Show theme colors in a tooltip-like effect
            const tooltip = document.createElement('div');
            tooltip.className = 'theme-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                background: ${preview};
                padding: 0.5rem 1rem;
                border-radius: 20px;
                color: white;
                font-size: 0.8rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
            `;
            tooltip.textContent = `Preview ${theme}`;
            this.appendChild(tooltip);
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const tooltip = this.querySelector('.theme-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Initialize current theme display
    const currentTheme = localStorage.getItem('portfolio-theme') || 'default';
    const themeDisplay = document.querySelector('.current-theme-display');
    if (themeDisplay) {
        themeDisplay.textContent = `Current: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`;
    }
    
    // Mark current theme as active
    document.querySelectorAll('.theme-option').forEach(option => {
        if (option.getAttribute('data-theme') === currentTheme) {
            option.classList.add('active');
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .nav-link.active {
        color: #3498db;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);
