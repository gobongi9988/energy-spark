// 시동 — 기본 데이터 (모두 실제 존재하는 스포티파이 플레이리스트 / 노원구 상계6동 실제 장소)
window.SIDONG = {
  moods: [
    { key: 'none',  label: '아무것도 하기 싫어' },
    { key: 'low',   label: '기분이 가라앉아' },
    { key: 'head',  label: '머리가 복잡해' },
    { key: 'up',    label: '살짝 기운 내고 싶어' },
    { key: 'blank', label: '멍때리고 싶어' }
  ],

  // 음악 풀 — 좋아요 표시한 곡 211곡 중 같은 곡 중복 3건 제외 208곡(2026-11-27 수집) + 내 플레이리스트 9개
  // 추천곡 10곡은 취향 결에 맞춰 새로 골라 open.spotify.com/oembed 로 제목 확인함 (reco: true)
  // 유튜브 재생곡 45개 (기분 5 × 8~10곡). 좋아요 목록·기존 풀에서 골라
  // oEmbed로 임베드 가능 여부를 확인한 영상만 넣음(2026-11-27). 앱 안에서 전곡 재생.
  music: [
    { id: 't1', title: 'Hypnotize', artist: 'The Notorious B.I.G.', yt: 'eaPzCHEQExs', sid: '7KwZNVEaqikRSBSpyhXK2j', type: 'track', genre: '힙합', moods: ['none'], note: '한 곡으로 분위기 바뀜.' },
    { id: 't2', title: 'Step into a World (Rapture\'s Delight)', artist: 'KRS-One', yt: '2zS1x71B9QY', sid: '5xXL4i9L2ZbKBtENNh8fWY', type: 'track', genre: '힙합', moods: ['none'] },
    { id: 't4', title: 'Gangsta Nation', artist: 'Westside Connection', yt: 'cfHtgIdwk38', sid: '65iyI1iybyv5ecsfBHSdUf', type: 'track', genre: '힙합', moods: ['none'] },
    { id: 't-still', title: 'Still A Friend Of Mine', artist: 'Incognito', yt: 'X0tPaeW5lQk', type: 'track', genre: '애시드재즈', moods: ['none'], note: '가라앉을 때 제일 먼저 트는 쪽.' },
    { id: 't74', title: 'Ready or Not', artist: 'Fugees 외', yt: 'aIXyKmElvv8', sid: '3vZO25GdYuqFrR1kzZADnp', type: 'track', genre: '힙합', moods: ['none'] },
    { id: 't87', title: 'The Hills', artist: 'The Weeknd', yt: 'yzTuBuRdAyA', sid: '7fBv7CLKzipRk6EC6TWHOB', type: 'track', genre: 'R&B', moods: ['none'] },
    { id: 't67', title: 'Heartless', artist: 'Kanye West', yt: 'Co0tTeuUVhU', sid: '4EWCNWgDS8707fNSZ1oaA5', type: 'track', genre: '힙합', moods: ['none'] },
    { id: 't58', title: 'Drop It Like It\'s Hot', artist: 'Snoop Dogg 외', yt: 'GtUVQei3nX4', sid: '2NBQmPrOEEjA8VbeWOQGxO', type: 'track', genre: '힙합', moods: ['none'] },
    { id: 't12', title: '울어', artist: 'V.O.S', yt: '1t_IIpz3E_c', sid: '4HGCwXdDydBqyZnjsCPDWM', type: 'track', genre: '발라드', moods: ['low'], note: '울 준비 됐을 때.' },
    { id: 't13', title: 'Love', artist: 'Keyshia Cole', yt: '9PBZy9j3H3I', sid: '0W4NhJhcqKCqEP2GIpDCDq', type: 'track', genre: 'R&B', moods: ['low'] },
    { id: 't89', title: 'Call Out My Name', artist: 'The Weeknd', yt: 'M4ZoCHID9GI', sid: '09mEdoA6zrmBPgTEN5qXmN', type: 'track', genre: 'R&B', moods: ['low'] },
    { id: 't84', title: 'Earned It', artist: 'The Weeknd', yt: 'waU75jdUnYw', sid: '2PIvq1pGrUjY007X5y1UpM', type: 'track', genre: 'R&B', moods: ['low'] },
    { id: 't93', title: 'Die For You', artist: 'The Weeknd', yt: 'uPD0QOGTmMI', sid: '2Ch7LmS7r2Gy2kc64wv3Bz', type: 'track', genre: 'R&B', moods: ['low'] },
    { id: 't126', title: 'Zombie', artist: 'The Cranberries', yt: '6Ejga4kJUts', sid: '49wOjOkS4pBK3PQnPnNYjb', type: 'track', genre: '록', moods: ['low'] },
    { id: 't136', title: 'Thank You', artist: 'Dido', yt: '1TO48Cnl66w', sid: '3yUcJwYu7fXAfqMj9krY6l', type: 'track', genre: '팝', moods: ['low'] },
    { id: 't151', title: 'Home', artist: '박효신', yt: 'iJYYqKi5J6c', sid: '5FUtACXX7AniiESuPD8Ohw', type: 'track', genre: '발라드', moods: ['low'] },
    { id: 't193', title: '흩어진 나날들', artist: '캐스커', yt: 'dxLE_B21Tfo', sid: '6jL6qHMNLcowRWub3TUbBG', type: 'track', genre: '인디', moods: ['low'], note: '캐스커 원곡.' },
    { id: 't21', title: 'Take Five', artist: '서태지', yt: 'cJLVtX9Byy0', sid: '4ZZTDwOTsHey5cBkTFEzsf', type: 'track', genre: '록', moods: ['head'] },
    { id: 't17', title: 'So Danco Samba', artist: 'Lisa Ono', yt: 'wSPjPvwwvj8', sid: '569zdRufk57diqTB3U7R8v', type: 'track', genre: '보사노바', moods: ['head'], note: '한 곡만. 보사노바 한 잔.' },
    { id: 't36', title: 'Garota de Ipanema - 2006 Version', artist: 'Lisa Ono', yt: '9HA5p1v7rMw', sid: '75Wq1LZlCcpSTB3YCiV4y6', type: 'track', genre: '보사노바', moods: ['head'] },
    { id: 't49', title: 'Faded', artist: 'Alan Walker', yt: '60ItHLz5WEA', sid: '7gHs73wELdeycvS48JfIos', type: 'track', genre: '일렉트로닉', moods: ['head'] },
    { id: 't128', title: 'Sunshine', artist: 'D\'Sound', yt: 'ck2Bfb6qEEc', sid: '2mAnMAOh5th5GxfwtCHe93', type: 'track', genre: '애시드재즈', moods: ['head'] },
    { id: 't174', title: 'Mayonaka no Door', artist: 'Miki Matsubara', yt: 'lags8E4hvow', sid: '7J5uS4KWccKN1Bj1QBZ3qe', type: 'track', genre: '시티팝', moods: ['head'] },
    { id: 't169', title: 'Sweet Love', artist: 'Junko Ohashi', yt: 'EmFxfCvkUmU', sid: '0LxBsUJG6FVNEOM1hJsFmK', type: 'track', genre: '시티팝', moods: ['head'] },
    { id: 'r1', title: 'Feather', artist: 'Nujabes', yt: 'hQ5x8pHoIPA', sid: '0s1nGaLTeCvTl3if7sllIG', type: 'track', genre: '재즈힙합', moods: ['head'], note: '말 없이 흐르는 쪽.' },
    { id: 'u-som', title: 'Something About Us', artist: 'Daft Punk', yt: 'sOS9aOIXPEk', type: 'track', genre: '일렉트로닉', moods: ['head'], note: '머리 비우고 리듬만.' },
    { id: 'r10', title: 'Teardrop', artist: 'Massive Attack', yt: 'u7K72X4eo_s', sid: '67Hna13dNDkZvBpTXRIaOJ', type: 'track', genre: '다운템포', moods: ['head'] },
    { id: 't15', title: 'joke!', artist: '새소년', yt: '_ZaQmQTlVkE', sid: '5hGUsM3PYAqaH94jSmy3mV', type: 'track', genre: '인디록', moods: ['up'], note: '새소년은 이걸로 시동.' },
    { id: 't22', title: 'New Romantic', artist: '새소년', yt: '8LY55kJX30I', sid: '1UaXBhsT3I5DWHWFd02ud7', type: 'track', genre: '인디록', moods: ['up'] },
    { id: 't14', title: 'Underneath the Tree', artist: 'Kelly Clarkson', yt: 'EM2Fnp_qnE8', sid: '3nAp4IvdMPPWEH9uuXFFV5', type: 'track', genre: '캐롤', moods: ['up'], note: '12월 아니어도 들을 수 있음.' },
    { id: 't65', title: 'HUMBLE.', artist: 'Kendrick Lamar', yt: 'tvTRZJ-4EyI', sid: '7KXjTSCq5nL1LoYtL7XAwS', type: 'track', genre: '힙합', moods: ['up'] },
    { id: 't94', title: 'Can\'t Feel My Face', artist: 'The Weeknd', yt: 'KEI4qSrkPAs', sid: '22VdIZQfgXJea34mQxlt81', type: 'track', genre: 'R&B', moods: ['up'] },
    { id: 't149', title: 'Superstylin\'', artist: 'Groove Armada', yt: '_kE0pxRkMtQ', sid: '2yWyFT6bW1Rd9cjVvYi4v8', type: 'track', genre: '일렉트로닉', moods: ['up'] },
    { id: 't24', title: 'The Magic Key', artist: 'One-T', yt: 'OTLB6fSg9nU', sid: '1VsuSOEVhuCaybeb1rFeCM', type: 'track', genre: '팝', moods: ['up'] },
    { id: 't9', title: '첼로', artist: '허니패밀리', yt: 'dbLy65liUGw', sid: '2qEb2091Chz41gUOUDFeNf', type: 'track', genre: '90년대 댄스', moods: ['up'] },
    { id: 't190', title: 'Sing It Back', artist: 'Moloko 외', yt: 'w1eN8vyVFIM', sid: '32gijtVdRQTHkVtWZaF7g4', type: 'track', genre: '하우스', moods: ['up'] },
    { id: 't165', title: 'come again', artist: 'm-flo', yt: 'RNBiaZbFGII', sid: '477CB93mH986mrIheQD0RR', type: 'track', genre: '시티팝', moods: ['up'] },
    { id: 't63', title: 'Day \'N\' Nite (Nightmare)', artist: 'Kid Cudi', yt: 'VrDfSZ_6f4U', sid: '60PAzFNW3vAiAiVK6DRJfB', type: 'track', genre: '힙합', moods: ['blank'] },
    { id: 't111', title: 'N.Y. State of Mind', artist: 'Nas', yt: 'hI8A14Qcv68', sid: '0trHOzAhNpGCsGBEu7dOJo', type: 'track', genre: '힙합', moods: ['blank'] },
    { id: 't150', title: 'At the River', artist: 'Groove Armada', yt: 'm-uztVX6QFQ', sid: '0KIPa0YuQ5QFmlAqRyXNd9', type: 'track', genre: '다운템포', moods: ['blank'] },
    { id: 't125', title: '1974-WAY HOME-', artist: 'Mondo Grosso', yt: 'B_6fspGWQSs', sid: '7foC1i7LM5aJEqr0EpyY7s', type: 'track', genre: '일렉트로닉', moods: ['blank'] },
    { id: 'r7', title: 'Pink + White', artist: 'Frank Ocean', yt: 'uzS3WG6__G4', sid: '3xKsf9qdS1CyvXSMEid6g8', type: 'track', genre: 'R&B', moods: ['blank'] },
    { id: 't168', title: 'Tokai', artist: 'Taeko Onuki', yt: '8O8m36Jr1Uk', sid: '1SmwJJ8YVgiXtyE6elhUx1', type: 'track', genre: '시티팝', moods: ['blank'] },
    { id: 't198', title: '일요일 아침', artist: 'Fortune Cookie', yt: 'Zzqq9xRM9Xg', sid: '1KSPgvLyDoshGSnCjJ1KHh', type: 'track', genre: '인디', moods: ['blank'] },
    { id: 't162', title: 'Breathe', artist: 'Télépopmusik', yt: 'kDz2Xk-LRN0', sid: '2VhKDAZzcjKZE7BxI9uplq', type: 'track', genre: '다운템포', moods: ['blank'] },
  ],

  // ── 몸풀기 A: 스트레칭 & 요가 ──
  // reps = 횟수·세트, d = 한 번에 잡는 총 초, good = 어디에 좋은지, tip = 자세 팁
  stretch: [
    { id: 's1', type: '스트레칭', name: '목·승모근 늘리기', reps: '좌우 15초 × 2세트', d: 60,
      good: '거북목·어깨 결림 완화',
      tip: '오른손을 왼쪽 머리에 얹고 머리를 오른쪽 어깨 쪽으로 천천히. 어깨는 올리지 말고, 반대도 똑같이.' },
    { id: 's2', type: '요가', name: '고양이-소 자세', reps: '8회 × 2세트', d: 90,
      good: '척추·등 뻐근함 해소, 호흡 순환',
      tip: '네발기기에서 손목은 어깨 아래. 숨 들이쉬며 배를 내리고(소), 내쉬며 등을 둥글게(고양이).' },
    { id: 's3', type: '요가', name: '아기 자세', reps: '30초 × 2세트', d: 90,
      good: '허리 이완, 마음 진정',
      tip: '무릎은 넓게 벌리고 엉덩이는 발뒤꿈치 쪽으로. 이마가 바닥에 안 닿으면 쿠션 하나 받쳐도 됨.' },
    { id: 's4', type: '요가', name: '다운독', reps: '20초 × 2세트', d: 60,
      good: '종아리·햄스트링·어깨 스트레칭, 전신 순환',
      tip: '무릎 살짝 굽혀도 됨. 발뒤꿈치가 바닥에 안 닿아도 그만. 팔로 바닥을 밀어내는 느낌.' },
    { id: 's5', type: '스트레칭', name: '가슴 열기 깍지 스트레칭', reps: '15초 × 3세트', d: 60,
      good: '굽은 등 펴기, 답답한 가슴 시원하게',
      tip: '등 뒤에서 손을 깍지 끼고 팔을 아래로 눌러 가슴을 연다. 턱은 살짝 당기고 시선은 정면.' },
    { id: 's6', type: '스트레칭', name: '누워서 무릎 당기기', reps: '좌우 20초 × 2세트', d: 90,
      good: '골반·허리 피로 풀기',
      tip: '허리가 바닥에서 뜨지 않게. 반대쪽 다리는 길게 뻗고 무릎을 가슴 쪽으로 당긴다.' },
    { id: 's7', type: '요가', name: '누워서 척추 비틀기', reps: '좌우 20초 × 2세트', d: 90,
      good: '허리·등 옆면 이완',
      tip: '어깨는 바닥에 붙인 채 무릎만 옆으로 넘긴다. 시선은 무릎 반대쪽. 억지로 누르지 않기.' },
    { id: 's8', type: '요가', name: '나비 자세', reps: '30초 × 2세트', d: 60,
      good: '고관절 이완, 하체 순환',
      tip: '발바닥을 붙이고 앉아 등은 펴고. 무릎을 손으로 눌러 내리지는 말고 숨만 천천히.' },
    { id: 's9', type: '근력', name: '까치발 들기 (카프 레이즈)', reps: '15회 × 2세트', d: 60,
      good: '종아리 펌핑, 다리 부기 완화',
      tip: '벽을 짚고 천천히 올라가 1초 멈춤. 내려올 때 더 천천히 내려야 효과 있음.' },
    { id: 's10', type: '스트레칭', name: '스탠딩 사이드 스트레치', reps: '좌우 15초 × 2세트', d: 60,
      good: '옆구리·갈비뼈 사이 시원하게',
      tip: '한 팔을 머리 위로 길게 뻗어 옆으로 기울기. 골반은 제자리에, 발은 어깨 너비.' },
    { id: 's11', type: '스트레칭', name: '손목·팔뚝 늘리기', reps: '좌우 15초 × 2세트', d: 60,
      good: '컴퓨터·폰 쓰느라 뻐근한 손목 풀기',
      tip: '팔을 앞으로 펴고 손등을 아래로 당겨 15초, 손바닥을 위로 당겨 15초. 좌우 번갈아.' },
    { id: 's12', type: '스트레칭', name: '의자 흉추 비틀기', reps: '좌우 15초 × 2세트', d: 60,
      good: '등 중간 뻐근함, 숨 편해짐',
      tip: '의자에 앉아 허리를 세우고 반대 손으로 등받이를 잡고 천천히 돌기. 숨 내쉴 때 조금 더.' },
    // ── 두피마사지: 혈자리 위치·손가락·방향·힘·초·횟수까지 ──
    { id: 's13', type: '지압', name: '두피마사지', reps: '혈자리 4곳', d: 240, diagram: 'head',
      good: '머리가 무겁고 지끈거릴 때, 뒷목이 뻣뻣할 때, 눈이 뻑뻑할 때, 잠이 안 올 때',
      tip: '손은 깨끗이 씻고 시작. 머리카락 위에서 해도 됨. 아프면 힘을 절반으로. 문지르기보다 눌렀다 떼는 리듬이 낫고, 숨은 코로 들이쉬며 누르고 입으로 내쉬며 뗀다.',
      steps: [
        { n: '백회혈 (정수리)',
          at: '양쪽 귀 윗부분을 잇는 선과, 미간 한가운데서 정수리로 곧게 올린 선이 만나는 지점. 손끝으로 더듬으면 살짝 꺼진 홈이 잡힌다.',
          do: '양손 중지 끝을 겹쳐 얹고 3초 지그시 누르고 2초 쉬기 × 8회. 누르는 방향은 머리 안쪽(아래)으로, 손톱은 세우지 않는다.', map: [[108, 42]] },
        { n: '태양혈 (관자놀이)',
          at: '눈꼬리와 눈썹 바깥 끝의 중간 높이에서 귀 쪽으로 약 2cm 들어간 곳. 어금니를 악물면 살짝 볼록해지는 자리, 입을 벌리면 움직이는 그 홈.',
          do: '검지·중지 끝을 붙여 10초 동안 작은 원 10바퀴, 좌우 동시에. 힘은 피부가 살짝 밀릴 정도. 두통이 있으면 원 대신 3초 누르고 떼기 × 6회.', map: [[80, 98], [136, 98]] },
        { n: '풍지혈 (뒷목)',
          at: '뒤통수 머리카락 경계선에서 목덜미 쪽으로 약 2cm 아래, 귀 뒤 뼈(유양돌기)와 목 척추 사이의 굵은 근육 양옆 움푹 파인 홈. 고개를 숙이면 더 깊게 들어간다.',
          do: '양손 엄지를 걸치고 머리 위쪽·눈 쪽으로 밀어 올리듯 5초 누르고 3초 쉬기 × 5회. 팔꿈치를 벌려 엄지가 수직으로 서게.', map: [[142, 128]] },
        { n: '견정혈 (어깨)',
          at: '목 뒤 가장 튀어나온 뼈(고개 숙이면 도드라지는 경추 7번)와 어깨 끝뼈를 잇는 선의 한가운데, 어깨 근육이 가장 두툼한 곳.',
          do: '반대 손 검지·중지로 5초 지그시 누르고 떼기 × 4회, 좌우. 어깨를 올리지 말고 힘을 뺀 채로.', map: [[160, 170]] },
        { n: '마무리 톡톡',
          at: '이마 경계부터 뒤통수 끝까지 두피 전체.',
          do: '열 손가락을 살짝 구부려 30초 톡톡 두드리기. 마지막에 귀 위쪽에서 목덜미로 3번 쓸어내리며 끝.', map: [] }
      ] },

    // ── 페이스요가: 효과별 5개 ──
    { id: 'f1', type: '페이스요가', name: '아침 붓기·눈 피로', reps: '혈자리 4곳', d: 240, diagram: 'face',
      good: '자고 나면 얼굴이 붓고 눈이 무거울 때, 화면 오래 봐 눈이 뻑뻑할 때',
      tip: '세수하고 하면 더 좋고, 크림을 살짝 바르면 피부가 덜 당긴다. 눈알은 절대 누르지 말고 뼈 위·홈만. 붓기는 귀 쪽으로 밀어내는 방향이 핵심.',
      steps: [
        { n: '찬죽혈 (눈썹 안쪽 끝)',
          at: '눈썹 안쪽 끝에서 바로 3mm 아래, 코뿌리 옆의 꺼진 홈. 눈을 감고 눈썹뼈 아래를 손끝으로 훑으면 움푹 들어가는 자리가 잡힌다.',
          do: '양손 엄지 끝으로 3초 지그시 눌렀다 떼기 × 10회. 누르는 방향은 살짝 위·안쪽. 눈꺼풀이 아니라 뼈를 받친다는 느낌.', map: [[99, 96], [121, 96]] },
        { n: '정명혈 (눈 안쪽 모서리)',
          at: '눈 안쪽 끝과 콧대 사이의 오목한 곳, 눈물점 바로 옆.',
          do: '검지 끝으로 코뿌리 쪽을 향해 3초 누르고 떼기 × 10회. 살짝 눈물이 고일 듯한 느낌이 정상.', map: [[99, 112], [121, 112]] },
        { n: '사백혈 (눈 밑 광대 위)',
          at: '정면을 볼 때 검은 눈동자 중심에서 수직으로 내려와, 눈 밑 뼈 가장자리에서 약 1.5cm 아래 광대 윗부분. 웃으면 볼록해지는 자리.',
          do: '검지로 피부를 살짝 위로 밀어 올린 채 3초 누르고 떼기 × 10회. 문지르면 자극이 세니 누르기만.', map: [[88, 126], [132, 126]] },
        { n: '태양혈 (관자놀이)',
          at: '눈꼬리와 눈썹 바깥 끝의 중간 높이에서 귀 쪽으로 약 2cm, 관자놀이의 꺼진 곳.',
          do: '검지·중지로 작은 원 10바퀴, 좌우 동시에 20초. 붓기 뺄 땐 원을 그린 뒤 귀 앞쪽으로 3번 쓸어내린다.', map: [[58, 104], [162, 104]] },
        { n: '눈가 림프 쓸기',
          at: '찬죽혈에서 눈썹 위를 따라 관자놀이로, 다시 귀 앞을 지나 목 옆(흉쇄유돌근 앞)까지.',
          do: '눈꺼풀은 건드리지 말고 눈썹뼈 위·눈 밑 뼈 위를 검지·중지로 10번 가볍게 쓸어내리기. 마지막에 귀 아래 림프절을 3초 눌러 마무리.', map: [] }
      ] },

    { id: 'f2', type: '페이스요가', name: '턱선·이갈이 풀기', reps: '혈자리 2곳 + 근육', d: 240, diagram: 'face',
      good: '이를 악무는 습관, 아침에 턱이 뻐근할 때, 턱선이 둥글게 보일 때',
      tip: '턱 힘은 완전히 빼고 시작. 입을 살짝 벌리면 근육이 풀려 손이 더 깊이 들어간다. 통증이 심하거나 턱에서 소리가 나면 힘을 더 줄인다.',
      steps: [
        { n: '협거혈 (턱 근육)',
          at: '어금니를 꽉 물면 볼록 튀어나오는 턱 근육(교근)의 가장 볼록한 곳. 귀 아래 턱뼈 각진 모서리에서 입꼬리 쪽으로 약 1.5cm 앞.',
          do: '엄지 또는 검지·중지로 5초 지그시 누르고 3초 쉬기 × 6회. 누르는 방향은 턱뼈 안쪽 위로.', map: [[74, 166], [146, 166]] },
        { n: '하관혈 (귀 아래 턱)',
          at: '귀 아래 턱뼈 모서리에서 바로 아래로 손가락 한 마디(약 1.5cm), 턱뼈 안쪽의 오목한 곳.',
          do: '입을 살짝 벌린 채 검지로 귀 쪽으로 밀어 올리듯 5초 × 6회, 좌우.', map: [[64, 178], [156, 178]] },
        { n: '교근 풀기',
          at: '협거혈을 중심으로 턱 근육 전체(귀 아래~턱 끝).',
          do: '"아—" 소리를 내 입을 벌린 채 검지·중지로 턱 근육에 작은 원 10바퀴, 좌우. 원 지름은 1cm 정도로 작게.', map: [] },
        { n: '턱선 쓸어올리기',
          at: '턱 끝 중앙에서 귀 아래까지, 턱뼈 선을 따라.',
          do: '손등이 바깥을 보게 하고 검지 옆면으로 턱 끝 → 귀 아래까지 10번 쓸어올리기. 힘은 피부가 밀릴 정도로만, 왕복하지 말고 위로만.', map: [] },
        { n: '볼 공기 채우기',
          at: '입을 다물고 볼 안쪽에 공기를 넣어 좌우 번갈아.',
          do: '한쪽 볼에 5초 채우고 반대쪽 5초 × 5번. 마지막에 "뽀-" 하고 천천히 빼기. 이갈이로 뭉친 볼 근육까지 풀린다.', map: [] }
      ] },

    { id: 'f3', type: '페이스요가', name: '팔자·볼 리프팅', reps: '혈자리 2곳 + 표정', d: 240, diagram: 'face',
      good: '팔자주름이 진해 보일 때, 볼이 처져 보일 때, 웃을 때 볼 라인이 신경 쓰일 때',
      tip: '위로만 민다. 피부를 잡아당겨 주름이 생기면 힘이 센 것. 크림이나 오일을 바르고 하면 마찰 없이 좋다.',
      steps: [
        { n: '영향혈 (콧방울 옆)',
          at: '콧방울 양옆 가장자리에서 3mm 옆, 팔자주름이 시작되는 홈.',
          do: '검지 끝으로 콧대 쪽을 향해 3초 누르고 떼기 × 10회.', map: [[102, 150], [118, 150]] },
        { n: '거료혈 (광대 아래)',
          at: '정면을 볼 때 검은 눈동자 중심에서 수직으로 내려와, 콧방울 높이에서 약 1.5cm 옆, 광대뼈 아래 오목한 곳.',
          do: '엄지·검지로 광대뼈를 감싸 쥐듯 잡고 3초 × 8회. 뼈를 누르는 게 아니라 뼈 아래 연조직을 받친다.', map: [[86, 148], [134, 148]] },
        { n: '광대 아래 밀어올리기',
          at: '영향혈에서 거료혈을 지나 귀 앞까지, 광대뼈 아래 선.',
          do: '검지·중지를 살짝 구부려 광대 아래에서 귀 쪽으로 10번 밀어올리기, 좌우. 끝은 귀 앞에서 멈추고 다시 아래로 내려오지 않는다.', map: [] },
        { n: '입술 "오·우" 내밀기',
          at: '입을 크게 "오" 모양으로 오므렸다가 "우" 하며 앞으로 쭉 내미는 동작.',
          do: '"오" 3초 → "우" 3초 × 10번. 내밀 때 볼 안쪽과 입꼬리가 당겨야 하고, 힘은 입 주변에만 준다.', map: [] },
        { n: '볼 풀기',
          at: '입꼬리 옆 볼 근육.',
          do: '손바닥 아랫부분으로 볼을 감싸 3초 눌렀다 떼기 × 5회, 좌우. 마지막에 입꼬리를 위로 올려 5초 웃는 표정으로 마무리.', map: [] }
      ] },

    { id: 'f4', type: '페이스요가', name: '미간·이마 주름', reps: '혈자리 2곳', d: 210, diagram: 'face',
      good: '미간을 자주 찡그릴 때, 이마에 가로줄이 신경 쓰일 때, 머리 앞쪽이 답답할 때',
      tip: '위로만 쓸고 내릴 때는 힘을 뺀다. 손가락은 붙여 넓게, 한 곳만 누르지 않는다. 자주 찡그리는 습관이 있으면 하루 두 번이면 충분.',
      steps: [
        { n: '인당혈 (미간)',
          at: '양 눈썹 안쪽 끝을 잇는 선의 한가운데, 코뿌리 위 오목한 곳.',
          do: '검지 또는 엄지로 눈썹 사이를 위로 밀어 올리듯 5초 누르고 떼기 × 6회.', map: [[110, 92]] },
        { n: '양백혈 (이마)',
          at: '정면을 볼 때 검은 눈동자 중심에서 곧게 위로 올라가 눈썹 위 약 3cm, 이마 중앙의 살짝 꺼진 곳.',
          do: '양손 중지로 3초 × 6회, 좌우 동시에. 누르는 방향은 머리 안쪽.', map: [[88, 74], [132, 74]] },
        { n: '이마 쓸어올리기',
          at: '미간에서 헤어라인까지, 그리고 이마 양옆에서 관자놀이까지.',
          do: '검지·중지를 붙여 미간 → 헤어라인 10번, 이마 옆 → 관자놀이 10번. 위로만 쓸고 내려올 땐 손을 뗀다.', map: [] },
        { n: '미간 풀기 (표정)',
          at: '찡그린 미간을 일부러 더 찡그렸다 완전히 푸는 동작.',
          do: '5초 찡그리기 → 5초 힘 빼기 × 5번. 마지막에 눈썹을 위로 치켜 3초 유지하고 내린다.', map: [] }
      ] },

    { id: 'f5', type: '페이스요가', name: '이중턱·목선 정리', reps: '혈자리 1곳 + 목', d: 210, diagram: 'face',
      good: '턱 아래가 붓고 목선이 무거워 보일 때, 고개 숙여 폰 보는 시간이 길 때',
      tip: '목은 항상 아래로(쇄골 쪽) 마무리한다. 고개를 젖힐 때 어지러우면 살짝만. 힘은 살짝 당겨지는 정도로 충분하다.',
      steps: [
        { n: '승장혈 (턱 아래)',
          at: '아랫입술 한가운데에서 수직으로 아래, 턱뼈와 입술 사이 오목한 홈(턱 아래 움푹 들어간 곳).',
          do: '엄지 끝을 턱 아래에 대고 입술 쪽으로 밀어 올리듯 5초 × 6회. 턱을 들어 올린 채 하면 더 잘 잡힌다.', map: [[110, 190]] },
        { n: '턱 밑 림프 쓸기',
          at: '턱 끝 아래에서 귀 아래, 다시 목 옆을 지나 쇄골 위 오목한 곳까지.',
          do: '손등이 바깥으로 가게 하고 턱 아래 → 귀 아래 10번, 귀 아래 → 쇄골 10번. 항상 아래로 내려서 끝낸다.', map: [] },
        { n: '천장 보고 입술 "우"',
          at: '고개를 천장으로 들고 아랫입술을 앞으로 쭉 내미는 동작.',
          do: '5초 유지 × 5회. 목 앞쪽이 팽팽해져야 한다. 어지러우면 고개를 45도만 든다.', map: [] },
        { n: '혀 지붕 밀기',
          at: '입을 다물고 혀 전체를 입천장에 붙여 위로 미는 동작.',
          do: '5초 × 5회. 턱 아래(설골 위)가 당기는 느낌. 평소 말할 때도 하면 목선에 좋다.', map: [] },
        { n: '목 펴기 마무리',
          at: '양손을 쇄골 위에 얹고 고개를 반대쪽으로 기울이는 동작.',
          do: '좌우 10초씩 2회. 어깨는 내린 채, 손으로 누르지 않고 머리 무게만 이용.', map: [] }
      ] }
  ],

  // ── 몸풀기 B: 진짜 간단한 것 (시동만 걸면 되는 것들) ──
  simple: [
    { id: 'b1', type: '간단', name: '창문 열고 햇빛 3분간 보기', reps: '3분', d: 180,
      good: '생체리듬·기분 전환', tip: '창문 열고 바깥을 그냥 본다. 폰은 내려놓고 3분.' },
    { id: 'b2', type: '간단', name: '차 내려 마시기', reps: '3분', d: 180,
      good: '따뜻한 감각으로 몸 깨우기', tip: '들고 있는 온기부터 느끼면서. 마시는 동안 다른 건 안 해도 됨.' },
    { id: 'b3', type: '간단', name: '빨래 돌리기', reps: '2분', d: 120,
      good: '딱 하나만 해내도 성취감', tip: '세탁기 버튼만 누르면 끝. 널기는 나중에 해도 됨.' },
    { id: 'b4', type: '간단', name: '발목 돌리기', reps: '좌우 10회 × 2세트', d: 60,
      good: '앉아만 있어 굳은 혈액순환', tip: '발끝으로 크게 원 그리기. 한 방향 10회, 반대로 10회.' },
    { id: 'b5', type: '간단', name: '눈썹 다듬기', reps: '3분', d: 180,
      good: '거울 보고 작게 단정함 챙기기', tip: '한 올만 정리해도 됨. 거울 앞에 선 김에 어깨도 한 번 펴고.' },
    { id: 'b6', type: '간단', name: '물 한 컵 천천히 다 마시기', reps: '1분', d: 60,
      good: '몸 안쪽부터 깨움', tip: '한 모금씩. 벌컥벌컥 말고 컵 끝까지.' },
    { id: 'b7', type: '간단', name: '침대 이불만 쓱 펴기', reps: '30초', d: 30,
      good: '방이 살아 보임, 머리도 조금 정리', tip: '이불만 펴도 방이 달라짐. 베개는 대충.' },
    { id: 'b8', type: '간단', name: '책상 위 물건 딱 3개만 제자리 두기', reps: '1분', d: 60,
      good: '눈에 걸리는 것 3개만 줄여도 덜 답답함', tip: '3개 넘게 하지 말기. 그게 오래 가는 비결.' },
    { id: 'b9', type: '간단', name: '미스트 뿌리거나 핸드크림 바르기', reps: '1분', d: 60,
      good: '향 맡으며 잠깐 멈추는 1분', tip: '손등부터 천천히. 향 맡고 한 번 숨 쉬면 끝.' },
    { id: 'b10', type: '간단', name: '크게 기지개 켜고 심호흡 3번', reps: '30초', d: 30,
      good: '굳은 등을 펴고 산소 한 번 갈아줌', tip: '팔 위로 쭉, 숨은 코로 들이쉬고 입으로 길게 3번.' },
    { id: 'b11', type: '간단', name: '손목·손가락 탈탈 털기', reps: '30초', d: 30,
      good: '마우스·폰으로 뭉친 손끝 풀기', tip: '손을 아래로 늘어뜨려 힘 빼고 탈탈. 주먹 쥐었다 펴기도 5번.' },
    { id: 'b12', type: '간단', name: '미지근한 물로 손·얼굴 한 번 씻기', reps: '2분', d: 120,
      good: '얼굴 서늘해지면 머리도 같이 깸', tip: '찬물 아니어도 됨. 미지근해도 충분. 물기 닦고 로션까지.' },
    { id: 'b13', type: '멍때리기', name: '따뜻한 물에 발만 10분 담그기', reps: '10분', d: 600,
      good: '발부터 온기가 올라와 몸 전체가 느슨해짐', tip: '대야에 발만 담가도 됨. 물은 발등이 잠길 만큼. 폰은 옆에 두고.' },
    { id: 'b14', type: '멍때리기', name: '눈 위에 따뜻한 물수건 올리고 10분 눕기', reps: '10분', d: 600,
      good: '눈이 뻐근할 때, 머리까지 같이 쉼', tip: '스팀 아이마스크 있으면 그거. 없으면 수건에 따뜻한 물 짜서. 불 끄고.' },
    { id: 'b15', type: '멍때리기', name: '창밖 멀리 보면서 5분 멍때리기', reps: '5분', d: 300,
      good: '가까운 것만 보던 눈이 잠깐 쉼', tip: '가장 먼 것 하나 정해서 그냥 봄. 초점 안 맞춰도 됨.' },
    { id: 'b16', type: '멍때리기', name: '손만 쓰는 단순한 거 (귤 까기·빨래 개기)', reps: '5분', d: 300,
      good: '머리 안 쓰고 손만 쓰면 오히려 정리됨', tip: '귤이면 천천히 한 조각씩. 빨래면 수건부터. 잘해야 한다는 생각은 빼기.' },
    { id: 'b17', type: '멍때리기', name: '따뜻한 샤워기 아래 3분 가만히 서 있기', reps: '3분', d: 180,
      good: '어깨·등 긴장이 물 온기로 풀림', tip: '씻지 않아도 됨. 그냥 서서 물 맞고 있으면 됨.' }
  ],

  // ── 이어서 하는 커리큘럼 코스 (steps는 stretch의 id + 그 동작에 쓸 초) ──
  routines: [
    { id: 'r1', name: '5분 입문 루틴', note: '어깨·등·허리를 한 번씩. 순서대로 하면 딱 5분.',
      steps: [ { id: 's1', sec: 60 }, { id: 's2', sec: 90 }, { id: 's3', sec: 90 }, { id: 's5', sec: 60 } ] },
    { id: 'r2', name: '책상에서 3분', note: '앉아서 하는 것만. 일하다 말고 3분.',
      steps: [ { id: 's11', sec: 45 }, { id: 's1', sec: 45 }, { id: 's12', sec: 45 }, { id: 's5', sec: 45 } ] }
  ],

  // 완료 축하 화면에 뜨는 말 — 칭찬만. 횟수·평가·누적 없음.
  praise: [
    '오, 해냈네. 아무것도 안 하려던 사람이 방금 시동 걸었음 👏',
    '이거 진짜 잘했어. 시작이 제일 어려운데 그걸 지금 넘은 거임.',
    '봤어. 박수! 몸이 지금 고맙다고 인사하는 중임.',
    '방금 그거, 생각보다 큰일임. 가만히 있지 않았으니까.',
    '어깨 좀 내려갔지? 방금 우리가 하나 이긴 거임.',
    '해냈다!! 지금 몸 좀 풀린 느낌 들지 않아? 완전 잘했어.',
    '이 정도면 오늘 충분히 잘 살았음. 진짜로.',
    '숨 한 번 제대로 쉬는 것도 일인데, 그걸 해냈어.',
    '지금 이 순간만큼은 몸이 편안한 거 맞음. 잘했어.',
    '칭찬할 게 없나 봤는데 있네. 방금 그거.',
    '시작한 사람만 아는 그 느낌. 지금 그거임 ✨',
    '몸이 "아 그래, 이거지" 하는 중. 나도 들림.',
    '잘했어. 진짜로. 안 해도 됐는데 한 거잖아.',
    '이건 그냥 넘어갈 일 아님. 스스로한테 잘했다고 해줘.',
    '지금 이거 하나로 오늘이 조금 나아졌음. 확실함.',
    '와, 표정 좀 풀렸네. 좋아 보임.',
    '몸이 기억할 거임. 오늘 이거.',
    '해내고 나니까 별거 아니지? 그래도 해낸 건 해낸 거임.',
    '박수 짝짝. 옆에 있으면 등 두드려줬을 텐데.',
    '이 정도면 오늘의 나한테 칭찬 한 줄 남겨도 됨.'
  ],

  timerDone: [
    '다 채웠음. 시작은 한 거임.',
    '딱 그만큼. 더 안 해도 됨.',
    '타이머 끝. 이제 물 마시고 늘어져.',
    '한 칸 채움. 오늘 이거 하나는 확실함.'
  ],

  // 좋아하는 것 — 전부 집 안에서/지금 바로. action: tab(앱 탭) · move(몸풀기 동작 바로 시작) · song(이 곡 바로) · link(콘텐츠)
  // 지도·장소 링크는 넣지 않음(장소는 '산책' 탭 몫).
  favorites: [
    { id: 'f21', title: '좋아하는 노래 한 곡 틀기',    meta: '3분',     action: { type: 'tab', tab: 'music' } },
    { id: 'f22', title: '새소년 라이브 영상 하나',      meta: '5분',     action: { type: 'link', url: 'https://www.youtube.com/results?search_query=%EC%83%88%EC%86%8C%EB%85%84+live' } },
    { id: 'f23', title: '따뜻한 차 내려 천천히 마시기', meta: '3분', action: { type: 'move', id: 'b2' } },
    { id: 'f24', title: '눈 감고 창밖 멍때리기',        meta: '5분', action: { type: 'move', id: 'b15' } },
    { id: 'f25', title: '아기 자세 30초씩 두 번',       meta: '1분 30초', action: { type: 'move', id: 's3' } },
    { id: 'f26', title: '목·승모근 늘리기',             meta: '1분',     action: { type: 'move', id: 's1' } },
    { id: 'f27', title: '창문 열고 햇빛 3분',           meta: '3분',     action: { type: 'move', id: 'b1' } },
    { id: 'f28', title: '새소년 한 곡 바로 듣기',       meta: '4분',     action: { type: 'song', id: 't15' } },
    { id: 'f29', title: '손목·팔뚝 늘리기',             meta: '1분',     action: { type: 'move', id: 's11' } },
    { id: 'f30', title: '이불만 쓱 펴기',               meta: '30초',    action: { type: 'move', id: 'b7' } },
    { id: 'f31', title: '물 한 컵 천천히 다 마시기',    meta: '1분',     action: { type: 'move', id: 'b6' } },
    { id: 'f32', title: '책상 위 세 개만 제자리로',     meta: '1분',     action: { type: 'move', id: 'b8' } },
    { id: 'f33', title: '따뜻한 물에 발만 담그기',      meta: '10분',    action: { type: 'move', id: 'b13' } },
    { id: 'f34', title: '눈 위에 따뜻한 수건 올리고 눕기', meta: '10분', action: { type: 'move', id: 'b14' } },
    { id: 'f35', title: '창밖 멀리 보며 5분 멍때리기',  meta: '5분',     action: { type: 'move', id: 'b15' } },
    { id: 'f36', title: '귤 천천히 까기',               meta: '5분',     action: { type: 'move', id: 'b16' } },
    { id: 'f37', title: '따뜻한 물 아래 3분 서 있기',   meta: '3분',     action: { type: 'move', id: 'b17' } }
  ],

  // 산책·구경 코스 — 상계주공3단지(동일로215길 48) 기준, maps로 실존 확인
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
    },
    {
      id: 'c7',
      title: '롯데백화점 노원점 리뉴얼 구경',
      total: '약 25분',
      distance: '왕복 약 1.4km',
      bands: ['낮', '저녁'],
      note: '영업면적 80%를 새로 고쳤음. 지하 푸드홀만 봐도 배 부르고, 산 것 없이 나와도 됨.',
      stops: [
        { name: '롯데백화점 노원점',      sub: '도보 8분 · 동일로 1414 · 10:30–20:00 (금~일 20:30)', query: '롯데백화점 노원점' },
        { name: '지하 1층 푸드홀 · 레피세리', sub: '맛집 12·베이커리 13곳 · 흑백요리사 셰프 철판요리 죠죠', query: '롯데백화점 노원점' },
        { name: '2층 브런치 카페 플레어비',   sub: 'FLAIR.B · 브런치 메뉴',                        query: '롯데백화점 노원점' }
      ]
    },
    {
      id: 'c8',
      title: '올리브영 & 노원 문화의거리',
      total: '약 25분',
      distance: '왕복 약 1.6km',
      bands: ['낮', '저녁', '밤'],
      note: '신상·향기만 구경하고 나오기. 25~27일이면 올영데이, 12월 초엔 올영세일 시즌.',
      stops: [
        { name: '올리브영 노원점',   sub: '도보 9분 · 신상·향기 구경 · 올영데이 25~27일', query: '올리브영 노원점' },
        { name: '노원문화의거리',    sub: '한 바퀴 걷기 · 상계동 719-1',              query: '노원문화의거리' }
      ]
    },
    {
      id: 'c9',
      title: '노원아트뮤지엄 무료 전시',
      total: '약 40분',
      distance: '왕복 약 3km · 지하철 한 정거장',
      bands: ['낮', '저녁'],
      note: '서울시립미술관 협력전. 김창열·박서보 등 18인 소장품이고 관람료 무료. 11/29(일)까지.',
      stops: [
        { name: '노원아트뮤지엄', sub: '노원문화예술회관 4층 · 중계로 181 · 《SeMA Collection: 시선의 결》 무료', query: '노원문화예술회관' }
      ]
    },
    {
      id: 'c10',
      title: '북서울미술관 무료 전시 세 개',
      total: '약 50분',
      distance: '지하철 노원→하계 + 도보 10분',
      bands: ['낮'],
      closedDays: [1],
      note: '무료 전시 3개가 상시. 권병준 로봇 공연, 소목장세미, 심이다은. 월요일은 문 닫음.',
      stops: [
        { name: '서울시립 북서울미술관', sub: '등나무공원 · 하계·중계역 · 월 휴관 · 관람 무료', query: '서울시립 북서울미술관' }
      ]
    }
  ],

  // 인스타·커뮤니티에서 요즘 뜨는 노원·상계 카페·빵집·맛집 (2026-11-27 확인)
  // hours는 확인된 값만. 비어 있으면 앱에서 시간 줄을 그리지 않음.
  hotplaces: [
    { id: 'h1', name: '빈스링', cat: '빵집·도넛', img: 'assets/places/vins.jpg',
      addr: '상계로1길 54-4 센트럴타워 1층 · 노원역 9번 출구 3분',
      note: 'tvN 《천하제빵》 도넛의 여왕. 크림도넛·푸딩·휘낭시에, 포장 위주.',
      hours: '화~토 10:00–20:30 · 일·월 휴무', query: '빈스링 노원' },
    { id: 'h2', name: '플로레스테이블', cat: '카페·디저트', img: 'assets/places/flores.jpg',
      addr: '상계로5길 12 동양메이저 3층 305호 · 노원역 10번 출구 30초',
      note: '아이스크림 와플·거북이 쿠키·마들렌. 작고 조용한 2인석 위주.',
      hours: '화~일 12:00–22:00 · 월 휴무', query: '플로레스테이블' },
    { id: 'h3', name: '당현마루 카페 · 라면존', cat: '카페·한강라면', img: 'assets/places/danghyun.jpg',
      addr: '상계동 225-1 당현천 · 중계역 1번 출구 671m',
      note: '수변전망대·달빛브릿지·2층 물길 전망석. 라면존에서 한강라면. 노원구민 10% 할인.',
      hours: '09:00–21:00 (12~2월 10:00–19:00) · 화 휴무', query: '당현마루' },
    { id: 'h4', name: '블루마일스커피로스터스', cat: '카페·베이커리', img: 'assets/places/bluemiles.jpg',
      addr: '동일로190길 65 2층 · 공릉동 경춘선숲길',
      note: '직접 로스팅한 스페셜티 커피에 에그타르트·쿠키. 2층 통창 숲길 뷰.',
      hours: '매일 11:00–23:00 · 라스트오더 22:30', query: '블루마일스커피로스터스' },
    { id: 'h5', name: '뮤어카페 (MURE COFFEE 2호)', cat: '감성 카페', img: 'assets/places/mure.jpg',
      addr: '상계동 693 미도빌딩 지층',
      note: '아트스튜디오 겸 디저트 카페. 사진 찍기 좋은 지하 공간.',
      hours: '화~금 12:00–23:00 · 토·일 11:00–23:00 · 월 휴무', query: '뮤어카페 상계' },
    { id: 'h6', name: '노원역 옛날칼국수', cat: '맛집', img: 'assets/places/guksu.jpg',
      addr: '동일로 1417 · 노원역 8번 출구 1분',
      note: '바지락칼국수·얼큰수제비. 기다리는 동안 보리밥에 열무김치 비벼 먹기. SBS 《생활의 달인》.',
      hours: '10:30–22:00 · 브레이크 15:00–16:00', query: '노원 옛날칼국수' },
    { id: 'h7', name: '상계동원조닭갈비 동순집', cat: '맛집', img: 'assets/places/dongsoon.jpg',
      addr: '한글비석로36길 65 · 상계역 5번 출구 470m',
      note: '50년 국물닭갈비에 들기름막국수·도토리전. 행안부 착한가격업소.',
      hours: '11:00–22:00 · 라스트오더 21:00 · 월 휴무', query: '상계동원조닭갈비 동순집' }
  ]
};
