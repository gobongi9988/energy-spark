// 시동 — 기본 데이터 (모두 실제 존재하는 스포티파이 플레이리스트 / 노원구 상계6동 실제 장소)
window.SIDONG = {
  moods: [
    { key: 'none',  label: '아무것도 하기 싫어' },
    { key: 'low',   label: '기분이 가라앉아' },
    { key: 'head',  label: '머리가 복잡해' },
    { key: 'up',    label: '살짝 기운 내고 싶어' },
    { key: 'blank', label: '멍때리고 싶어' }
  ],

  // Spotify 편집자 플레이리스트 — ID는 open.spotify.com/oembed 로 존재 확인함 (2026-11-27)
  music: [
    { id: 'm-lofi',   title: 'lofi beats',                 type: 'playlist', sid: '37i9dQZF1DWWQRwui0ExPn', genre: '로파이',   moods: ['none', 'head'],          note: '아무 일도 안 하는 소리' },
    { id: 'm-slow',   title: 'slow living',                type: 'playlist', sid: '37i9dQZF1DXc8kgYqQLMfH', genre: '슬로우',   moods: ['none', 'low', 'blank'],  note: '가만히 있어도 되는 쪽' },
    { id: 'm-chill',  title: 'Chill Hits',                 type: 'playlist', sid: '37i9dQZF1DX4WYpdgoIcn6', genre: '칠',       moods: ['none', 'low'],           note: '적당히 흘러가는 팝' },
    { id: 'm-piano',  title: 'Peaceful Piano',             type: 'playlist', sid: '37i9dQZF1DX4sWSpwq3LiO', genre: '피아노',   moods: ['low', 'head'],           note: '말 안 걸고 위로도 안 함' },
    { id: 'm-jazz',   title: 'Jazz Vibes',                 type: 'playlist', sid: '37i9dQZF1DX0SM0LYsmbMT', genre: '재즈',     moods: ['blank', 'head'],         note: '멍때리기엔 재즈가 편함' },
    { id: 'm-city',   title: 'City Pop: シティ・ポップの今', type: 'playlist', sid: '37i9dQZF1DXdY5tVYFPWb2', genre: '시티팝',   moods: ['blank', 'up'],           note: '옛날 일본, 이상하게 기운 남' },
    { id: 'm-indie',  title: "Indie's Top 50",             type: 'playlist', sid: '37i9dQZF1DX2Nc3B70tvx0', genre: '인디',     moods: ['up'],                    note: '기타 소리로 겨우 시동' },
    { id: 'm-mood',   title: 'Mood Booster',               type: 'playlist', sid: '37i9dQZF1DX3rxVfibe1L0', genre: '팝',       moods: ['up'],                    note: '억지로라도 올려야 할 때' },
    { id: 'm-stress', title: 'Stress Relief',              type: 'playlist', sid: '37i9dQZF1DWXe9gFZP0gtP', genre: '앰비언트', moods: ['head'],                  note: '머리 안 소음 끄는 용도' },
    { id: 'm-focus',  title: 'Deep Focus',                 type: 'playlist', sid: '37i9dQZF1DWZeKCadgRdKQ', genre: '집중',     moods: ['head', 'none'],          note: '해야 할 게 있을 때' }
  ],

  missions: [
    { id: 'w1',  title: '창문 열고 30초 서 있기',            d: 30 },
    { id: 'w2',  title: '물 한 잔 마시고 기지개 한 번',      d: 40 },
    { id: 'w3',  title: '자리에서 일어나 방 한 바퀴',        d: 40 },
    { id: 'w4',  title: '어깨 앞뒤로 10번씩 돌리기',         d: 30 },
    { id: 'w5',  title: '벽 짚고 종아리 20초씩 늘리기',      d: 40 },
    { id: 'w6',  title: '손 비벼서 눈 위에 20초 올려두기',   d: 20 },
    { id: 'w7',  title: '현관까지 갔다 오기',                d: 40 },
    { id: 'w8',  title: '계단 한 층만 오르내리기',           d: 60 },
    { id: 'w9',  title: '세수 한 번 하고 오기',              d: 60 },
    { id: 'w10', title: '바닥에 30초 누워 있기',             d: 30 },
    { id: 'w11', title: '목 좌우로 10초씩 천천히',           d: 20 },
    { id: 'w12', title: '냉장고 열고 찬 공기 마시기',        d: 15 }
  ],

  praise: [
    '일단 물 한 잔 넘겼으면 오늘 절반은 한 거임.',
    '몸 한 번 털었네. 시동 생각보다 빨리 걸림.',
    '이만큼이면 충분함. 더 하지 마.',
    '별거 안 했는데 몸은 알아들음.',
    '끝. 상은 없고 몸만 좀 나아짐.',
    '10초 엎드렸을 뿐인데 세상이 조금 멀어짐.',
    '창문 열었으니까 오늘 집은 살아 있음.',
    '기지개 한 번에 등뼈가 고맙다고 함.',
    '서 있는 김에 서 있었음. 그것도 한 거임.',
    '어깨 돌렸더니 어깨가 그럭저럭 괜찮대.',
    '세수 했으니 사람 비스무리해짐.',
    '이 동작 하나로 인생은 안 바뀜. 대신 지금이 조금 나음.'
  ],

  timerDone: [
    '다 채웠음. 시작은 한 거임.',
    '딱 그만큼. 더 안 해도 됨.',
    '타이머 끝. 이제 물 마시고 늘어져.',
    '한 칸 채움. 오늘 이거 하나는 확실함.'
  ],

  // 좋아하는 것 — action: link(지도·사이트) 또는 이 앱의 탭
  favorites: [
    { id: 'f1',  title: '당현천 10분 걷기',        meta: '15분',  action: { type: 'link', url: 'https://map.kakao.com/link/search/%EB%8B%B9%ED%98%84%EC%B2%9C%EA%B7%BC%EB%A6%B0%EA%B3%B5%EC%9B%90' } },
    { id: 'f2',  title: '편의점에서 아이스크림 하나', meta: '5분',   action: { type: 'link', url: 'https://map.kakao.com/link/search/GS25%20%EC%83%81%EA%B3%84%ED%81%AC%EB%A1%9C%EB%B0%94%EC%A0%90' } },
    { id: 'f3',  title: '헌책방에서 책등만 훑기',     meta: '10분',  action: { type: 'link', url: 'https://map.kakao.com/link/search/%EC%95%8C%EB%9D%BC%EB%94%98%EC%A4%91%EA%B3%A0%EC%84%9C%EC%A0%90%20%EB%85%B8%EC%9B%90%EC%97%AD%EC%A0%90' } },
    { id: 'f4',  title: '노원문고 신간 코너',         meta: '10분',  action: { type: 'link', url: 'https://map.kakao.com/link/search/%EB%85%B8%EC%9B%90%EB%AC%B8%EA%B3%A0%20%EB%B3%B8%EC%A0%90' } },
    { id: 'f5',  title: '사진미술관 들르기',          meta: '25분',  action: { type: 'link', url: 'https://map.kakao.com/link/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%EB%A6%BD%EC%82%AC%EC%A7%84%EB%AF%B8%EC%88%A0%EA%B4%80' } },
    { id: 'f6',  title: '책상 위만 정리',             meta: '3분',   action: { type: 'tab', tab: 'timer' } },
    { id: 'f7',  title: '몸풀기 하나',                meta: '1분',   action: { type: 'tab', tab: 'body' } },
    { id: 'f8',  title: '기분 맞는 노래 한 곡',       meta: '3분',   action: { type: 'tab', tab: 'music' } },
    { id: 'f9',  title: '커피 한 잔 들고 오기',       meta: '10분',  action: { type: 'link', url: 'https://map.kakao.com/link/search/%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4%20%EB%85%B8%EC%9B%90%EC%97%AD%EC%A0%90' } },
    { id: 'f10', title: '짧은 영상 한 편',            meta: '5분',   action: { type: 'link', url: 'https://www.youtube.com/@TEDEd' } },
    { id: 'f11', title: '마들스타디움 트랙 한 바퀴',  meta: '20분',  action: { type: 'link', url: 'https://map.kakao.com/link/search/%EB%A7%88%EB%93%A4%EC%8A%A4%ED%83%80%EB%94%94%EC%9B%80' } }
  ],

  // 20~30분 산책 코스 — 상계주공3단지(동일로215길 48) 기준, maps로 실존 확인
  courses: [
    {
      id: 'c1',
      title: '서점 두 곳만 훑고 오기',
      total: '약 22분',
      distance: '왕복 약 1.2km',
      bands: ['낮', '저녁'],
      note: '책 안 사도 됨. 서가만 봐도 머리 식음.',
      stops: [
        { name: '노원문고 본점',        sub: '도보 7분 · 동일로 1390',       query: '노원문고 본점' },
        { name: '알라딘중고서점 노원역점', sub: '도보 8분 · 동일로 1413 · 09:30–22:00', query: '알라딘중고서점 노원역점' }
      ]
    },
    {
      id: 'c2',
      title: '당현천 물길 보러',
      total: '약 25분',
      distance: '왕복 약 1.6km',
      bands: ['낮', '저녁'],
      note: '물 보러 가는 길에 커피. 안 마셔도 됨.',
      stops: [
        { name: '지니카페 상계다락방점', sub: '도보 4분 · 24시간',            query: '지니카페 상계다락방점' },
        { name: '당현천근린공원',        sub: '도보 10분 · 물길 산책로',      query: '당현천근린공원' }
      ]
    },
    {
      id: 'c3',
      title: '사진미술관 잠깐',
      total: '약 25분',
      distance: '왕복 약 1.7km',
      bands: ['낮', '저녁'],
      closedDays: [1],
      note: '월요일 문 닫음. 화~일 10:00–20:00.',
      stops: [
        { name: '서울시립사진미술관', sub: '도보 11분 · 마들로13길 68 · 월 휴관', query: '서울시립사진미술관' }
      ]
    },
    {
      id: 'c4',
      title: '마들스타디움 트랙',
      total: '약 28분',
      distance: '왕복 약 1.9km',
      bands: ['낮', '저녁'],
      note: '트랙 한 바퀴 400m. 두 바퀴는 욕심.',
      stops: [
        { name: '마들스타디움', sub: '도보 10분 · 상계동 770-2', query: '마들스타디움' }
      ]
    },
    {
      id: 'c5',
      title: '노원역 쪽 사람 구경',
      total: '약 20분',
      distance: '왕복 약 1.5km',
      bands: ['낮', '저녁', '밤'],
      note: '사는 건 없어도 됨. 불빛만 보고 와.',
      stops: [
        { name: '스타벅스 노원역점', sub: '도보 8분 · 동일로 1413',  query: '스타벅스 노원역점' },
        { name: '노원문화의거리',    sub: '도보 10분 · 상계동 719-1', query: '노원문화의거리' }
      ]
    },
    {
      id: 'c6',
      title: '밤에 짧게, 편의점까지',
      total: '약 15분',
      distance: '왕복 약 700m',
      bands: ['낮', '저녁', '밤'],
      note: '멀리 안 나갈 때. 아이스크림 하나 사서 돌아오면 끝.',
      stops: [
        { name: 'GS25 상계크로바점', sub: '도보 2분 · 동일로215길 81', query: 'GS25 상계크로바점' }
      ]
    }
  ]
};
