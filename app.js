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
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
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
    counts: { date: todayKey(), timer: 0, mission: 0, walk: 0 },
    timerSize: 180
  };
  var state;
  try {
    state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}'));
  } catch (e) { state = Object.assign({}, defaults); }
  state.counts = Object.assign({ date: todayKey(), timer: 0, mission: 0, walk: 0 }, state.counts || {});
  if (state.counts.date !== todayKey()) state.counts = { date: todayKey(), timer: 0, mission: 0, walk: 0 };

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
    if (name === 'timer') renderTimer();
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
  function spUri(item) { return 'spotify:' + item.type + ':' + item.sid; }
  function spEmbed(item) { return 'https://open.spotify.com/embed/' + item.type + '/' + item.sid + '?utm_source=generator&theme=0'; }
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

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
        '<a class="btn-primary" href="' + spPage(item) + '" target="_blank" rel="noopener">' +
          '<span class="spotify-mark"><svg viewBox="0 0 24 24"><path d="M7 9.5c3.5-1 7.5-.7 10 .8"/><path d="M7.6 13c2.9-.8 6.2-.5 8.6.8"/><path d="M8.2 16.3c2.3-.6 4.8-.4 6.9.7"/></svg></span>' +
          '스포티파이에서 바로 열기</a>' +
        (isIOS ? '<div class="applink"><a class="linkbtn" href="' + spUri(item) + '">앱 URI(spotify:)로 열기</a></div>' : '') +
        '<div class="embed"><iframe src="' + spEmbed(item) + '" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="스포티파이 플레이어"></iframe></div>' +
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
  function fetchTitle(type, sid) {
    return fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent('https://open.spotify.com/' + type + '/' + sid))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && j.title ? j.title : null; })
      .catch(function () { return null; });
  }

  $('#mSave').addEventListener('click', function () {
    var hint = $('#mHint');
    var parsed = parseSpotify($('#mLink').value);
    if (!parsed) {
      hint.textContent = 'open.spotify.com 곡·플레이리스트·앨범 링크를 붙여넣어 줘.';
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
        title: typed || title || (parsed.type === 'track' ? '내가 추가한 곡' : '내가 추가한 리스트'),
        type: parsed.type,
        sid: parsed.sid,
        genre: '내가 추가',
        moods: addMoods.slice(),
        note: ''
      });
      state.selectedId = state.musicAdded[state.musicAdded.length - 1].id;
      save(); closeSheets(); renderMusic(); toast('추가했음');
    };
    if (typed) { finish(null); return; }
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
      return { timer: '3분 타이머 열기', body: '몸풀기 열기', music: '음악 열기', walk: '산책 코스 열기' }[a.tab] || '열기';
    }
    return '지금 하기';
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
          (item.action && item.action.type === 'tab'
            ? '<button class="btn-primary accent" id="favGo">' + esc(favActionLabel(item.action)) + '</button>'
            : '<a class="btn-primary accent" id="favGo" href="' + esc(item.action && item.action.url || '#') + '" target="_blank" rel="noopener">' + esc(favActionLabel(item.action)) + '</a>') +
        '</article>';
      var go = $('#favGo');
      if (item.action && item.action.type === 'tab') {
        go.addEventListener('click', function () { goTab(item.action.tab); });
      }
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
          '<span class="row-meta">' + esc(f.meta || '') + (f.action && f.action.type === 'tab' ? ' · 앱 안에서' : ' · 링크') + '</span>' +
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
  // body = 한 동작 타이머, routine = 커리큘럼 코스(단계별). 둘 중 하나만 돈다.
  var body = { activeId: null, running: false, remain: 0, endAt: 0, done: false, praise: null };
  var routine = null; // { id, i, running, remain, endAt, done }

  function allMoves() {
    return (D.stretch || []).map(function (m) { return Object.assign({ track: 'stretch' }, m); })
      .concat((D.simple || []).map(function (m) { return Object.assign({ track: 'simple' }, m); }));
  }
  function moveById(id) {
    return allMoves().filter(function (m) { return m.id === id; })[0] || null;
  }
  function routineById(id) {
    return (D.routines || []).filter(function (r) { return r.id === id; })[0] || null;
  }
  function durLabel(sec) {
    if (sec < 60) return sec + '초';
    var m = Math.floor(sec / 60), r = sec % 60;
    return r ? m + '분 ' + r + '초' : m + '분';
  }
  function bodyRandomPool() {
    var f = state.bodyFilter || 'all';
    return allMoves().filter(function (m) {
      if (f === 'stretch') return m.track === 'stretch';
      if (f === 'simple') return m.track === 'simple';
      return true;
    });
  }
  function stopAllBody() {
    body.running = false;
    body.remain = 0;
    routine = null;
  }
  function renderBody() {
    var f = state.bodyFilter || 'all';
    $$('#bodySeg button').forEach(function (b) { b.classList.toggle('on', b.dataset.f === f); });

    var rBox = $('#routineBox');
    rBox.innerHTML = (f === 'simple' || !(D.routines || []).length)
      ? ''
      : D.routines.map(routineCard).join('');
    rBox.style.marginBottom = rBox.innerHTML ? '' : '0';

    var html = '';
    if (f !== 'simple') {
      html += '<div class="section-head"><h2>스트레칭 &amp; 요가</h2><span class="count">' + D.stretch.length + '개</span></div>';
      html += D.stretch.map(moveCard).join('');
    }
    if (f !== 'stretch') {
      html += '<div class="section-head"><h2>진짜 간단한 것</h2><span class="count">' + D.simple.length + '개</span></div>';
      html += D.simple.map(moveCard).join('');
    }
    $('#moveList').innerHTML = html;
    $('#bodyCount').textContent = '오늘 몸풀기 ' + state.counts.mission + '번';
  }

  function moveCard(m) {
    var active = body.activeId === m.id;
    var pct = 0;
    if (active) {
      if (body.done) pct = 100;
      else if (body.remain > 0) pct = (1 - body.remain / m.d) * 100;
    }
    var dlab = durLabel(m.d);
    return '<article class="card move' + (active ? ' on' : '') + '" id="mv-' + m.id + '">' +
      '<div class="card-top">' +
        '<span class="tag accent">' + esc(m.type || '간단') + '</span>' +
        (m.reps && m.reps !== dlab ? '<span class="tag">' + esc(m.reps) + '</span>' : '') +
        '<span class="tag">' + esc(dlab) + '</span>' +
      '</div>' +
      '<h3>' + esc(m.name) + '</h3>' +
      '<p class="mv-good"><b>좋은 데</b>' + esc(m.good) + '</p>' +
      '<p class="mv-tip">' + esc(m.tip) + '</p>' +
      (active
        ? '<div class="bar"><i id="mvBar" style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>' +
          '<div class="timerbtns">' +
            '<button class="btn-primary" data-toggle="' + esc(m.id) + '">' +
              (body.running ? '멈춤' : body.done ? '한 번 더'
                : (body.remain > 0 && body.remain < m.d - 0.5) ? '계속' : '시작') + '</button>' +
            (body.done ? '' : '<button class="btn-outline slim" data-done="' + esc(m.id) + '">완료</button>') +
          '</div>' +
          (body.praise ? '<div class="praise" style="margin-top:14px">' + esc(body.praise) + '</div>' : '') +
          '<button class="linkbtn center" data-close="1">접기</button>'
        : '<div class="mv-btns">' +
            '<button class="mv-go" data-start="' + esc(m.id) + '">시작</button>' +
            '<button class="mv-check" data-done="' + esc(m.id) + '">완료</button>' +
          '</div>') +
    '</article>';
  }

  function routineCard(r) {
    var cur = (routine && routine.id === r.id) ? routine : null;
    var total = r.steps.reduce(function (a, s) { return a + s.sec; }, 0);
    var steps = r.steps.map(function (s, i) {
      var m = moveById(s.id) || { name: s.id };
      var cls = '', mark = i + 1, right = '<span class="t">' + durLabel(s.sec) + '</span>';
      if (cur) {
        var passed = i < cur.i || (cur.done && i <= cur.i);
        if (passed) { cls = ' past'; mark = '✓'; }
        else if (i === cur.i) {
          cls = ' on';
          right = '<span class="t" id="rTime">' + fmt(cur.remain) + '</span>';
        }
      }
      return '<li class="step' + cls + '"><span class="n">' + mark + '</span>' +
        '<span class="s-name">' + esc(m.name) + '</span>' + right + '</li>';
    }).join('');

    var btns;
    if (!cur) btns = '<button class="btn-primary" data-rstart="' + esc(r.id) + '">코스 시작</button>';
    else if (cur.done) btns = '<button class="btn-primary" data-rstart="' + esc(r.id) + '">한 번 더</button>';
    else btns = '<button class="btn-primary" data-rtoggle="' + esc(r.id) + '">' + (cur.running ? '멈춤' : '계속') + '</button>' +
      '<button class="btn-outline slim" data-rnext="' + esc(r.id) + '">' +
      (cur.i >= r.steps.length - 1 ? '끝내기' : '다음 동작') + '</button>';

    return '<article class="card routine" id="rt-' + r.id + '">' +
      '<div class="card-top">' +
        '<span class="tag accent">코스</span>' +
        '<span class="tag">' + esc(durLabel(total)) + '</span>' +
        '<span class="tag">' + r.steps.length + '개 동작</span>' +
      '</div>' +
      '<h3>' + esc(r.name) + '</h3>' +
      '<p class="note">' + esc(r.note) + '</p>' +
      '<ol class="steps">' + steps + '</ol>' +
      (cur && !cur.done
        ? '<div class="bar"><i id="rBar" style="width:' +
            Math.max(0, Math.min(100, (1 - cur.remain / r.steps[cur.i].sec) * 100)) + '%"></i></div>'
        : '') +
      '<div class="timerbtns"' + (cur && !cur.done ? '' : ' style="margin-top:14px"') + '>' + btns + '</div>' +
      (cur && cur.done && body.praise ? '<div class="praise" style="margin-top:14px">' + esc(body.praise) + '</div>' : '') +
    '</article>';
  }

  function activateMove(id, auto) {
    var m = moveById(id);
    if (!m) return;
    routine = null;
    body.activeId = id;
    body.done = false;
    body.praise = null;
    body.remain = m.d;
    body.running = false;
    if (auto) {
      chimeStart();
      body.running = true;
      body.endAt = Date.now() + m.d * 1000;
    }
    renderBody();
  }
  function toggleMove() {
    var m = moveById(body.activeId);
    if (!m) return;
    if (body.running) {
      body.remain = Math.max(0, (body.endAt - Date.now()) / 1000);
      body.running = false;
      renderBody();
      return;
    }
    if (body.done || body.remain <= 0) { body.done = false; body.praise = null; body.remain = m.d; }
    chimeStart();
    body.running = true;
    body.endAt = Date.now() + body.remain * 1000;
    renderBody();
  }
  function finishMove(id) {
    var m = moveById(id);
    if (!m) return;
    routine = null;
    body.activeId = id;
    body.running = false;
    body.done = true;
    body.remain = 0;
    body.praise = D.praise[Math.floor(Math.random() * D.praise.length)];
    state.counts.mission += 1;
    save(); chimeDone();
    if (currentTab === 'body') renderBody();
    toast('하나 함 · 오늘 ' + state.counts.mission + '번');
  }

  function startRoutine(id) {
    var r = routineById(id);
    if (!r) return;
    body.activeId = null;
    body.running = false;
    body.done = false;
    body.praise = null;
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
    body.praise = D.praise[Math.floor(Math.random() * D.praise.length)];
    state.counts.mission += 1;
    save(); chimeDone();
    if (currentTab === 'body') renderBody();
    toast('코스 한 바퀴 끝');
  }

  $('#bodyRandom').addEventListener('click', function () {
    var pool = bodyRandomPool();
    if (!pool.length) return;
    var m = pickRandom(pool, body.activeId);
    if (!m) return;
    activateMove(m.id, true);
    var el = document.getElementById('mv-' + m.id);
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    window.setTimeout(function () { toast('이거 해봐 · ' + m.name); }, 260);
  });

  $('#bodySeg').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-f]');
    if (!b) return;
    state.bodyFilter = b.dataset.f;
    save(); renderBody();
  });

  $('#moveList').addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-start]'))) { activateMove(el.dataset.start, true); return; }
    if ((el = e.target.closest('[data-toggle]'))) {
      if (body.activeId !== el.dataset.toggle || routine) activateMove(el.dataset.toggle, false);
      else toggleMove();
      return;
    }
    if ((el = e.target.closest('[data-done]'))) { finishMove(el.dataset.done); return; }
    if (e.target.closest('[data-close]')) {
      body.activeId = null; body.running = false; body.done = false; body.praise = null; body.remain = 0;
      renderBody();
    }
  });

  $('#routineBox').addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-rstart]'))) { startRoutine(el.dataset.rstart); return; }
    if ((el = e.target.closest('[data-rtoggle]'))) {
      if (!routine || routine.id !== el.dataset.rtoggle) { startRoutine(el.dataset.rtoggle); return; }
      if (routine.running) {
        routine.remain = Math.max(0, (routine.endAt - Date.now()) / 1000);
        routine.running = false;
      } else {
        routine.running = true;
        routine.endAt = Date.now() + routine.remain * 1000;
        chimeStart();
      }
      renderBody();
      return;
    }
    if (e.target.closest('[data-rnext]')) { nextRoutineStep(); }
  });

  // ── 타이머 ──────────────────────────────
  var timer = { running: false, remain: 180, endAt: 0 };

  function fmt(sec) {
    var s = Math.max(0, Math.ceil(sec));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function timerPraise(msg) {
    var el = $('#timerPraise');
    if (!msg) { el.hidden = true; el.textContent = ''; return; }
    el.hidden = false; el.textContent = msg;
  }
  function renderTimer() {
    var size = state.timerSize;
    if (!timer.running && timer.remain > size) timer.remain = size;
    $('#timerDigits').textContent = fmt(timer.remain);
    var pct = Math.max(0, Math.min(100, (1 - timer.remain / size) * 100));
    $('#timerBar').style.width = pct + '%';
    $('#timerStart').textContent = timer.running ? '멈춤' : (timer.remain < size && timer.remain > 0 ? '계속' : '시작');
    $$('#timerSeg button').forEach(function (b) {
      b.classList.toggle('on', Number(b.dataset.min) * 60 === size);
    });
    var sel = library().filter(function (m) { return m.id === state.selectedId; })[0];
    $('#timerMusicName').textContent = sel ? sel.title : '아직 안 고름';
    $('#timerCount').textContent = '오늘 타이머 ' + state.counts.timer + '번';
  }
  function switchSize(sec) {
    state.timerSize = sec;
    timer.running = false;
    timer.remain = sec;
    timerPraise(null);
    save(); renderTimer();
  }
  $('#timerSeg').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-min]');
    if (b) switchSize(Number(b.dataset.min) * 60);
  });
  $('#timerStart').addEventListener('click', function () {
    if (timer.running) {
      timer.remain = Math.max(0, (timer.endAt - Date.now()) / 1000);
      timer.running = false;
      renderTimer();
      return;
    }
    if (timer.remain <= 0) timer.remain = state.timerSize;
    chimeStart();
    timer.running = true;
    timer.endAt = Date.now() + timer.remain * 1000;
    renderTimer();
  });
  $('#timerReset').addEventListener('click', function () {
    timer.running = false;
    timer.remain = state.timerSize;
    timerPraise(null);
    renderTimer();
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
  function mapLinks(name) {
    var q = encodeURIComponent(name);
    return {
      kakao: 'https://map.kakao.com/link/search/' + q,
      naver: 'https://map.naver.com/p/search/' + q
    };
  }
  function renderWalk() {
    var band = bandNow();
    $('#walkSub').textContent = '지금은 ' + band + '. 이 시간에 맞는 코스만 골라줌.';
    var c = D.courses.filter(function (x) { return x.id === state.lastCourseId; })[0];
    if (c && (c.closedDays || []).indexOf(new Date().getDay()) >= 0) { state.lastCourseId = null; save(); c = null; }
    var box = $('#walkResult');
    if (!c) {
      box.innerHTML = '<div class="card"><p class="note" style="margin:0">코스 뽑기 누르면 하나 나옴. ' + esc(band) + '에 걸을 만한 것만.</p></div>';
      return;
    }
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
            var l = mapLinks(s.query);
            return '<div class="stop">' +
              '<div class="stop-name">' + (i + 1) + '. ' + esc(s.name) + '</div>' +
              '<div class="stop-sub">' + esc(s.sub) + '</div>' +
              '<div class="mapbtns">' +
                '<a class="mapbtn" href="' + l.kakao + '" target="_blank" rel="noopener">카카오맵</a>' +
                '<a class="mapbtn" href="' + l.naver + '" target="_blank" rel="noopener">네이버지도</a>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</article>';
  }
  $('#walkRoll').addEventListener('click', function () {
    var pool = coursePool();
    if (!pool.length) { toast('지금 시간엔 코스가 없음'); return; }
    var c = pickRandom(pool, state.lastCourseId);
    state.lastCourseId = c.id;
    state.counts.walk += 1;
    save(); renderWalk();
  });

  // ── 공통 틱 ─────────────────────────────
  var chip = $('#liveChip'), chipTime = $('#liveTime'), chipLabel = $('#liveLabel');
  setInterval(function () {
    if (timer.running) {
      timer.remain = Math.max(0, (timer.endAt - Date.now()) / 1000);
      if (timer.remain <= 0) {
        timer.running = false;
        timer.remain = 0;
        state.counts.timer += 1;
        save();
        timerPraise(D.timerDone[Math.floor(Math.random() * D.timerDone.length)]);
        chimeDone();
      }
      if (currentTab === 'timer') renderTimer();
    }
    if (routine && routine.running) {
      var rr = routineById(routine.id);
      if (rr) {
        routine.remain = Math.max(0, (routine.endAt - Date.now()) / 1000);
        if (routine.remain <= 0) {
          nextRoutineStep();
        } else if (currentTab === 'body') {
          var st = rr.steps[routine.i];
          var rbar = $('#rBar');
          if (rbar) rbar.style.width = Math.max(0, Math.min(100, (1 - routine.remain / st.sec) * 100)) + '%';
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
        } else if (currentTab === 'body') {
          var mbar = $('#mvBar');
          if (mbar) mbar.style.width = Math.max(0, Math.min(100, (1 - body.remain / bm.d) * 100)) + '%';
        }
      }
    }
    if (timer.running) {
      chip.hidden = false; chipLabel.textContent = '타이머'; chipTime.textContent = fmt(timer.remain);
    } else if (routine && routine.running) {
      chip.hidden = false; chipLabel.textContent = '코스'; chipTime.textContent = fmt(routine.remain);
    } else if (body.running) {
      chip.hidden = false; chipLabel.textContent = '몸풀기'; chipTime.textContent = fmt(body.remain);
    } else {
      chip.hidden = true;
    }
  }, 200);
  chip.addEventListener('click', function () {
    goTab(timer.running ? 'timer' : 'body');
  });

  // ── 시작 ────────────────────────────────
  renderMoods();
  renderMusic();
  renderFav();
  renderBody();
  renderTimer();
  renderWalk();
})();
