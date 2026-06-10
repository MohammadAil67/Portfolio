document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('main-nav');
    const logoLink = document.getElementById('header-logo');

    // Section transition duration (matches CSS timing)
    const transitionSpeedMs = 200;

    // Active Section state tracking
    let isTransitioning = false;

    // 1. NAVIGATION TAB ROUTING (FADE OUT -> SWITCH -> FADE IN)
    function switchTab(targetId) {
        const targetSection = document.getElementById(targetId);
        const activeSection = document.querySelector('.page-section.active');
        
        if (!targetSection || isTransitioning) return;
        if (activeSection && activeSection.id === targetId) return;

        isTransitioning = true;

        // Close mobile menu if open
        navMenu.classList.remove('mobile-open');
        mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        // Update active class in navigation links
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        if (activeSection) {
            // Fade out the current active section
            activeSection.style.opacity = '0';
            activeSection.style.transform = 'translateY(-10px)';
            activeSection.style.transition = `opacity ${transitionSpeedMs}ms ease, transform ${transitionSpeedMs}ms ease`;

            setTimeout(() => {
                // Hide old section and reset styles
                activeSection.classList.remove('active');
                activeSection.style.opacity = '';
                activeSection.style.transform = '';
                activeSection.style.transition = '';

                // Show and fade in the new section
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'instant' });
                isTransitioning = false;
            }, transitionSpeedMs);
        } else {
            // If no section was active, show the target immediately
            targetSection.classList.add('active');
            isTransitioning = false;
        }
    }

    // Handle Nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (window.location.hash !== `#${targetId}`) {
                window.location.hash = targetId;
            } else {
                switchTab(targetId);
            }
        });
    });

    // Handle logo click
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'about';
    });

    // Handle Hash Change (Browser Back / Forward / Direct Links)
    function handleHashChange() {
        const hash = window.location.hash.substring(1) || 'about';
        switchTab(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    // Initialize tab from current hash
    handleHashChange();


    // 2. MOBILE RESPONSIVE HAMBURGER MENU
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('mobile-open');
        if (isOpen) {
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('mobile-open');
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });


    // 3. ROBUST IMAGE LOAD FAILURE FALLBACK PLACEHOLDERS
    const fallbackData = {
        'img-botani-nav': { icon: 'fa-map-location-dot', label: 'BotaniNav System Map' },
        'img-datamend': { icon: 'fa-chart-pie', label: 'Datamend Analytics Dashboard' },
        'img-campaign-clickr': { icon: 'fa-diagram-project', label: 'CampaignClickR Automation Flow' },
        'img-bookrag': { icon: 'fa-book-open-reader', label: 'BookRAG Chat Interface' },
        'img-junction-photo': { icon: 'fa-trophy', label: 'Junction Hackathon Experience' }
    };

    function replaceImageWithPlaceholder(imgEl) {
        const id = imgEl.id;
        const info = fallbackData[id] || { icon: 'fa-briefcase', label: 'Portfolio Asset' };
        
        // Create CSS glassmorphic fallback container
        const fallbackContainer = document.createElement('div');
        fallbackContainer.className = 'project-fallback';
        fallbackContainer.innerHTML = `
            <i class="fa-solid ${info.icon}"></i>
            <span>${info.label}</span>
            <small style="color: var(--text-light); font-size:11px;">Image asset unavailable</small>
        `;
        
        // Replace image element in parent
        const parent = imgEl.parentNode;
        if (parent) {
            parent.innerHTML = '';
            parent.appendChild(fallbackContainer);
        }
    }

    // Bind error handler to existing images
    document.querySelectorAll('img').forEach(img => {
        // If image is already broken (cached error)
        if (img.naturalWidth === 0) {
            replaceImageWithPlaceholder(img);
        }
        
        // Otherwise, bind to error event
        img.addEventListener('error', () => {
            replaceImageWithPlaceholder(img);
        });
    });
});
