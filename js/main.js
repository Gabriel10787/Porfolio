// Slider premium de proyectos
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-premium__track');
  const slides = Array.from(document.querySelectorAll('.slider-premium__slide'));
  const btnPrev = document.querySelector('.slider-premium__prev');
  const btnNext = document.querySelector('.slider-premium__next');
  const thumbnails = Array.from(document.querySelectorAll('.slider-premium__thumbnail'));
  let current = 0;

  if (!slider || slides.length === 0 || !btnPrev || !btnNext) return;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      slide.setAttribute('aria-hidden', i !== idx);
      slide.tabIndex = i === idx ? 0 : -1;
    });
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === idx);
      thumb.setAttribute('aria-current', i === idx ? 'true' : 'false');
    });
    slider.style.transform = `translateX(-${idx * 100}%)`;
    current = idx;
  }

  function goToSlide(idx) {
    const total = slides.length;
    let newIdx = (idx + total) % total;
    showSlide(newIdx);
  }

  btnPrev.addEventListener('click', () => goToSlide(current - 1));
  btnNext.addEventListener('click', () => goToSlide(current + 1));
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => goToSlide(i));
  });
  // Swipe para móvil
  let startX = null;
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  slider.addEventListener('touchend', e => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) goToSlide(current - 1);
    else if (startX - endX > 50) goToSlide(current + 1);
    startX = null;
  });
  // Teclado accesible
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(current - 1);
    else if (e.key === 'ArrowRight') goToSlide(current + 1);
  });
  // Inicializar
  showSlide(current);
  slider.tabIndex = 0;
  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-label', 'Proyectos destacados');
});
// Animación de aparición para timeline de experiencia premium
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline__item');
  if (timelineItems.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 180);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    timelineItems.forEach(item => observer.observe(item));
  } else {
    timelineItems.forEach(item => item.classList.add('visible'));
  }
});
// Animación de aparición para banda de credibilidad premium
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.premium-item');
  if (items.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    items.forEach(item => observer.observe(item));
  } else {
    // fallback: mostrar todos si no hay soporte
    items.forEach(item => item.classList.add('visible'));
  }
});
// NAVBAR: scroll suave y sección activa
document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para navegación interna desde navbar
  document.querySelectorAll('.navbar__menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Resaltar sección activa en navbar
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar__menu a'));
  function onScroll() {
    const scrollPos = window.scrollY || window.pageYOffset;
    let currentId = '';
    for (const section of sections) {
      const offset = section.offsetTop - 80;
      if (scrollPos >= offset) {
        currentId = section.id;
      }
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
// main.js
// Portfolio Gabriel García Lorenzo
// Animaciones y lógica de interacción

document.addEventListener('DOMContentLoaded', () => {
  // Animación fade-in para secciones
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    setTimeout(() => {
      el.style.animationDelay = `${i * 0.15}s`;
      el.classList.add('animated');
    }, 100);
  });

  // Scroll suave para navegación interna
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // SLIDER PROYECTOS DESTACADOS (premium animación)
  (function sliderProyectos() {
    const slider = document.querySelector('.proyectos__slider');
    const slides = Array.from(document.querySelectorAll('.proyecto'));
    const btnPrev = document.querySelector('.slider__prev');
    const btnNext = document.querySelector('.slider__next');
    const thumbnails = Array.from(document.querySelectorAll('.proyectos__thumbnail'));
    let current = 0;
    let last = 0;

    if (!slider || slides.length === 0 || !btnPrev || !btnNext) return;

    function showSlide(idx, direction = 1) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'reverse');
        slide.setAttribute('aria-hidden', i !== idx);
        slide.tabIndex = i === idx ? 0 : -1;
      });
      // Dirección para animación premium (opcional)
      if (direction === -1) slides[idx].classList.add('reverse');
      slides[idx].classList.add('active');
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === idx);
        thumb.setAttribute('aria-current', i === idx ? 'true' : 'false');
      });
    }

    function goToSlide(idx) {
      const direction = idx > current ? 1 : -1;
      last = current;
      current = (idx + slides.length) % slides.length;
      showSlide(current, direction);
    }

    btnPrev.addEventListener('click', () => {
      goToSlide(current - 1);
    });
    btnNext.addEventListener('click', () => {
      goToSlide(current + 1);
    });

    // Soporte teclado (izquierda/derecha)
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(current - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(current + 1);
      }
    });

    // Miniaturas clicables
    thumbnails.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        goToSlide(i);
      });
    });

    // Inicializar
    showSlide(current);
    slider.tabIndex = 0;
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Proyectos destacados');
  })();
});

// Animación de carga global y secciones
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 80);
});

// Temporizador de fecha premium en la parte superior derecha
(function fechaTimer() {
  const timer = document.getElementById('fecha-timer');
  if (!timer) return;
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function updateFecha() {
    const now = new Date();
    const dia = dias[now.getDay()];
    const numero = now.getDate();
    const mes = meses[now.getMonth()];
    const año = now.getFullYear();
    timer.textContent = `${dia}, ${numero} de ${mes} de ${año}`;
  }
  updateFecha();
  setInterval(updateFecha, 1000);
})();

// Barra de progreso de navegación hasta el footer
(function barraProgresoNavegacion() {
  const progressBar = document.getElementById('progress-bar');
  const footer = document.querySelector('footer.footer');
  if (!progressBar || !footer) return;

  function updateProgressBar() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const footerRect = footer.getBoundingClientRect();
    const footerTop = footerRect.top + scrollTop;
    const docHeight = footerTop + footer.offsetHeight;
    const maxScroll = docHeight - windowHeight;
    let percent = (scrollTop / maxScroll) * 100;
    percent = Math.max(0, Math.min(percent, 100));
    progressBar.style.width = percent + '%';
  }

  window.addEventListener('scroll', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
  document.addEventListener('DOMContentLoaded', updateProgressBar);
})();

// Boton flotante para volver al inicio
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  function toggleBackToTop() {
    const shouldShow = (window.scrollY || window.pageYOffset) > 260;
    backToTopBtn.classList.toggle('is-visible', shouldShow);
  }

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();
});
