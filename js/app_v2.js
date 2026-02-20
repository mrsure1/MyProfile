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
      
      /* Marquee Animation */
      @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
      }
      .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
      }
      .animate-marquee:hover {
          animation-play-state: paused;
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
    var portfolioRoot = document.getElementById('ai-portfolio-root');

    if (!root && !portfolioRoot) {
        console.error('❌ Root element not found!');
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

    // --- Portfolio Data ---
    var portfolioData = [
        {
            id: 'p1',
            title: '안심콜타리',
            desc: { ko: '치매 환자 보호자를 위한 스마트 안전 알림 앱. 환자 안전 상태 모니터링 및 보호자 연결 서비스.', en: 'Smart safety alert app for dementia caregivers. Real-time patient monitoring and caregiver connection service.' },
            img: 'img/portfolio_anshim.jpg',
            tags: ['Mobile App', 'Healthcare', 'AI']
        },
        {
            id: 'p2',
            title: 'Receipt Master',
            desc: { ko: '영수증 자동 인식 및 가계부 관리 앱. AI 기반 지출 분류 및 스마트 영수증 정리 솔루션.', en: 'Automatic receipt recognition and expense tracking app. AI-powered spending categorization and receipt management.' },
            img: 'img/portfolio_receipt.jpg',
            tags: ['Mobile App', 'FinTech', 'OCR']
        },
        {
            id: 'p3',
            title: 'PolicyMatch Korea',
            desc: { ko: '대한민국 정책자금 맞춤 매칭 플랫폼. 소상공인·개인을 위한 정부 지원금 탐색 및 신청 로드맵 서비스.', en: 'Korea policy fund matching platform. Government grant discovery and application roadmap for SMEs and individuals.' },
            img: 'img/portfolio_policy.png',
            tags: ['Web App', 'Next.js', 'AI Matching']
        }
    ];

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

    // --- RENDER PORTFOLIO PAGE ---
    function renderPortfolio() {
        console.log('🎨 Rendering Portfolio Page...');

        // Header / Nav
        var nav =
            '<nav class="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 px-6 py-4 flex justify-between items-center">' +
            '<a href="index.html" class="text-white font-bold text-xl flex items-center gap-2 hover:text-accent transition-colors"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>' +
            '<div class="flex gap-4">' +
            '<button id="btn-ko" type="button" class="glass-button px-3 py-1.5 rounded-full text-xs font-semibold ' + (lang === 'ko' ? 'bg-accent/30 text-white' : 'text-white/70') + '">KO</button>' +
            '<button id="btn-en" type="button" class="glass-button px-3 py-1.5 rounded-full text-xs font-semibold ' + (lang === 'en' ? 'bg-accent/30 text-white' : 'text-white/70') + '">EN</button>' +
            '</div>' +
            '</nav>';

        // Grid Items
        var gridItems = portfolioData.map(function (item) {
            var tagsHtml = item.tags.map(t => '<span class="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">' + t + '</span>').join('');
            var desc = lang === 'ko' ? item.desc.ko : item.desc.en;
            return (
                '<div class="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">' +
                '<div class="aspect-video bg-black/50 overflow-hidden relative">' +
                '<img src="' + item.img + '" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">' +
                '<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>' +
                '<div class="absolute bottom-4 left-4 right-4">' +
                '<h3 class="text-white font-bold text-xl mb-1">' + item.title + '</h3>' +
                '</div>' +
                '</div>' +
                '<div class="p-6">' +
                '<p class="text-muted text-sm leading-relaxed mb-4">' + desc + '</p>' +
                '<div class="flex flex-wrap gap-2">' + tagsHtml + '</div>' +
                '</div>' +
                '</div>'
            );
        }).join('');

        portfolioRoot.innerHTML =
            nav +
            '<main class="pt-24 pb-20 px-6 max-w-7xl mx-auto">' +
            '<h1 class="text-4xl md:text-5xl font-bold text-white mb-8 text-center tracking-tight">Portfolio</h1>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ai-fade show">' +
            gridItems +
            '</div>' +
            '</main>' +
            '<div class="text-center text-white/40 text-xs pb-8">' + t('footer_note') + '</div>';

        // Bind Lang Buttons
        var btnKo = $('#btn-ko', portfolioRoot);
        var btnEn = $('#btn-en', portfolioRoot);
        if (btnKo) btnKo.addEventListener('click', function () { setLang('ko'); });
        if (btnEn) btnEn.addEventListener('click', function () { setLang('en'); });

        initGalaxyCursor();
    }

    // --- RENDER LANDING PAGE ---
    function render() {
        if (portfolioRoot) {
            renderPortfolio();
            return;
        }

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

        // setTimeout(initSplineViewer, 100); // Using Iframe for external Spline URL

        root.innerHTML = [
            '<div id="spline-wrapper" style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:auto; opacity:0; transition: opacity 1.5s ease;">',
            '<iframe src="https://my.spline.design/holographicearthwithdynamiclines-lgNYO4b6WDMRTXq4Vvu4REtA/" frameborder="0" width="100%" height="100%" style="border:none;" allow="autoplay; fullscreen; xr-spatial-tracking" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"></iframe>',
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

            '</div>',
            '</section>',

            // Portfolio Carousel (New Section)
            '<section class="relative py-10 overflow-hidden">',
            '<div class="max-w-[1120px] mx-auto px-6 pointer-events-auto ai-fade">',
            '<div class="flex justify-between items-end mb-6">',
            '<h2 class="text-3xl font-bold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Portfolio</h2>',
            '<a href="portfolio.html" class="text-sm text-accent hover:text-white transition-colors flex items-center gap-1">View All <i class="fa-solid fa-arrow-right"></i></a>',
            '</div>',
            // Carousel Container
            // Carousel Container (Marquee)
            '<div class="w-full overflow-hidden mask-linear-fade">',
            '<div class="flex gap-6 animate-marquee">',
            // Duplicate data 3 times for smooth infinite loop on wide screens
            [...portfolioData, ...portfolioData, ...portfolioData].map(function (item) {
                var desc = lang === 'ko' ? item.desc.ko : item.desc.en;
                return (
                    '<div class="shrink-0 w-[280px] md:w-[320px] glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/50 transition-colors" onclick="location.href=\'portfolio.html\'">' +
                    '<div class="h-40 bg-black/50 relative overflow-hidden">' +
                    '<img src="' + item.img + '" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">' +
                    '</div>' +
                    '<div class="p-4">' +
                    '<h3 class="text-lg font-bold text-white mb-1 truncate">' + item.title + '</h3>' +
                    '<p class="text-xs text-white/60 line-clamp-2">' + desc + '</p>' +
                    '</div>' +
                    '</div>'
                );
            }).join(''),
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

            '<div class="glass-card rounded-2xl p-8 max-w-2xl mx-auto border border-white/10 shadow-2xl relative overflow-hidden group/form">',
            '<div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 pointer-events-none"></div>',

            // Form Element Wrapper
            '<form id="contact-form" class="relative z-10">',

            '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">',
            '<div class="space-y-2">',
            '<label class="block text-xs font-bold text-accent tracking-wider uppercase ml-1">' + t('contact_name_label') + '</label>',
            '<input required type="text" id="contact-name" class="w-full p-4 glass-button rounded-xl text-white placeholder-white/30 focus:border-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(79,209,255,0.3)] transition-all outline-none" placeholder="Name">',
            '</div>',
            '<div class="space-y-2">',
            '<label class="block text-xs font-bold text-accent tracking-wider uppercase ml-1">' + t('contact_phone_label') + '</label>',
            '<input required type="text" id="contact-phone" class="w-full p-4 glass-button rounded-xl text-white placeholder-white/30 focus:border-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(79,209,255,0.3)] transition-all outline-none" placeholder="Phone">',
            '</div>',
            '</div>',

            '<div class="mb-6 space-y-2">',
            '<label class="block text-xs font-bold text-accent tracking-wider uppercase ml-1">' + t('contact_subject_label') + '</label>',
            '<input required type="text" id="contact-subject" class="w-full p-4 glass-button rounded-xl text-white placeholder-white/30 focus:border-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(79,209,255,0.3)] transition-all outline-none" placeholder="Subject">',
            '</div>',

            '<div class="mb-8 space-y-2">',
            '<label class="block text-xs font-bold text-accent tracking-wider uppercase ml-1">' + t('contact_message_label') + '</label>',
            '<textarea required id="contact-message" rows="5" class="w-full p-4 glass-button rounded-xl text-white placeholder-white/30 focus:border-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(79,209,255,0.3)] transition-all outline-none resize-none" placeholder="Message..."></textarea>',
            '</div>',

            '<div class="flex justify-center">',
            '<button type="submit" id="btn-submit-contact" class="group relative px-10 py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-orange-500 to-amber-500 border border-orange-400/60 shadow-[0_4px_20px_rgba(255,122,24,0.4)] hover:shadow-[0_8px_30px_rgba(255,122,24,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all overflow-hidden">',
            '<span class="relative z-10 flex items-center gap-2">',
            t('contact_submit_btn') + ' <i class="fa-solid fa-paper-plane text-sm group-hover:translate-x-1 transition-transform"></i>',
            '</span>',
            '<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>',
            '</button>',
            '</div>',

            '</form>', // Close Form
            '</div>', // Close Glass Card

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

        var contactForm = $('#contact-form', root);
        var submitBtn = $('#btn-submit-contact', root);

        if (contactForm && submitBtn) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                var subject = $('#contact-subject').value;
                var name = $('#contact-name').value;
                var phone = $('#contact-phone').value;
                var message = $('#contact-message').value;

                // Browser handles validation now because of 'required' attribute
                // Code below runs only if form is valid

                // UI Loading State
                var originalBtnText = submitBtn.textContent;
                submitBtn.disabled = true;
                // Preserve icon by only changing text node if possible, but simplest is to just set HTML
                submitBtn.innerHTML = '<span class="relative z-10 flex items-center gap-2">Sending... <i class="fa-solid fa-spinner fa-spin text-sm"></i></span>';
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';

                // Find container (glass-card) - parent of form
                var container = contactForm.parentNode;

                // Remove any existing status message
                var existingStatus = container.querySelector('.status-msg');
                if (existingStatus) existingStatus.remove();

                if (!CONFIG.scriptUrl) {
                    // Fallback to mailto
                    window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);

                    // Reset Button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="relative z-10 flex items-center gap-2">' + t('contact_submit_btn') + ' <i class="fa-solid fa-paper-plane text-sm"></i></span>';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
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
                        // Success UI
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<span class="relative z-10 flex items-center gap-2">' + t('contact_submit_btn') + ' <i class="fa-solid fa-paper-plane text-sm"></i></span>';
                        submitBtn.style.opacity = '1';
                        submitBtn.style.cursor = 'pointer';

                        // Clear form
                        $('#contact-subject').value = '';
                        $('#contact-name').value = '';
                        $('#contact-phone').value = '';
                        $('#contact-message').value = '';

                        // Show Success Message
                        var successMsg = document.createElement('p');
                        successMsg.className = 'status-msg text-green-400 text-center mt-4 font-bold animate-pulse';
                        successMsg.textContent = lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.';
                        container.appendChild(successMsg);

                        setTimeout(() => { if (successMsg) successMsg.remove(); }, 5000);
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        // Error UI
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<span class="relative z-10 flex items-center gap-2">' + t('contact_submit_btn') + ' <i class="fa-solid fa-paper-plane text-sm"></i></span>';
                        submitBtn.style.opacity = '1';
                        submitBtn.style.cursor = 'pointer';

                        var errorMsg = document.createElement('p');
                        errorMsg.className = 'status-msg text-red-400 text-center mt-4 font-bold';
                        errorMsg.textContent = lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send. Please email directly.';
                        container.appendChild(errorMsg);
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
