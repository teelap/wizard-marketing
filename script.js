document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(244, 237, 216, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(44, 30, 22, 0.15)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Magic Particle Background (Canvas)
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.1;
            // Mystical parchment embers and ink dust
            const colors = [
                'rgba(139, 0, 0, 0.6)', // Wax red
                'rgba(44, 30, 22, 0.4)', // Ink dark
                'rgba(184, 134, 11, 0.6)' // Gold accent
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Movement speed based on scroll
            this.baseY = this.y;
            this.speed = Math.random() * 0.5 + 0.1;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() - 0.5) * 0.02;
        }

        update(scrollY) {
            // Apply slight waving motion and upward drift
            this.angle += this.spin;
            this.x += Math.cos(this.angle) * 0.2;
            
            // Parallax scroll effect
            let newY = this.baseY - (scrollY * this.speed);
            
            // Wrap around screen
            if (newY < -10) {
                this.baseY += height + 20;
            } else if (newY > height + 10) {
                this.baseY -= height + 20;
            }
            
            this.y = newY;
            
            // Re-wrap X
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.size * 3;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(window.innerWidth / 5, 200); // Responsive amount
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const scrollY = window.scrollY;
        
        particles.forEach(particle => {
            particle.update(scrollY);
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }

    // Initialize
    initCanvas();
    createParticles();
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        initCanvas();
        createParticles();
    });
});
