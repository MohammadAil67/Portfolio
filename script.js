// script.js - Handles navigation, section transitions, and animations

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a[data-target]');
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('header');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('main-nav');

  // Helper to remove active states
  const clearActive = () => {
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));
  };

  // Fade-in animation helper
  const fadeIn = (element) => {
    element.style.opacity = '0';
    element.style.display = 'block';
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.6s ease-out';
      element.style.opacity = '1';
    });
  };

  // Click handler for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      clearActive();
      link.classList.add('active');
      // Hide all sections instantly
      sections.forEach(sec => sec.style.display = 'none');
      // Fade in the target section
      fadeIn(targetSection);
      targetSection.classList.add('active');

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    });
  });

  // Ensure the first section is visible on load
  if (sections.length) {
    const first = sections[0];
    first.style.display = 'block';
    first.classList.add('active');
    const firstLink = document.querySelector(`nav a[data-target="${first.id}"]`);
    if (firstLink) firstLink.classList.add('active');
  }

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
  }

  // Optional: sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});
