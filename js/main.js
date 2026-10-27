(function () {
  /* ---------- Apps Data ---------- */
  var NOTEBOOK_CAS = {
    body: '#C5A582',
    label: '#FAF7F0',
    ink: '#2E2218',
    dark: '#543F2F',
    reel: '#FAF7F0',
    base: '#AB8765',
    stripe: '#D97706',
    mark: null,
    icon: 'notebook-icon'
  };

  var APPS = [
    {
      slug: 'mynotebook',
      name: 'myNotebook',
      kind: 'Notebook',
      url: 'myNotebook.html',
      cas: NOTEBOOK_CAS,
      tagline: 'Future concepts, sketches and creative worldbuilding.'
    },
    {
      slug: 'blueprintv3',
      name: 'Blueprintv3',
      kind: 'App',
      url: 'blueprint-v3.html',
      cas: {
        body: '#0A58FF',
        label: '#FFFFFF',
        ink: '#06236E',
        dark: '#05247A',
        reel: '#E8EEFF',
        base: '#0846CC',
        stripe: '#0A58FF',
        mark: '#06236E',
        icon: 'bp-icon'
      },
      tagline: 'After 2 attempts, we are finally launching Project 3.'
    },
    {
      slug: null,
      name: 'Next tape',
      kind: 'In the making',
      blank: true,
      url: null,
      cas: {
        body: '#D9D7E6',
        label: '#F6F5FB',
        ink: '#6C6A86',
        dark: '#9C9AB4',
        reel: '#F6F5FB',
        base: '#C6C4D8',
        stripe: '#B5B3CC',
        mark: null
      }
    }
  ];

  var HEX = {
    body: '#6D4AE8',
    label: '#FFFFFF',
    ink: '#16142A',
    dark: '#22186B',
    reel: '#F2F0FF',
    base: '#5A39D0',
    stripe: 'url(#cg)',
    mark: '#16142A'
  };

  var STEPS = [
    ['Idea', 'Every app starts as a small idea.'],
    ['Sketch', 'Rough drawings before any code.'],
    ['Design', 'Screens, color and type for this one app.'],
    ['Build', 'Clean code that is made to last.'],
    ['Test', 'We use it the way you will.'],
    ['Launch', 'We release it and keep improving it.']
  ];

  /* ---------- SVG Generator Functions ---------- */
  function reel(cx, c) {
    var teeth = '';
    for (var i = 0; i < 6; i++) {
      teeth += '<rect x="-1.5" y="-12" width="3" height="5" transform="rotate(' + (i * 60) + ')"/>';
    }
    return '<g transform="translate(' + cx + ' 178)"><g class="reel"><circle r="20" fill="' + c.reel + '"/><circle r="12" fill="' + c.dark + '"/><g fill="' + c.reel + '">' + teeth + '</g></g></g>';
  }

  function cassette(name, c, side) {
    var n = name.toUpperCase();
    var fs = Math.min(30, Math.floor(226 / (n.length * 0.74)));
    var tl = Math.min(226, Math.round(n.length * fs * 0.78));
    var mark = c.icon
      ? '<use href="#' + c.icon + '" x="58" y="64" width="52" height="52"/>'
      : c.mark
        ? '<g style="--mark-hex:' + c.mark + '"><use href="#mark" x="58" y="64" width="52" height="52"/></g>'
        : '<rect x="58" y="64" width="52" height="52" rx="8" fill="none" stroke="' + c.ink + '" stroke-opacity="0.4" stroke-dasharray="4 4"/>';

    return '<svg viewBox="0 0 420 270" aria-hidden="true">' +
      '<rect x="20" y="20" width="380" height="230" rx="26" fill="' + c.body + '"/>' +
      '<rect x="44" y="40" width="332" height="100" rx="14" fill="' + c.label + '"/>' +
      '<text class="cas-small" x="360" y="62" text-anchor="end" fill="' + c.ink + '" fill-opacity="0.6">' + (side || 'SIDE A · C90') + '</text>' + mark +
      '<text class="cas-name" x="126" y="98" font-size="' + fs + '" fill="' + c.ink + '" textLength="' + tl + '" lengthAdjust="spacing">' + n + '</text>' +
      '<rect x="126" y="110" width="234" height="4" rx="2" fill="' + c.stripe + '"/>' +
      '<rect x="120" y="152" width="180" height="52" rx="26" fill="' + c.dark + '"/>' +
      '<line x1="170" y1="196" x2="250" y2="196" stroke="' + c.dark + '" stroke-width="2"/>' +
      reel(150, c) + reel(270, c) +
      '<path d="M104 250 L128 216 H292 L316 250 Z" fill="' + c.base + '"/>' +
      '<circle cx="150" cy="236" r="5" fill="' + c.dark + '"/><circle cx="270" cy="236" r="5" fill="' + c.dark + '"/>' +
      '<circle cx="34" cy="34" r="4" fill="' + c.dark + '"/><circle cx="386" cy="34" r="4" fill="' + c.dark + '"/>' +
      '<circle cx="34" cy="236" r="4" fill="' + c.dark + '"/><circle cx="386" cy="236" r="4" fill="' + c.dark + '"/>' +
      '</svg>';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  var home = document.getElementById('home');

  var heroTape = document.getElementById('hero-tape');
  if (heroTape) heroTape.innerHTML = cassette('Hexagonum', HEX);

  // Full Cassettes that hover out on rack hover (Image 1 Inspo)
  var popoutNotebook = document.getElementById('popout-notebook');
  if (popoutNotebook) popoutNotebook.innerHTML = cassette('myNotebook', NOTEBOOK_CAS, 'SIDE A · IDEAS');

  var popoutHex = document.getElementById('popout-hex');
  if (popoutHex) popoutHex.innerHTML = cassette('Hexagonum', HEX);

  var popoutCh2 = document.getElementById('popout-ch2');
  if (popoutCh2) popoutCh2.innerHTML = cassette('Chapter 02', {
    body: '#1E293B', label: '#0F172A', ink: '#E2E8F0', dark: '#0284C7',
    reel: '#F1F5F9', base: '#0F172A', stripe: '#06B6D4', mark: null
  }, 'SIDE A · SOON');

  var popoutCh3 = document.getElementById('popout-ch3');
  if (popoutCh3) popoutCh3.innerHTML = cassette('Chapter 03', {
    body: '#292524', label: '#1C1917', ink: '#F5F5F4', dark: '#D97706',
    reel: '#F5F5F4', base: '#1C1917', stripe: '#F59E0B', mark: null
  }, 'SIDE B · SOON');

  /* ---------- Intro Logic ---------- */
  var busy = false, timers = [], ctx = null;
  document.body.classList.add('locked');

  function click(vol) {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!ctx) ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume();
      var len = Math.floor(ctx.sampleRate * 0.04),
          buf = ctx.createBuffer(1, len, ctx.sampleRate),
          d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6);
      }
      var src = ctx.createBufferSource();
      src.buffer = buf;
      var f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = 1900;
      f.Q.value = 1.0;
      var g = ctx.createGain();
      g.gain.value = vol !== undefined ? vol : 0.45;
      src.connect(f);
      f.connect(g);
      g.connect(ctx.destination);
      src.start();
    } catch (e) { }
  }

  function later(fn, ms) {
    timers.push(setTimeout(fn, ms));
  }

  function closeIntro() {
    if (!intro) return;
    intro.classList.add('done');
    later(function () {
      intro.hidden = true;
      document.body.classList.remove('locked');
    }, reduce ? 20 : 650);
  }

  var cassetteNotebookBtn = document.getElementById('cassette-notebook');
  var cassetteBtn = document.getElementById('cassette');
  var cassetteBpBtn = document.getElementById('cassette-bp');
  var cassetteBlankBtn = document.getElementById('cassette-blank');

  // Hover click sound on tapes
  document.querySelectorAll('.rack-tape-btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      if (!busy) click(0.18);
    });
  });

  // myNotebook Tape Click
  if (cassetteNotebookBtn) {
    cassetteNotebookBtn.addEventListener('click', function () {
      if (busy || !intro) return;
      busy = true;
      cassetteNotebookBtn.classList.add('ejecting');
      intro.classList.add('play');
      click(0.6);
      if (reduce) {
        window.location.href = 'myNotebook.html';
        return;
      }
      later(function () { click(0.4); }, 220);
      later(function () {
        window.location.href = 'myNotebook.html';
      }, 500);
    });
  }

  // Hexagonum Studio Tape Click
  if (cassetteBtn) {
    cassetteBtn.addEventListener('click', function () {
      if (busy || !intro) return;
      busy = true;
      cassetteBtn.classList.add('ejecting');
      intro.classList.add('play');
      click(0.6);
      if (reduce) {
        later(closeIntro, 100);
        return;
      }
      later(function () { click(0.35); }, 220);
      later(closeIntro, 550);
    });
  }

  var cassetteCh2Btn = document.getElementById('cassette-ch2');
  var cassetteCh3Btn = document.getElementById('cassette-ch3');

  function handleComingSoon(btn) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      click(0.35);
      btn.style.transform = 'translateX(95px) scale(0.98)';
      setTimeout(function () {
        btn.style.transform = '';
      }, 280);
    });
  }

  handleComingSoon(cassetteCh2Btn);
  handleComingSoon(cassetteCh3Btn);

  var skipBtn = document.getElementById('skip');
  if (skipBtn) {
    skipBtn.addEventListener('click', function () {
      if (!busy) {
        busy = true;
        closeIntro();
      }
    });
  }

  var replayBtn = document.getElementById('replay');
  if (replayBtn) {
    replayBtn.addEventListener('click', function () {
      timers.forEach(clearTimeout);
      timers = [];
      busy = false;
      if (intro) {
        intro.classList.remove('play', 'done');
        intro.hidden = false;
      }
      document.body.classList.add('locked');
      window.scrollTo(0, 0);
    });
  }

  /* ---------- Arc of Steps ---------- */
  (function () {
    var svg = document.getElementById('arc-svg');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var cx = -50, cy = 210, R = 200, angles = [-60, -36, -12, 12, 36, 60], groups = [];

    function el(n, at) {
      var e = document.createElementNS(NS, n);
      for (var k in at) e.setAttribute(k, at[k]);
      return e;
    }

    function pt(a) {
      var r = a * Math.PI / 180;
      return [cx + R * Math.cos(r), cy + R * Math.sin(r)];
    }

    var a0 = pt(-72), a1 = pt(72);
    var arcD = 'M ' + a0[0].toFixed(1) + ' ' + a0[1].toFixed(1);
    angles.forEach(function (a) {
      var p = pt(a);
      arcD += ' L ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
    });
    arcD += ' L ' + a1[0].toFixed(1) + ' ' + a1[1].toFixed(1);

    svg.appendChild(el('path', {
      class: 'arc-line',
      d: arcD
    }));

    var stepNum = document.getElementById('step-num');
    var stepTitle = document.getElementById('step-title');
    var stepText = document.getElementById('step-text');

    function select(i) {
      groups.forEach(function (g, k) {
        g.classList.toggle('on', k === i);
        g.firstChild.setAttribute('r', k === i ? 9 : 5);
        g.setAttribute('aria-pressed', k === i);
      });
      if (stepNum) stepNum.textContent = '0' + (i + 1);
      if (stepTitle) stepTitle.textContent = STEPS[i][0];
      if (stepText) stepText.textContent = STEPS[i][1];
    }

    angles.forEach(function (a, i) {
      var p = pt(a),
          g = el('g', {
            class: 'dotg',
            tabindex: 0,
            role: 'button',
            'aria-label': 'Step ' + (i + 1) + ': ' + STEPS[i][0]
          });
      g.appendChild(el('circle', { class: 'dot', cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 5 }));
      var t = el('text', {
        class: 'num',
        x: (p[0] + 24).toFixed(1),
        y: (p[1] + 8).toFixed(1),
        transform: 'rotate(' + a + ' ' + (p[0] + 24).toFixed(1) + ' ' + p[1].toFixed(1) + ')'
      });
      t.textContent = '0' + (i + 1);
      g.appendChild(t);

      g.addEventListener('click', function () { goStep(i); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goStep(i);
        }
      });
      svg.appendChild(g);
      groups.push(g);
    });

    var pin = document.getElementById('about'), cur = -1;
    function goStep(i) {
      if (!pin) return;
      var top = pin.getBoundingClientRect().top + window.pageYOffset + i * window.innerHeight;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    }

    function sync() {
      if (!pin) return;
      var rel = -pin.getBoundingClientRect().top / window.innerHeight;
      var i = Math.max(0, Math.min(5, Math.round(rel)));
      if (i !== cur) {
        cur = i;
        select(i);
      }
    }

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  })();

  /* ---------- Cassette Carousel ---------- */
  var rail = document.getElementById('rail');
  if (rail) {
    var slots = [];

    function offset(el) {
      var rr = rail.getBoundingClientRect(), r = el.getBoundingClientRect();
      return (r.left + r.width / 2 - (rr.left + rr.width / 2)) / r.width;
    }

    function openApp(app) {
      if (!app || app.blank) return;
      if (app.url) {
        window.location.href = app.url;
      }
    }

    APPS.forEach(function (a) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'slot';
      b.setAttribute('aria-label', a.blank ? 'Empty cassette, next app in the making' : 'Open ' + a.name);
      b.innerHTML = '<span class="tape">' + cassette(a.name, a.cas, a.blank ? 'SIDE A · EMPTY' : null) + '</span>';
      b.addEventListener('click', function () {
        if (Math.abs(offset(b)) < 0.35 && !a.blank) {
          openApp(a);
        } else {
          b.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
        }
      });
      rail.appendChild(b);
      slots.push(b);
    });

    var capName = document.getElementById('cap-name');
    var capKind = document.getElementById('cap-kind');
    var openBtn = document.getElementById('open');
    var current = 0, ticking = false;

    function layout() {
      ticking = false;
      var best = 0, bestD = 99;
      slots.forEach(function (s, i) {
        var d = offset(s), ad = Math.abs(d), t = Math.max(0, 1 - ad);
        if (ad < bestD) {
          bestD = ad;
          best = i;
        }
        var y = 64 - t * 96,
            sc = 0.82 + t * 0.24,
            rot = Math.max(-1, Math.min(1, d)) * -6;
        var tape = s.firstChild;
        tape.style.transform = 'translateY(' + y.toFixed(1) + 'px) scale(' + sc.toFixed(3) + ') rotate(' + rot.toFixed(2) + 'deg)';
        tape.style.opacity = (0.55 + t * 0.45).toFixed(2);
      });

      slots.forEach(function (s, i) {
        s.classList.toggle('active', i === best);
      });

      current = best;
      var a = APPS[best];
      if (capName) capName.textContent = a.name;
      if (capKind) capKind.textContent = a.kind;
      if (openBtn) {
        openBtn.disabled = !!a.blank;
        openBtn.textContent = a.blank ? 'Coming soon' : 'Open ' + a.name + ' →';
      }
    }

    function req() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(layout);
      }
    }

    rail.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);

    function step(dir) {
      var n = Math.max(0, Math.min(slots.length - 1, current + dir));
      slots[n].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    }

    var prevBtn = document.getElementById('prev');
    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });

    var nextBtn = document.getElementById('next');
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        var a = APPS[current];
        if (!a.blank) openApp(a);
      });
    }

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      }
    });

    var wheelAt = 0;
    rail.parentNode.addEventListener('wheel', function (e) {
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 2) return;
      var now = Date.now(), dir = d > 0 ? 1 : -1, n = current + dir;
      if (now - wheelAt < 600) {
        e.preventDefault();
        return;
      }
      if (n < 0 || n > slots.length - 1) return;
      e.preventDefault();
      wheelAt = now;
      step(dir);
    }, { passive: false });

    layout();
    setTimeout(layout, 300);
  }

  /* ---------- Anchor Smooth Scrolling ---------- */
  document.querySelectorAll('[data-go]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var targetId = a.getAttribute('data-go');
      var el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Copy Buttons ---------- */
  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.getAttribute('data-target'));
      if (!el) return;
      function reset() {
        setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
      }
      function done() {
        btn.textContent = 'Copied';
        reset();
      }
      function fallback() {
        var r = document.createRange();
        r.selectNodeContents(el);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        btn.textContent = 'Selected';
        reset();
      }
      try {
        navigator.clipboard.writeText(el.textContent).then(done, fallback);
      } catch (e) {
        fallback();
      }
    });
  });

  /* Handle direct hash on load (e.g., #blueprintv3, #mynotebook) */
  if (location.hash === '#blueprintv3' || location.hash === '#blueprint-v3') {
    window.location.href = 'blueprint-v3.html';
  } else if (location.hash === '#mynotebook' || location.hash === '#myNotebook') {
    window.location.href = 'myNotebook.html';
  }
})();
