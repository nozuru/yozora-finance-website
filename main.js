(function () {
    'use strict';

    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const headerOffset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
        10
    ) || 76;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    function closeMobileMenu() {
        if (!mobileMenuBtn) return;
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.08 });

    const REVEAL_BLOCKS = [
        '.section-header', '.about-content', '.tech-intro', '.tech-highlights',
        '.table-wrap', '.method-grid', '.tech-notes', '.product-block',
        '.news-item', '.writing-card', '.writing-lead', '.writing-more',
        '.company-table', '.contact-content', '.stats-grid', '.stats-note',
    ].join(', ');

    const STAGGER_ITEMS = '.feature-item, .tech-highlight, .stat';

    function observeReveal(el, delay) {
        el.classList.add('fade-in-section');
        if (delay) el.style.transitionDelay = delay;
        revealObserver.observe(el);
    }

    document.querySelectorAll(REVEAL_BLOCKS).forEach(el => observeReveal(el));
    document.querySelectorAll(STAGGER_ITEMS).forEach((el, i) => {
        observeReveal(el, `${(i % 6) * 0.06}s`);
    });
})();
