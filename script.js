
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. FOOTER YEAR (replaces inline document.write)
    ========================================================= */
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    /* =========================================================
       2. MOBILE MENU
    ========================================================= */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks   = document.querySelector('.nav-links');
    const setMenuOpen = (open) => {
        navLinks.classList.toggle('active', open);
        mobileMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        // Swap the hamburger for an X so the open/close state is obvious.
        const icon = mobileMenu.querySelector('i');
        if (icon) { icon.classList.toggle('fa-bars', !open); icon.classList.toggle('fa-xmark', open); }
        // Never leave the bar hidden while its menu is open.
        if (open) document.getElementById('navbar')?.classList.remove('nav-hidden');
    };
    mobileMenu.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('active')));
    document.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => setMenuOpen(false))
    );

    /* =========================================================
       2.5 IN-PAGE FORM SUBMISSION (Formspree with AJAX)
    ========================================================= */
    document.querySelectorAll('form[action*="formspree.io"]').forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalLabel = submitBtn.textContent;
            const formType = form.querySelector('input[name="_form_type"]')?.value || 'contact';

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sealing the scroll\u2026';
            form.querySelector('.form-error')?.remove();

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    renderFormSuccess(form, formType);
                } else {
                    renderFormError(form, submitBtn, originalLabel);
                }
            } catch (err) {
                renderFormError(form, submitBtn, originalLabel);
            }
        });
    });

    function renderFormSuccess(form, formType) {
        const host = form.parentElement;
        const isDominoes = formType === 'eight_dominoes';

        const success = document.createElement('div');
        success.className = 'form-success' + (isDominoes ? '' : ' form-success-dark');
        success.setAttribute('role', 'status');
        success.setAttribute('aria-live', 'polite');

        if (isDominoes) {
            success.innerHTML = `
                <h3 class="form-success-title">You're on the list.</h3>
                <p class="form-success-body">The first domino falls when the book ships. Check your inbox to confirm your email.</p>
                <p class="form-success-secondary">In the meantime, follow Jake on <a href="https://www.tiktok.com/@itsjakethewizard" target="_blank" rel="noopener">TikTok</a> or <a href="https://www.linkedin.com/in/jacob-tlapek-10b55962/" target="_blank" rel="noopener">LinkedIn</a>.</p>
            `;
        } else {
            success.innerHTML = `
                <h3 class="form-success-title">Message received.</h3>
                <p class="form-success-body">Jake personally reads every one. Expect a reply within 48 hours.</p>
            `;
        }

        form.replaceWith(success);
        host.querySelector('.fine-print')?.remove();
        host.querySelector('.contact-sla')?.remove();
        success.focus?.();
    }

    function renderFormError(form, btn, originalLabel) {
        btn.disabled = false;
        btn.textContent = originalLabel;
        const err = document.createElement('p');
        err.className = 'form-error';
        err.setAttribute('role', 'alert');
        err.textContent = 'The owl got lost on the way. Give it another try in a moment.';
        form.appendChild(err);
    }

    /* =========================================================
       3. NAVBAR SCROLL BEHAVIOUR (class toggle, rAF throttled)
    ========================================================= */
    const navbar = document.getElementById('navbar');
    let navTicking = false;
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (navTicking) return;
        navTicking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            navbar.classList.toggle('scrolled', y > 50);
            // Slide the pill away on scroll-down so it never covers content;
            // bring it back the moment the visitor scrolls up. Disabled while
            // the mobile menu is open.
            if (!navLinks.classList.contains('active')) {
                if (y > lastScrollY && y > 220) {
                    navbar.classList.add('nav-hidden');
                } else if (y < lastScrollY) {
                    navbar.classList.remove('nav-hidden');
                }
            }
            lastScrollY = y;
            navTicking = false;
        });
    }, { passive: true });

    /* =========================================================
       4. GSAP ANIMATIONS (gated by prefers-reduced-motion)
    ========================================================= */
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Confirm JS animations are functional before hiding elements
        document.body.classList.add('js-ready');

        // — Homepage hero is now the interactive Lo-Fi scene (see scene.js).
        //   The old giant-typography hero + floating-artifact parallax was
        //   removed in the main-menu pivot; its animations lived here. —

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
        gsap.utils.toArray('.featured-card, .timeline-item, .domino').forEach((el, i) => {
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

});
