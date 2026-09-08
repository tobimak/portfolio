document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const header = document.getElementById("siteHeader");
const onScroll = () => {
  header.style.borderBottomColor = window.scrollY > 8
    ? "rgba(242,244,243,0.16)"
    : "rgba(242,244,243,0.08)";
};
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `rise 0.7s cubic-bezier(.2,.7,.2,1) forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-anim]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  observer.observe(el);
});

if ('scrollBehavior' in document.documentElement.style === false) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

const copyBtn = document.querySelector('.contact__copy-btn');
const toast = document.getElementById('toast');
let toastTimeout;

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      showToast();
    } catch (err) {
      fallbackCopy(email);
      showToast();
    }
  });
}

function showToast() {
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Error al copiar:', err);
  }
  document.body.removeChild(textarea);
}

document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = `
      <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      ¡Listo!
    `;
    this.style.borderColor = 'var(--maroon-bright)';
    
    setTimeout(() => {
      this.innerHTML = originalText;
      this.style.borderColor = '';
    }, 2000);
  });
});