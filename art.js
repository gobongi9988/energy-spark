// 시동 — 몸풀기 동작 그림 설명 (동작별 인라인 SVG)
// 따뜻한 크림·테라코타에 맞춘 선 그림. 몸 = 잉크색 선, 움직임 = 테라코타 화살표, 지압점 = 세이지 점.
// viewBox 320×160 고정, 카드 폭에 맞춰 늘어남.
window.SIDONG_ART = {
  s1: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="한 손을 머리에 얹고 머리를 옆으로 기울이는 자세">' +
      '<path class="g" d="M160 30v30"/>' +
      '<path class="b solid" d="M146 84a15 15 0 1 0 .1 0z"/>' +
      '<path class="b" d="M133 82c-3 4-3 8 0 10"/>' +
      '<path class="b" d="M152 97l4 11"/>' +
      '<path class="b" d="M108 128c12-16 32-22 52-22s40 6 52 22"/>' +
      '<path class="b" d="M112 122l-12-24"/>' +
      '<path class="b" d="M100 98c2-16 14-28 30-32"/>' +
      '<path class="b" d="M130 66c6-4 13-2 16 4"/>' +
      '<path class="a" d="M136 56c-18 6-28 20-30 36" marker-end="url(#ah)"/>' +
      '</svg>',

  s2: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="고양이 자세는 등을 위로, 소 자세는 배를 아래로">' +
      '<path class="floor" d="M36 130h248"/>' +
      '<path class="b" d="M70 130v-22M118 130v-22"/>' +
      '<path class="b" d="M70 108c2-22 24-30 40-22 6 3 8 12 8 22"/>' +
      '<path class="b" d="M64 110l6-2"/>' +
      '<path class="b solid" d="M58 114a8 8 0 1 0 .1 0z"/>' +
      '<path class="a" d="M92 74V54" marker-end="url(#ah)"/>' +
      '<text class="sm" x="94" y="148" text-anchor="middle">고양이 (숨 내쉴 때)</text>' +
      '<path class="b" d="M194 130v-22M242 130v-22"/>' +
      '<path class="b" d="M194 108c8 12 40 12 48 0"/>' +
      '<path class="b" d="M189 103l5 5"/>' +
      '<path class="b solid" d="M182 100a8 8 0 1 0 .1 0z"/>' +
      '<path class="a" d="M218 112v16" marker-end="url(#ah)"/>' +
      '<text class="sm" x="218" y="148" text-anchor="middle">소 (숨 들이쉴 때)</text>' +
      '</svg>',

  s3: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="무릎 꿇고 앉아 상체를 앞으로 숙이는 아기 자세">' +
      '<path class="floor" d="M36 134h248"/>' +
      '<path class="b" d="M214 96c-28 4-62 8-88 12"/>' +
      '<path class="b" d="M126 110c-14 8-30 16-42 18"/>' +
      '<path class="b" d="M214 96c-12 14-24 26-34 32"/>' +
      '<path class="b" d="M180 128l32 2"/>' +
      '<path class="b" d="M212 130l4-6"/>' +
      '<path class="b solid" d="M114 112a10 10 0 1 0 .1 0z"/>' +
      '<path class="a" d="M222 102c6 8 8 16 6 24" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="152" text-anchor="middle">엉덩이를 발뒤꿈치 쪽으로, 이마는 바닥에</text>' +
      '</svg>',

  s4: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="손과 발을 바닥에 대고 엉덩이를 위로 올리는 다운독 자세">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<path class="b" d="M84 136l78-68"/>' +
      '<path class="b" d="M162 68l78 68"/>' +
      '<path class="b solid" d="M124 94a9 9 0 1 0 .1 0z"/>' +
      '<path class="a" d="M162 60V40" marker-end="url(#ah)"/>' +
      '<text class="sm" x="176" y="44" text-anchor="start">엉덩이는 하늘로</text>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">무릎은 살짝 굽혀도 됨</text>' +
      '</svg>',

  s5: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="등 뒤에서 손을 깍지 끼고 어깨를 뒤로 젖히는 자세">' +
      '<path class="b" d="M120 72c16-8 64-8 80 0"/>' +
      '<path class="b" d="M120 72c-6 16-4 32 4 44M200 72c6 16 4 32-4 44"/>' +
      '<path class="b" d="M124 116c16 6 56 6 72 0"/>' +
      '<path class="g" d="M122 76c-10 16 6 34 32 36M198 76c10 16-6 34-32 36"/>' +
      '<path class="b" d="M156 114a5 5 0 1 0 .1 0z"/>' +
      '<path class="b" d="M160 59v9"/>' +
      '<path class="b solid" d="M160 46a13 13 0 1 0 .1 0z"/>' +
      '<path class="a" d="M116 68c-12-6-20-10-28-14" marker-end="url(#ah)"/>' +
      '<path class="a" d="M204 68c12-6 20-10 28-14" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="148" text-anchor="middle">깍지 낀 손은 등 뒤로, 어깨는 뒤로</text>' +
      '</svg>',

  s6: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="누워서 한쪽 무릎을 가슴 쪽으로 당기는 자세">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<path class="b" d="M76 122h100"/>' +
      '<path class="b" d="M176 124h72"/>' +
      '<path class="b" d="M248 126l4-6"/>' +
      '<path class="b" d="M176 124l-28-28"/>' +
      '<path class="b" d="M148 96l24-8"/>' +
      '<path class="b" d="M172 88l4-6"/>' +
      '<path class="b" d="M100 118c18-10 34-18 48-20"/>' +
      '<path class="b solid" d="M64 116a11 11 0 1 0 .1 0z"/>' +
      '<path class="a" d="M166 80c-12-2-24 2-32 10" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="152" text-anchor="middle">무릎을 가슴으로, 허리는 바닥에 붙이고</text>' +
      '</svg>',

  s7: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="누워서 무릎만 옆으로 넘기는 척추 비틀기 자세">' +
      '<text class="sm" x="48" y="24" text-anchor="start">위에서 본 모습</text>' +
      '<path class="b" d="M118 64h84"/>' +
      '<path class="b" d="M118 64l-4-6M202 64l4-6"/>' +
      '<path class="b" d="M160 49v57"/>' +
      '<path class="b solid" d="M160 38a11 11 0 1 0 .1 0z"/>' +
      '<path class="g" d="M160 106v34"/>' +
      '<path class="b" d="M160 106c16 4 30 8 40 14"/>' +
      '<path class="b" d="M200 120c-4 12-18 18-34 17"/>' +
      '<path class="a" d="M144 124c10 18 42 22 60 12" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">어깨는 바닥에 붙인 채 무릎만 넘기기</text>' +
      '</svg>',

  s8: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="앉아서 발바닥을 붙이고 무릎을 옆으로 벌리는 나비 자세">' +
      '<path class="floor" d="M36 138h248"/>' +
      '<path class="b" d="M132 68c12-6 44-6 56 0"/>' +
      '<path class="b" d="M132 68c-6 18-6 32 0 44M188 68c6 18 6 32 0 44"/>' +
      '<path class="b" d="M132 112c12 6 44 6 56 0"/>' +
      '<path class="b" d="M160 54v10"/>' +
      '<path class="b solid" d="M160 42a12 12 0 1 0 .1 0z"/>' +
      '<path class="b" d="M160 116l-46-4M160 116l46-4"/>' +
      '<path class="b" d="M114 112l38 16M206 112l-38 16"/>' +
      '<path class="b" d="M152 128h16"/>' +
      '<path class="a" d="M106 104c-6 6-8 12-8 18" marker-end="url(#ah)"/>' +
      '<path class="a" d="M214 104c6 6 8 12 8 18" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">발바닥 붙이고, 무릎은 손으로 누르지 않기</text>' +
      '</svg>',

  s9: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="벽을 짚고 뒤꿈치를 들어 올리는 까치발 자세">' +
      '<path class="floor" d="M36 136h248"/>' +
      '<path class="g" d="M70 64v72"/>' +
      '<path class="b" d="M120 70c8 18 10 28 12 38"/>' +
      '<path class="b" d="M120 74c-14 6-28 12-44 16"/>' +
      '<path class="b" d="M116 61l4 9"/>' +
      '<path class="b solid" d="M114 50a11 11 0 1 0 .1 0z"/>' +
      '<path class="b" d="M132 108v18"/>' +
      '<path class="b" d="M112 134c14 2 32-4 44-12"/>' +
      '<path class="b" d="M136 126v8"/>' +
      '<path class="g" d="M156 122v14"/>' +
      '<path class="a" d="M168 118V96" marker-end="url(#ah)"/>' +
      '<text class="sm" x="178" y="108" text-anchor="start">뒤꿈치 ↑</text>' +
      '</svg>',

  s10: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="한 팔을 머리 위로 뻗어 옆으로 기울이는 사이드 스트레치">' +
      '<path class="floor" d="M36 138h248"/>' +
      '<path class="b solid" d="M152 50a11 11 0 1 0 .1 0z"/>' +
      '<path class="b" d="M154 61c10 19 8 39 0 53"/>' +
      '<path class="b" d="M140 116c8 4 20 4 26 0"/>' +
      '<path class="b" d="M140 68c-10 14-14 30-12 44"/>' +
      '<path class="b" d="M166 70c2-18-8-38-30-40"/>' +
      '<path class="b" d="M136 30l-5-1"/>' +
      '<path class="a" d="M128 20l-18 4" marker-end="url(#ah)"/>' +
      '<text class="sm" x="240" y="120" text-anchor="middle">골반은 제자리에</text>' +
      '</svg>',

  s11: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="손등을 아래로, 손바닥을 위로 당기는 손목 스트레칭">' +
      '<path class="g" d="M160 54v92"/>' +
      '<path class="b" d="M44 100h72"/>' +
      '<path class="b" d="M116 100c8 4 12 12 12 20"/>' +
      '<path class="a" d="M136 104c6 8 4 18-4 22" marker-end="url(#ah)"/>' +
      '<text class="sm" x="88" y="146" text-anchor="middle">손등 당기기</text>' +
      '<path class="b" d="M196 92h72"/>' +
      '<path class="b" d="M268 92c6-6 8-14 6-22"/>' +
      '<path class="a" d="M282 96c4-10 2-20-4-28" marker-end="url(#ah)"/>' +
      '<text class="sm" x="232" y="146" text-anchor="middle">손바닥 당기기</text>' +
      '</svg>',

  s12: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="의자에 앉아 등받이를 잡고 상체를 비트는 자세">' +
      '<path class="floor" d="M36 138h248"/>' +
      '<path class="b" d="M162 118h76V70"/>' +
      '<path class="b" d="M178 118l-4 20M232 118l4 20"/>' +
      '<path class="b" d="M178 114c-4-16-4-28-4-36"/>' +
      '<path class="b" d="M178 114h-28v22"/>' +
      '<path class="b" d="M150 136l-10 2"/>' +
      '<path class="b" d="M172 77l2 3"/>' +
      '<path class="b solid" d="M170 66a11 11 0 1 0 .1 0z"/>' +
      '<path class="b" d="M176 82c14 4 28 10 44 14"/>' +
      '<path class="a" d="M190 86c12 8 10 22-4 26" marker-end="url(#ah)"/>' +
      '<text class="sm" x="160" y="154" text-anchor="middle">등받이를 잡고 숨 내쉴 때 조금 더</text>' +
      '</svg>',

  s13: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="머리 옆모습에 백회혈, 태양혈, 풍지혈 지압점 표시">' +
      '<path class="b" d="M116 122v12"/>' +
      '<path class="b" d="M96 136c12-6 30-6 42 0"/>' +
      '<path class="b" d="M116 46c20 0 34 16 34 38s-14 38-34 38"/>' +
      '<path class="b" d="M116 122c-18 0-32-14-32-38s14-38 32-38"/>' +
      '<path class="b" d="M140 84c8-2 10 8 2 10"/>' +
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

  s14: '<svg class="art" viewBox="0 0 320 160" role="img" aria-label="얼굴 정면에 찬죽혈, 협거혈 지압점 표시">' +
      '<path class="b" d="M78 84c-4-4-4 6 0 8"/>' +
      '<path class="b" d="M142 84c4-4 4 6 0 8"/>' +
      '<path class="b" d="M110 46c18 0 32 16 32 38s-14 38-32 38-32-16-32-38 14-38 32-38z"/>' +
      '<path class="b" d="M94 78c3-4 8-4 11 0M120 78c3-4 8-4 11 0"/>' +
      '<path class="b" d="M110 86v10"/>' +
      '<path class="b" d="M103 108c4 4 10 4 14 0"/>' +
      '<path class="g" d="M96 68c-8-4-14-8-20-10"/>' +
      '<circle class="p" cx="96" cy="68" r="4"/><circle class="p" cx="124" cy="68" r="4"/>' +
      '<text x="72" y="62" text-anchor="end">찬죽혈</text><text class="sm" x="72" y="74" text-anchor="end">눈썹 안쪽 끝</text>' +
      '<path class="g" d="M84 106c-12 8-20 16-26 24"/>' +
      '<circle class="p" cx="84" cy="106" r="4"/><circle class="p" cx="136" cy="106" r="4"/>' +
      '<text x="56" y="136" text-anchor="end">협거혈</text><text class="sm" x="56" y="148" text-anchor="end">어금니 근육</text>' +
      '</svg>'
};
