(function () {
    'use strict';

    document.documentElement.classList.add('js');

    // Enhanced CSS for comprehensive glassmorphic design
    var dynamicStyle = document.createElement('style');
    dynamicStyle.innerHTML = `
      /* Core Glassmorphism Styles */
      .glass-panel {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.15);
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
          opacity: 0.25;
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
        console.error('??Root element not found!');
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
    var SPLINE_SCENE_URL = 'https://my.spline.design/holographicearthwithdynamiclines-lgNYO4b6WDMRTXq4Vvu4REtA/';
    var SPLINE_REFRESH_COOLDOWN_MS = 1200;
    var splineLifecycleBound = false;
    var splineLastRefreshAt = 0;
    var splineLastHiddenAt = 0;

    function $(sel, el) { return (el || document).querySelector(sel); }
    function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

    // --- ?�트?�리???�이??(?�제 ?�로?�트 기반 ?�세 ?�보 ?�함) ---
    var portfolioData = [
        {
            id: 'p1',
            title: '안심 알리미 (DementiaGuard)',
            desc: {
                ko: '치매 환자 보호자를 위한 스마트 안전 알림 앱입니다. Geofencing 기반 실시간 위치 추적과 긴급 알림 시스템으로 환자 안전을 지킵니다.',
                en: 'Smart safety alert app for dementia caregivers. Real-time location tracking with Geofencing and emergency alert system.'
            },
            img: 'img/portfolio_anshim.png',
            tags: ['React Native', 'Firebase', 'TypeScript'],
            techStack: {
                ko: ['React Native 0.76', 'Firebase (Firestore, FCM, Cloud Functions)', 'react-native-background-geolocation', 'react-native-maps', 'react-native-tts', 'TypeScript'],
                en: ['React Native 0.76', 'Firebase (Firestore, FCM, Cloud Functions)', 'react-native-background-geolocation', 'react-native-maps', 'react-native-tts', 'TypeScript']
            },
            features: {
                ko: [
                    'Geofencing 기반 안전지대 이탈 자동 감지',
                    '백그라운드 실시간 위치 추적 (10m 단위)',
                    'TTS 긴급 음성 알림 + 시스템 볼륨 자동 최대',
                    'FCM 푸시 알림으로 보호자에게 긴급 전파',
                    '보호자용 실시간 지도 및 안전지대 설정'
                ],
                en: [
                    'Auto-detect safe zone exit via Geofencing',
                    'Background real-time tracking (10m interval)',
                    'TTS emergency voice alert + auto max volume',
                    'FCM push notification to caregivers',
                    'Caregiver real-time map & safe zone management'
                ]
            },
            architecture: {
                ko: '환자/보호자 이중 앱 구조와 Cloud Functions 기반 서버리스 백엔드로 구성된 Android/iOS 크로스플랫폼 앱',
                en: 'Dual app (Patient/Caregiver) with Cloud Functions serverless backend and Android/iOS support'
            },
            platform: 'Mobile (Android / iOS)'
        },
        {
            id: 'p2',
            title: 'Receipt Master',
            desc: {
                ko: 'Gemini AI 기반 영수증 자동 인식 및 스마트 가계부 앱입니다. 사진 촬영만으로 지출을 분류하고 통계를 제공합니다.',
                en: 'Gemini AI-powered receipt scanner and smart expense tracker. Auto-categorize expenses with just a photo.'
            },
            img: 'img/portfolio_receipt.jpg',
            tags: ['React', 'Vite', 'Gemini AI'],
            techStack: {
                ko: ['React 19 + TypeScript', 'Vite 6', 'Google Gemini AI (@google/genai)', 'Recharts (통계 차트)', 'Lucide React (아이콘)', 'PWA (Service Worker)'],
                en: ['React 19 + TypeScript', 'Vite 6', 'Google Gemini AI (@google/genai)', 'Recharts (Statistics)', 'Lucide React (Icons)', 'PWA (Service Worker)']
            },
            features: {
                ko: [
                    'AI 영수증 이미지 분석 (Gemini Vision)',
                    '자동 카테고리 분류 (식비, 교통, 쇼핑 등 7개)',
                    '다중 영수증 일괄 업로드 및 큐 처리',
                    '일/월 지출 통계 대시보드',
                    'CSV 내보내기 및 PWA 설치 지원'
                ],
                en: [
                    'AI receipt image analysis (Gemini Vision)',
                    'Auto-categorization (7 categories)',
                    'Bulk upload with queue processing',
                    'Daily/Monthly expense dashboard',
                    'CSV export & PWA installable'
                ]
            },
            architecture: {
                ko: 'SPA 구조와 LocalStorage 기반 오프라인 데이터 관리, PWA 설치 지원',
                en: 'SPA architecture with LocalStorage offline data and installable PWA'
            },
            platform: 'Web (PWA)'
        },
        {
            id: 'p3',
            title: 'PolicyMatch Korea',
            desc: {
                ko: '소상공인과 중소기업을 위한 정부 정책자금 맞춤 매칭 플랫폼입니다. AI 분석으로 최적의 지원금과 보조금을 추천합니다.',
                en: 'Government policy fund matching platform for SMEs. AI-powered analysis to find optimal grants and subsidies.'
            },
            img: 'img/portfolio_policy.jpg',
            tags: ['Next.js', 'Supabase', 'Gemini AI'],
            techStack: {
                ko: ['Next.js 16 (App Router)', 'TypeScript', 'Tailwind CSS 4', 'Supabase (PostgreSQL)', 'Zustand (상태 관리)', 'Gemini AI (정책 분석)', 'Python (데이터 스크래핑)'],
                en: ['Next.js 16 (App Router)', 'TypeScript', 'Tailwind CSS 4', 'Supabase (PostgreSQL)', 'Zustand (State Mgmt)', 'Gemini AI (Policy Analysis)', 'Python (Data Scraping)']
            },
            features: {
                ko: [
                    '5단계 온보딩 기반 맞춤 정책 매칭',
                    'Gemini AI 정책 공고문 자동 메타데이터 추출',
                    '신청 로드맵 타임라인 UI',
                    '서류 준비 가이드 및 체크리스트',
                    'K-Startup / BizInfo 실시간 데이터 연동'
                ],
                en: [
                    '5-step onboarding for personalized policy matching',
                    'Gemini AI auto-extraction of policy metadata',
                    'Application roadmap timeline UI',
                    'Document preparation guide & checklist',
                    'K-Startup / BizInfo real-time data integration'
                ]
            },
            architecture: {
                ko: 'Server/Client Components 하이브리드 구조와 Supabase, Python 스크래핑 파이프라인',
                en: 'Server + Client Components hybrid with Supabase and Python scraping pipeline'
            },
            platform: 'Web (Responsive)'
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
        console.log('?�� Loading dictionary:', nextLang);
        return new Promise(function (resolve) {
            var attempts = 0;
            var interval = setInterval(function () {
                if (window.AI_LANG_DATA && window.AI_LANG_DATA[nextLang]) {
                    clearInterval(interval);
                    dict = window.AI_LANG_DATA[nextLang];
                    console.log('??Dictionary loaded:', nextLang);
                    resolve(true);
                } else {
                    attempts++;
                    if (attempts > 50) {
                        clearInterval(interval);
                        console.warn('?�️ Dictionary load timeout');
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
        console.log('?�� Language changed to:', lang);
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
        if (!expSection) return;
        var items = $$('.ai-item', expSection);

        items.forEach(function (el, i) {
            el.style.setProperty('--d', (i * 120) + 'ms');
        });

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $$('.ai-item', entry.target).forEach(function (el) {
                        el.classList.add('cascade-show');
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        obs.observe(expSection);
    }

    function initGalaxyCursor() {
        console.log('??Initializing Galaxy Cursor...');
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



    // --- ?�트?�리???�이지 ?�더�?(?�세 카드 ?�함) ---
    function renderPortfolio() {
        console.log('?�� Rendering Portfolio Page...');

        // ?�단 ?�비게이??�?
        var nav =
            '<nav class="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 px-6 py-4 flex justify-between items-center">' +
            '<a href="index.html" class="text-white font-bold text-xl flex items-center gap-2 hover:text-accent transition-colors"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>' +
            '<div class="flex gap-4">' +
            '<button id="btn-ko" type="button" class="glass-button px-3 py-1.5 rounded-full text-xs font-semibold ' + (lang === 'ko' ? 'bg-accent/30 text-white' : 'text-white/70') + '">KO</button>' +
            '<button id="btn-en" type="button" class="glass-button px-3 py-1.5 rounded-full text-xs font-semibold ' + (lang === 'en' ? 'bg-accent/30 text-white' : 'text-white/70') + '">EN</button>' +
            '</div>' +
            '</nav>';

        // �??�트?�리????��???�세 카드�??�더�?
        var detailCards = portfolioData.map(function (item, idx) {
            var desc = lang === 'ko' ? item.desc.ko : item.desc.en;
            var techList = (lang === 'ko' ? item.techStack.ko : item.techStack.en);
            var featList = (lang === 'ko' ? item.features.ko : item.features.en);
            var arch = lang === 'ko' ? item.architecture.ko : item.architecture.en;

            // 기술 ?�택 ?�그 HTML
            var techHtml = techList.map(function (t) {
                return '<span class="text-xs font-mono bg-accent/10 text-accent px-2.5 py-1 rounded-lg border border-accent/20">' + t + '</span>';
            }).join('');

            // 주요 기능 리스??HTML
            var featHtml = featList.map(function (f) {
                return '<li class="flex gap-2 items-start">' +
                    '<i class="fa-solid fa-bolt text-neon-orange text-xs mt-1 shrink-0"></i>' +
                    '<span class="text-white/80 text-sm">' + f + '</span>' +
                    '</li>';
            }).join('');

            // ?�그 ?�벨 HTML
            var tagsHtml = item.tags.map(function (tg) {
                return '<span class="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">' + tg + '</span>';
            }).join('');

            // ?��?지�??�쪽/?�른�?교차 배치 (짝수: ?��?지 ?�쪽, ?�?? ?��?지 ?�른�?
            var isEven = idx % 2 === 0;

            var imageBlock =
                '<div class="w-full lg:w-2/5 shrink-0">' +
                '<div class="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">' +
                '<img src="' + item.img + '" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="' + item.title + '">' +
                '</div>' +
                '<div class="flex gap-2 mt-3 flex-wrap">' + tagsHtml + '</div>' +
                '<p class="text-white/40 text-xs mt-2"><i class="fa-solid fa-display mr-1"></i>' + item.platform + '</p>' +
                '</div>';

            var infoBlock =
                '<div class="flex-1 space-y-5">' +
                '<div>' +
                '<h2 class="text-2xl md:text-3xl font-bold text-white mb-2">' + item.title + '</h2>' +
                '<p class="text-white/70 text-base leading-relaxed">' + desc + '</p>' +
                '</div>' +

                // 주요 기능 ?�션
                '<div>' +
                '<h3 class="text-sm font-bold text-accent uppercase tracking-wider mb-3"><i class="fa-solid fa-star mr-1.5"></i>' + (lang === 'ko' ? '주요 기능' : 'Key Features') + '</h3>' +
                '<ul class="space-y-2">' + featHtml + '</ul>' +
                '</div>' +

                // ?�키?�처 ?�징 ?�션
                '<div class="glass-button rounded-xl p-4 border border-white/10">' +
                '<h3 class="text-xs font-bold text-neon-orange uppercase tracking-wider mb-1.5"><i class="fa-solid fa-cubes mr-1.5"></i>' + (lang === 'ko' ? '?�키?�처' : 'Architecture') + '</h3>' +
                '<p class="text-white/60 text-sm">' + arch + '</p>' +
                '</div>' +

                // 기술 ?�택 ?�션
                '<div>' +
                '<h3 class="text-sm font-bold text-accent uppercase tracking-wider mb-3"><i class="fa-solid fa-code mr-1.5"></i>' + (lang === 'ko' ? '기술 ?�택' : 'Tech Stack') + '</h3>' +
                '<div class="flex flex-wrap gap-2">' + techHtml + '</div>' +
                '</div>' +

                '</div>';

            // ?�이?�웃: 짝수/?�??교차
            var innerHtml = isEven
                ? imageBlock + infoBlock
                : infoBlock + imageBlock;

            return (
                '<div id="' + item.id + '" class="glass-panel glass-glow rounded-3xl p-6 md:p-10 ai-fade scroll-mt-32">' +
                '<div class="flex flex-col lg:flex-row gap-8 items-start">' +
                innerHtml +
                '</div>' +
                '</div>'
            );
        }).join('');

        portfolioRoot.innerHTML =
            nav +
            '<main class="pt-24 pb-20 px-6 max-w-6xl mx-auto space-y-10">' +
            '<h1 class="text-4xl md:text-5xl font-bold text-white mb-4 text-center tracking-tight">Portfolio</h1>' +
            '<p class="text-white/50 text-center text-lg mb-8">' + (lang === 'ko' ? '직접 기획?�고 개발???�로?�트?�입?�다.' : 'Projects I planned and built myself.') + '</p>' +
            detailCards +
            '</main>' +
            '<div class="text-center text-white/40 text-xs pb-8">' + t('footer_note') + '</div>';

        // ?�어 ?�환 버튼 ?�벤??바인??
        var btnKo = $('#btn-ko', portfolioRoot);
        var btnEn = $('#btn-en', portfolioRoot);
        if (btnKo) btnKo.addEventListener('click', function () { setLang('ko'); });
        if (btnEn) btnEn.addEventListener('click', function () { setLang('en'); });

        // ?�크�????�이?�인 ?�니메이???�용
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) e.target.classList.add('show');
            });
        }, { threshold: 0.1 });
        $$('.ai-fade', portfolioRoot).forEach(function (el) { obs.observe(el); });

        initGalaxyCursor();
        initSplineBackground();

        // [?�규 추�?] ?�이지 ?�적 로딩 ???�커 ?�치�??�동 ?�크�?
        if (window.location.hash) {
            setTimeout(function () {
                var targetId = window.location.hash.substring(1);
                var targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }

    // --- Spline 3D 배경 초기??(?�공??링크�?Iframe?�로 ?�용) ---
    function buildSplineSrc(forceRefresh) {
        if (forceRefresh) return SPLINE_SCENE_URL + '?r=' + Date.now();
        return SPLINE_SCENE_URL;
    }

    function showSplineWrapper(sw, isFallback) {
        if (!sw) return;
        sw.style.opacity = '1';
        if (isFallback) {
            console.warn('?�️ Spline load delayed - showing wrapper anyway');
        }
    }

    function bindSplineIframeLoad(ifr, sw) {
        ifr.onload = function () {
            setTimeout(function () {
                showSplineWrapper(sw, false);
                console.log('??Spline iframe loaded');
            }, 350);
        };

        setTimeout(function () {
            if (sw && sw.style.opacity !== '1') {
                showSplineWrapper(sw, true);
            }
        }, 10000);
    }

    function refreshSplineBackground(reason) {
        var sw = document.getElementById('spline-wrapper');
        var ifr = document.getElementById('spline-bg');
        if (!sw || !ifr) return;

        var now = Date.now();
        if (now - splineLastRefreshAt < SPLINE_REFRESH_COOLDOWN_MS) return;
        splineLastRefreshAt = now;

        sw.style.opacity = '0';
        bindSplineIframeLoad(ifr, sw);
        ifr.src = buildSplineSrc(true);
        console.log('?�� Spline refreshed:', reason || 'manual');
    }

    function bindSplineLifecycleEvents() {
        if (splineLifecycleBound) return;
        splineLifecycleBound = true;

        window.addEventListener('pageshow', function (evt) {
            // BFCache restore can freeze WebGL inside iframe.
            if (evt.persisted) {
                setTimeout(function () {
                    refreshSplineBackground('pageshow-bfcache');
                }, 120);
            }
        });

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                splineLastHiddenAt = Date.now();
                return;
            }

            if (Date.now() - splineLastHiddenAt > 800) {
                setTimeout(function () {
                    refreshSplineBackground('visibility-visible');
                }, 120);
            }
        });
    }

    function initSplineBackground(options) {
        var opts = options || {};
        var forceRefresh = !!opts.forceRefresh;
        var sw = document.getElementById('spline-wrapper');
        var ifr = document.getElementById('spline-bg');

        bindSplineLifecycleEvents();

        if (sw && ifr) {
            if (forceRefresh) refreshSplineBackground(opts.reason || 'force');
            return;
        }

        if (sw && !ifr) sw.remove();

        console.log('?�� Initializing Spline background...');
        sw = document.createElement('div');
        sw.id = 'spline-wrapper';
        sw.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1; pointer-events:none; background:#0b1220; opacity:0; transition: opacity 1.2s ease-in-out;";

        ifr = document.createElement('iframe');
        ifr.id = 'spline-bg';
        ifr.src = buildSplineSrc(false);
        ifr.frameBorder = '0';
        ifr.allow = 'autoplay; fullscreen';
        ifr.style.width = '100%';
        ifr.style.height = '100%';
        ifr.style.display = 'block';

        sw.appendChild(ifr);
        document.body.prepend(sw);
        bindSplineIframeLoad(ifr, sw);
    }
    // --- RENDER LANDING PAGE ---
    function render() {
        if (portfolioRoot) {
            renderPortfolio();
            return;
        }

        console.log('?�� Rendering glassmorphic design...');

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
                    '<div class="shrink-0 w-[280px] md:w-[320px] glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/50 transition-colors" onclick="location.href=\'portfolio.html#' + item.id + '\'">' +
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

            // ??카드 - ?�쪽 ?�렬 (mx-auto ?�거)
            '<div class="glass-card rounded-2xl p-8 max-w-2xl border border-white/10 shadow-2xl relative overflow-hidden group/form">',
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
            '</div>', // Close Glass Panel
            '</div>', // Close Section Container
            '</section>',

            '</main>',
            '</div>'
        ].join('');


        initSplineBackground();

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
                        successMsg.textContent = lang === 'ko' ? '문의가 ?�공?�으�??�송?�었?�니??' : 'Your inquiry was sent successfully.';
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
                        errorMsg.textContent = lang === 'ko' ? '?�송 ?�패. ?�메?�로 직접 문의?�주?�요.' : 'Failed to send. Please email directly.';
                        container.appendChild(errorMsg);
                    });
            });
        }

        bindReveal();
        bindMotion();
        initGalaxyCursor();

        console.log('??Glassmorphic Landing Page Loaded');
    }

    console.log('?? Initializing...');
    loadDict(lang)
        .then(function (loaded) {
            if (!loaded) dict = {};
        })
        .finally(function () {
            try {
                render();
            } catch (e) {
                console.error('ERROR:', e);
                alert('?�류: ' + e.message);
            }
        });
})();

