(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  /* ====== 1. Word-split big headings ====== */
  document.querySelectorAll('[data-split="words"]').forEach(el => {
    // Walk children, splitting only text nodes; preserve <em>, <br>, etc.
    const walk = (node) => {
      const out = [];
      node.childNodes.forEach(child => {
        if (child.nodeType === 3) {
          const words = child.textContent.split(/(\s+)/);
          words.forEach(w => {
            if (!w) return;
            if (/^\s+$/.test(w)) { out.push(document.createTextNode(w)); return; }
            const wrap = document.createElement('span');
            wrap.className = 'split-word';
            const inner = document.createElement('span');
            inner.textContent = w;
            wrap.appendChild(inner);
            out.push(wrap);
          });
        } else if (child.nodeType === 1) {
          // Recurse into inline elements like <em>
          const clone = child.cloneNode(false);
          const inner = walk(child);
          // For <em>, wrap each word inside it
          if (inner.length) {
            inner.forEach(n => clone.appendChild(n));
          }
          out.push(clone);
        }
      });
      return out;
    };
    const replaced = walk(el);
    el.innerHTML = '';
    replaced.forEach(n => el.appendChild(n));
  });

  /* ====== 2. Intersection observer for reveals ====== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        // also animate any split-words inside this target
        entry.target.querySelectorAll('.split-word').forEach(s => s.classList.add('in'));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-anim], [data-stagger], [data-split="words"]').forEach(el => io.observe(el));

  // For headings that have split-words but live inside a parent that's already visible at load:
  // observe the heading itself so its words animate.
  document.querySelectorAll('[data-split="words"]').forEach(h => {
    if (h.classList.contains('in')) {
      h.querySelectorAll('.split-word').forEach(s => s.classList.add('in'));
    }
  });

  /* ====== 3. Parallax + ambient drift on scroll ====== */
  let ticking = false;
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const ambient = document.querySelector('.ambient');
  const heroVisual = document.querySelector('.hero-visual');
  const progress = document.querySelector('.scroll-progress');

  const onScroll = () => {
    const sy = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, sy / max));

    // ambient drift (normalized so motion stays subtle on long pages)
    if (ambient) ambient.style.setProperty('--sy', pct.toString());

    // progress bar
    if (progress) progress.style.setProperty('--sp', (pct * 100).toFixed(2) + '%');

    // per-element parallax — center-relative
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const p = (center - vh / 2) / vh; // -1..1 roughly
      el.style.setProperty('--p', Math.max(-1.4, Math.min(1.4, -p)).toFixed(3));
    });

    // hero visual subtle tilt
    if (heroVisual) {
      const r = heroVisual.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const t = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
      heroVisual.style.transform = `translateY(${(-t * 18).toFixed(1)}px) rotate(${(t * -1.2).toFixed(2)}deg)`;
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ====== 4. Animated counters when metrics enter view ====== */
  const counters = document.querySelectorAll('.metric .v');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Parse: digits + suffix (h, ×, %, d) potentially wrapped in <em>
      const match = el.textContent.match(/^([\d.]+)(.*)$/);
      if (!match) { counterIO.unobserve(el); return; }
      const target = parseFloat(match[1]);
      const suffix = match[2];
      const isFloat = match[1].includes('.');
      const start = performance.now();
      const dur = 1400;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const v = target * ease(t);
        const display = isFloat ? v.toFixed(1) : Math.round(v).toString();
        el.innerHTML = display + '<em>' + suffix.replace(/<\/?em>/g,'') + '</em>';
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  /* ====== 5. Hero flow steps cycling animation ====== */
  const steps = document.querySelectorAll('.hv-step');
  if (steps.length) {
    let i = 2;
    setInterval(() => {
      steps.forEach(s => s.classList.remove('active'));
      i = (i + 1) % steps.length;
      steps[i].classList.add('active');
    }, 2200);
  }

  /* ====== 6. Magnetic CTA hover ====== */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();