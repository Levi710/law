/* ============================================================
   SAMATVA NYAYA — Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header Scroll Effect ---
  const header = document.querySelector('.header');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // --- Active Nav Link ---
  const navLinks = document.querySelectorAll('.header-nav a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Mobile Menu ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.header-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      if (mobileOverlay) mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close menu on nav link click (mobile)
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Auto-select Inquiry Area from URL query params (e.g. ?service=contracts-documentation) ---
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const inquirySelect = document.getElementById('inquiry-area');
    if (inquirySelect) {
      const targetOption = Array.from(inquirySelect.options).find(opt => opt.value === serviceParam);
      if (targetOption) {
        inquirySelect.value = serviceParam;
      }
    }
  }

  // --- Active Nav Pill highlighting for Services Hub ---
  const servicePills = document.querySelectorAll('.service-nav-pill');
  if (servicePills.length > 0) {
    const dropdownLabel = document.querySelector('.service-nav-dropdown .trigger-label');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    const catSections = document.querySelectorAll('.service-cat-section');
    const catObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          servicePills.forEach(pill => {
            if (pill.getAttribute('href') === `#${id}`) {
              pill.classList.add('active');
              if (dropdownLabel && pill.closest('.service-nav-dropdown')) {
                dropdownLabel.textContent = pill.textContent.trim();
              }
            } else {
              pill.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    catSections.forEach(sec => catObserver.observe(sec));
  }

  // --- Service Nav Dropdown (mobile) ---
  const serviceDropdown = document.querySelector('.service-nav-dropdown');
  if (serviceDropdown) {
    const trigger = serviceDropdown.querySelector('.dropdown-trigger');
    const label = trigger ? trigger.querySelector('.trigger-label') : null;
    const pills = serviceDropdown.querySelectorAll('.service-nav-pill');
    const desktopPills = document.querySelectorAll('.service-nav-bar .service-nav-pill');

    const toggleServiceDropdown = (openState) => {
      const isOpen = openState !== undefined ? openState : !serviceDropdown.classList.contains('open');
      serviceDropdown.classList.toggle('open', isOpen);
      if (trigger) trigger.setAttribute('aria-expanded', String(isOpen));
    };

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleServiceDropdown();
    });

    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const text = pill.textContent.trim();
        if (label) label.textContent = text;

        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Sync with desktop pills
        desktopPills.forEach(dp => {
          if (dp.getAttribute('href') === pill.getAttribute('href')) {
            dp.classList.add('active');
          } else {
            dp.classList.remove('active');
          }
        });

        const targetId = pill.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        toggleServiceDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!serviceDropdown.contains(e.target)) {
        toggleServiceDropdown(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && serviceDropdown.classList.contains('open')) {
        toggleServiceDropdown(false);
        trigger?.focus();
      }
    });
  }

  // --- Insights Filter Dropdown (mobile) ---
  const insightsDropdown = document.querySelector('.insights-filter-dropdown');
  if (insightsDropdown) {
    const trigger = insightsDropdown.querySelector('.dropdown-trigger');
    const label = trigger ? trigger.querySelector('.trigger-label') : null;
    const tags = insightsDropdown.querySelectorAll('.filter-tag');

    const toggleInsightsDropdown = (openState) => {
      const isOpen = openState !== undefined ? openState : !insightsDropdown.classList.contains('open');
      insightsDropdown.classList.toggle('open', isOpen);
      if (trigger) trigger.setAttribute('aria-expanded', String(isOpen));
    };

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleInsightsDropdown();
    });

    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        const text = tag.textContent.trim();
        if (label) label.textContent = text;

        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        // Sync with desktop filter tags
        const filterVal = tag.getAttribute('data-filter');
        document.querySelectorAll('.insight-filter-tags .filter-tag').forEach(dt => {
          if (dt.getAttribute('data-filter') === filterVal) {
            dt.style.background = 'var(--navy)';
            dt.style.color = 'var(--white)';
          } else {
            dt.style.background = 'transparent';
            dt.style.color = 'var(--navy-support)';
          }
        });

        toggleInsightsDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!insightsDropdown.contains(e.target)) {
        toggleInsightsDropdown(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && insightsDropdown.classList.contains('open')) {
        toggleInsightsDropdown(false);
        trigger?.focus();
      }
    });
  }

  const contactForm = document.getElementById('intake-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        const group = field.closest('.form-group');
        // Clear previous errors
        field.style.borderColor = '';
        const prevError = group.querySelector('.form-error');
        if (prevError) prevError.remove();

        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#c0392b';
          const errorMsg = document.createElement('span');
          errorMsg.className = 'form-error';
          errorMsg.style.cssText = 'color:#c0392b;font-size:0.75rem;margin-top:4px;';
          errorMsg.textContent = 'This field is required';
          group.appendChild(errorMsg);
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            isValid = false;
            field.style.borderColor = '#c0392b';
            const errorMsg = document.createElement('span');
            errorMsg.className = 'form-error';
            errorMsg.style.cssText = 'color:#c0392b;font-size:0.75rem;margin-top:4px;';
            errorMsg.textContent = 'Please enter a valid email address';
            group.appendChild(errorMsg);
          }
        }

        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
          const phonePattern = /^\d{10}$/;
          if (!phonePattern.test(field.value)) {
            isValid = false;
            field.style.borderColor = '#c0392b';
            const errorMsg = document.createElement('span');
            errorMsg.className = 'form-error';
            errorMsg.style.cssText = 'color:#c0392b;font-size:0.75rem;margin-top:4px;';
            errorMsg.textContent = 'Please enter a valid 10-digit phone number';
            group.appendChild(errorMsg);
          }
        }
      });

      if (isValid) {
        // Success state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = {
          fullName: document.getElementById('full-name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          inquiryArea: document.getElementById('inquiry-area').value,
          message: document.getElementById('message').value
        };

        fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          submitBtn.textContent = 'Request Sent ✓';
          submitBtn.style.background = '#2d6a4f';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
          }, 3000);
        })
        .catch(error => {
          console.error('Error:', error);
          submitBtn.textContent = 'Error Sending';
          submitBtn.style.background = '#c0392b';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        });
      }
    });

    // Clear error on input and restrict phone to numbers
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (field.type === 'tel') {
          field.value = field.value.replace(/\D/g, '').slice(0, 10);
        }
        field.style.borderColor = '';
        const group = field.closest('.form-group');
        const error = group.querySelector('.form-error');
        if (error) error.remove();
      });
    });
  }

  // --- Counter Animation (for stats if present) ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target;
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.floor(current);
            }
          }, 16);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // --- Parallax subtle effect on hero ---
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroBg = heroSection.querySelector('.hero-bg img');
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
        }
      }, { passive: true });
    }
  }

});
