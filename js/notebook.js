(function () {
  'use strict';

  /* ==========================================================================
     SYNTHESIZED SOUND EFFECTS (Web Audio API)
     ========================================================================== */
  var audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Paper rustle / page turn sound
  function playPageTurnSound() {
    try {
      initAudio();
      if (!audioCtx) return;
      var len = Math.floor(audioCtx.sampleRate * 0.12);
      var buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        var env = Math.sin((i / len) * Math.PI) * Math.pow(1 - i / len, 1.5);
        data[i] = (Math.random() * 2 - 1) * env * 0.45;
      }
      var src = audioCtx.createBufferSource();
      src.buffer = buf;
      var filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1400;
      var gain = audioCtx.createGain();
      gain.gain.value = 0.55;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      src.start();
    } catch (e) { }
  }

  // Book opening thump & snap sound
  function playBookOpenSound() {
    try {
      initAudio();
      if (!audioCtx) return;
      // snap
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
      // paper rustle
      setTimeout(playPageTurnSound, 90);
    } catch (e) { }
  }

  /* ==========================================================================
     PAGES DATA (Future Ideas & Sketches)
     ========================================================================== */
  var DEFAULT_PAGES = [
    {
      title: "OC's World",
      sketch: "img/sketch_page1.jpg",
      html: `
        <h3 class="hw-heading">OC's world</h3>
        <p>After Fantasie created Lennor, I, as the creator, erased <span class="hw-orange">Fantasie's arm</span>.</p>
        <p><span class="hw-red">*Fantasie's arm is one of the main ways she created OCs.</span></p>
        <p>Anyway let's just keep going... I also removed all the memories about Lennor this time...</p>
        <br>
        <p><span class="hw-yellow">All my OCs have one similarities:</span><br>
        Before they get to a better life, they need to get through some <span class="hw-red">TRAUMA</span><br>
        <span class="hw-green">awa hehe except Fantasie. She's just a pop out mind (a.k.a. creativity)</span></p>
        <p>Ok let's keep moving.</p>
        <br>
        <h4 style="font-family:var(--font-hand);font-size:1.6rem;color:#111;margin-top:10px;">Future Hexagonum Ideas:</h4>
        <ul class="hw-list">
          <li><span class="hw-orange">OC Lore Deck:</span> Interactive storybook app with collectible character cassettes.</li>
          <li><span class="hw-blue">Animated Panels:</span> Manga reader with tape-loop background music.</li>
          <li><span class="hw-green">Community Creator Kit:</span> Let people submit their own cassette apps!</li>
        </ul>
      `
    },
    {
      title: "Cass-Ettes & Sound",
      sketch: "img/sketch_page2.jpg",
      html: `
        <h3 class="hw-heading">Cass-Ettes: Tactile Audio</h3>
        <p><span class="hw-orange">Old-School Vibes & Analog Feeling</span></p>
        <p>Software shouldn't just be flat pixels. We want tactile, physical satisfaction when launching apps.</p>
        <br>
        <h4 style="font-family:var(--font-hand);font-size:1.6rem;color:#111;">App Concept Features:</h4>
        <ul class="hw-list">
          <li><span class="hw-red">Mixtape Sharing:</span> Send custom cassette tapes with hidden messages to friends.</li>
          <li><span class="hw-green">Lo-Fi Player:</span> Cassette tape deck with pitch wobble, tape saturation, and real A/B side flips.</li>
          <li><span class="hw-blue">Tape Bot Mascot:</span> A companion that dances to whatever tape is playing.</li>
          <li><span class="hw-yellow">Secret Tracks:</span> Unlock easter eggs when rewinding all the way to 00:00.</li>
        </ul>
        <br>
        <p><span class="hw-green">Keep it analog, keep it cozy! ✨</span></p>
      `
    },
    {
      title: "Cyber-District Delta",
      sketch: "img/sketch_page3.jpg",
      html: `
        <h3 class="hw-heading">Cyber District Delta</h3>
        <p><span class="hw-blue">Next-Gen Virtual Workspace (Draft 3)</span></p>
        <p>A 3D hexagonal vertical world where every building represents a creative project or tool.</p>
        <br>
        <h4 style="font-family:var(--font-hand);font-size:1.6rem;color:#111;">Core Features:</h4>
        <ul class="hw-list">
          <li><span class="hw-orange">Flying Companion Drone:</span> AI assistant that carries notes and files across the screen.</li>
          <li><span class="hw-red">Isometric Navigator:</span> Zoom through districts to discover hidden Hexagonum labs.</li>
          <li><span class="hw-green">Modular Cassette OS:</span> Run multiple mini-apps simultaneously like retro cartridges.</li>
          <li><span class="hw-yellow">Rei & Maya Stories:</span> Ongoing narrative woven directly into product updates.</li>
        </ul>
        <br>
        <p style="font-size:1.55rem;color:#16A34A;font-weight:700;">"The future is here. We are something special."</p>
      `
    }
  ];

  // Load custom ideas from localStorage if any
  var storageKey = 'hexagonum_user_notebook_ideas';
  var customIdeas = [];
  try {
    var stored = localStorage.getItem(storageKey);
    if (stored) customIdeas = JSON.parse(stored);
  } catch (e) { }

  var pages = DEFAULT_PAGES.concat(customIdeas);
  var currentPageIndex = 0;
  var isOpen = false;

  /* ==========================================================================
     DOM ELEMENTS
     ========================================================================== */
  var deskStage = document.getElementById('desk-stage');
  var closedBook = document.getElementById('closed-book');
  var openContainer = document.getElementById('open-container');
  var notebookTitle = document.getElementById('notebook-title');
  var pageCountBadge = document.getElementById('page-count-badge');
  var sketchImg = document.getElementById('sketch-img');
  var handwrittenBody = document.getElementById('handwritten-body');
  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');
  var closeBookBtn = document.getElementById('btn-close-book');
  var fullscreenBtn = document.getElementById('btn-fullscreen');
  var addIdeaBtn = document.getElementById('btn-add-idea');
  var clearCustomBtn = document.getElementById('btn-clear-ideas');
  var exportBtn = document.getElementById('btn-export');
  var optionsBtn = document.getElementById('btn-options');
  var toastMsg = document.getElementById('toast-msg');
  var spread = document.getElementById('notebook-spread');

  function showToast(text) {
    if (!toastMsg) return;
    toastMsg.textContent = text;
    toastMsg.classList.add('show');
    setTimeout(function () {
      toastMsg.classList.remove('show');
    }, 2400);
  }

  /* ==========================================================================
     RENDER ACTIVE PAGE
     ========================================================================== */
  function renderPage(index) {
    if (index < 0) index = 0;
    if (index >= pages.length) index = pages.length - 1;
    currentPageIndex = index;

    var page = pages[index];

    // Trigger flip animation
    if (spread) {
      spread.classList.add('page-turning');
      setTimeout(function () {
        spread.classList.remove('page-turning');
      }, 450);
    }

    if (notebookTitle) notebookTitle.textContent = page.title || "OC's world";
    if (pageCountBadge) pageCountBadge.textContent = 'Page ' + (index + 1) + ' of ' + pages.length;

    if (sketchImg) {
      sketchImg.style.opacity = '0';
      setTimeout(function () {
        sketchImg.src = page.sketch || 'img/sketch_page1.jpg';
        sketchImg.alt = page.title || 'Sketch';
        sketchImg.style.opacity = '1';
      }, 150);
    }

    if (handwrittenBody) {
      handwrittenBody.style.opacity = '0';
      setTimeout(function () {
        handwrittenBody.innerHTML = page.html;
        handwrittenBody.style.opacity = '1';
      }, 150);
    }

    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === pages.length - 1);
  }

  function turnPage(dir) {
    var nextIndex = currentPageIndex + dir;
    if (nextIndex >= 0 && nextIndex < pages.length) {
      playPageTurnSound();
      renderPage(nextIndex);
    }
  }

  /* ==========================================================================
     OPEN & CLOSE NOTEBOOK
     ========================================================================== */
  function openNotebook() {
    if (isOpen) return;
    isOpen = true;
    playBookOpenSound();

    if (deskStage) deskStage.classList.add('opening');

    setTimeout(function () {
      renderPage(currentPageIndex);
      if (openContainer) openContainer.classList.add('active');
    }, 600);
  }

  function closeNotebook() {
    if (!isOpen) return;
    isOpen = false;
    playBookOpenSound();

    if (openContainer) openContainer.classList.remove('active');

    setTimeout(function () {
      if (deskStage) deskStage.classList.remove('opening');
    }, 400);
  }

  if (closedBook) {
    closedBook.addEventListener('click', openNotebook);
  }

  if (closeBookBtn) {
    closeBookBtn.addEventListener('click', closeNotebook);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () { turnPage(-1); });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () { turnPage(1); });
  }

  // Click on edges of spread to turn page
  var pageLeft = document.getElementById('page-left');
  var pageRight = document.getElementById('page-right');

  if (pageLeft) {
    pageLeft.addEventListener('click', function (e) {
      if (e.target === sketchImg || e.target === pageLeft) {
        if (currentPageIndex > 0) turnPage(-1);
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeNotebook();
    } else if (e.key === 'ArrowRight' && isOpen) {
      turnPage(1);
    } else if (e.key === 'ArrowLeft' && isOpen) {
      turnPage(-1);
    }
  });

  // Fullscreen button
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function () {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });
  }

  // Add Custom Idea Note
  if (addIdeaBtn) {
    addIdeaBtn.addEventListener('click', function () {
      var userIdea = prompt("Schreibe deine neue Idee für das Notebook auf:");
      if (!userIdea || !userIdea.trim()) return;

      var newPage = {
        title: "Meine Zukunfts-Idee",
        sketch: pages[currentPageIndex % 3].sketch, // recycle one of the artistic sketch pages
        html: `
          <h3 class="hw-heading">Meine Zukunfts-Idee</h3>
          <p><span class="hw-orange">Eingetragen am ${new Date().toLocaleDateString()}:</span></p>
          <p style="font-size:1.6rem;line-height:1.45;color:#111;margin:16px 0;padding:12px 16px;background:rgba(255,255,255,0.7);border-radius:10px;border-left:4px solid #E05A1B;">
            "${userIdea.trim()}"
          </p>
          <br>
          <h4 style="font-family:var(--font-hand);font-size:1.5rem;color:#111;">Notizen zur Umsetzung:</h4>
          <ul class="hw-list">
            <li><span class="hw-blue">Prototyp:</span> Erste UI-Skizzen und Farbpalette festlegen.</li>
            <li><span class="hw-green">Hexagonum Style:</span> Eigene Kassette für dieses Projekt designen.</li>
            <li><span class="hw-red">Status:</span> In Gedanken in Arbeit! 🚀</li>
          </ul>
        `
      };

      pages.push(newPage);
      customIdeas.push(newPage);
      try {
        localStorage.setItem(storageKey, JSON.stringify(customIdeas));
      } catch (e) { }

      renderPage(pages.length - 1);
      showToast("Idee hinzugefügt & im Notebook gespeichert! ✨");
    });
  }

  // Clear Custom Ideas
  if (clearCustomBtn) {
    clearCustomBtn.addEventListener('click', function () {
      if (customIdeas.length === 0) {
        showToast("Keine benutzerdefinierten Ideen vorhanden.");
        return;
      }
      if (confirm("Möchtest du deine hinzugefügten Ideen zurücksetzen?")) {
        customIdeas = [];
        try {
          localStorage.removeItem(storageKey);
        } catch (e) { }
        pages = DEFAULT_PAGES.slice();
        currentPageIndex = 0;
        renderPage(0);
        showToast("Notebook auf Standard zurückgesetzt.");
      }
    });
  }

  // Export / Share
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      var activePage = pages[currentPageIndex];
      var textToShare = activePage.title + " - Hexagonum myNotebook\n\nBesuche myNotebook auf Hexagonum!";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          showToast("Link zum Notebook in Zwischenablage kopiert! 📋");
        });
      } else {
        showToast("Notebook geöffnet: " + activePage.title);
      }
    });
  }

  // Options button
  if (optionsBtn) {
    optionsBtn.addEventListener('click', function () {
      showToast("Tipp: Benutze Pfeiltasten ← → zum Blättern!");
    });
  }

  // Handle direct hash (#open)
  if (window.location.hash === '#open' || window.location.search.indexOf('open=1') !== -1) {
    setTimeout(openNotebook, 400);
  }

})();
