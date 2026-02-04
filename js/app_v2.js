(function () {
    'use strict';

    document.documentElement.classList.add('js');

    // Enhanced CSS for comprehensive glassmorphic design
    var dynamicStyle = document.createElement('style');
    dynamicStyle.innerHTML = `
      /* Core Glassmorphism Styles */
      .glass-panel {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4),
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                      0 0 20px rgba(79, 209, 255, 0.15);
          position: relative;
      }
      
      .glass-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.4) 0%,
              rgba(79, 209, 255, 0.3) 25%,
              transparent 50%,
              rgba(255, 122, 24, 0.2) 75%,
              rgba(255, 255, 255, 0.3) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.6;
          pointer-events: none;
      }
      
      .glass-glow {
          filter: drop-shadow(0 0 20px rgba(79, 209, 255, 0.3))
                  drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
      }
      
      .glass-button {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 16px rgba(79, 209, 255, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
      }
      
      .glass-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
      }
      
      .glass-button:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(79, 209, 255, 0.6);
          box-shadow: 0 8px 24px rgba(79, 209, 255, 0.6),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
      }
      
      .glass-button:hover::after {
          width: 300px;
          height: 300px;
      }
      
      .glass-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3),
                      inset 0 0 20px rgba(255, 255, 255, 0.03);
          transition: all 0.3s ease;
      }
      
      .glass-card:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(79, 209, 255, 0.4);
          box-shadow: 0 8px 24px rgba(79, 209, 255, 0.3),
                      inset 0 0 30px rgba(255, 255, 255, 0.05);
          transform: translateY(-4px);
      }

      .ai-item { 
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      box-shadow 0.3s ease, 
                      border-color 0.3s ease, 
                      background-color 0.3s ease; 
      }
      
      .ai-item:hover { 
          transform: scale(1.02) translateY(-4px) !important; 
          z-index: 50 !important; 
          box-shadow: 0 0 25px rgba(255, 122, 24, 0.6), 
                      0 20px 40px rgba(0,0,0,0.4) !important; 
          border-color: rgba(255, 122, 24, 0.8) !important; 
          background-color: rgba(255,255,255,0.12) !important; 
      }

      /* Galaxy Cursor */
      body, a, button, input, textarea, .ai-item { cursor: none !important; }
      .ai-cursor-head {
          position: fixed; top: 0; left: 0;
          width: 20px; height: 20px;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(79,209,255,0.9) 30%, rgba(79,209,255,0) 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          box-shadow: 0 0 16px rgba(79,209,255,0.6);
          transition: transform 0.1s ease-out;
      }
      .ai-star-particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          animation: particleFade 1.5s forwards ease-out;
          box-shadow: 0 0 6px currentColor;
      }
      @keyframes particleFade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.2) translateY(10px); }
      }
      
      .ai-fade {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      .ai-fade.show {
          opacity: 1;
          transform: translateY(0);
      }
      
      @keyframes cascadeIn {
          from {
              opacity: 0;
              transform: translateY(20px);
              filter: blur(4px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
          }
      }
      .cascade-show {
          animation: cascadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: var(--d, 0ms);
          opacity: 0;
      }
  `;
    document.head.appendChild(dynamicStyle);

    if (!document.querySelector('script[src*="lang-data.js"]')) {
        const langScript = document.createElement('script');
        langScript.src = 'js/lang-data.js';
        document.head.appendChild(langScript);
    }

    if (!document.querySelector('link[href*="font-awesome"]')) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
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
        requestAnimationFrame(() => overlay.classList.remove('opacity-0'));

        var box = document.createElement('div');
        box.className = 'glass-panel rounded-2xl p-8 max-w-sm w-full text-center transform scale-95 transition-transform duration-300';
        requestAnimationFrame(() => box.classList.remove('scale-95'));

        var text = document.createElement('div');
        text.className = 'text-lg text-white mb-6 font-medium whitespace-pre-line leading-relaxed';
        text.textContent = msg;

        var btn = document.createElement('button');
        btn.className = 'glass-button px-6 py-2.5 rounded-full text-white font-bold transition-all';
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
        console.log('📥 Loading dictionary:', nextLang);
        return new Promise(function (resolve) {
            var attempts = 0;
            var interval = setInterval(function () {
                if (window.AI_LANG_DATA && window.AI_LANG_DATA[nextLang]) {
                    clearInterval(interval);
                    dict = window.AI_LANG_DATA[nextLang];
                    console.log('✅ Dictionary loaded:', nextLang);
                    resolve(true);
                } else {
                    attempts++;
                    if (attempts > 50) {
                        clearInterval(interval);
                        console.warn('⚠️ Dictionary load timeout');
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
        var expSection = $('#experience', root);
        if (expSection) {
            var items = $$('.group', expSection);
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

    function initGalaxyCursor() {
        console.log('✨ Initializing Galaxy Cursor...');
        var cursor = document.createElement('div');
        cursor.className = 'ai-cursor-head';
        document.body.appendChild(cursor);

        var colors = ['#4fd1ff', '#ffffff', '#a78bfa', '#ff7a18'];
        let throttleTimer = null;

        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            if (throttleTimer) return;
            throttleTimer = setTimeout(() => { throttleTimer = null; }, 15);

            for (let i = 0; i < 2; i++) {
                var p = document.createElement('div');
                p.className = 'ai-star-particle';

                var size = Math.random() * 4 + 1 + 'px';
                var color = colors[Math.floor(Math.random() * colors.length)];
                var offsetX = (Math.random() - 0.5) * 40;
                var offsetY = (Math.random() - 0.5) * 40;

                p.style.width = size;
                p.style.height = size;
                p.style.backgroundColor = color;
                p.style.left = (e.clientX + offsetX) + 'px';
                p.style.top = (e.clientY + offsetY) + 'px';
                p.style.boxShadow = '0 0 5px ' + color;

                document.body.appendChild(p);
                setTimeout(() => { p.remove(); }, 800 + Math.random() * 200);
            }
        });

        document.addEventListener('mouseover', function (e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('.ai-item')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,122,24,0.8) 40%, rgba(255,122,24,0) 70%)';
            } else {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(79,209,255,0.9) 30%, rgba(79,209,255,0) 70%)';
            }
        });
    }

    function initSplineViewer() {
        if (window.SPLINE_DATA) {
            try {
                var existingViewer = document.querySelector('spline-viewer');
                if (existingViewer && existingViewer.getAttribute('url')) return;

                console.log('📦 Initializing Spline Viewer...');
                var u8 = new Uint8Array(window.SPLINE_DATA);
                var blob = new Blob([u8], { type: 'application/octet-stream' });
                var url = URL.createObjectURL(blob);
                var viewer = document.querySelector('spline-viewer');
                if (viewer) {
                    viewer.setAttribute('url', url);
                    console.log('✅ Spline Viewer loaded');

                    const hideLogo = () => {
                        if (viewer.shadowRoot) {
                            const style = document.createElement('style');
                            style.textContent = '#logo, a[href*="spline.design"] { display: none !important; }';
                            viewer.shadowRoot.appendChild(style);
                        } else {
                            setTimeout(hideLogo, 100);
                        }
                    };
                    hideLogo();
                }
            } catch (e) {
                console.error('❌ Spline error:', e);
            }
        } else {
            setTimeout(initSplineViewer, 100);
        }
    }

    function render() {
        console.log('🎨 Rendering glassmorphic design...');

        var expData = [
            ['exp1_t', 'exp1_d', 'fa-laptop-code'],
            ['exp2_t', 'exp2_d', 'fa-chalkboard-user'],
            ['exp3_t', 'exp3_d', 'fa-earth-asia'],
            ['exp4_t', 'exp4_d', 'fa-robot'],
            ['exp5_t', 'exp5_d', 'fa-magnifying-glass-chart'],
            ['exp6_t', 'exp6_d', 'fa-user-tie'],
            ['exp7_t', 'exp7_d', 'fa-server'],
            ['exp8_t', 'exp8_d', 'fa-industry']
        ];

        var expItems = expData.map(function (item) {
            return (
                '<div class="ai-item glass-card rounded-2xl p-6 flex gap-5 pointer-events-auto group">' +
                '<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-cyan-400/10 border border-accent/30 flex items-center justify-center shrink-0 shadow-lg group-hover:from-accent/30 group-hover:to-cyan-400/20 transition-all">' +
                '<i class="fa-solid ' + item[2] + ' text-xl text-accent group-hover:text-white transition-colors"></i>' +
                '</div>' +
                '<div>' +
                '<strong class="block text-white text-lg md:text-xl mb-2 group-hover:text-cyan-100 transition-colors">' + t(item[0]) + '</strong>' +
                '<span class="block text-white/80 text-sm md:text-base leading-relaxed group-hover:text-white/95 transition-colors">' + t(item[1]) + '</span>' +
                '</div>' +
                '</div>'
            );
        }).join('');

        var tags = [
            { k: 'tag1', i: 'fa-robot' },
            { k: 'tag2', i: 'fa-bullhorn' },
            { k: 'tag3', i: 'fa-language' },
            { k: 'tag4', i: 'fa-code' },
            { k: 'tag5', i: 'fa-brain' },
            { k: 'tag6', i: 'fa-pen-nib' }
        ];
        var tagItems = tags.map(function (obj) {
            return '<span class="glass-button inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs md:text-sm cursor-default">' +
                '<i class="fa-solid ' + obj.i + ' text-accent"></i>' +
                t(obj.k) +
                '</span>';
        }).join('');

        var langFloat =
            '<div class="fixed top-20 right-8 z-50 flex gap-2 pointer-events-auto">' +
            '<button id="btn-ko" type="button" class="glass-button px-3 py-1.5 rounded-full text-xs font-semibold transition-all ' + (lang === 'ko' ? 'bg-accent/30 text-white border-accent/60 shadow-lg shadow-accent/30' : 'text-white/70 hover:text-white hover:bg-white/10') + '">KO</button>' +
            '<button id="btn-en" type="button" class="glass-button px-3 py-1.5 rounded-full text-xs font-semibold transition-all ' + (lang === 'en' ? 'bg-accent/30 text-white border-accent/60 shadow-lg shadow-accent/30' : 'text-white/70 hover:text-white hover:bg-white/10') + '">EN</button>' +
            '</div>';

        setTimeout(initSplineViewer, 100);

        root.innerHTML = [
            '<div id="spline-wrapper" style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:auto; opacity:0; transition: opacity 1.5s ease;">',
            '<spline-viewer style="width:100%; height:100%; display:block;"></spline-viewer>',
            '</div>',

            '<div class="relative w-full overflow-hidden z-20 pointer-events-none">',
            langFloat,

            '<main class="pointer-events-none relative z-20">',

            // HERO SECTION - Large Glass Panel
            '<section class="relative py-10">',
            '<div class="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch px-6">',

            // Profile Card - Left Side Glass Panel
            '<aside class="md:col-span-4 pointer-events-auto glass-panel glass-glow rounded-3xl p-6 transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">',
            '<div class="rounded-2xl overflow-hidden border border-white/20 mb-4 flex-shrink-0">',
            '<img src="' + CONFIG.assetsBase + '/img/profile.jpg" alt="profile" class="w-full h-full object-cover" onerror="this.style.display=\'none\'">',
            '</div>',
            '<div class="text-center flex-grow flex flex-col justify-center break-keep">',
            '<p class="text-white font-bold text-lg mb-2">' + t('profile_title') + '</p>',
            '<p class="text-white/80 text-sm leading-relaxed">' + t('profile_meta') + '</p>',
            '<div class="mt-4 text-white/90 text-sm space-y-1">',
            '<p><i class="fa-solid fa-phone mr-2 text-accent"></i>010-3327-2581</p>',
            '<p><i class="fa-solid fa-envelope mr-2 text-accent"></i>mrsure@daum.net</p>',
            '</div>',
            '</div>',
            '</aside>',

            // Main Hero Content - Right Side Glass Panel
            '<div class="md:col-span-8 pointer-events-auto glass-panel glass-glow rounded-3xl p-8 md:p-12 flex flex-col justify-center h-full text-center break-keep">',
            '<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-white text-base mb-6 mx-auto">',
            '<span class="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(79,209,255,0.8)]"></span>',
            t('hero_kicker'),
            '</div>',

            '<h1 class="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6" style="line-height: 1.6;">',
            t('hero_h1_line1'),
            '</h1>',

            '<p class="text-white/90 text-base md:text-lg mx-auto mb-8 leading-relaxed max-w-3xl">' + t('hero_sub') + '</p>',

            '<div class="flex flex-wrap gap-4 justify-center">',
            '<a class="glass-button px-8 py-4 rounded-2xl text-white font-bold text-base" href="#experience">' + t('cta_experience') + '</a>',
            '<a class="glass-button px-8 py-4 rounded-2xl text-white font-bold text-base" href="#contact">' + t('cta_contact') + '</a>',
            '</div>',
            '</div>',

            '</div>',
            '</section>',

            // About Section - Glass Panel
            '<section id="about" class="relative py-10">',
            '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
            '<div class="glass-panel glass-glow rounded-3xl p-8 md:p-12">',
            '<h2 class="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-accent">' + t('about_h2') + '</h2>',
            '<div class="text-white/90 text-lg mb-8">' + t('about_lead') + '</div>',

            '<div class="glass-card rounded-2xl p-6">',
            '<div class="flex items-center gap-3 mb-4">',
            '<div class="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40">',
            '<i class="fa-solid fa-chalkboard-user text-accent text-xl"></i>',
            '</div>',
            '<h3 class="text-xl font-bold text-white">' + t('about_teach_h3') + '</h3>',
            '</div>',
            '<div class="text-white/80 leading-relaxed pl-0 md:pl-[60px]">' + t('about_teach_p') + '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</section>',

            // Experience Section - Glass Panel
            '<section id="experience" class="relative py-10">',
            '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
            '<div class="glass-panel glass-glow rounded-3xl p-8 md:p-12">',
            '<h2 class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-accent">' + t('exp_h2') + '</h2>',
            '<p class="text-white/80 text-lg leading-relaxed mb-8">' + t('exp_lead') + '</p>',
            '<div class="flex flex-col gap-4">',
            expItems,
            '</div>',
            '</div>',
            '</div>',
            '</section>',

            // Skills Section - Glass Panel
            '<section id="skills" class="relative py-10">',
            '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
            '<div class="glass-panel glass-glow rounded-3xl p-8 md:p-12">',
            '<h2 class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-accent">' + t('skills_h2') + '</h2>',
            '<p class="text-white/80 text-lg leading-relaxed mb-8">' + t('skills_lead') + '</p>',
            '<div class="flex flex-wrap gap-3">',
            tagItems,
            '</div>',
            '</div>',
            '</div>',
            '</section>',

            // Contact Section - Glass Panel
            '<section id="contact" class="relative py-10 pb-20">',
            '<div class="pointer-events-auto max-w-[1120px] mx-auto px-6 ai-fade">',
            '<div class="glass-panel glass-glow rounded-3xl p-8 md:p-12">',
            '<h2 class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-accent">' + t('contact_h2') + '</h2>',
            '<p class="text-white/80 text-lg leading-relaxed mb-8">' + t('contact_lead') + '</p>',

            '<div class="glass-card rounded-2xl p-6 max-w-2xl">',
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">',
            '<div>',
            '<label class="block text-sm text-accent font-bold mb-2">' + t('contact_name_label') + '</label>',
            '<input type="text" id="contact-name" class="w-full p-3 glass-button rounded-lg text-white focus:border-accent focus:outline-none">',
            '</div>',
            '<div>',
            '<label class="block text-sm text-accent font-bold mb-2">' + t('contact_phone_label') + '</label>',
            '<input type="text" id="contact-phone" class="w-full p-3 glass-button rounded-lg text-white focus:border-accent focus:outline-none">',
            '</div>',
            '</div>',

            '<div class="mb-4">',
            '<label class="block text-sm text-accent font-bold mb-2">' + t('contact_subject_label') + '</label>',
            '<input type="text" id="contact-subject" class="w-full p-3 glass-button rounded-lg text-white focus:outline-none focus:border-accent">',
            '</div>',

            '<div class="mb-6">',
            '<label class="block text-sm text-accent font-bold mb-2">' + t('contact_message_label') + '</label>',
            '<textarea id="contact-message" rows="4" class="w-full p-3 glass-button rounded-lg text-white focus:border-accent focus:outline-none resize-y"></textarea>',
            '</div>',

            '<div class="flex justify-center">',
            '<button id="btn-submit-contact" class="px-8 py-3 rounded-xl text-white font-bold text-base bg-gradient-to-r from-orange-500 to-amber-500 border border-orange-400/60 hover:from-orange-400 hover:to-amber-400 shadow-lg hover:shadow-orange-500/50 transition-all">' + t('contact_submit_btn') + '</button>',
            '</div>',
            '</div>',

            '<div class="text-white/60 text-xs mt-6 text-center">' + t('footer_note') + '</div>',
            '</div>',
            '</div>',
            '</section>',

            '</main>',
            '</div>'
        ].join('');

        setTimeout(function () {
            var sw = document.getElementById('spline-wrapper');
            if (sw) sw.style.opacity = '1';
        }, 1000);

        var btnKo = $('#btn-ko', root);
        var btnEn = $('#btn-en', root);
        if (btnKo) btnKo.addEventListener('click', function () { setLang('ko'); });
        if (btnEn) btnEn.addEventListener('click', function () { setLang('en'); });

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
                    var mailSubject = encodeURIComponent('[' + t('contact_subject_label') + '] ' + subject);
                    var body = encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\n\n' + message);
                    window.location.href = 'mailto:' + CONFIG.email + '?subject=' + mailSubject + '&body=' + body;
                    return;
                }

                var formData = new URLSearchParams();
                formData.append('subject', subject);
                formData.append('name', name);
                formData.append('phone', phone);
                formData.append('message', message);

                fetch(CONFIG.scriptUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                })
                    .then(() => {
                        showModal(lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.');
                        $('#contact-subject').value = '';
                        $('#contact-name').value = '';
                        $('#contact-phone').value = '';
                        $('#contact-message').value = '';
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        showModal(lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send.');
                    });
            });
        }

        bindReveal();
        bindMotion();
        initGalaxyCursor();

        console.log('✅ Glassmorphic Landing Page Loaded');
    }

    console.log('🚀 Initializing...');
    loadDict(lang)
        .then(function (loaded) {
            if (!loaded) dict = {};
        })
        .finally(function () {
            try {
                render();
            } catch (e) {
                console.error('ERROR:', e);
                alert('오류: ' + e.message);
            }
        });
})();
