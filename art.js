// 시동 — 몸풀기 동작 그림 설명 (동작별 인라인 SVG)
// 크림·테라코타 톤에 맞춘 픽토그램. 몸 = 잉크색 굵은 선 + 채운 머리, 움직임 = 테라코타 화살표,
// 지압점 = 세이지 점 + 혈자리 이름. viewBox 320×160 고정, 카드 폭에 맞춰 늘어남.
window.SIDONG_ART = {
  // 1. 목·승모근 — 머리를 오른쪽 어깨로, 손은 머리 위로
  s1: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="한 손을 머리에 얹고 머리를 옆으로 기울이는 자세">' +
      '<path class="g" d="M160 26v26"/>' +
      '<g transform="rotate(-13 150 74)"><circle class="head" cx="150" cy="74" r="12"/>' +
      '<path class="f" d="M137 78c-4 2-4 6 0 8"/></g>' +
      '<path class="b" d="M154 86l4 12"/>' +
      '<path class="b" d="M108 112c10-14 28-20 52-20s42 6 52 20"/>' +
      '<path class="b" d="M112 112l-10-26"/>' +
      '<path class="b" d="M102 86c2-16 14-28 30-32"/>' +
      '<path class="b" d="M130 54c6-4 14-2 17 4"/>' +
      '<path class="a" d="M132 46c-20 6-28 22-26 38" marker-end="url(#ah)"/>' +
      '</svg>',

  // 2. 고양이-소 — 등 위로 / 배 아래로
  s2: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="고양이 자세는 등을 위로, 소 자세는 배를 아래로">' +
      '<path class="floor" d="M36 130h248"/>' +
      '<path class="b" d="M70 130v-24M118 130v-24"/>' +
      '<path class="b" d="M70 106c4-22 28-28 42-18 4 4 6 10 6 18"/>' +
      '<path class="b" d="M65 109l5-3"/>' +
      '<circle class="head" cx="57" cy="112" r="8"/>' +
      '<path class="a" d="M94 74V54" marker-end="url(#ah)"/>' +
      '<text class="sm" x="94" y="148" text-anchor="middle">고양이 · 숨 내쉴 때</text>' +
      '<path class="b" d="M194 130v-24M242 130v-24"/>' +
      '<path class="b" d="M194 106c8 12 40 12 48 0"/>' +
      '<path class="b" d="M189 101l5 5"/>' +
      '<circle class="head" cx="181" cy="98" r="8"/>' +
      '<path class="a" d="M218 110v16" marker-end="url(#ah)"/>' +
      '<text class="sm" x="218" y="148" text-anchor="middle">소 · 숨 들이쉴 때</text>' +
      '</svg>',

  // 3. 아기 자세 — 무릎 꿇고 상체 숙이기
  s3: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="무릎 꿇고 앉아 상체를 앞으로 숙이는 아기 자세">' +
      '<path class="floor" d="M36 132h248"/>' +
      '<path class="b" d="M204 106c-30 2-56 8-64 12"/>' +
      '<path class="b" d="M140 118l-18 4"/>' +
      '<circle class="head" cx="112" cy="123" r="9"/>' +
      '<path class="b" d="M143 121c-22 3-44 7-58 9"/>' +
      '<path class="b" d="M204 106l-28 26"/>' +
      '<path class="b" d="M176 132h34"/>' +
      '<path class="b" d="M210 132l2-6"/>' +
      '<path class="a" d="M212 100c6 8 8 16 6 24" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="152" text-anchor="middle">엉덩이를 발뒤꿈치 쪽으로, 이마는 바닥에</text>' +
      '</svg>',

  // 4. 다운독 — 엉덩이 위로
  s4: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="손과 발을 바닥에 대고 엉덩이를 위로 올리는 다운독 자세">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<path class="b" d="M88 136l58-52 16-20 78 72"/>' +
      '<circle class="head" cx="126" cy="99" r="9"/>' +
      '<path class="a" d="M162 54V38" marker-end="url(#ah)"/>' +
      '<text class="sm" x="176" y="42" text-anchor="start">엉덩이는 하늘로</text>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">무릎은 살짝 굽혀도 됨</text>' +
      '</svg>',

  // 5. 가슴 열기 깍지 — 어깨 뒤로
  s5: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="등 뒤에서 손을 깍지 끼고 어깨를 뒤로 젖히는 자세">' +
      '<circle class="head" cx="160" cy="42" r="11"/>' +
      '<path class="b" d="M160 53v10"/>' +
      '<path class="b" d="M136 68c8-5 40-5 48 0"/>' +
      '<path class="b" d="M136 68l4 36M184 68l-4 36M140 104h40"/>' +
      '<path class="b" d="M138 70c-12 14-6 28 12 34"/>' +
      '<path class="b" d="M182 70c12 14 6 28-12 34"/>' +
      '<path class="head" d="M153 104h14v5h-14z"/>' +
      '<path class="a" d="M134 62l-18-10" marker-end="url(#ah)"/>' +
      '<path class="a" d="M186 62l18-10" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="140" text-anchor="middle">깍지 낀 손은 등 뒤로, 어깨는 뒤로</text>' +
      '</svg>',

  // 6. 누워서 무릎 당기기
  s6: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="누워서 한쪽 무릎을 가슴 쪽으로 당기는 자세">' +
      '<path class="floor" d="M36 134h248"/>' +
      '<circle class="head" cx="66" cy="112" r="10"/>' +
      '<path class="b" d="M78 118l8 2"/>' +
      '<path class="b" d="M86 120h86"/>' +
      '<path class="b" d="M172 122h70"/>' +
      '<path class="b" d="M242 123l5-6"/>' +
      '<path class="b" d="M172 122l-22-26"/>' +
      '<path class="b" d="M150 96l18-12"/>' +
      '<path class="b" d="M168 84l6 2"/>' +
      '<path class="b" d="M96 116c16-10 34-18 52-18"/>' +
      '<path class="a" d="M188 76c-14-4-30 0-40 10" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">무릎을 가슴으로, 허리는 바닥에 붙이고</text>' +
      '</svg>',

  // 7. 누워서 척추 비틀기 (위에서 본 모습)
  s7: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="누워서 무릎만 옆으로 넘기는 척추 비틀기 자세">' +
      '<text class="sm" x="48" y="24" text-anchor="start">위에서 본 모습</text>' +
      '<path class="b" d="M116 62h88"/>' +
      '<path class="b" d="M116 62l-4-7M204 62l4-7"/>' +
      '<path class="b" d="M160 47v57"/>' +
      '<circle class="head" cx="160" cy="36" r="10"/>' +
      '<path class="g" d="M160 104v34"/>' +
      '<path class="b" d="M160 104c16 4 30 8 40 14"/>' +
      '<path class="b" d="M200 118c-4 12-18 18-34 17"/>' +
      '<path class="a" d="M144 124c10 18 42 22 60 12" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">어깨는 바닥에 붙인 채 무릎만 넘기기</text>' +
      '</svg>',

  // 8. 나비 자세
  s8: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="앉아서 발바닥을 붙이고 무릎을 옆으로 벌리는 나비 자세">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<circle class="head" cx="160" cy="38" r="11"/>' +
      '<path class="b" d="M160 49v9"/>' +
      '<path class="b" d="M138 62c6-4 38-4 44 0"/>' +
      '<path class="b" d="M138 62l6 34M182 62l-6 34M144 96h32"/>' +
      '<path class="b" d="M158 100l-46 4M162 100l46 4"/>' +
      '<path class="b" d="M112 104l38 20M208 104l-38 20"/>' +
      '<path class="b" d="M150 124h20"/>' +
      '<path class="a" d="M104 94c-6 8-8 16-4 24" marker-end="url(#ah)"/>' +
      '<path class="a" d="M216 94c6 8 8 16 4 24" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">발바닥 붙이고, 무릎은 손으로 누르지 않기</text>' +
      '</svg>',

  // 9. 까치발 — 뒤꿈치 들기
  s9: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="벽을 짚고 뒤꿈치를 들어 올리는 까치발 자세">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<path class="g" d="M70 64v72"/>' +
      '<path class="b" d="M120 70c8 18 10 28 12 38"/>' +
      '<path class="b" d="M120 74c-14 6-28 12-44 16"/>' +
      '<path class="b" d="M116 61l4 9"/>' +
      '<circle class="head" cx="114" cy="50" r="11"/>' +
      '<path class="b" d="M132 108v18"/>' +
      '<path class="b" d="M112 134c14 2 32-4 44-12"/>' +
      '<path class="b" d="M136 126v8"/>' +
      '<path class="g" d="M156 122v14"/>' +
      '<path class="a" d="M168 118V96" marker-end="url(#ah)"/>' +
      '<text class="sm" x="178" y="108" text-anchor="start">뒤꿈치 ↑</text>' +
      '</svg>',

  // 10. 스탠딩 사이드 스트레치
  s10: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="한 팔을 머리 위로 뻗어 옆으로 기울이는 사이드 스트레치">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<circle class="head" cx="150" cy="52" r="11"/>' +
      '<path class="b" d="M154 62l4 10"/>' +
      '<path class="b" d="M146 72c10-4 22-4 30 2"/>' +
      '<path class="b" d="M146 72l-4 34M176 74l4 32M142 106h38"/>' +
      '<path class="b" d="M148 108l-2 26M174 108l2 26"/>' +
      '<path class="b" d="M176 74c4-18-8-36-30-34"/>' +
      '<path class="b" d="M146 40l-6 4"/>' +
      '<path class="b" d="M142 74c-12 14-14 24-12 34"/>' +
      '<path class="a" d="M132 26l-18 6" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">골반은 제자리에, 발은 어깨 너비</text>' +
      '</svg>',

  // 11. 손목·팔뚝
  s11: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="손등을 아래로, 손바닥을 위로 당기는 손목 스트레칭">' +
      '<path class="g" d="M160 54v86"/>' +
      '<path class="b" d="M44 100h72"/>' +
      '<path class="b" d="M116 100c8 4 12 12 12 20"/>' +
      '<path class="a" d="M136 104c6 8 4 18-4 22" marker-end="url(#ah)"/>' +
      '<text class="sm" x="88" y="146" text-anchor="middle">손등 당기기</text>' +
      '<path class="b" d="M196 92h72"/>' +
      '<path class="b" d="M268 92c6-6 8-14 6-22"/>' +
      '<path class="a" d="M282 96c4-10 2-20-4-28" marker-end="url(#ah)"/>' +
      '<text class="sm" x="232" y="146" text-anchor="middle">손바닥 당기기</text>' +
      '</svg>',

  // 12. 의자 흉추 비틀기
  s12: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="의자에 앉아 등받이를 잡고 상체를 비트는 자세">' +
      '<path class="floor" d="M36 138h248"/>' +
      '<path class="b" d="M162 118h76V70"/>' +
      '<path class="b" d="M178 118l-4 20M232 118l4 20"/>' +
      '<path class="b" d="M178 114c-4-16-4-28-4-36"/>' +
      '<path class="b" d="M178 114h-28v22"/>' +
      '<path class="b" d="M150 136l-10 2"/>' +
      '<path class="b" d="M172 77l2 3"/>' +
      '<circle class="head" cx="170" cy="66" r="11"/>' +
      '<path class="b" d="M176 82c14 4 28 10 44 14"/>' +
      '<path class="a" d="M190 86c12 8 10 22-4 26" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">등받이를 잡고 숨 내쉴 때 조금 더</text>' +
      '</svg>',

  // 13. 두피마사지 — 백회혈·태양혈·풍지혈
  s13: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="머리 옆모습에 백회혈, 태양혈, 풍지혈 지압점 표시">' +
      '<path class="b" d="M116 122v12"/>' +
      '<path class="b" d="M96 136c12-6 30-6 42 0"/>' +
      '<path class="b" d="M116 46c20 0 34 16 34 38s-14 38-34 38"/>' +
      '<path class="b" d="M116 122c-18 0-32-14-32-38s14-38 32-38"/>' +
      '<path class="f" d="M84 82c-3 3-3 7 0 10"/>' +
      '<path class="f" d="M140 84c8-2 10 8 2 10"/>' +
      '<path class="g" d="M112 47c14-9 40-13 60-11"/>' +
      '<circle class="p" cx="112" cy="47" r="4.5"/>' +
      '<text x="176" y="40">백회혈</text><text class="sm" x="176" y="52">정수리 한가운데</text>' +
      '<path class="g" d="M92 76c-12-6-20-10-28-12"/>' +
      '<circle class="p" cx="92" cy="76" r="4.5"/>' +
      '<text x="60" y="68" text-anchor="end">태양혈</text><text class="sm" x="60" y="80" text-anchor="end">관자놀이</text>' +
      '<path class="g" d="M140 112c12 8 24 14 36 16"/>' +
      '<circle class="p" cx="140" cy="112" r="4.5"/>' +
      '<text x="180" y="132">풍지혈</text><text class="sm" x="180" y="144">뒷목 머리카락선</text>' +
      '</svg>',

  // 14. 페이스요가 — 찬죽혈·협거혈
  s14: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="얼굴 정면에 찬죽혈, 협거혈 지압점 표시">' +
      '<path class="b" d="M78 84c-4-4-4 6 0 8"/>' +
      '<path class="b" d="M142 84c4-4 4 6 0 8"/>' +
      '<path class="b" d="M110 46c18 0 32 16 32 38s-14 38-32 38-32-16-32-38 14-38 32-38z"/>' +
      '<path class="f" d="M94 78c3-4 8-4 11 0M120 78c3-4 8-4 11 0"/>' +
      '<path class="f" d="M110 86v10"/>' +
      '<path class="f" d="M103 108c4 4 10 4 14 0"/>' +
      '<path class="g" d="M96 68c-8-4-14-8-20-10"/>' +
      '<circle class="p" cx="96" cy="68" r="4"/><circle class="p" cx="124" cy="68" r="4"/>' +
      '<text x="72" y="62" text-anchor="end">찬죽혈</text><text class="sm" x="72" y="74" text-anchor="end">눈썹 안쪽 끝</text>' +
      '<path class="g" d="M84 106c-12 8-20 16-26 24"/>' +
      '<circle class="p" cx="84" cy="106" r="4"/><circle class="p" cx="136" cy="106" r="4"/>' +
      '<text x="56" y="136" text-anchor="end">협거혈</text><text class="sm" x="56" y="148" text-anchor="end">어금니 근육</text>' +
      '</svg>'
};
