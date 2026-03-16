
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
            const numMatch = rawText.match(/[\d,]+/);
            if (!numMatch) return;
            const numStr   = numMatch[0].replace(/,/g, '');
            const num      = parseInt(numStr, 10);
            const prefix   = rawText.slice(0, rawText.indexOf(numMatch[0]));
            const suffix   = rawText.slice(rawText.indexOf(numMatch[0]) + numMatch[0].length);
            const fmt = v => v >= 1000 ? v.toLocaleString() : v;
            gsap.from({ val: 0 }, {
                val: num,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: function () { el.textContent = prefix + fmt(Math.round(this.targets()[0].val)) + suffix; },
                scrollTrigger: { trigger: el, start: 'top 80%', once: true }
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

        // — Wisdom quotes — 
        gsap.utils.toArray('.scroll-item').forEach(el => {
            gsap.from(el, {
                opacity: 0, scale: 0.96, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 82%', once: true }
            });
        });

        // — Lead Magnet — 
        gsap.from('.lead-magnet-section', {
            opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.lead-magnet-section', start: 'top 80%', once: true }
        });
    } else {
        // Fallback – plain intersection observer
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
    }

    /* =========================================================
       5. MAGNETIC CURSOR
    ========================================================= */
    const cursor     = document.createElement('div');
    cursor.id        = 'magic-cursor';
    const cursorDot  = document.createElement('div');
    cursorDot.id     = 'magic-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    });
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Expand on hover over links / buttons
    const magneticTargets = document.querySelectorAll('a, button, .btn, .spell-card, .featured-card');
    magneticTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
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
