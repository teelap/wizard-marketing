
document.addEventListener('DOMContentLoaded', () => {

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
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Confirm JS animations are functional before hiding elements
        document.body.classList.add('js-ready');

        // — V6: Graffico Hero Animations —
        const tlHero = gsap.timeline();
        
        // Staggered reveal of massive text and footer using from() for stability
        tlHero.from('.massive-title .word1', { opacity: 0, x: -100, duration: 1.2, ease: 'power3.out' }, "+=0.2")
              .from('.massive-title .word2', { opacity: 0, x: 100, duration: 1.2, ease: 'power3.out' }, "-=0.8")
              .from('.hero-footer', { opacity: 0, y: 30, duration: 1, ease: 'power2.out' }, "-=0.5")
              .from('.floating-artifact', { opacity: 0, y: 50, duration: 2, ease: 'power2.out', stagger: 0.2 }, "-=1");

        // Parallax effects on scroll
        gsap.to('.massive-title', {
            y: 200, opacity: 0,
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
        });
        
        gsap.to('.a1', { y: -150, rotation: 10, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.a2', { y: -250, rotation: -15, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 } });
        gsap.to('.a3', { y: -100, x: 50, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 2 } });
        gsap.to('.a4', { y: -300, rotation: -20, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.2 } });

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
                onStart: () => el.classList.add('active')
            });
        });
    } else {
        // Fallback – plain intersection observer (no js-ready class added, so content stays visible)
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
