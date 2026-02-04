(function () {
  'use strict';

  // Mark JS-enabled so CSS can safely hide/animate elements only when JS is running.
  document.documentElement.classList.add('js');

  // Inject robust CSS for dynamic effects (fallback for Tailwind JIT on dynamic content)
  var dynamicStyle = document.createElement('style');
  dynamicStyle.innerHTML = `
      .ai-item { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease; }
      .ai-item:hover { transform: scale(1.05) translateY(-4px) !important; z-index: 50 !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; border-color: rgba(79,209,255,0.6) !important; background-color: rgba(255,255,255,0.1) !important; }
      .ai-3d-wrap { will-change: transform; transform-style: preserve-3d; }
  `;
  document.head.appendChild(dynamicStyle);

  // Inject Language Data Script immediately (fallback if not in HTML)
  // We keep this just in case, but index.html should have it.
  if (!document.querySelector('script[src*="lang-data.js"]')) {
    const langScript = document.createElement('script');
    langScript.src = 'js/lang-data.js';
    document.head.appendChild(langScript);
  }

  var root = document.getElementById('ai-landing-root');
  if (!root) {
    console.error('❌ #ai-landing-root not found!');
    return;
  }

  var CONFIG = {
    portfolioEnabled: false,
    email: 'leeyob@gmail.com',
    assetsBase: '.',
    defaultLang: 'ko',
    // PASTE YOUR GOOGLE APPS SCRIPT URL HERE
    scriptUrl: 'https://script.google.com/macros/s/AKfycbzGnoHUxuxqgUBYSXinorp0C6F4wagimq_t7cJe2wQlg4Z15H-ZcUyzuY08b7A0vpaN/exec'
  };

  var dict = {};
  var lang = localStorage.getItem('ai_lang') || CONFIG.defaultLang;

  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

  function showModal(msg) {
    var existing = document.querySelector('.fixed.z-\\[100\\]');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 opacity-0 transition-opacity duration-300';
    // Small timeout to trigger fade in
    requestAnimationFrame(() => overlay.classList.remove('opacity-0'));

    var box = document.createElement('div');
    box.className = 'bg-slate-900 border border-white/20 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-95 transition-transform duration-300';
    requestAnimationFrame(() => box.classList.remove('scale-95'));

    var text = document.createElement('div');
    text.className = 'text-lg text-white mb-6 font-medium whitespace-pre-line leading-relaxed';
    text.textContent = msg;

    var btn = document.createElement('button');
    btn.className = 'inline-flex justify-center px-6 py-2.5 rounded-full bg-accent/20 border border-accent/50 text-white font-bold hover:bg-accent/30 hover:-translate-y-0.5 transition-all shadow-lg';
    btn.textContent = 'OK';
    btn.onclick = function () {
      overlay.classList.add('opacity-0');
      setTimeout(() => overlay.remove(), 300);
    };

    box.appendChild(text);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  function loadDict(nextLang) {
    console.log('📥 Loading dictionary from global data:', nextLang);
    return new Promise(function (resolve) {
      // Poll for data availability to handle async script load
      var attempts = 0;
      var interval = setInterval(function () {
        if (window.AI_LANG_DATA && window.AI_LANG_DATA[nextLang]) {
          clearInterval(interval);
          dict = window.AI_LANG_DATA[nextLang];
          console.log('✅ Dictionary loaded:', nextLang);
          resolve(true);
        } else {
          attempts++;
          if (attempts > 50) { // Timeout after 5 seconds
            clearInterval(interval);
            console.warn('⚠️ Dictionary load timeout for:', nextLang);
            resolve(false);
          }
        }
      }, 100);
    });
  }

  function t(key) {
    return (dict && dict[key]) ? dict[key] : key;
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem('ai_lang', lang);
    console.log('🌍 Language changed to:', lang);
    loadDict(lang).then(function () { render(); });
  }

  function bindReveal() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.12 });

    $$('.ai-fade', root).forEach(function (el) { obs.observe(el); });
  }

  function bindMotion() {
    // Experience cascade animation
    var expSection = $('#experience', root);
    if (expSection) {
      var items = $$('.group', expSection); // Changed selector to match new class
      var expObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          items.forEach(function (el, idx) {
            el.style.setProperty('--d', (idx * 120) + 'ms');
            el.classList.add('cascade-show');
          });
          expObs.disconnect();
        });
      }, { threshold: 0.15 });
      expObs.observe(expSection);
    }

    // Robot Face Tracking (3D Tilt) - Global Listener
    // Robot Face Tracking (3D Tilt) - Global Listener
    // REMOVED per user request: The static image should not move.
    // Only the background Spline 3D scene tracks the mouse (handled by Spline internal events).

    // Button glow follows cursor
    $$('button, .ai-btn, a[class*="rounded"]', root).forEach(function (btn) {
      if (btn.__btnGlowBound) return;
      btn.__btnGlowBound = true;

      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        btn.style.setProperty('--mx', x + '%');
        btn.style.setProperty('--my', y + '%');
      }, { passive: true });
    });
  }

  // Experience Item Hover Effects
  function bindExperienceHover() {
    console.log('🎯 Binding experience item hover effects...');
    var expItems = $$('.ai-item', root);
    console.log('📋 Found experience items:', expItems.length);

    expItems.forEach(function (item, idx) {
      var bullet = $('.ai-bullet', item);
      var title = item.querySelector('strong');
      var desc = item.querySelector('span');

      // Ensure style reset
      item.style.width = '100%';
      item.style.marginLeft = '0';
      item.style.maxWidth = '100%';

      // Mouse Enter
      item.addEventListener('mouseenter', function () {
        // Vertical emphasis only
        this.style.transform = 'translateY(-10px) translateZ(48px) scaleX(1) scaleY(1.12)';
        this.style.borderColor = 'rgba(255,122,24,.75)';
        this.style.boxShadow = '0 0 12px rgba(255,122,24,.35), 0 0 28px rgba(255,122,24,.22), 0 18px 55px rgba(0,0,0,.35)';
        this.style.background = 'rgba(255,255,255,.075)';
        this.style.zIndex = '100';
        this.style.padding = '22px 14px';
        this.style.width = '100%';
        this.style.marginLeft = '0';
        this.style.maxWidth = '100%';

        if (bullet) {
          bullet.style.transform = 'scale(1.6)';
          bullet.style.boxShadow = '0 0 35px rgba(79,209,255,1)';
          bullet.style.background = 'rgba(79,209,255,1)';
        }
        if (title) {
          title.style.fontSize = '22px';
          title.style.color = 'rgba(255,255,255,1)';
          title.style.fontWeight = '700';
        }
        if (desc) {
          desc.style.fontSize = '20px';
          desc.style.color = 'rgba(255,255,255,.95)';
        }
      });

      // Mouse Leave
      item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateZ(0) scaleX(1) scaleY(1)';
        this.style.borderColor = 'rgba(255,255,255,.12)';
        this.style.boxShadow = '';
        this.style.background = 'rgba(255,255,255,.05)';
        this.style.zIndex = '1';
        this.style.padding = '14px 14px';
        this.style.width = '100%';
        this.style.marginLeft = '0';
        this.style.maxWidth = '100%';

        if (bullet) {
          bullet.style.transform = 'scale(1)';
          bullet.style.boxShadow = '0 0 18px rgba(79,209,255,.35)';
          bullet.style.background = 'rgba(79,209,255,.9)';
        }
        if (title) {
          title.style.fontSize = '14.5px';
          title.style.color = '';
          title.style.fontWeight = '';
        }
        if (desc) {
          desc.style.fontSize = '14px';
          desc.style.color = 'var(--muted)';
        }
      });
    });

    console.log('✅ Experience hover effects bound (Standard Mode)');
  }

  function render() {
    console.log('🎨 Rendering page with language:', lang);

    var expData = [
      ['exp1_t', 'exp1_d'],
      ['exp2_t', 'exp2_d'],
      ['exp3_t', 'exp3_d'],
      ['exp4_t', 'exp4_d'],
      ['exp5_t', 'exp5_d'],
      ['exp6_t', 'exp6_d'],
      ['exp7_t', 'exp7_d'],
      ['exp8_t', 'exp8_d']
    ];

    var expItems = expData.map(function (item) {
      return (
        '<div class="ai-item relative flex gap-4 w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/10 group pointer-events-auto">' +
        '<div class="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_15px_rgba(79,209,255,0.5)] shrink-0 mt-1.5 transition-transform group-hover:scale-150 group-hover:bg-cyan-300"></div>' +
        '<div>' +
        '<strong class="block text-white text-base md:text-lg mb-1 group-hover:text-cyan-100 transition-colors">' + t(item[0]) + '</strong>' +
        '<span class="block text-muted text-sm md:text-base leading-relaxed group-hover:text-white/90 transition-colors">' + t(item[1]) + '</span>' +
        '</div>' +
        '</div>'
      );
    }).join('');

    var tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'];
    var tagItems = tags.map(function (k) {
      return '<span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-muted text-xs md:text-sm hover:border-accent hover:text-white hover:bg-white/10 transition-all cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(79,209,255,0.15)] hover:-translate-y-0.5 transform">' + t(k) + '</span>';
    }).join('');

    // Floating KO/EN toggle (Segmented Control)
    var langFloat =
      '<div class="fixed top-6 right-6 z-50 flex p-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl gap-0 pointer-events-auto">' +
      '<button id="btn-ko" type="button" class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all ' + (lang === 'ko' ? 'bg-accent/10 text-white shadow-[0_0_10px_rgba(79,209,255,0.2)] border border-accent/30 cursor-default' : 'text-white/50 hover:text-white cursor-pointer') + '">KO</button>' +
      '<button id="btn-en" type="button" class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all ' + (lang === 'en' ? 'bg-accent/10 text-white shadow-[0_0_10px_rgba(79,209,255,0.2)] border border-accent/30 cursor-default' : 'text-white/50 hover:text-white cursor-pointer') + '">EN</button>' +
      '</div>';


    // Initialize Spline Viewer with Blob URL (for file:// support and prod)
    function initSplineViewer() {
      if (window.SPLINE_DATA) {
        try {
          // Avoid double init
          var existingViewer = document.querySelector('spline-viewer');
          if (existingViewer && existingViewer.getAttribute('url')) return;

          console.log('📦 Initializing Spline Viewer with Blob...');
          var u8 = new Uint8Array(window.SPLINE_DATA);
          var blob = new Blob([u8], { type: 'application/octet-stream' });
          var url = URL.createObjectURL(blob);
          var viewer = document.querySelector('spline-viewer');
          if (viewer) {
            viewer.setAttribute('url', url);
            console.log('✅ Spline Viewer URL set');

            // Hide Spline Logo (User Request)
            const hideLogo = () => {
              if (viewer.shadowRoot) {
                const style = document.createElement('style');
                style.textContent = '#logo, a[href*="spline.design"] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }';
                viewer.shadowRoot.appendChild(style);
                console.log('🚫 Spline Logo Hidden');
              } else {
                setTimeout(hideLogo, 100);
              }
            };

            // Fix Spline Zoom: Force resize after load
            viewer.addEventListener('load', () => {
              console.log('✅ Spline Viewer Loaded');
              hideLogo();
              document.getElementById('spline-wrapper').style.opacity = 1;
              setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
              setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
            });
          }
        } catch (e) {
          console.error('❌ Spline data error:', e);
        }
      } else {
        // Poll for data (handled by index.html script mainly, but backup here)
        setTimeout(initSplineViewer, 100);
      }
    }
    // Start polling
    setTimeout(initSplineViewer, 100);


    root.innerHTML = [
      '<div id="spline-wrapper" style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:auto; opacity:0; transition: opacity 1.5s ease;">',
      '<spline-viewer style="width:100%; height:100%; display:block;" class="object-cover"></spline-viewer>',
      '</div>',
      '<div class="relative w-full overflow-hidden z-20 pointer-events-none">',
      langFloat,

      '<main id="top" class="pointer-events-none relative z-20">',

      // HERO SECTION
      '<section class="relative min-h-[560px] flex items-stretch border-b border-white/10 bg-gradient-to-r from-bg/35 via-bg/25 to-bg/10">',
      '<div class="absolute inset-0 bg-[url(\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=\')] opacity-20 pointer-events-none"></div>',

      '<div class="w-full max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20 text-center md:text-left">',

      // Left Column (Profile Card)
      '<aside class="pointer-events-auto md:col-span-4 relative group bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform scale-90 md:scale-100 origin-top mx-auto md:mx-0 max-w-[420px] transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(79,209,255,0.2)]">',
      '<div class="p-4">',
      '<div class="rounded-xl overflow-hidden border border-white/10 aspect-square">',
      '<img src="' + CONFIG.assetsBase + '/img/profile.jpg" alt="profile" class="w-full h-full object-cover" onerror="this.style.display=\'none\'">',
      '</div>',
      '</div>',
      '<div class="p-4 pt-0">',
      '<p class="text-white font-bold text-lg mb-1">' + t('profile_title') + '</p>',
      '<p class="text-muted text-sm leading-relaxed whitespace-pre-line">' + t('profile_meta') + '</p>',
      '</div>',
      '</aside>',

      // Right Column (Text Content)
      '<div class="pointer-events-auto md:col-span-8 flex flex-col items-center md:items-start">',
      '<div class="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-white/5 text-muted text-sm mb-4">',
      '<span class="w-2 h-2 rounded-full bg-accent animate-pulse-custom shadow-[0_0_10px_rgba(79,209,255,0.5)]"></span>',
      t('hero_kicker'),
      '</div>',

      '<h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4 flex flex-col">',
      '<span>' + t('hero_h1_line1') + '</span>',
      '<span>' + t('hero_h1_line2') + '</span>',
      '</h1>',

      '<p class="text-muted text-base md:text-lg max-w-2xl mb-8 leading-relaxed">' + t('hero_sub') + '</p>',

      '<div class="flex flex-wrap justify-center md:justify-start gap-3">',
      '<a class="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/80 bg-gradient-to-br from-accent/35 to-green-300/25 text-white font-bold text-base shadow-lg transition-transform hover:-translate-y-1 hover:shadow-accent/40 overflow-hidden" href="#experience">' + t('cta_experience') + '</a>',
      '<a class="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/80 bg-gradient-to-br from-accent/35 to-green-300/25 text-white font-bold text-base shadow-lg transition-transform hover:-translate-y-1 hover:shadow-accent/40 overflow-hidden" href="#contact">' + t('cta_contact') + '</a>',
      '</div>',

      // 3D Element
      '<div id="ai-robot-wrap" class="ai-3d-wrap mt-8 w-full max-w-sm rounded-[18px] bg-bg/20 border border-blue-400/20 shadow-2xl overflow-hidden">',
      '<img class="w-full h-auto block" src="' + CONFIG.assetsBase + '/img/speaker-3d.gif" alt="3D AI Speaker" onerror="console.error(\'Image load failed:\', this.src); this.style.display=\'none\';">',
      '</div>',

      '</div>', // End Right Column
      '</div>', // End Hero Inner
      '</section>',

      // About Section
      '<section id="about" class="relative py-20 bg-gradient-to-b from-transparent to-bg/50">',
      '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
      '<h2 class="text-3xl font-bold text-white mb-4 tracking-tight">' + t('about_h2') + '</h2>',
      '<p class="text-muted text-lg leading-relaxed max-w-3xl mb-8">' + t('about_lead') + '</p>',
      '<div class="grid grid-cols-12 gap-4">',
      '<div class="col-span-12 md:col-span-6 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-accent/60 hover:bg-white/10 transition-all hover:-translate-y-2">',
      '<h3 class="text-lg font-bold text-white mb-2">' + t('about_teach_h3') + '</h3>',
      '<p class="text-muted text-sm leading-relaxed">' + t('about_teach_p') + '</p>',
      '</div>',
      '</div>',
      '</div>',
      '</section>',

      // Experience Section
      '<section id="experience" class="relative py-20 bg-black/30 border-y border-white/5">',
      '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
      '<h2 class="text-3xl font-bold text-white mb-4 tracking-tight">' + t('exp_h2') + '</h2>',
      '<p class="text-muted text-lg leading-relaxed max-w-3xl mb-8">' + t('exp_lead') + '</p>',
      '<div class="flex flex-col gap-3">',
      expItems,
      '</div>',
      '</div>',
      '</section>',

      // Skills Section
      '<section id="skills" class="relative py-20 bg-cyan-400/[0.02]">',
      '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
      '<h2 class="text-3xl font-bold text-white mb-4 tracking-tight">' + t('skills_h2') + '</h2>',
      '<p class="text-muted text-lg leading-relaxed max-w-full w-full mb-8 whitespace-normal md:whitespace-nowrap md:tracking-tight">' + t('skills_lead') + '</p>',
      '<div class="flex flex-wrap gap-3 mt-4">',
      tagItems,
      '</div>',
      '</div>',
      '</section>',

      // Contact Section
      '<section id="contact" class="relative py-20 bg-gradient-to-t from-black/40 to-transparent">',
      '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
      '<h2 class="text-3xl font-bold text-white mb-4 tracking-tight">' + t('contact_h2') + '</h2>',
      '<p class="text-muted text-lg leading-relaxed max-w-3xl mb-8">' + t('contact_lead') + '</p>',

      '<div class="bg-gradient-to-br from-accent/10 to-white/5 border border-accent/20 rounded-2xl p-6 max-w-2xl">',

      '<div class="mb-4">',
      '<label class="block text-xs text-white/60 mb-1">' + t('contact_subject_label') + '</label>',
      '<input type="text" id="contact-subject" class="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors" placeholder="">',
      '</div>',

      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">',
      '<div>',
      '<label class="block text-xs text-white/60 mb-1">' + t('contact_name_label') + '</label>',
      '<input type="text" id="contact-name" class="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-accent focus:outline-none">',
      '</div>',
      '<div>',
      '<label class="block text-xs text-white/60 mb-1">' + t('contact_phone_label') + '</label>',
      '<input type="text" id="contact-phone" class="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-accent focus:outline-none">',
      '</div>',
      '</div>',

      '<div class="mb-6">',
      '<label class="block text-xs text-white/60 mb-1">' + t('contact_message_label') + '</label>',
      '<textarea id="contact-message" rows="4" class="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-accent focus:outline-none resize-y"></textarea>',
      '</div>',

      '<div class="flex justify-center w-full">',
      '<button id="btn-submit-contact" class="w-full md:w-1/3 flex justify-center items-center gap-2 px-6 py-3 rounded-xl border border-accent/80 bg-gradient-to-br from-accent/35 to-green-300/25 text-white font-bold text-base shadow-lg hover:-translate-y-1 hover:shadow-accent/40 transition-all">' + t('contact_submit_btn') + '</button>',
      '</div>',

      '</div>', // End Contact Box
      '<div class="text-muted2 text-xs mt-6 text-center md:text-left">' + t('footer_note') + '</div>',
      '</div>',
      '</section>',

      '</main>',
      '</div>'
    ].join('');


    // Fade in Spline background after short delay to hide initial black loading screen
    setTimeout(function () {
      var sw = document.getElementById('spline-wrapper');
      if (sw) sw.style.opacity = '1';
    }, 1000);


    // Bind language toggle buttons
    var btnKo = $('#btn-ko', root);
    var btnEn = $('#btn-en', root);
    if (btnKo) btnKo.addEventListener('click', function () { setLang('ko'); });
    if (btnEn) btnEn.addEventListener('click', function () { setLang('en'); });


    // Bind Contact Submit Button (Google Apps Script)
    var submitBtn = $('#btn-submit-contact', root);
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        var subject = $('#contact-subject').value;
        var name = $('#contact-name').value;
        var phone = $('#contact-phone').value;
        var message = $('#contact-message').value;

        if (!subject || !name || !message) {
          showModal(lang === 'ko' ? '모든 필수 항목을 입력해주세요.' : 'Please fill in all required fields.');
          return;
        }

        if (!CONFIG.scriptUrl) {
          // Fallback if user hasn't set up the script yet
          alert('Google Apps Script URL이 설정되지 않았습니다.\nmailto 방식으로 전환합니다.');
          var mailSubject = encodeURIComponent('[' + t('contact_subject_label') + '] ' + subject);
          var body = encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\n\n' + message);
          window.location.href = 'mailto:' + CONFIG.email + '?subject=' + mailSubject + '&body=' + body;
          return;
        }

        // showModal(lang === 'ko' ? '전송 중입니다...' : 'Sending...');

        // Prepare Form Data (Robust for GAS)
        var formData = new URLSearchParams();
        formData.append('subject', subject);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('message', message);

        // Send to Google Apps Script
        fetch(CONFIG.scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        })
          .then(() => {
            // Assume success
            showModal(lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.');
            $('#contact-subject').value = '';
            $('#contact-name').value = '';
            $('#contact-phone').value = '';
            $('#contact-message').value = '';
          })
          .catch(err => {
            console.error('Error:', err);
            showModal(lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send. Please contact via email.');
          });
      });
    }

    // Reveal + Motion must run after DOM render
    bindReveal();
    bindMotion();
    // bindExperienceHover(); // Disabled in favor of Tailwind CSS hover classes

    // Manual Event Binding for Experience Items (Safer than inline)
    $$('.ai-item', root).forEach(function (el) {
      el.style.pointerEvents = 'auto'; // Force enable
      el.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05) translateY(-5px)';
        this.style.zIndex = '50';
        this.style.backgroundColor = 'rgba(255,255,255,0.1)';
        this.style.boxShadow = '0 0 25px rgba(255, 122, 24, 0.6), 0 20px 40px rgba(0,0,0,0.4)';
        this.style.borderColor = '#ff7a18';
      });
      el.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
        this.style.backgroundColor = 'rgba(255,255,255,0.05)';
        this.style.boxShadow = 'none';
        this.style.borderColor = 'rgba(255,255,255,0.1)';
      });
    });

    console.log('✅ AI Landing Page Loaded Successfully');
    console.log('📁 Assets Base Path:', CONFIG.assetsBase);
    console.log('🌍 Current Language:', lang);
  }

  // Init: load dict then render
  console.log('🚀 Initializing AI Landing Page...');
  try {
    loadDict(lang)
      .then(function (loaded) {
        if (!loaded) {
          console.warn('⚠️ Using fallback dictionary (keys only)');
          dict = {};
        }
      })
      .finally(function () {
        try {
          render();
        } catch (e) {
          console.error('CRITICAL RENDER ERROR:', e);
          alert('오류 발생 (스크린샷 필요): ' + e.message);
          var root = document.getElementById('ai-landing-root');
          if (root) {
            root.innerHTML = '<div style="color:red; font-size:20px; padding:50px; text-align:center;">⚠️ 렌더링 오류가 발생했습니다.<br>' + e.message + '</div>';
          }
        }
      });
  } catch (e) {
    console.error('INIT ERROR:', e);
    alert('초기화 오류: ' + e.message);
  }
})();
