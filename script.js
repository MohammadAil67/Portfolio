/* ==========================================================================
   MOHAMMAD ALI MAHDI - PORTFOLIO JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. HERO SECTION TYPING ANIMATION
     ------------------------------------------------------------------------ */
  const typingText = document.getElementById('typing-text');
  const phrases = [
    'Software Developer',
    'B.Sc. @ University of Oulu',
    'Flutter & Python Specialist',
    'AI Integrations Enthusiast'
  ];
  
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Remove character
      typingText.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50; // Erase faster
    } else {
      // Add character
      typingText.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 120; // Normal typing speed
    }

    // Handle phrase end / transitions
    if (!isDeleting && characterIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full phrase
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Init typing effect if the container exists
  if (typingText) {
    typeEffect();
  }


  /* ------------------------------------------------------------------------
     2. NAVIGATION & HEADER EFFECTS ON SCROLL
     ------------------------------------------------------------------------ */
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* ------------------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      observer.observe(section);
    }
  });


  /* ------------------------------------------------------------------------
     4. MOBILE HAMBURGER MENU DRAWER
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinksList = document.getElementById('nav-links');

  if (hamburgerBtn && navLinksList) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksList.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
      });
    });

    // Close menu when clicking anywhere else outside the menu
    document.addEventListener('click', (e) => {
      if (navLinksList.classList.contains('open') && !navLinksList.contains(e.target) && e.target !== hamburgerBtn) {
        navLinksList.classList.remove('open');
      }
    });
  }


  /* ------------------------------------------------------------------------
     5. CONTACT FORM INTERCEPT & TOAST NOTIFICATION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('toast');

  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data (could be forwarded to an API later, e.g. Formspree / Vercel Serverless Function)
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      console.log('Form submission received:', formData);

      // Trigger Toast notification
      toast.classList.add('show');

      // Clear Form Fields
      contactForm.reset();

      // Dismiss Toast after 3.5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    });
  }

});
