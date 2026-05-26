/**
 * ELECTROVOX ENTERPRISES - PREMIUM FUTURISTIC CORPORATE SCRIPT
 * Author: Antigravity Web Design Agency
 * Description: Vanilla JS framework-free engine driving scroll reveals, active navbar,
 *              carousel slider, accordion, form validator, mouse parallax and counter engines.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. PRELOADER & INTRO ENTRANCE
     ========================================================================= */
  const preloader = document.getElementById('preloader');
  
  window.addEventListener('load', () => {
    // Wait an extra small buffer for full paint
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Trigger initial hero text animations after preloader fades
        setTimeout(() => {
          document.querySelectorAll('.hero .reveal, .hero .reveal-left, .hero .reveal-right').forEach(el => {
            el.classList.add('reveal-visible');
          });
        }, 300);
      }
    }, 600);
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    if (preloader && preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }
  }, 3000);


  /* =========================================================================
     2. STICKY NAVBAR & NAVIGATION TRACKING
     ========================================================================= */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.btn-back-to-top');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Sticky Nav shrink
    if (scrollPos > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollPos > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Section Link Highlighting
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset navbar height
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (targetLink) targetLink.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // Run on initial load to set states
  handleScroll();


  /* =========================================================================
     3. MOBILE BURGER HAMBURGER NAVIGATION DRAWER
     ========================================================================= */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
      
      // Accessibility update
      const isOpen = navToggle.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* =========================================================================
     4. HERO SECTION - MOUSE PARALLAX TILT EFFECTS
     ========================================================================= */
  const heroSection = document.getElementById('home');
  const heroCard = document.querySelector('.hero-card');
  const hudElements = document.querySelectorAll('.hud-element');

  if (heroSection && heroCard && window.innerWidth > 992) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (max 10 degrees)
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = -((y - centerY) / centerY) * 8;

      heroCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;

      // Dynamic parallax on HUD elements
      hudElements.forEach((hud, index) => {
        const factor = (index + 1) * 12;
        const transX = ((x - centerX) / centerX) * factor;
        const transY = ((y - centerY) / centerY) * factor;
        hud.style.transform = `translate(${transX}px, ${transY}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      // Smoothly reset positioning
      heroCard.style.transform = 'rotateY(-8deg) rotateX(10deg) scale(1)';
      hudElements.forEach(hud => {
        hud.style.transform = 'translate(0px, 0px)';
      });
    });
  }


  /* =========================================================================
     5. SCROLL REVEAL ENGINES (Intersection Observer)
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    // Skip hero elements so they animate independently on page load
    if (!el.closest('.hero')) {
      revealObserver.observe(el);
    }
  });


  /* =========================================================================
     6. PRODUCT & BRAND FILTERING SYSTEM
     ========================================================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-wrapper');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const productBrand = card.getAttribute('data-brand');
          
          if (filterValue === 'all' || productBrand === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9) translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }


  /* =========================================================================
     7. ANIMATED COUNTERS ENGINE
     ========================================================================= */
  const counterCards = document.querySelectorAll('.counter-card');
  let countersAnimated = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds animation
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / 60); // Increment speed
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = current + suffix;
      }
    }, 1000 / 60); // 60fps
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        document.querySelectorAll('.counter-number').forEach(count => countUp(count));
        countersAnimated = true;
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.3
  });

  const whySection = document.getElementById('why');
  if (whySection) {
    counterObserver.observe(whySection);
  }


  /* =========================================================================
     8. TESTIMONIAL CAROUSEL SLIDER
     ========================================================================= */
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let autoSlideInterval;

    // Create pagination dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    const updateSliderStates = () => {
      // Shift track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSliderStates();
      resetAutoPlay();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSliderStates();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSliderStates();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    // Touch events for mobile drag
    let startX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    });

    track.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const diffX = e.touches[0].clientX - startX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        isSwiping = false;
        resetAutoPlay();
      }
    });

    track.addEventListener('touchend', () => {
      isSwiping = false;
    });

    // Autoplay
    const startAutoPlay = () => {
      autoSlideInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoPlay = () => {
      clearInterval(autoSlideInterval);
      startAutoPlay();
    };

    startAutoPlay();
  }


  /* =========================================================================
     9. FAQ ACCORDION ENGINE
     ========================================================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
        otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      // Toggle current FAQ
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });


  /* =========================================================================
     10. CONTACT FORM VALIDATOR & TOAST SYSTEM
     ========================================================================= */
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input');

    const showError = (input, msg) => {
      input.classList.add('error');
      const errorMsgEl = input.closest('.form-group').querySelector('.error-msg');
      if (errorMsgEl) {
        errorMsgEl.textContent = msg;
        errorMsgEl.classList.add('visible');
      }
    };

    const clearError = (input) => {
      input.classList.remove('error');
      const errorMsgEl = input.closest('.form-group').querySelector('.error-msg');
      if (errorMsgEl) {
        errorMsgEl.classList.remove('visible');
      }
    };

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          clearError(input);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate inputs
      inputs.forEach(input => {
        const value = input.value.trim();
        const labelText = input.closest('.form-group').querySelector('.form-label').textContent;

        if (value === '') {
          showError(input, `${labelText} is required`);
          isValid = false;
        } else {
          clearError(input);
        }

        // Email validation specifically
        if (input.type === 'email' && value !== '') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            showError(input, 'Enter a valid email address');
            isValid = false;
          }
        }

        // Phone validation specifically
        if (input.type === 'tel' && value !== '') {
          const phonePattern = /^\+?[0-9\s\-]{10,14}$/;
          if (!phonePattern.test(value)) {
            showError(input, 'Enter a valid phone number');
            isValid = false;
          }
        }
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Futuristic Sending State
        submitBtn.innerHTML = 'Sending Connection Signal...';
        submitBtn.disabled = true;

        setTimeout(() => {
          // Reset form fields
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Display futuristic floating Toast
          if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
              toast.classList.remove('show');
            }, 5000);
          }
        }, 1500);
      }
    });
  }


  /* =========================================================================
     11. BACK TO TOP TRIGGER
     ========================================================================= */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
