(function () {
  'use strict';

  var D = window.SIDONG;
  var KEY = 'sidong.v1';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function uid(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function pickRandom(list, avoidId) {
    if (!list.length) return null;
    if (list.length === 1) return list[0];
    var pool = list.filter(function (x) { return x.id !== avoidId; });
    if (!pool.length) pool = list;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ── 저장 ────────────────────────────────
  var defaults = {
    mood: null,
    selectedId: null,
    lastFavId: null,
    lastCourseId: null,
    musicAdded: [],
    musicHidden: [],
    faveAdded: [],
    faveHidden: [],
    musicEdit: false,
    faveEdit: false,
    bodyFilter: 'all',
    timerSize: 180
  };
  var state;
  try {
    state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}'));
  } catch (e) { state = Object.assign({}, defaults); }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ── 소리 ────────────────────────────────
  var actx = null;
  function audio() {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      return actx;
    } catch (e) { return null; }
  }
  document.addEventListener('pointerdown', function () { audio(); }, { passive: true });

  function tone(freq, delay, dur, vol) {
    var ctx = actx;
    if (!ctx) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    o.connect(g); g.connect(ctx.destination);
    var t = ctx.currentTime + delay;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function chimeStart() {
    audio();
    tone(523.25, 0, 0.45, 0.07);
    tone(783.99, 0.08, 0.55, 0.05);
  }
  function chimeDone() {
    audio();
    tone(523.25, 0, 0.45, 0.06);
    tone(659.25, 0.13, 0.45, 0.06);
    tone(783.99, 0.26, 0.9, 0.07);
    if (navigator.vibrate) navigator.vibrate([30, 60, 40]);
  }

  // ── 완료 축하 (팡파레 + 콘페티 + 칭찬 카드) ──────────────
  function toneAt(freq, at, dur, vol, type) {
    var ctx = actx;
    if (!ctx) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(vol, at + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.start(at); o.stop(at + dur + 0.05);
  }
  function fanfare() {
    audio();
    var ctx = actx;
    if (!ctx) return;
    var t = ctx.currentTime + 0.02;
    // 올라가는 아르페지오
    [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
      toneAt(f, t + i * 0.085, 0.5, 0.08, 'triangle');
    });
    // 받침음 + 마지막 화음
    toneAt(261.63, t + 0.2, 1.2, 0.05, 'sine');
    [1046.5, 1318.51, 1567.98].forEach(function (f) {
      toneAt(f, t + 0.4, 1.1, 0.05, 'sine');
    });
    // 반짝이는 마무리
    [2093, 2637, 3136, 2637].forEach(function (f, i) {
      toneAt(f, t + 0.52 + i * 0.07, 0.32, 0.022, 'sine');
    });
    if (navigator.vibrate) navigator.vibrate([18, 40, 18, 40, 70]);
  }

  var celEl = $('#celebrate'), celText = $('#celebrateText'), fx = $('#fx');
  var fxParts = [], fxCtx = null, fxRaf = 0, fxEnd = 0;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sizeFx() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    fx.width = Math.floor(fx.clientWidth * dpr);
    fx.height = Math.floor(fx.clientHeight * dpr);
    fxCtx = fx.getContext('2d');
    fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function burst() {
    if (reduceMotion || !fxCtx) return;
    var w = fx.clientWidth, h = fx.clientHeight;
    var cols = ['#dd5f39', '#f0a35e', '#e8ce7a', '#7fb69a', '#e8a7b8', '#fff3e2'];
    fxParts = [];
    for (var i = 0; i < 140; i++) {
      var a = Math.random() * Math.PI * 2, sp = 2.5 + Math.random() * 8;
      fxParts.push({
        x: w / 2 + (Math.random() - 0.5) * 40, y: h * 0.44,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3.2,
        w: 4 + Math.random() * 5, h: 6 + Math.random() * 8,
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.32,
        c: cols[Math.floor(Math.random() * cols.length)], life: 0
      });
    }
    fxEnd = Date.now() + 3200;
    if (!fxRaf) fxRaf = requestAnimationFrame(stepFx);
  }
  function stepFx() {
    if (!fxCtx) { fxRaf = 0; return; }
    var w = fx.clientWidth, h = fx.clientHeight, ctx = fxCtx;
    ctx.clearRect(0, 0, w, h);
    var alive = 0;
    for (var i = 0; i < fxParts.length; i++) {
      var p = fxParts[i];
      p.life++;
      p.vy += 0.17; p.vx *= 0.995;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      if (p.y > h + 40) continue;
      alive++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - p.life / 200);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive && Date.now() < fxEnd) fxRaf = requestAnimationFrame(stepFx);
    else { ctx.clearRect(0, 0, w, h); fxRaf = 0; }
  }
  function stopFx() {
    if (fxRaf) cancelAnimationFrame(fxRaf);
    fxRaf = 0;
    if (fxCtx) fxCtx.clearRect(0, 0, fx.clientWidth, fx.clientHeight);
  }
  function celebrate(msg) {
    fanfare();
    celText.textContent = msg || D.praise[Math.floor(Math.random() * D.praise.length)];
    celEl.hidden = false;
    sizeFx();
    celEl.classList.add('on');
    burst();
  }
  function closeCelebrate() {
    celEl.hidden = true;
    celEl.classList.remove('on');
    stopFx();
  }
  $('#celebrateClose').addEventListener('click', closeCelebrate);
  celEl.addEventListener('click', function (e) {
    if (!e.target.closest('.ccard')) closeCelebrate();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !celEl.hidden) closeCelebrate();
  });

  // ── 토스트 ──────────────────────────────
  var toastEl = $('#toast'), toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 1900);
  }

  // ── 탭 ──────────────────────────────────
  var currentTab = 'music';
  function goTab(name) {
    currentTab = name;
    $$('.screen').forEach(function (s) { s.classList.toggle('active', s.id === 'screen-' + name); });
    $$('.tab').forEach(function (t) { t.classList.toggle('on', t.dataset.tab === name); });
    // 음악 탭을 떠나면 플레이어는 미니 바만 남기고 접어 둠(재생은 계속)
    if (player.frame) {
      if (name === 'music') { if (!player.userCollapsed) setDockOpen(true, true); }
      else if (player.open) setDockOpen(false, true);
    }
    if (name === 'walk') renderWalk();
    if (name === 'body') renderBody();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  $('#tabbar').addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (b) goTab(b.dataset.tab);
  });
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-goto]');
    if (g) { goTab(g.dataset.goto); }
  });

  // ── 음악 ────────────────────────────────
  function library() {
    var hidden = {};
    state.musicHidden.forEach(function (id) { hidden[id] = 1; });
    var base = D.music.filter(function (m) { return !hidden[m.id]; }).map(function (m) {
      return Object.assign({}, m, { custom: false });
    });
    return base.concat(state.musicAdded.map(function (m) { return Object.assign({}, m, { custom: true }); }));
  }
  function moodLabel(key) {
    var m = D.moods.filter(function (x) { return x.key === key; })[0];
    return m ? m.label : '';
  }
  function spPage(item) { return 'https://open.spotify.com/' + item.type + '/' + item.sid; }
  function spLink(item) {
    if (item.sid) return spPage(item);
    return 'https://open.spotify.com/search/' + encodeURIComponent([item.title, item.artist].filter(Boolean).join(' '));
  }

  // ── 유튜브 플레이어 (하나만 두고 탭을 바꿔도 안 부숨) ──────────
  var player = { itemId: null, videoId: null, frame: null, open: false, playing: false, started: false, userCollapsed: false };
  var dockEl = $('#dock');

  function ytCmd(func, args) {
    if (!player.frame || !player.frame.contentWindow) return;
    player.frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*');
  }
  function paintPlayBtn() {
    var b = $('#dockPlay');
    if (!b) return;
    b.innerHTML = player.playing
      ? '<svg viewBox="0 0 24 24"><path d="M9 5.5v13M15 5.5v13"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>';
  }
  function setPlaying(on) {
    on = !!on;
    if (player.playing === on) return;
    player.playing = on;
    paintPlayBtn();
    renderMusic();
  }
  function setDockOpen(open, auto) {
    player.open = !!open;
    if (!auto) player.userCollapsed = !player.open;
    dockEl.classList.toggle('open', player.open);
    document.body.classList.toggle('dock-open', player.open);
    var ex = $('#dockExpand');
    if (ex) {
      ex.setAttribute('aria-label', player.open ? '영상 접기' : '영상 펼치기');
      ex.innerHTML = player.open
        ? '<svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
    }
  }
  function loadTrack(item, autoplay, open, force) {
    if (!item) return;
    if (!item.yt) { toast('이 곡은 앱에서 틀 수 있는 영상이 없음'); return; }
    dockEl.hidden = false;
    document.body.classList.add('has-dock');
    $('#dockTitle').textContent = item.title;
    $('#dockArtist').textContent = item.artist || '';
    if (player.videoId === item.yt && !force) {
      if (open !== false) setDockOpen(true);
      if (autoplay) { ytCmd('playVideo'); setPlaying(true); }
      renderMusic();
      return;
    }
    player.itemId = item.id;
    player.videoId = item.yt;
    player.playing = !!autoplay;
    player.started = !!autoplay;
    var box = $('#dockVideo');
    box.innerHTML = '';
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube.com/embed/' + item.yt +
      '?enablejsapi=1&playsinline=1&rel=0&modestbranding=1' + (autoplay ? '&autoplay=1' : '');
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('title', item.title + ' — ' + (item.artist || '') + ' (YouTube)');
    box.appendChild(f);
    player.frame = f;
    paintPlayBtn();
    if (open !== false) setDockOpen(true); else { player.open = false; player.userCollapsed = true; dockEl.classList.remove('open'); document.body.classList.remove('dock-open'); }
    renderMusic();
  }
  function closePlayer() {
    player.itemId = null; player.videoId = null; player.frame = null; player.playing = false; player.started = false;
    $('#dockVideo').innerHTML = '';
    dockEl.hidden = true;
    dockEl.classList.remove('open');
    document.body.classList.remove('has-dock', 'dock-open');
    player.open = false;
    player.userCollapsed = false;
    renderMusic();
  }
  // 곡을 고를 때: 들고 있는 음악이 없으면 플레이어를 미리 띄워 둠(재생은 버튼으로)
  function previewLoad(item) {
    if (!item || !item.yt) return;
    if (player.playing) return;
    loadTrack(item, false, true);
  }
  function togglePlay(item, open) {
    if (!item) return;
    if (!item.yt) { toast('이 곡은 앱에서 틀 수 있는 영상이 없음'); return; }
    if (player.itemId === item.id && player.frame) {
      if (player.playing) { ytCmd('pauseVideo'); setPlaying(false); }
      else if (player.started) { ytCmd('playVideo'); setPlaying(true); }
      else { loadTrack(item, true, open, true); }
      return;
    }
    loadTrack(item, true, open);
  }
  $('#dockPlay').addEventListener('click', function () {
    if (!player.frame) return;
    if (player.playing) { ytCmd('pauseVideo'); setPlaying(false); }
    else { ytCmd('playVideo'); setPlaying(true); }
  });
  $('#dockExpand').addEventListener('click', function () { setDockOpen(!player.open); });
  $('#dockClose').addEventListener('click', closePlayer);
  window.addEventListener('message', function (e) {
    if (typeof e.data !== 'string') return;
    var d;
    try { d = JSON.parse(e.data); } catch (err) { return; }
    if (!d || d.event !== 'infoDelivery' || !d.info) return;
    if (typeof d.info.playerState === 'number') setPlaying(d.info.playerState === 1);
  });
  function measureTabs() {
    var tb = $('#tabbar');
    if (tb) document.documentElement.style.setProperty('--tabh', tb.offsetHeight + 'px');
  }
  measureTabs();
  window.addEventListener('resize', measureTabs);

  function renderMoods() {
    var box = $('#moodChips');
    box.innerHTML = D.moods.map(function (m) {
      return '<button class="chip' + (state.mood === m.key ? ' on' : '') + '" data-mood="' + m.key + '">' + esc(m.label) + '</button>';
    }).join('');
  }
  $('#moodChips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-mood]');
    if (!b) return;
    var key = b.dataset.mood;
    state.mood = key;
    var matches = library().filter(function (m) { return m.moods.indexOf(key) >= 0; });
    if (!matches.length) { state.selectedId = null; save(); renderMoods(); renderMusic(); return; }
    // 같은 기분 안에서 한 곡을 랜덤으로 골라 줌 (누를 때마다 바뀜)
    var pick = matches[Math.floor(Math.random() * matches.length)];
    state.selectedId = pick.id;
    save(); renderMoods(); renderMusic();
    previewLoad(pick);
  });

  function renderMusic() {
    var box = $('#musicResult');
    var all = library();
    var item = all.filter(function (m) { return m.id === state.selectedId; })[0];

    if (!item) {
      box.innerHTML = '<div class="card"><p class="note" style="margin:0">기분 하나 고르면 여기에 바로 뜸. 아래 내 목록에서 눌러도 됨.</p></div>';
      renderMusicList();
      return;
    }

    var matches = state.mood
      ? all.filter(function (m) { return m.moods.indexOf(state.mood) >= 0 && m.id !== item.id; })
      : [];
    var itemMoodKey = (state.mood && item.moods.indexOf(state.mood) >= 0) ? state.mood : item.moods[0];

    box.innerHTML =
      '<article class="card hero">' +
        '<div class="card-top">' +
          '<span class="tag accent">' + esc(moodLabel(itemMoodKey)) + '</span>' +
          (item.genre && item.genre !== '내가 추가' ? '<span class="tag">' + esc(item.genre) + '</span>' : '') +
          (item.reco ? '<span class="tag reco">추천</span>' : '') +
          (item.custom ? '<span class="tag">내가 추가</span>' : '') +
        '</div>' +
        '<h3>' + esc(item.title) + '</h3>' +
        (item.artist ? '<p class="artist">' + esc(item.artist) + '</p>' : '') +
        (item.note ? '<p class="note">' + esc(item.note) + '</p>' : '') +
        (item.yt
          ? '<button class="btn-primary" data-play="' + esc(item.id) + '">' +
              (player.itemId === item.id && player.started
                ? (player.playing
                    ? '<svg viewBox="0 0 24 24"><path d="M9 5.5v13M15 5.5v13"/></svg>잠깐 멈추기'
                    : '▶ 이어서 재생')
                : '▶ 유튜브로 듣기') + '</button>' +
            '<p class="playerhint">유튜브로 전곡 재생 · 다른 탭 가도 안 끊김</p>' +
            '<div class="applink"><a class="linkbtn tiny" href="' + spLink(item) + '" target="_blank" rel="noopener">스포티파이에서 열기</a></div>'
          : '<a class="btn-primary" href="' + spLink(item) + '" target="_blank" rel="noopener">' +
              '<span class="spotify-mark"><svg viewBox="0 0 24 24"><path d="M7 9.5c3.5-1 7.5-.7 10 .8"/><path d="M7.6 13c2.9-.8 6.2-.5 8.6.8"/><path d="M8.2 16.3c2.3-.6 4.8-.4 6.9.7"/></svg></span>' +
              '스포티파이에서 열기</a>') +
      '</article>' +
      (matches.length
        ? '<div class="alt-head">같은 기분 ' + matches.length + '곡 · 눌러서 바꾸기</div>' +
          '<div class="alt-row wrap">' + matches.map(function (m) {
            return '<button class="alt" data-pick="' + esc(m.id) + '">' + esc(m.title) + '</button>';
          }).join('') + '</div>'
        : '');

    renderMusicList();
  }

  $('#musicResult').addEventListener('click', function (e) {
    var p = e.target.closest('[data-play]');
    if (p) {
      var it = library().filter(function (m) { return m.id === p.dataset.play; })[0];
      if (it) togglePlay(it, true);
      return;
    }
    var b = e.target.closest('[data-pick]');
    if (b) { state.selectedId = b.dataset.pick; save(); renderMusic(); }
  });

  function renderMusicList() {
    var box = $('#musicList');
    var all = library();
    var input = $('#musicSearch');
    var q = input ? (input.value || '').trim().toLowerCase() : '';
    var shown = q
      ? all.filter(function (m) {
          return (m.title + ' ' + (m.artist || '') + ' ' + (m.genre || '')).toLowerCase().indexOf(q) >= 0;
        })
      : all;
    $('#musicEditBtn').textContent = state.musicEdit ? '완료' : '편집';
    $('#musicRestoreBtn').hidden = state.musicHidden.length === 0;
    var countBox = $('#musicCount');
    if (countBox) countBox.textContent = q ? (shown.length + '/' + all.length) : (all.length + '개');
    if (!all.length) {
      box.innerHTML = '<div class="empty">목록이 비었음. 하나 추가해.</div>';
      return;
    }
    if (!shown.length) {
      box.innerHTML = '<div class="empty">' + esc(q) + ' — 이걸로는 못 찾음.</div>';
      return;
    }
    box.innerHTML = shown.map(function (m) {
      var moods = m.moods.map(moodLabel).filter(Boolean).join(' · ');
      var meta = [m.artist, m.genre, moods].filter(Boolean).join(' · ');
      return '<button class="row" data-item="' + esc(m.id) + '">' +
        '<span class="row-main">' +
          '<span class="row-title">' + esc(m.title) + (m.reco ? '<span class="row-tag">추천</span>' : '') + '</span>' +
          '<span class="row-meta">' + esc(meta) + '</span>' +
        '</span>' +
        (state.musicEdit
          ? '<span class="row-del" data-del="' + esc(m.id) + '">−</span>'
          : '<span class="row-arrow">›</span>') +
      '</button>';
    }).join('');
  }
  var searchEl = $('#musicSearch');
  if (searchEl) searchEl.addEventListener('input', renderMusicList);
  $('#musicList').addEventListener('click', function (e) {
    var del = e.target.closest('[data-del]');
    if (del) {
      var id = del.dataset.del;
      var custom = state.musicAdded.some(function (m) { return m.id === id; });
      if (custom) {
        state.musicAdded = state.musicAdded.filter(function (m) { return m.id !== id; });
      } else if (state.musicHidden.indexOf(id) < 0) {
        state.musicHidden.push(id);
      }
      if (state.selectedId === id) state.selectedId = null;
      save(); renderMusic(); return;
    }
    var row = e.target.closest('[data-item]');
    if (row && !state.musicEdit) {
      var item = library().filter(function (m) { return m.id === row.dataset.item; })[0];
      if (!item) return;
      state.selectedId = item.id;
      state.mood = item.moods[0] || state.mood;
      save(); renderMoods(); renderMusic();
      previewLoad(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  $('#musicEditBtn').addEventListener('click', function () {
    state.musicEdit = !state.musicEdit; save(); renderMusicList();
  });
  $('#musicRestoreBtn').addEventListener('click', function () {
    state.musicHidden = []; save(); renderMusic();
  });

  // ── 시트 공통 ───────────────────────────
  var backdrop = $('#backdrop');
  function openSheet(id) {
    backdrop.classList.add('on');
    $('#' + id).classList.add('on');
  }
  function closeSheets() {
    backdrop.classList.remove('on');
    $$('.sheet').forEach(function (s) { s.classList.remove('on'); });
  }
  backdrop.addEventListener('click', closeSheets);
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeSheets); });

  // ── 음악 추가 ───────────────────────────
  var addMoods = [];
  function renderAddMoods() {
    $('#mMoodChips').innerHTML = D.moods.map(function (m) {
      return '<button class="chip' + (addMoods.indexOf(m.key) >= 0 ? ' on' : '') + '" data-am="' + m.key + '">' + esc(m.label) + '</button>';
    }).join('');
  }
  $('#mMoodChips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-am]');
    if (!b) return;
    var k = b.dataset.am, i = addMoods.indexOf(k);
    if (i >= 0) addMoods.splice(i, 1); else addMoods.push(k);
    renderAddMoods();
  });
  $('#addMusicBtn').addEventListener('click', function () {
    $('#mLink').value = '';
    $('#mName').value = '';
    $('#mHint').textContent = '';
    $('#mHint').classList.remove('bad');
    addMoods = state.mood ? [state.mood] : ['none'];
    renderAddMoods();
    openSheet('sheetMusic');
  });

  function parseSpotify(str) {
    var s = String(str || '').trim();
    var m = s.match(/(?:open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|playlist|album)\/([A-Za-z0-9]{22}))/);
    if (m) return { type: m[1], sid: m[2] };
    m = s.match(/spotify:(track|playlist|album):([A-Za-z0-9]{22})/);
    if (m) return { type: m[1], sid: m[2] };
    return null;
  }
  function parseYoutube(str) {
    var s = String(str || '').trim();
    var m = s.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function fetchTitle(type, sid) {
    return fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent('https://open.spotify.com/' + type + '/' + sid))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && j.title ? j.title : null; })
      .catch(function () { return null; });
  }

  $('#mSave').addEventListener('click', function () {
    var hint = $('#mHint');
    var ytId = parseYoutube($('#mLink').value);
    var parsed = ytId ? null : parseSpotify($('#mLink').value);
    if (!ytId && !parsed) {
      hint.textContent = '유튜브 링크(youtu.be/… 또는 watch?v=…)나 스포티파이 링크를 붙여넣어 줘.';
      hint.classList.add('bad');
      return;
    }
    if (!addMoods.length) {
      hint.textContent = '어떤 기분에 틀 건지 하나는 골라줘.';
      hint.classList.add('bad');
      return;
    }
    var typed = $('#mName').value.trim();
    hint.textContent = '확인 중…';
    hint.classList.remove('bad');
    var settled = false;
    var finish = function (title) {
      if (settled) return;
      settled = true;
      state.musicAdded.push({
        id: uid('u'),
        title: typed || title || (ytId ? '내가 추가한 곡' : (parsed.type === 'track' ? '내가 추가한 곡' : '내가 추가한 리스트')),
        yt: ytId || null,
        type: parsed ? parsed.type : 'track',
        sid: parsed ? parsed.sid : null,
        genre: '내가 추가',
        moods: addMoods.slice(),
        note: ''
      });
      state.selectedId = state.musicAdded[state.musicAdded.length - 1].id;
      save(); closeSheets(); renderMusic(); toast('추가했음');
    };
    if (typed || ytId || !parsed) { finish(null); return; }
    fetchTitle(parsed.type, parsed.sid).then(finish);
    setTimeout(function () { if (!settled) finish(null); }, 3500);
  });

  // ── 좋아하는 것 ─────────────────────────
  function favLibrary() {
    var hidden = {};
    state.faveHidden.forEach(function (id) { hidden[id] = 1; });
    var base = D.favorites.filter(function (f) { return !hidden[f.id]; }).map(function (f) {
      return Object.assign({}, f, { custom: false });
    });
    return base.concat(state.faveAdded.map(function (f) { return Object.assign({}, f, { custom: true }); }));
  }
  function favActionLabel(a) {
    if (!a) return '지금 하기';
    if (a.type === 'tab') {
      return { body: '몸풀기 열기', music: '음악 틀기' }[a.tab] || '열기';
    }
    if (a.type === 'move') return '이 동작 바로 시작';
    if (a.type === 'song') return '이 곡 바로 틀기';
    return '바로 열기';
  }
  function favInApp(a) { return !!a && (a.type === 'tab' || a.type === 'move' || a.type === 'song'); }
  function runFavAction(a) {
    if (!a) return;
    if (a.type === 'tab') { goTab(a.tab); return; }
    if (a.type === 'move') {
      var mv = moveById(a.id);
      if (!mv) return;
      state.bodyFilter = mv.track;
      save();
      goTab('body');
      body.activeId = a.id;
      body.remain = mv.d;
      body.done = false;
      body.openId = a.id;
      routine = null;
      renderBody();
      openMoveSheet(a.id);
      chimeStart();
      body.running = true;
      body.endAt = Date.now() + mv.d * 1000;
      renderMoveSheet();
      return;
    }
    if (a.type === 'song') {
      var it = library().filter(function (m) { return m.id === a.id; })[0];
      goTab('music');
      if (it) {
        state.selectedId = it.id; state.mood = it.moods[0] || state.mood;
        save(); renderMoods(); renderMusic(); togglePlay(it, true);
      }
    }
  }
  function renderFav() {
    var box = $('#favResult');
    var item = favLibrary().filter(function (f) { return f.id === state.lastFavId; })[0];
    if (!item) {
      box.innerHTML = '<div class="card"><p class="note" style="margin:0">아래 버튼 누르면 하나 나옴.</p></div>';
    } else {
      box.innerHTML =
        '<article class="card hero">' +
          '<div class="card-top">' +
            (item.meta ? '<span class="tag accent">' + esc(item.meta) + '</span>' : '') +
            '<span class="tag">오늘의 하나</span>' +
            (item.custom ? '<span class="tag">내가 추가</span>' : '') +
          '</div>' +
          '<h3>' + esc(item.title) + '</h3>' +
          '<div class="favbtns">' +
            (favInApp(item.action)
              ? '<button class="btn-primary accent" id="favGo">' + esc(favActionLabel(item.action)) + '</button>'
              : '<a class="btn-primary accent" id="favGo" href="' + esc(item.action && item.action.url || '#') + '" target="_blank" rel="noopener">' + esc(favActionLabel(item.action)) + '</a>') +
            '<button class="btn-outline slim" id="favDone">했음</button>' +
          '</div>' +
        '</article>';
      var go = $('#favGo');
      if (favInApp(item.action)) {
        go.addEventListener('click', function () { runFavAction(item.action); });
      }
      $('#favDone').addEventListener('click', function () { celebrate(); });
    }
    renderFavList();
  }
  $('#favRoll').addEventListener('click', function () {
    var pool = favLibrary();
    if (!pool.length) { toast('목록이 비었음'); return; }
    var item = pickRandom(pool, state.lastFavId);
    state.lastFavId = item.id;
    save(); renderFav();
  });
  function renderFavList() {
    var box = $('#favList'), all = favLibrary();
    $('#favEditBtn').textContent = state.faveEdit ? '완료' : '편집';
    $('#favRestoreBtn').hidden = state.faveHidden.length === 0;
    if (!all.length) { box.innerHTML = '<div class="empty">목록이 비었음. 하나 추가해.</div>'; return; }
    box.innerHTML = all.map(function (f) {
      return '<button class="row" data-fav="' + esc(f.id) + '">' +
        '<span class="row-main">' +
          '<span class="row-title">' + esc(f.title) + '</span>' +
          '<span class="row-meta">' + esc(f.meta || '') + (favInApp(f.action) ? ' · 앱 안에서' : ' · 링크') + '</span>' +
        '</span>' +
        (state.faveEdit
          ? '<span class="row-del" data-fdel="' + esc(f.id) + '">−</span>'
          : '<span class="row-arrow">›</span>') +
      '</button>';
    }).join('');
  }
  $('#favList').addEventListener('click', function (e) {
    var del = e.target.closest('[data-fdel]');
    if (del) {
      var id = del.dataset.fdel;
      if (state.faveAdded.some(function (f) { return f.id === id; })) {
        state.faveAdded = state.faveAdded.filter(function (f) { return f.id !== id; });
      } else if (state.faveHidden.indexOf(id) < 0) {
        state.faveHidden.push(id);
      }
      if (state.lastFavId === id) state.lastFavId = null;
      save(); renderFav(); return;
    }
    var row = e.target.closest('[data-fav]');
    if (row && !state.faveEdit) {
      var item = favLibrary().filter(function (f) { return f.id === row.dataset.fav; })[0];
      if (!item) return;
      state.lastFavId = item.id; save(); renderFav();
    }
  });
  $('#favEditBtn').addEventListener('click', function () {
    state.faveEdit = !state.faveEdit; save(); renderFavList();
  });
  $('#favRestoreBtn').addEventListener('click', function () {
    state.faveHidden = []; save(); renderFav();
  });

  // ── 항목 추가 ───────────────────────────
  function syncFavUrl() {
    var v = $('#fAction').value;
    $('#fUrlWrap').style.display = v === 'link' ? '' : 'none';
  }
  $('#fAction').addEventListener('change', syncFavUrl);
  $('#addFavBtn').addEventListener('click', function () {
    $('#fName').value = ''; $('#fMeta').value = ''; $('#fUrl').value = '';
    $('#fAction').value = 'link'; syncFavUrl();
    $('#fHint').textContent = ''; $('#fHint').classList.remove('bad');
    openSheet('sheetFav');
  });
  $('#fSave').addEventListener('click', function () {
    var hint = $('#fHint');
    var name = $('#fName').value.trim();
    var act = $('#fAction').value;
    var url = $('#fUrl').value.trim();
    if (!name) { hint.textContent = '뭘 할 건지 적어줘.'; hint.classList.add('bad'); return; }
    if (act === 'link' && !/^https?:\/\//i.test(url)) {
      hint.textContent = 'https:// 로 시작하는 링크를 넣어줘.';
      hint.classList.add('bad'); return;
    }
    state.faveAdded.push({
      id: uid('uf'),
      title: name,
      meta: $('#fMeta').value.trim(),
      action: act === 'link' ? { type: 'link', url: url } : { type: 'tab', tab: act }
    });
    save(); closeSheets(); renderFav(); toast('추가했음');
  });

  // ── 몸풀기 ──────────────────────────────
  // 그리드에는 딱 그림 + 동작 이름만. 누르면 아래 시트에서 위치·방법·횟수·효과를 다 보여 줌.
  var body = { activeId: null, running: false, remain: 0, endAt: 0, done: false, openId: null };
  var routine = null; // { id, i, running, remain, endAt, done }

  function allMoves() {
    return (D.stretch || []).map(function (m) {
      return Object.assign({ track: (m.type === '지압' || m.type === '페이스요가') ? 'face' : 'stretch' }, m);
    }).concat((D.simple || []).map(function (m) { return Object.assign({ track: 'simple' }, m); }));
  }
  function moveById(id) {
    return allMoves().filter(function (m) { return m.id === id; })[0] || null;
  }
  function routineById(id) {
    return (D.routines || []).filter(function (r) { return r.id === id; })[0] || null;
  }
  function fmt(sec) {
    var s = Math.max(0, Math.ceil(sec));
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function durLabel(sec) {
    if (sec < 60) return sec + '초';
    var m = Math.floor(sec / 60), r = sec % 60;
    return r ? m + '분 ' + r + '초' : m + '분';
  }
  function moveIcon(id) { return 'assets/moves/' + id + '.png'; }

  function bodyRandomPool() {
    var f = state.bodyFilter || 'all';
    return allMoves().filter(function (m) {
      if (f === 'all') return true;
      return m.track === f;
    });
  }

  function moveTile(m) {
    var active = body.activeId === m.id;
    var pct = 0;
    if (active) {
      pct = body.done ? 100 : (body.remain > 0 ? (1 - body.remain / m.d) * 100 : 0);
    }
    return '<button class="mtile' + (active ? ' on' : '') + '" data-move="' + esc(m.id) + '">' +
      '<span class="mtile-art"><img src="' + moveIcon(m.id) + '" alt="" width="340" height="340" loading="lazy" decoding="async"></span>' +
      '<span class="mtile-name">' + esc(m.name) + '</span>' +
      (active && body.running ? '<span class="mtile-time" id="mvTileTime">' + fmt(body.remain) + '</span>' : '') +
      (active ? '<span class="mtile-bar" id="mvTileBar"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></span>' : '') +
    '</button>';
  }

  function renderBody() {
    var f = state.bodyFilter || 'all';
    $$('#bodySeg button').forEach(function (b) { b.classList.toggle('on', b.dataset.f === f); });

    var rBox = $('#routineBox');
    if (!rBox) return;
    if (f === 'simple' || !(D.routines || []).length) {
      rBox.innerHTML = '';
    } else {
      rBox.innerHTML = '<div class="msec"><span>이어서 하는 코스</span></div>' +
        D.routines.map(routineCard).join('');
    }

    var groups = [
      { k: 'stretch', label: '요가·스트레칭' },
      { k: 'face', label: '지압·페이스' },
      { k: 'simple', label: '간단한 거' }
    ];
    var list = allMoves();
    var html = '';
    groups.forEach(function (g) {
      if (f !== 'all' && f !== g.k) return;
      var items = list.filter(function (m) { return m.track === g.k; });
      if (!items.length) return;
      html += '<div class="msec"><span>' + g.label + '</span><span class="count">' + items.length + '</span></div>' +
        '<div class="mgrid">' + items.map(moveTile).join('') + '</div>';
    });
    $('#moveGrid').innerHTML = html;
  }

  function routineCard(r) {
    var cur = (routine && routine.id === r.id) ? routine : null;
    var total = r.steps.reduce(function (a, s) { return a + s.sec; }, 0);
    var right;
    if (!cur) {
      right = '<button class="rcard-btn" data-rstart="' + esc(r.id) + '">시작</button>';
    } else if (cur.done) {
      right = '<button class="rcard-btn" data-rstart="' + esc(r.id) + '">한 번 더</button>';
    } else {
      right = '<span class="rtime" id="rTime">' + fmt(cur.remain) + '</span>' +
        '<button class="rcard-mini" data-rtoggle="' + esc(r.id) + '">' + (cur.running ? '멈춤' : '계속') + '</button>' +
        '<button class="rcard-mini" data-rnext="' + esc(r.id) + '">' + (cur.i >= r.steps.length - 1 ? '끝내기' : '다음') + '</button>';
    }
    return '<article class="rcard" id="rt-' + esc(r.id) + '">' +
      '<div class="rcard-main">' +
        '<div class="rcard-name">' + esc(r.name) + '</div>' +
        '<div class="rcard-meta">' + r.steps.length + '개 동작 · ' + durLabel(total) + '</div>' +
      '</div>' + right +
    '</article>';
  }

  // ── 동작 상세 시트 ──────────────────────
  function faceDiagram() {
    return '<g class="fg">' +
      '<ellipse cx="110" cy="102" rx="56" ry="84"/>' +
      '<path d="M110 20c-16 0-30 6-40 18"/><path d="M110 20c16 0 30 6 40 18"/>' +
      '<path d="M76 94c8-6 18-6 24-1"/><path d="M120 93c6-5 16-5 24 1"/>' +
      '<path d="M82 112c5-5 11-5 16 0-5 5-11 5-16 0z"/><path d="M122 112c5-5 11-5 16 0-5 5-11 5-16 0z"/>' +
      '<path d="M110 116v30"/><path d="M102 150c4 5 12 5 16 0"/>' +
      '<path d="M97 170c9-4 17-4 26 0"/><path d="M97 173c9 6 17 6 26 0"/>' +
      '<path d="M54 100c-7 5-7 20 0 25"/><path d="M166 100c7 5 7 20 0 25"/>' +
    '</g>';
  }
  // 뒤에서 본 머리: 백회(정수리)·태양(옆 관자)·풍지(뒷목)·견정(어깨)
  function headDiagram() {
    return '<g class="fg">' +
      '<path d="M110 16c31 0 54 25 54 58 0 32-23 58-54 58s-54-26-54-58c0-33 23-58 54-58z"/>' +
      '<path d="M56 66c-7 5-7 18 0 23"/><path d="M164 66c7 5 7 18 0 23"/>' +
      '<path d="M90 130v32"/><path d="M130 130v32"/>' +
      '<path d="M90 160c-20 7-34 17-42 30"/><path d="M130 160c20 7 34 17 42 30"/>' +
    '</g>';
  }
  function moveDiagram(m) {
    if (!m.diagram) return '';
    var marks = '', paired = false;
    (m.steps || []).forEach(function (st, i) {
      if (typeof st === 'string') return;
      var pts = st.map || [];
      if (pts.length > 1) paired = true;
      if (!pts.length) return;
      var xy = pts[0];  // 대칭 혈은 한쪽만 찍어 글자가 겹치지 않게
      marks += '<g class="mark"><circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="8"/>' +
        '<text x="' + xy[0] + '" y="' + (xy[1] + 3.2) + '">' + (i + 1) + '</text></g>';
    });
    return '<div class="diagram">' +
      '<svg viewBox="0 0 220 200" role="img" aria-label="' + esc(m.name) + ' 지압점 위치 도해">' +
      (m.diagram === 'head' ? headDiagram() : faceDiagram()) + marks +
      '</svg>' +
      (paired ? '<p class="diagram-note">대칭인 혈은 한쪽만 표시했어요. 반대쪽도 똑같이 짚으면 됩니다.</p>' : '') +
      '</div>';
  }

  function renderMoveSheet() {
    var m = moveById(body.openId);
    if (!m) return;
    $('#mvTitle').textContent = m.name;
    var active = body.activeId === m.id;
    var pct = 0;
    if (active) pct = body.done ? 100 : (body.remain > 0 ? (1 - body.remain / m.d) * 100 : 0);

    var steps = (m.steps || []).map(function (st, i) {
      if (typeof st === 'string') return '<li><span class="mvn">' + (i + 1) + '</span><span class="mvstep">' + esc(st) + '</span></li>';
      return '<li><span class="mvn">' + (i + 1) + '</span><span class="mvstep">' +
        '<b>' + esc(st.n) + '</b>' +
        '<span class="mvat">' + esc(st.at) + '</span>' +
        '<span class="mvdo">' + esc(st.do) + '</span>' +
      '</span></li>';
    }).join('');

    var btns;
    if (active && body.running) {
      btns = '<button class="btn-primary" data-mpause="1">멈춤</button>';
    } else if (active && body.done) {
      btns = '<button class="btn-primary" data-mstart="1">한 번 더</button>';
    } else if (active && body.remain > 0 && body.remain < m.d - 0.5) {
      btns = '<button class="btn-primary" data-mstart="1">계속</button>';
    } else {
      btns = '<button class="btn-primary" data-mstart="1">시작 · ' + durLabel(m.d) + '</button>';
    }
    if (!(active && body.running)) {
      btns += '<button class="btn-outline slim" data-mdone="1">했음</button>';
    }

    $('#mvBody').innerHTML =
      '<div class="mvhead">' +
        '<span class="mvic"><img src="' + moveIcon(m.id) + '" alt="" width="340" height="340"></span>' +
        '<div class="mvmeta">' +
          '<span class="tag accent">' + esc(m.type || '간단') + '</span>' +
          '<span class="tag">' + esc(m.reps || durLabel(m.d)) + '</span>' +
          '<span class="tag">' + esc(durLabel(m.d)) + '</span>' +
        '</div>' +
      '</div>' +
      '<p class="mv-good"><b>좋은 데</b>' + esc(m.good) + '</p>' +
      '<p class="mv-tip">' + esc(m.tip) + '</p>' +
      moveDiagram(m) +
      (steps ? '<div class="mvsteps-label">이렇게</div><ol class="mvsteps">' + steps + '</ol>' : '') +
      '<div class="mv-run">' +
        (active ? '<div class="bar"><i id="mvBar" style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>' +
          '<div class="mv-time" id="mvTime">' + (body.done ? '다 했음' : fmt(body.remain)) + '</div>' : '') +
        '<div class="timerbtns">' + btns + '</div>' +
      '</div>';
  }

  function openMoveSheet(id) {
    var m = moveById(id);
    if (!m) return;
    body.openId = id;
    renderMoveSheet();
    openSheet('sheetMove');
    var sc = $('#sheetMove');
    if (sc) sc.scrollTop = 0;
  }

  function startMove() {
    var m = moveById(body.openId);
    if (!m) return;
    routine = null;
    if (body.activeId !== m.id || body.done || body.remain <= 0) {
      body.activeId = m.id;
      body.remain = m.d;
      body.done = false;
    }
    chimeStart();
    body.running = true;
    body.endAt = Date.now() + body.remain * 1000;
    renderBody(); renderMoveSheet();
  }
  function pauseMove() {
    if (!body.running) return;
    body.remain = Math.max(0, (body.endAt - Date.now()) / 1000);
    body.running = false;
    renderBody(); renderMoveSheet();
  }
  function finishMove(id) {
    var m = moveById(id);
    if (!m) return;
    routine = null;
    body.activeId = id;
    body.openId = id;
    body.running = false;
    body.done = true;
    body.remain = 0;
    renderBody();
    if ($('#sheetMove').classList.contains('on')) renderMoveSheet();
    celebrate();
  }

  function startRoutine(id) {
    var r = routineById(id);
    if (!r) return;
    body.activeId = null;
    body.running = false;
    body.done = false;
    routine = { id: id, i: 0, running: false, remain: r.steps[0].sec, endAt: 0, done: false };
    runRoutineStep();
    bringRoutineIntoView(id);
  }
  function bringRoutineIntoView(id) {
    if (currentTab !== 'body') return;
    var el = document.getElementById('rt-' + id);
    if (!el) return;
    var r = el.getBoundingClientRect();
    if (r.top < 80 || r.bottom > window.innerHeight - 20) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
  function runRoutineStep() {
    var r = routine && routineById(routine.id);
    if (!r) return;
    var st = r.steps[routine.i];
    routine.done = false;
    chimeStart();
    routine.running = true;
    routine.remain = st.sec;
    routine.endAt = Date.now() + st.sec * 1000;
    renderBody();
  }
  function nextRoutineStep() {
    var r = routine && routineById(routine.id);
    if (!r) return;
    if (routine.i >= r.steps.length - 1) { finishRoutine(); return; }
    routine.i += 1;
    runRoutineStep();
    bringRoutineIntoView(r.id);
  }
  function finishRoutine() {
    if (!routine) return;
    routine.running = false;
    routine.done = true;
    routine.remain = 0;
    if (currentTab === 'body') renderBody();
    celebrate();
  }

  $('#bodyRandom').addEventListener('click', function () {
    var pool = bodyRandomPool();
    if (!pool.length) return;
    var m = pickRandom(pool, body.openId);
    if (!m) return;
    body.activeId = m.id;
    body.remain = m.d;
    body.done = false;
    body.openId = m.id;
    routine = null;
    renderBody();
    openMoveSheet(m.id);
    chimeStart();
    body.running = true;
    body.endAt = Date.now() + m.d * 1000;
    renderMoveSheet();
  });

  $('#bodySeg').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-f]');
    if (!b) return;
    state.bodyFilter = b.dataset.f;
    save(); renderBody();
  });

  $('#moveGrid').addEventListener('click', function (e) {
    var b = e.target.closest('[data-move]');
    if (b) { openMoveSheet(b.dataset.move); return; }
    var r = e.target.closest('[data-rstart]');
    if (r) { startRoutine(r.dataset.rstart); return; }
    var rt = e.target.closest('[data-rtoggle]');
    if (rt) { toggleRoutine(rt.dataset.rtoggle); return; }
    var rn = e.target.closest('[data-rnext]');
    if (rn) { nextRoutineStep(); return; }
  });
  $('#routineBox').addEventListener('click', function (e) {
    var r = e.target.closest('[data-rstart]');
    if (r) { startRoutine(r.dataset.rstart); return; }
    var rt = e.target.closest('[data-rtoggle]');
    if (rt) { toggleRoutine(rt.dataset.rtoggle); return; }
    var rn = e.target.closest('[data-rnext]');
    if (rn) { nextRoutineStep(); return; }
  });
  function toggleRoutine(id) {
    if (!routine || routine.id !== id) { startRoutine(id); return; }
    if (routine.running) {
      routine.remain = Math.max(0, (routine.endAt - Date.now()) / 1000);
      routine.running = false;
    } else {
      routine.running = true;
      routine.endAt = Date.now() + routine.remain * 1000;
      chimeStart();
    }
    renderBody();
  }

  $('#sheetMove').addEventListener('click', function (e) {
    if (e.target.closest('[data-mvclose]')) { closeSheets(); return; }
    if (e.target.closest('[data-mstart]')) { startMove(); return; }
    if (e.target.closest('[data-mpause]')) { pauseMove(); return; }
    if (e.target.closest('[data-mdone]')) { finishMove(body.openId); return; }
  });

  // ── 산책 ────────────────────────────────
  function bandNow() {
    var h = new Date().getHours();
    if (h >= 5 && h < 10) return '아침';
    if (h >= 10 && h < 17) return '낮';
    if (h >= 17 && h < 21) return '저녁';
    return '밤';
  }
  function coursePool() {
    var band = bandNow(), day = new Date().getDay();
    var list = D.courses.filter(function (c) {
      return c.bands.indexOf(band) >= 0 && (c.closedDays || []).indexOf(day) < 0;
    });
    if (!list.length) {
      list = D.courses.filter(function (c) { return (c.closedDays || []).indexOf(day) < 0; });
    }
    return list;
  }
  function naverSearch(name) {
    return 'https://map.naver.com/p/search/' + encodeURIComponent(name);
  }
  function renderWalk() {
    var band = bandNow();
    $('#walkSub').textContent = '지금은 ' + band + '. 이 시간에 맞는 코스만 골라줌.';
    var c = D.courses.filter(function (x) { return x.id === state.lastCourseId; })[0];
    if (c && (c.closedDays || []).indexOf(new Date().getDay()) >= 0) { state.lastCourseId = null; save(); c = null; }
    var box = $('#walkResult');
    if (!c) {
      box.innerHTML = '<div class="card"><p class="note" style="margin:0">코스 뽑기 누르면 하나 나옴. ' + esc(band) + '에 걸을 만한 것만.</p></div>';
    } else {
      box.innerHTML =
        '<article class="card hero">' +
          '<div class="card-top">' +
            '<span class="tag accent">' + esc(band) + '</span>' +
            '<span class="tag">' + esc(c.total) + '</span>' +
            '<span class="tag">' + esc(c.distance) + '</span>' +
          '</div>' +
          '<h3>' + esc(c.title) + '</h3>' +
          '<p class="note">' + esc(c.note) + '</p>' +
          '<div class="stops">' +
            c.stops.map(function (s, i) {
              return '<div class="stop">' +
                '<div class="stop-name">' + (i + 1) + '. ' + esc(s.name) + '</div>' +
                '<div class="stop-sub">' + esc(s.sub) + '</div>' +
                '<div class="mapbtns">' +
                  '<a class="mapbtn" href="' + naverSearch(s.query) + '" target="_blank" rel="noopener">가보기</a>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</article>';
    }
    renderHot();
  }

  // 인스타·동네에서 뜨는 카페·빵집·맛집 — 코스와 별개로 늘 보여 줌
  function renderHot() {
    var box = $('#hotList');
    if (!box) return;
    var list = D.hotplaces || [];
    if (!list.length) { box.innerHTML = ''; return; }
    box.innerHTML =
      '<div class="section-head"><h2>인스타에서 핫한 데</h2><span class="count">카페·빵집·맛집 ' + list.length + '곳</span></div>' +
      list.map(function (h) {
        return '<article class="card hot">' +
          (h.img
            ? '<span class="hot-photo"><img src="' + esc(h.img) + '" alt="' + esc(h.name) + ' 사진" loading="lazy" decoding="async" onerror="this.closest(\'.hot-photo\').style.display=\'none\'"></span>'
            : '') +
          '<div class="card-top"><span class="tag accent">' + esc(h.cat) + '</span></div>' +
          '<h3>' + esc(h.name) + '</h3>' +
          '<p class="hot-addr">' + esc(h.addr) + '</p>' +
          '<p class="hot-note">' + esc(h.note) + '</p>' +
          (h.hours ? '<p class="hot-hours">' + esc(h.hours) + '</p>' : '') +
          '<div class="mapbtns"><a class="mapbtn" href="' + naverSearch(h.query) + '" target="_blank" rel="noopener">가보기</a></div>' +
        '</article>';
      }).join('');
  }
  $('#walkRoll').addEventListener('click', function () {
    var pool = coursePool();
    if (!pool.length) { toast('지금 시간엔 코스가 없음'); return; }
    var c = pickRandom(pool, state.lastCourseId);
    state.lastCourseId = c.id;
    save(); renderWalk();
  });

  // ── 공통 틱 ─────────────────────────────
  var chip = $('#liveChip'), chipTime = $('#liveTime'), chipLabel = $('#liveLabel');
  setInterval(function () {
    if (routine && routine.running) {
      var rr = routineById(routine.id);
      if (rr) {
        routine.remain = Math.max(0, (routine.endAt - Date.now()) / 1000);
        if (routine.remain <= 0) {
          nextRoutineStep();
        } else if (currentTab === 'body') {
          var rtime = $('#rTime');
          if (rtime) rtime.textContent = fmt(routine.remain);
        }
      }
    } else if (body.running) {
      var bm = moveById(body.activeId);
      if (bm) {
        body.remain = Math.max(0, (body.endAt - Date.now()) / 1000);
        if (body.remain <= 0) {
          finishMove(bm.id);
        } else {
          var mbar = $('#mvBar');
          if (mbar) mbar.style.width = Math.max(0, Math.min(100, (1 - body.remain / bm.d) * 100)) + '%';
          var mtime = $('#mvTime');
          if (mtime) mtime.textContent = fmt(body.remain);
          var ttime = $('#mvTileTime');
          if (ttime) ttime.textContent = fmt(body.remain);
          var tbar = $('#mvTileBar');
          if (tbar) tbar.firstChild.style.width = Math.max(0, Math.min(100, (1 - body.remain / bm.d) * 100)) + '%';
        }
      }
    }
    if (routine && routine.running) {
      chip.hidden = false; chipLabel.textContent = '코스'; chipTime.textContent = fmt(routine.remain);
    } else if (body.running) {
      chip.hidden = false; chipLabel.textContent = '몸풀기'; chipTime.textContent = fmt(body.remain);
    } else {
      chip.hidden = true;
    }
  }, 200);
  chip.addEventListener('click', function () {
    goTab('body');
    if (body.activeId) openMoveSheet(body.activeId);
  });

  // ── 시작 ────────────────────────────────
  renderMoods();
  renderMusic();
  renderFav();
  renderBody();
  renderWalk();
})();
