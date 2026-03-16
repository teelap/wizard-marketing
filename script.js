
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. LENIS SMOOTH SCROLLING
    ========================================================= */
    let lenis;
    try {
        if (typeof Lenis !== 'undefined') {
            lenis = new Lenis({ lerp: 0.08, duration: 1.4 });
            lenis.on('scroll', () => {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
            });
            const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
        }
    } catch (e) {
        console.warn("Lenis failed to initialize:", e);
    }

    /* =========================================================
       2. MOBILE MENU
    ========================================================= */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks   = document.querySelector('.nav-links');
    mobileMenu.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => navLinks.classList.remove('active'))
    );

    /* =========================================================
       3. NAVBAR SCROLL BEHAVIOUR
    ========================================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        navbar.style.background = scrolled ? 'rgba(244, 237, 216, 0.97)' : 'transparent';
        navbar.style.boxShadow  = scrolled ? '0 2px 20px rgba(44, 30, 22, 0.12)' : 'none';
        navbar.style.backdropFilter = scrolled ? 'blur(12px)' : 'none';
    }, { passive: true });

    /* =========================================================
       4. GSAP ANIMATIONS
    ========================================================= */
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // — Initial state: Hide elements ONLY if GSAP is here to reveal them —
        gsap.set(['.jake-portrait', '.hero-content .subtitle', '.hero-content .title',
                   '.hero-content .tagline', '.hero-content .description', '.hero-content .cta-buttons',
                   '.hero-content .hero-secondary-link'], { opacity: 0, y: 40 });
        
        // Hide scroll-reveal elements manually via class to ensure fallback
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('js-hidden'));

        // — Hero staggered entrance —
        gsap.timeline({ delay: 0.3 })
            .to('.jake-portrait',              { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
            .to('.hero-content .subtitle',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
            .to('.hero-content .title',        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
            .to('.hero-content .tagline',      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
            .to('.hero-content .description',  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
            .to('.hero-content .cta-buttons',  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
            .to('.hero-content .hero-secondary-link', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

        // — Proof numbers count-up —
        document.querySelectorAll('.proof-number').forEach(el => {
            const rawText  = el.textContent.trim();
            // Match any float/int including decimals
            const numMatch = rawText.match(/[\d.]+/);
            if (!numMatch) return;
            
            const numStr    = numMatch[0];
            const num       = parseFloat(numStr);
            const isDecimal = numStr.includes('.');
            
            const prefix    = rawText.slice(0, rawText.indexOf(numStr));
            const suffix    = rawText.slice(rawText.indexOf(numStr) + numStr.length);
            
            const fmt = v => {
                if (isDecimal) return v.toFixed(1);
                return v >= 1000 ? Math.floor(v).toLocaleString() : Math.floor(v);
            };

            gsap.fromTo({ val: 0 }, { val: num }, {
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () { 
                    el.textContent = prefix + fmt(this.targets()[0].val) + suffix; 
                },
                scrollTrigger: { trigger: el, start: 'top 90%', once: true }
            });
        });

        // — Section title reveal —
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: title, start: 'top 85%', once: true }
            });
        });

        // — Staggered cards —
        gsap.utils.toArray('.spell-card, .featured-card, .timeline-item').forEach((el, i) => {
            gsap.from(el, {
                opacity: 0, y: 50, duration: 0.7, delay: (i % 4) * 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            });
        });

        // — Proof strip slide in —
        gsap.utils.toArray('.proof-item').forEach((el, i) => {
            gsap.from(el, {
                opacity: 0, y: 20, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: '.proof-strip', start: 'top 80%', once: true }
            });
        });

        // — Content grids — 
        gsap.utils.toArray('.content-grid > *').forEach((el, i) => {
            gsap.from(el, {
                opacity: 0, x: i % 2 === 0 ? -40 : 40, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        // — General reveal for everything else (Contact, etc) —
        gsap.utils.toArray('.scroll-reveal').forEach(el => {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                onStart: () => el.classList.remove('js-hidden')
            });
        });
    } else {
        // Fallback – plain intersection observer
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    entry.target.classList.remove('js-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
    }

    /* =========================================================
       5. WIZARDLY SPARKLE CURSOR
    ========================================================= */
    const cursor = document.createElement('div');
    cursor.id = 'magic-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    
    // Sparkle trail logic
    const createSparkle = (x, y) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const size = Math.random() * 8 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Random movement
        const destinationX = x + (Math.random() - 0.5) * 60;
        const destinationY = y + (Math.random() - 0.5) * 60;
        
        document.body.appendChild(sparkle);
        
        gsap.to(sparkle, {
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
            opacity: 0,
            scale: 0,
            rotation: Math.random() * 180,
            duration: 0.6 + Math.random() * 0.4,
            ease: 'power2.out',
            onComplete: () => sparkle.remove()
        });
    };

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; 
        mouseY = e.clientY;
        if (Math.random() > 0.6) createSparkle(mouseX, mouseY);
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const magneticTargets = document.querySelectorAll('a, button, .btn, .spell-card, .featured-card');
    magneticTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            for(let i=0; i<5; i++) createSparkle(mouseX, mouseY);
        });
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Hide on touch screens
    window.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }, { once: true });

    /* =========================================================
       6. PARTICLE CANVAS
    ========================================================= */
    const canvas = document.getElementById('starsCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function initCanvas() {
            width  = canvas.width  = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x     = Math.random() * width;
                this.y     = Math.random() * height;
                this.baseY = this.y;
                this.size  = Math.random() * 1.5 + 0.3;
                const colors = ['rgba(195,43,57,0.5)', 'rgba(44,30,22,0.3)', 'rgba(184,134,11,0.5)'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speed = Math.random() * 0.4 + 0.05;
                this.angle = Math.random() * Math.PI * 2;
                this.spin  = (Math.random() - 0.5) * 0.015;
            }
            update(scrollY) {
                this.angle += this.spin;
                this.x += Math.cos(this.angle) * 0.15;
                let ny = this.baseY - scrollY * this.speed;
                if (ny < -10) this.baseY += height + 20;
                else if (ny > height + 10) this.baseY -= height + 20;
                this.y = ny;
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle  = this.color;
                ctx.shadowBlur = this.size * 4;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.round(window.innerWidth / 7), 180);
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            const scrollY = window.scrollY;
            particles.forEach(p => { p.update(scrollY); p.draw(); });
            requestAnimationFrame(animate);
        }

        initCanvas();
        createParticles();
        animate();
        window.addEventListener('resize', () => { initCanvas(); createParticles(); }, { passive: true });
    }
});
