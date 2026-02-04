(function () {
  'use strict';

  // Mark JS-enabled so CSS can safely hide/animate elements only when JS is running.
  document.documentElement.classList.add('js');

  var root = document.getElementById('ai-landing-root');
  if (!root) {
    console.error('❌ #ai-landing-root not found!');
    return;
  }
  
  console.log('✅ Root element found:', root);

  var CONFIG = {
    portfolioEnabled: false,
    email: 'leeyob@gmail.com',
    assetsBase: '/wp-content/uploads/ai-landing/assets',
    defaultLang: 'ko'
  };

  var dict = {};
  var lang = localStorage.getItem('ai_lang') || CONFIG.defaultLang;

  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

  function loadDict(nextLang) {
    var url = CONFIG.assetsBase + '/lang/' + nextLang + '.json';
    console.log('📥 Loading dictionary:', url);
    return fetch(url, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) {
          console.warn('⚠️ Dictionary load failed: ' + res.status + '. Using fallback.');
          return null;
        }
        return res.json();
      })
      .then(function (data) {
        if (data && typeof data === 'object') {
          dict = data;
          console.log('✅ Dictionary loaded:', nextLang);
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.warn('⚠️ Dictionary load error:', error);
        return false;
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
      var items = $$('.ai-item', expSection);
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

    // Mouse glow tracking
    var trackTargets = $$('.ai-divider-bg, .ai-hero-bg', root);
    trackTargets.forEach(function (tg) {
      if (tg.__glowBound) return;
      tg.__glowBound = true;

      tg.addEventListener('mousemove', function (e) {
        var r = tg.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        tg.style.setProperty('--mx', x + '%');
        tg.style.setProperty('--my', y + '%');
      }, { passive: true });
    });

    // Button glow follows cursor
    $$('.ai-btn', root).forEach(function (btn) {
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

  // 경력 항목 호버 효과 바인딩
  function bindExperienceHover() {
    console.log('🎯 Binding experience item hover effects...');
    
    // 섹션과 컨테이너 오버플로우 허용
    var expSection = $('#experience', root);
    if (expSection) {
      expSection.style.overflow = 'visible';
      
      var container = $('.ai-container', expSection);
      if (container) container.style.overflow = 'visible';
      
      var timeline = $('.ai-timeline', expSection);
      if (timeline) timeline.style.overflow = 'visible';
    }
    
    var expItems = $$('.ai-item', root);
    console.log('📋 Found experience items:', expItems.length);
    
    expItems.forEach(function(item, idx) {
      var bullet = $('.ai-bullet', item);
      var title = item.querySelector('strong');
      var desc = item.querySelector('span');
      
      // 원래 폭 저장
      var originalWidth = item.offsetWidth;
      
      console.log('Binding item ' + idx, 'Original width:', originalWidth);
      
      // 마우스 오버
      item.addEventListener('mouseenter', function() {
        console.log('🖱️ Hover on item ' + idx);
        
        var currentWidth = this.offsetWidth;
        var expandWidth = currentWidth * 1.1; // 10% 확대
        
        // 3D 변환과 함께 실제 폭 변경
        this.style.transform = 'translateY(-12px) translateZ(48px) scale(1.05)';
        this.style.borderColor = 'rgba(255,122,24,.75)';
        this.style.boxShadow = '0 0 12px rgba(255,122,24,.35), 0 0 28px rgba(255,122,24,.22), 0 18px 55px rgba(0,0,0,.35)';
        this.style.background = 'rgba(255,255,255,.075)';
        this.style.zIndex = '100';
        this.style.padding = '20px 24px';
        
        // 가로 확대 - 실제 픽셀값으로
        this.style.width = expandWidth + 'px';
        this.style.marginLeft = '-' + ((expandWidth - currentWidth) / 2) + 'px';
        this.style.maxWidth = 'none';
        
        console.log('Expanded width:', expandWidth);
        
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
      
      // 마우스 아웃
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateZ(0) scale(1)';
        this.style.borderColor = 'rgba(255,255,255,.12)';
        this.style.boxShadow = '';
        this.style.background = 'rgba(255,255,255,.05)';
        this.style.zIndex = '1';
        this.style.padding = '14px 14px';
        this.style.width = '100%';
        this.style.marginLeft = '0';
        this.style.maxWidth = '';
        
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
    
    console.log('✅ Experience hover effects bound');
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
        '<div class="ai-item">' +
          '<div class="ai-bullet"></div>' +
          '<div>' +
            '<strong>' + t(item[0]) + '</strong>' +
            '<span>' + t(item[1]) + '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    var tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'];
    var tagItems = tags.map(function (k) {
      return '<span class="ai-tag">' + t(k) + '</span>';
    }).join('');

    // Floating KO/EN toggle with inline styles
    var langFloat =
      '<div class="ai-lang-float" aria-label="language toggle" style="position:fixed!important;top:20px!important;right:20px!important;z-index:999999!important;display:flex!important;gap:6px!important;opacity:0.4;">' +
        '<button id="btn-ko" type="button" aria-pressed="' + (lang === 'ko') + '" ' +
          'style="display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:42px!important;max-width:42px!important;width:42px!important;height:32px!important;padding:0 10px!important;font-size:12px!important;line-height:1!important;font-weight:600!important;border-radius:999px!important;border:1px solid rgba(154, 226, 252, 0.5)!important;background:rgba(201, 163, 94, 0.3)!important;color:rgba(255,255,255,.7)!important;cursor:pointer!important;backdrop-filter:blur(8px)!important;box-shadow:0 1px 4px rgba(0,0,0,.2)!important;transition:all .2s ease!important;">' +
          'KO' +
        '</button>' +
        '<button id="btn-en" type="button" aria-pressed="' + (lang === 'en') + '" ' +
          'style="display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:42px!important;max-width:42px!important;width:42px!important;height:32px!important;padding:0 10px!important;font-size:12px!important;line-height:1!important;font-weight:600!important;border-radius:999px!important;border:1px solid rgba(154, 226, 252, 0.5)!important;background:rgba(201, 163, 94,.3)!important;color:rgba(255,255,255,.7)!important;cursor:pointer!important;backdrop-filter:blur(8px)!important;box-shadow:0 1px 4px rgba(0,0,0,.2)!important;transition:all .2s ease!important;">' +
          'EN' +
        '</button>' +
      '</div>';

    root.innerHTML =
      '<div class="ai-wrap">' +
        langFloat +

        '<main id="top">' +
          '<section class="ai-hero">' +
            '<div class="ai-hero-bg">' +
              '<div class="ai-hero-inner">' +
                '<aside class="ai-profile-card">' +
                  '<div class="ai-profile-top">' +
                    '<div class="ai-avatar">' +
                      '<img src="' + CONFIG.assetsBase + '/img/profile.jpg" alt="profile" onerror="this.style.display=\'none\'">' +
                    '</div>' +
                  '</div>' +
                  '<div class="ai-profile-body">' +
                    '<p class="ai-title">' + t('profile_title') + '</p>' +
                    '<p class="ai-meta">' + t('profile_meta') + '</p>' +
                  '</div>' +
                '</aside>' +
                
                '<div>' +
                  '<div class="ai-kicker"><span></span>' + t('hero_kicker') + '</div>' +
                  '<h1 class="ai-h1">' +
                    '<div class="h1-line">' + t('hero_h1_line1') + '</div>' +
                    '<div class="h1-line">' + t('hero_h1_line2') + '</div>' +
                  '</h1>' +
                  '<p class="ai-sub">' + t('hero_sub') + '</p>' +
                  '<div class="ai-cta">' +
                    '<a class="ai-btn primary" href="#experience">' + t('cta_experience') + '</a>' +
                    '<a class="ai-btn" href="#contact">' + t('cta_contact') + '</a>' +
                  '</div>' +

                  '<div class="ai-hero-3d">' +
                    '<div class="ai-3d-wrap">' +
                      '<img class="ai-3d-img" src="' + CONFIG.assetsBase + '/img/speaker-3d.gif" alt="3D AI Speaker" onerror="console.error(\'Image load failed:\', this.src); this.style.display=\'none\';">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section id="about" class="ai-section ai-divider-bg">' +
            '<div class="ai-container ai-fade">' +
              '<h2 class="ai-h2">' + t('about_h2') + '</h2>' +
              '<p class="ai-lead">' + t('about_lead') + '</p>' +
              '<div class="ai-grid">' +
                '<div class="ai-card">' +
                  '<h3>' + t('about_edu_h3') + '</h3>' +
                  '<p>' + t('about_edu_p') + '</p>' +
                '</div>' +
                '<div class="ai-card">' +
                  '<h3>' + t('about_teach_h3') + '</h3>' +
                  '<p>' + t('about_teach_p') + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section id="experience" class="ai-section">' +
            '<div class="ai-container ai-fade">' +
              '<h2 class="ai-h2">' + t('exp_h2') + '</h2>' +
              '<p class="ai-lead">' + t('exp_lead') + '</p>' +
              '<div class="ai-timeline" style="perspective:1200px;perspective-origin:center;">' + expItems + '</div>' +
            '</div>' +
          '</section>' +

          '<section id="skills" class="ai-section ai-divider-bg">' +
            '<div class="ai-container ai-fade">' +
              '<h2 class="ai-h2">' + t('skills_h2') + '</h2>' +
              '<p class="ai-lead">' + t('skills_lead') + '</p>' +
              '<div class="ai-tags">' + tagItems + '</div>' +
            '</div>' +
          '</section>' +

          '<section id="contact" class="ai-section">' +
            '<div class="ai-container ai-fade">' +
              '<h2 class="ai-h2">' + t('contact_h2') + '</h2>' +
              '<p class="ai-lead">' + t('contact_lead') + '</p>' +
              '<div class="ai-contact">' +
                '<div>' +
                  '<div style="font-weight:700; margin-bottom:4px;">' + t('contact_email_label') + '</div>' +
                  '<div style="color:rgba(255,255,255,.75)">' + CONFIG.email + '</div>' +
                '</div>' +
                '<a href="mailto:' + CONFIG.email + '">' + t('contact_btn') + '</a>' +
              '</div>' +
              '<div class="ai-footer-note">' + t('footer_note') + '</div>' +
            '</div>' +
          '</section>' +
        '</main>' +
      '</div>';

    // Bind language toggle buttons
    var btnKo = $('#btn-ko', root);
    var btnEn = $('#btn-en', root);
    if (btnKo) btnKo.addEventListener('click', function () { setLang('ko'); });
    if (btnEn) btnEn.addEventListener('click', function () { setLang('en'); });

    // 호버 효과 추가 (언어 버튼)
    if (btnKo) {
      btnKo.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(11,18,32,.5)';
        this.style.borderColor = 'rgba(79,209,255,.8)';
        this.style.color = 'rgba(255,255,255,.9)';
        this.style.transform = 'translateY(-1px)';
      });
      btnKo.addEventListener('mouseleave', function() {
        if (lang !== 'ko') {
          this.style.background = 'rgba(11,18,32,.3)';
          this.style.borderColor = 'rgba(79,209,255,.5)';
          this.style.color = 'rgba(255,255,255,.7)';
          this.style.transform = 'translateY(0)';
        }
      });
    }

    if (btnEn) {
      btnEn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(11,18,32,.5)';
        this.style.borderColor = 'rgba(79,209,255,.8)';
        this.style.color = 'rgba(255,255,255,.9)';
        this.style.transform = 'translateY(-1px)';
      });
      btnEn.addEventListener('mouseleave', function() {
        if (lang !== 'en') {
          this.style.background = 'rgba(11,18,32,.3)';
          this.style.borderColor = 'rgba(79,209,255,.5)';
          this.style.color = 'rgba(255,255,255,.7)';
          this.style.transform = 'translateY(0)';
        }
      });
    }

    // Reveal + Motion must run after DOM render
    bindReveal();
    bindMotion();
    
    // 경력 항목 호버 효과 바인딩 (중요!)
    bindExperienceHover();

    console.log('✅ AI Landing Page Loaded Successfully');
    console.log('📁 Assets Base Path:', CONFIG.assetsBase);
    console.log('🌍 Current Language:', lang);
  }

  // Init: load dict then render
  console.log('🚀 Initializing AI Landing Page...');
  loadDict(lang)
    .then(function (loaded) {
      if (!loaded) {
        console.warn('⚠️ Using fallback dictionary (keys only)');
        dict = {};
      }
    })
    .finally(function () {
      render();
    });

})();
