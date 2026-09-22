/* ==========================================================================
   INTERACTIVE SCRIPTS - LARISSA SALMAZO | LSS CLÍNICA PSICÓLOGICA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // 4. Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. Lightbox Modal Functionality
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-src') || item.querySelector('img').src;
        const title = item.getAttribute('data-title') || '';
        const desc = item.getAttribute('data-desc') || '';

        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 6. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Stat Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animatedStats = false;

  const animateStats = () => {
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos && !animatedStats) {
      animatedStats = true;

      statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const prefix = counter.textContent.includes('+') ? '+' : '';
        const suffix = counter.textContent.includes('k') ? 'k' : (counter.textContent.includes('x') ? 'x' : '');
        
        let count = 0;
        const speed = target > 100 ? 50 : 150;
        const increment = Math.ceil(target / (1000 / speed));

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.textContent = `${prefix}${count}${suffix}`;
            setTimeout(updateCount, speed);
          } else {
            counter.textContent = `${prefix}${target}${suffix}`;
          }
        };

        updateCount();
      });
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run once in case it's in view initially
});
