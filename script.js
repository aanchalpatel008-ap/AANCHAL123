/**
 * Aanchal Patel - Portfolio Interactions & Logic
 * Features: Typewriter effect, Theme toggling, Mobile drawer, Scrollspy,
 * Clipboard copy, Form validation, Scroll-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initMobileNav();
  initScrollEffects();
  initCopyPhone();
  initContactForm();
  initCurrentYear();
});

/* ---------------- 1. Theme Toggle (Dark / Light) ---------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('ap_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('ap_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }
}

/* ---------------- 2. Typewriter Effect in Hero ---------------- */
function initTypewriter() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'B.Tech CSE Student @ JECRC',
    'Tech Innovator & Problem Solver',
    'Formula 1 Enthusiast',
    'District Basketball Player',
    'Curious Tech Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const backspaceSpeed = 50;
  const holdDelay = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? backspaceSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ---------------- 3. Mobile Navigation Drawer ---------------- */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking any nav item
  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', false);
    });
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', false);
    }
  });
}

/* ---------------- 4. Scroll Effects & Active Nav Link Spy ---------------- */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar shadow on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }

    // Active Section Spy
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (currentSectionId && item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });

  // Scroll to top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ---------------- 5. One-Click Copy Phone Number ---------------- */
function initCopyPhone() {
  const copyBtn = document.getElementById('copyPhoneBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  const phoneNumber = '+919602008230';

  if (!copyBtn || !copyTooltip) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(phoneNumber);
      } else {
        // Fallback for older contexts
        const tempInput = document.createElement('input');
        tempInput.value = phoneNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // Show copied feedback tooltip
      copyTooltip.textContent = 'Copied!';
      copyTooltip.classList.add('show');

      // Change icon temporarily
      const icon = copyBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
      }

      setTimeout(() => {
        copyTooltip.classList.remove('show');
        copyTooltip.textContent = 'Copy';
        if (icon) {
          icon.classList.remove('fa-check');
          icon.classList.add('fa-copy');
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  });
}

/* ---------------- 6. Contact Form Validation & State ---------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Real-time error clearing
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        clearErrors();
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    // Validate Email
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      emailError.textContent = 'Please provide a valid email address.';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please write a message before sending.';
      isValid = false;
    } else if (messageInput.value.trim().length < 8) {
      messageError.textContent = 'Please enter at least 8 characters.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending state
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;

      // Reset form fields
      form.reset();

      // Show toast notification
      if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 5000);
      }
    }, 800);
  });

  function clearErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
  }
}

/* ---------------- 7. Dynamic Footer Year ---------------- */
function initCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
