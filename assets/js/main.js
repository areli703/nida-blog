document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.9)';
      navbar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.7)';
      navbar.style.borderColor = 'rgba(255, 255, 255, 0.06)';
    }
    
    lastScroll = currentScroll;
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate post cards
  const cards = document.querySelectorAll('.post-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate post rows
  const rows = document.querySelectorAll('.post-row');
  rows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    row.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
    observer.observe(row);
  });

  // Animate section headers
  const sectionHeaders = document.querySelectorAll('.section-header, .cta-container');
  sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(header);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Post card hover glow effect
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const bg = card.querySelector('.post-card-bg');
      if (bg) {
        bg.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const bg = card.querySelector('.post-card-bg');
      if (bg) {
        bg.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.04))';
      }
    });
  });

  // Post card click — whole card navigates
  document.querySelectorAll('.post-card[data-url]').forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking an actual link inside the card
      if (e.target.closest('a')) return;
      window.location.href = this.dataset.url;
    });
  });

  // Post row click — whole row navigates
  document.querySelectorAll('.post-row[data-url]').forEach(row => {
    row.addEventListener('click', function(e) {
      if (e.target.closest('a')) return;
      window.location.href = this.dataset.url;
    });
  });
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroBg = hero.querySelector('.hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }
});
