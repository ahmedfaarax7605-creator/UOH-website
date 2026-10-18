// Mobile menu toggle + dropdown handling
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if (toggle) toggle.addEventListener('click', () => menu.classList.toggle('show'));
document.querySelectorAll('.menu > li.has-sub > a').forEach(a => {
  a.addEventListener('click', e => {
    if (window.innerWidth <= 860) {
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    }
  });
});

// Hero slider
const slides = document.querySelectorAll('.slide');
const dotsBox = document.querySelector('.dots');
if (slides.length) {
  let i = 0, timer;
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Slide ' + (n + 1));
    b.addEventListener('click', () => { show(n); restart(); });
    dotsBox.appendChild(b);
  });
  const dots = dotsBox.querySelectorAll('button');
  function show(n) {
    slides[i].classList.remove('active'); dots[i].classList.remove('active');
    i = n;
    slides[i].classList.add('active'); dots[i].classList.add('active');
  }
  function restart() { clearInterval(timer); timer = setInterval(() => show((i + 1) % slides.length), 5000); }
  show(0); restart();
}

// Animated counters
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count;
      let cur = 0; const step = Math.max(1, Math.ceil(end / 60));
      const t = setInterval(() => {
        cur = Math.min(end, cur + step);
        el.textContent = cur + (el.dataset.suffix || '');
        if (cur >= end) clearInterval(t);
      }, 25);
      io.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(c => io.observe(c));
}

// Back to top
const topBtn = document.getElementById('toTop');
if (topBtn) {
  window.addEventListener('scroll', () => { topBtn.style.display = scrollY > 400 ? 'block' : 'none'; });
  topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

// Form validation (contact / scholarship)
document.querySelectorAll('form[data-validate]').forEach(f => {
  f.addEventListener('submit', e => {
    e.preventDefault();
    const msg = f.querySelector('.msg');
    const email = f.querySelector('input[type=email]');
    const empty = [...f.querySelectorAll('[required]')].some(x => !x.value.trim());
    const badEmail = email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value);
    msg.style.display = 'block';
    if (empty || badEmail) {
      msg.className = 'msg err';
      msg.textContent = 'Please fill in all fields with valid information.';
    } else {
      msg.className = 'msg';
      msg.textContent = 'Thank you! Your message has been submitted.';
      f.reset();
    }
  });
});

// Tuition calculator
const calc = document.getElementById('calc');
if (calc) {
  calc.addEventListener('submit', e => {
    e.preventDefault();
    const rate = +document.getElementById('program').value;
    const credits = +document.getElementById('credits').value || 0;
    document.getElementById('total').textContent = '$' + (rate * credits).toLocaleString();
  });
}
