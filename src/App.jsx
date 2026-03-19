import React, { useMemo, useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';

const topicCatalog = [
  { id: 'fear', order: 1, name: '두려움', totalQuestions: 78 },
  { id: 'jeongjoijgam', order: 2, name: '정죄감', totalQuestions: 23 },
  { id: 'anger', order: 3, name: '분노', totalQuestions: 45 },
  { id: 'critical', order: 4, name: '비판적인 태도', totalQuestions: 13 },
  { id: 'appearance', order: 5, name: '외모 콤플렉스', totalQuestions: 33 },
  { id: 'rejection', order: 6, name: '거절감', totalQuestions: 33 },
  { id: 'lies', order: 7, name: '거짓과 속임', totalQuestions: 49 },
  { id: 'inferiority', order: 8, name: '열등감', totalQuestions: 50 },
  { id: 'passivity', order: 9, name: '수동성', totalQuestions: 56 },
  { id: 'unbelief', order: 10, name: '불신', totalQuestions: 21 },
  { id: 'unforgiveness', order: 11, name: '용서하지 못함', totalQuestions: 14 },
  { id: 'jealousy', order: 12, name: '질투와 탐심', totalQuestions: 41 },
  { id: 'control', order: 13, name: '통제', totalQuestions: 69 },
  { id: 'entitlement', order: 14, name: '권리의식', totalQuestions: 85 },
];

function buildCategories(rawCategories) {
  return rawCategories.map((category) => ({
    ...category,
    questions: category.questions.map((text, index) => ({
      id: `${category.id}-q${index + 1}`,
      text,
    })),
  }));
}

const fearCategories = buildCategories([
  {
    id: 'fear-1',
    name: '하나님께 벌받는 것에 대한 두려움',
    questions: [
      '말씀 묵상이나 기도를 하는 것이 불안과 두려움(염려, 불신)의 동기에서 비롯됨.',
      '어떤 행동이나 결과, 혹은 사역과 성과를 중요시하는 관점에서 예수님과 관계하려고 함.',
      '하나님을 실망시킬까 봐 두려워하는 마음이 있음.',
      '하나님께 벌을 받고 삶이 어려워질까 봐 두려워하는 마음이 있음.',
      '나에게 영적 은사를 주시지 않을까 봐 두려움.',
      '예수님과의 깊은 친밀감을 누리지 못하게 될까 봐 두려움.',
      '내 삶에 고통(환란)이 더 많이 생길까 봐 두려움.',
      '자유케 되는 과정이 너무 힘들어질까 봐 두려움.',
      '하나님이 나에게 관심을 보이지 않고 외면하시며 기도에 응답하지 않으실까 봐 두려움.',
      '하나님이 나에게 화를 내시거나 용서하지 않으실까 봐 두려움.',
    ],
  },
  {
    id: 'fear-2',
    name: '사람에 대한 불안과 두려움',
    questions: [
      '다른 사람들이 나에 대해 어떻게 생각할지 두려워함.',
      '다른 사람들이 나에 대해 뭐라고 말할지 상상하면서 두려움.',
      '가까운 사람들에게 거절당할까 두려워함.',
      '권위자들(부모, 선생님, 직장 상사, 리더 등)에 대한 두려움.',
      '의사소통에 대한 두려움.',
      '어려운 대화를 나누거나 누군가와 직면하는 것에 대한 두려움.',
      '나에 대한 다른 사람들의 평가가 두려움.',
      '책임을 져야 하는 관계 맺는 것을 두려워함.',
    ],
  },
  {
    id: 'fear-3',
    name: '불확실성에 대한 두려움',
    questions: [
      '하나님의 뜻을 알지 못하거나 하나님의 부르심을 놓칠까 봐 두려워함.',
      '하나님의 부르심에 제대로 응답하지 못할까 봐 두려워함.',
      '위탁하고 헌신하는 것에 대한 두려움.',
      '지금 헌신하면 내가 좋아하는 것들을 잃어버리게 될까 걱정됨.',
      '어떤 사역에 위탁해서 헌신하기가 두려움.',
      '성장하는 신앙인들의 모임에 헌신하기가 두려움.',
      '기도 사역에 헌신하기가 두려움.',
      '교회에 꾸준히 참석하기가 두려움.',
      '교회에 십일조를 드리기가 두려움.',
      '하나님이 너무 많은 것을 요구하실까 봐 두려움.',
      '소리 내어 기도할 때 다른 사람들이 내 기도를 듣고 평가할까 봐 두려움.',
    ],
  },
  {
    id: 'fear-4',
    name: '예수님이 하시는 사역에 대한 두려움',
    questions: [
      '마귀를 쫓아내는 축사 사역에 대한 두려움.',
      '마귀가 실제로 존재한다는 것에 대한 두려움.',
      '치유 받는 것에 대한 두려움.',
      '핍박 받는 것에 대한 두려움.',
      '균형이 없거나 광신자로 여겨질까 봐 두려움.',
      '그리스도를 따르는데 드는 대가에 대한 두려움.',
      '성령의 역사와 초자연적 현상들에 대한 두려움.',
      '영적 전쟁에 대한 두려움.',
      '거짓된 영적 사역들에 대한 두려움.',
      '예수님이 하시는 사역의 다른 요소들에 대한 두려움.',
    ],
  },
  {
    id: 'fear-5',
    name: '실패에 대한 두려움',
    questions: [
      '나쁜 죄에 다시 빠지게 될까 봐 두려움.',
      '습관적인 죄나 중독에서 자유롭게 되지 못할까 봐 두려움.',
      '결혼하지 못할까 봐 두려움.',
      '결혼 생활에서 실패할까 봐 두려움.',
      '결혼 생활을 지켜야 하는 헌신에 대한 두려움.',
      '이혼하게 될까 봐 두려움.',
      '다른 사람들에게 친밀함과 진짜 모습을 보여주는 것에 대한 두려움.',
      '자녀들이 잘 성장하지 못할까 봐 두려움.',
      '좋은 직장을 얻고 성공하지 못할까 봐 두려움.',
      '유혹이 오는 것에 대한 두려움.',
      '부모나 존경하는 사람들을 실망시킬까 봐 두려움.',
      '사건, 사고에 대한 두려움.',
    ],
  },
  {
    id: 'fear-6',
    name: '나쁜 소식이나 상황에 대한 두려움',
    questions: [
      '분쟁이나 분열, 갈등의 소식에 대한 두려움.',
      '죄나 도덕적 실패에 관한 소식에 대한 두려움.',
      '출석률 저하에 대한 두려움 (특히 리더십에게 해당).',
      '전반적인 나쁜 소식에 대한 두려움.',
      '삶의 상황이 어려워질까 하는 두려움.',
      '반기독교 단체들의 증가에 대한 두려움.',
      '종말에 대한 두려움.',
      '위기나 공포를 전파하는 음모론에 대한 두려움.',
    ],
  },
  {
    id: 'fear-7',
    name: '과거가 드러나는 것(파급효과)에 대한 두려움',
    questions: [
      '배우자에게 과거의 성적 죄를 고백해야 하는 두려움.',
      '과거로 인한 수치심 때문에 괴로워할 것이 두려움.',
      '과거 때문에 사람들에게 수치를 당하거나 하나님께서 내 삶에서 일하시는 일이 막힐까 봐 두려움.',
      '내 상황이 절대 바뀌지 않을까 봐 두려움.',
      '과거의 죄 때문에 하나님께서 벌하실까 봐 두려움.',
      '현재 싸우고 있는 죄 때문에 하나님께 벌받을까 봐 두려움.',
      '동성애 문제로 고통받고 있으며 고백했을 때 남들의 시선을 두려워함.',
      '낙태 경험으로 인한 수치심과 죄책감에 대한 두려움.',
      '과거의 상처나 흉터(성병 등)가 치유되지 않을까 봐 두려움.',
      '내 진짜 모습이 밝혀질까 봐 두려움.',
      '신체적, 영적, 정서적 치유가 결코 이루어지지 않을까 봐 두려움.',
    ],
  },
  {
    id: 'fear-8',
    name: '갑작스럽고 부자연스러운 두려움',
    questions: [
      '외로움에 대한 두려움.',
      '절망감(좌절, 허무감).',
      '비합리적인 두려움.',
      '죽음에 대한 두려움.',
      '병에 대한 두려움.',
      '암에 대한 두려움.',
      '배우자가 죽을까 봐 두려움.',
      '돈이나 필요가 공급되지 않을까 봐 두려움.',
    ],
  },
]);

const jeongjoijgamCategories = buildCategories([
  {
    id: 'jeongjoijgam-1',
    name: '나의 연약함을 실패로 간주함',
    questions: [
      '진리를 들었는데 내가 그 진리대로 살지 못하면, 나는 그 사실을 쉽게 인정하고 싶어 하지 않습니다.',
      '나는 다른 사람들과 거리를 두고 혼자 있으려고 하며, 독립적인 경향이 많습니다.',
      '나는 종종 다른 사람들과 함께 있는 것이 두렵고 불편합니다.',
      '나는 기도를 통해 자기 연민을 덜어주는 마음의 위로를 얻고 싶어 합니다.',
    ],
  },
  {
    id: 'jeongjoijgam-2',
    name: '사람들을 실망시킬까봐 두려움',
    questions: [
      '나는 종종 비현실적인 기대치를 설정합니다.',
      '나는 정죄감의 생각들을 상쇄하기 위해 지나치게 무리합니다.',
      '나는 하나님께 방향을 구하기보다 세상의 기준을 따릅니다.',
      '나는 수치나 실패감을 일부러 다른 사람들에게 드러내기도 합니다.',
    ],
  },
  {
    id: 'jeongjoijgam-3',
    name: '나 자신을 용서하지 않으려는 마음',
    questions: [
      '나는 늘상 슬픔과 자기연민을 지니고 생활합니다.',
      '나는 나 자신에게 지나치게 몰두하는 성향입니다.',
      '이런 사고 경향에 대해 도전하는 사람들은 피하고 싶습니다.',
      '정죄감은 내 말버릇이 되어 있습니다.',
      '남들과 대화하면서도 내 생각 속에 빠질 때가 많습니다.',
    ],
  },
  {
    id: 'jeongjoijgam-4',
    name: '사람들과의 비교 의식',
    questions: ['나는 내 사역과 활동을 다른 사람들과 비교하면서 부족하다고 판단할 때가 많습니다.'],
  },
  {
    id: 'jeongjoijgam-5',
    name: '의심과 불확신',
    questions: [
      '나는 하나님께서 내게 맡기신 일에 대해 자꾸 의심합니다.',
      '나는 스스로 정한 종교적 목표들 때문에 나 자신을 짓누를 때가 많습니다.',
      '하루를 성실히 보내도 실패했다고 자책하곤 합니다.',
      '나는 영적인 확신을 가져본 적이 없습니다.',
    ],
  },
  {
    id: 'jeongjoijgam-6',
    name: '자기 증오',
    questions: [
      '나는 스스로 무능하고 하찮으며 부족한 존재라고 말합니다.',
      '거짓 자아상과 불신에 사로잡혀서 스스로를 비판합니다.',
      '다른 사람들의 축복이나 진리의 말에 방어적으로 반응합니다.',
      '나는 권위와 질서를 무시하는 편입니다.',
      '나는 인정받기 위해 여러 가지 섬김의 행동들에 힘씁니다.',
    ],
  },
]);

const angerCategories = buildCategories([
  {
    id: 'anger-1',
    name: '분노의 일반 증상',
    questions: [
      '나는 비교적 기분이 좋다가도 갑자기 기분이 나빠집니다.',
      '어떤 말을 강조할 때 열을 내며 목소리가 커집니다.',
      '사람들과 이야기할 때 조급해집니다.',
      '내가 싫어하는 행동이 나타나면 화가 올라옵니다.',
      '내 기대가 어긋날 때 화가 납니다.',
      '수고를 인정받지 못하면 화가 납니다.',
      '권위적인 말투를 들으면 화가 납니다.',
      '존중받지 못하면 화가 납니다.',
      '화가 나면 머릿속에 나쁜 말이 튀어나옵니다.',
      '화가 나면 다른 사람의 이야기를 듣고 싶지 않습니다.',
      '내게 필요한 것들이 없을 때 화가 납니다.',
      '사람들이 내 말대로 하지 않을 때 화가 납니다.',
      '일이 내 뜻대로 되지 않을 때 화가 납니다.',
      '무언가를 잘못했을 때도 화가 납니다.',
      '압박감을 느끼면 화가 납니다.',
      '쉽게 방어적인 태도를 보입니다.',
      '다른 사람들이 억울한 일을 당하면 화가 납니다.',
      '단점을 빠르게 발견하는 편입니다.',
      '상처받았던 일들을 다시 끄집어냅니다.',
      '다른 사람들에 대해 비판적으로 이야기합니다.',
      '내가 이런 대우를 받으면 안 된다는 생각이 듭니다.',
      '나는 용서했다고 말하지만 계속 되새깁니다.',
      '결점과 실수를 보면 답답함을 느낍니다.',
      '나는 금방 조급해집니다.',
      '종종 내 삶이 다른 사람들보다 더 힘들다고 느낍니다.',
    ],
  },
  {
    id: 'anger-2',
    name: '부모와의 관계에서의 상처',
    questions: [
      '지나치거나 잘못된 형태의 훈육으로 상처받은 경험',
      '부모님의 지나친 간섭',
      '영적 지도자의 부재',
      '방치',
      '방임',
      '거부감',
      '수동성',
      '비판',
      '성과에 따른 인정과 사랑',
      '중독 문제',
      '간음',
      '이혼',
      '학대',
      '애정/격려 부족',
      '형제자매 비교',
      '부모 간 관계 상처',
    ],
  },
  {
    id: 'anger-3',
    name: '용서하지 못한 관계들',
    questions: [
      '형제/친구와의 질투, 경쟁, 배신',
      '연인 관계에서의 거절, 배신',
      '권위자에게서 받은 거절/비교/배신/무시/격려 부족',
      '배우자 관계에서의 배신, 통제, 무관심, 비판, 학대 등',
    ],
  },
]);

const criticalCategories = buildCategories([
  {
    id: 'critical-1',
    name: '비판적 태도의 증상',
    questions: [
      '나는 다른 사람들의 약점에 대해 참을성이 없습니다.',
      '나는 남들에게 모질게 반응합니다.',
      '나는 완고하며 타협하지 않는 성향입니다.',
      '기준에 미치지 못하는 사람들에게 너그럽지 못합니다.',
      '높은 기대가 충족되지 않으면 화를 냅니다.',
      '부당한 일을 겪을 때 원망하고 분노합니다.',
      '다른 사람들이 부당한 일을 당할 때도 대신 화가 납니다.',
      '복수해주고 싶은 마음이 있습니다.',
      '냉소적인 단어를 잘 씁니다.',
      '남의 약점을 부각시키기도 합니다.',
      '수준이 낮은 사람들을 낮추어 봅니다.',
      '다른 크리스천들을 존중하지 못합니다.',
      '나는 변화에 저항합니다.',
    ],
  },
]);

const appearanceCategories = buildCategories([
  {
    id: 'appearance-1',
    name: '자기연민',
    questions: [
      '하나님이 나를 완벽하게 창조한 것이 아니라는 거짓말을 믿습니다.',
      '나는 다른 사람들처럼 사랑받고 환영받을 수 없다고 생각합니다.',
      '내 외모가 평범하고 실망스럽다고 생각합니다.',
      '세상 미디어의 아름다움이 진리라고 믿습니다.',
      '성경이 가르치는 아름다움을 무시합니다.',
      '외모 콤플렉스를 극복할 수 없다고 생각합니다.',
      '자기 중심적으로 스스로를 평가합니다.',
      '자신이 불쌍하고 구제불능이라는 거짓말을 믿습니다.',
    ],
  },
  {
    id: 'appearance-2',
    name: '감사하지 못함',
    questions: [
      '창조해 주신 모습에 대해 마음이 상합니다.',
      '외모 기준에 대해 마음이 상합니다.',
      '아름다운 사람들을 보면 언짢을 때가 있습니다.',
      '하나님이 주신 것들에 대해 감사하지 못합니다.',
      '세상의 외모 기준을 따라갑니다.',
      '완벽해야 한다는 고정관념이 있습니다.',
      '내 불만을 감추기 위해 가면을 씁니다.',
    ],
  },
  {
    id: 'appearance-3',
    name: '잘못된 목적',
    questions: [
      '내 가치가 외모에 따라 좌우된다고 느낍니다.',
      '외모가 내 정체성을 결정한다고 생각합니다.',
      '외모가 예뻐야 성공한다고 생각합니다.',
      '외모가 좋아야 꿈을 이룰 수 있다고 생각합니다.',
      '하나님보다 나 자신에 더 집중합니다.',
    ],
  },
  {
    id: 'appearance-4',
    name: '용서하지 못함',
    questions: [
      '나를 외모로 판단한 사람들에 대해 쓴 마음이 있습니다.',
      '상처되는 말을 믿고 따랐습니다.',
      '상처 준 사람들에 대해 쓴 마음이 있습니다.',
    ],
  },
  {
    id: 'appearance-5',
    name: '반항심',
    questions: [
      '나는 반항심을 인정하고 싶지 않습니다.',
      '자유를 배우려 하지 않습니다.',
      '이 주제를 피하려 합니다.',
      '내 몸을 소중히 여기지 않았습니다.',
      '운동을 게을리함',
      '과도한 운동 집착',
      '식사를 거름',
      '과식',
      '폭식 후 구토',
      '완하제 사용',
    ],
  },
]);

const rejectionCategories = buildCategories([
  {
    id: 'rejection-1',
    name: '거절감의 증상',
    questions: [
      '상황을 부정적으로 해석합니다.',
      '사람들의 말을 들을 때 거절당한다고 느낍니다.',
      '남들이 나를 어떻게 볼지 두려워 시도하기 어렵습니다.',
      '내 말과 행동을 계속 되짚으며 부정적으로 해석합니다.',
      '영적 은사를 자유롭게 사용하기 어렵습니다.',
      '인정받기 위해 지나치게 일합니다.',
      '사랑을 표현하는 것이 어렵습니다.',
      '칭찬을 믿기 어렵습니다.',
      '권위자를 신뢰하지 못합니다.',
      '의심이 많습니다.',
      '사람들이 나를 냉정하게 본다고 느낍니다.',
      '화가 나면 거친 말이 나옵니다.',
      '지적받으면 방어적입니다.',
      '복음을 전하기 어렵습니다.',
      '선택받지 못할까 두렵습니다.',
      '가족을 통제하려 합니다.',
      '관계에서 소유욕이 강합니다.',
      '자신이 부족하다고 느낍니다.',
      '자주 우울합니다.',
      '항상 불안합니다.',
      '속마음을 드러내기 어렵습니다.',
      '배우자에게 약점을 보이기 두렵습니다.',
      '감정을 솔직히 표현하기 어렵습니다.',
      '다른 사람을 부러워하면서 비판합니다.',
      '경쟁심과 자존심이 강합니다.',
      '혼자 있는 것이 편합니다.',
      '사람들이 내 얘기한다고 느낍니다.',
      '누군가 나를 해칠 것 같다고 느낍니다.',
      '하나님께 거절당할까 두렵습니다.',
      '예배 중에도 사람 시선이 신경 쓰입니다.',
      '필요한 존재가 되려 합니다.',
      '위로나 격려를 표현하지 않습니다.',
      '거절이 두려워 도전하지 못합니다.',
    ],
  },
]);

const liesCategories = buildCategories([
  {
    id: 'lies-1',
    name: '거짓된 위로와 만족감',
    questions: [
      '돈이나 재산이 행복을 줄 거라 믿습니다.',
      '음식이나 술이 만족을 줄 거라 믿습니다.',
      '욕망 충족이 자유와 기쁨을 줄 거라 믿습니다.',
      '하나님만으로는 부족하다고 느낍니다.',
      '배우자나 가족이 변해야 행복해질 거라 믿습니다.',
      '예측 가능한 삶이 더 안전하다고 믿습니다.',
      '자녀가 잘 되면 내 삶도 안전해질 거라 믿습니다.',
      '미리 모든 걸 계획하는 게 유리하다고 믿습니다.',
      '도피 수단 없이는 행복할 수 없다고 느낍니다.',
      '휴일이나 여행이 내 삶의 활력소라고 느낍니다.',
    ],
  },
  {
    id: 'lies-2',
    name: '거짓된 이미지',
    questions: [
      '외모나 스타일을 잘 가꾸면 더 사랑받을 거라고 믿습니다.',
      '완벽한 순간을 기다리며 살고 싶습니다.',
      '내 모습보다 롤모델을 따라가는 게 더 좋습니다.',
      '화려함과 성공에 더 관심이 많습니다.',
    ],
  },
  {
    id: 'lies-3',
    name: '거짓된 지위',
    questions: [
      '잘난 사람들과 어울리면 삶이 더 좋아질 거라고 생각합니다.',
      '성과를 내야 인정받을 수 있다고 생각합니다.',
      '좋은 대학과 직장이 성공의 핵심이라고 생각합니다.',
      '하나님보다 사람에게 잘 보이는 게 중요하게 느껴집니다.',
      '늘 좋은 인상을 줘야 한다고 느낍니다.',
      '인정 못 받으면 화가 납니다.',
      '성공한 비신자는 천국처럼 산다고 생각합니다.',
    ],
  },
  {
    id: 'lies-4',
    name: '거짓된 불안',
    questions: [
      '세상은 위험하니 늘 불안해야 정상이라고 느낍니다.',
      '나는 태생적으로 불리하다고 느낍니다.',
      '살기 위해 끊임없이 준비해야 한다고 느낍니다.',
      '하나님께 인정받으려면 종교적 노력이 필요하다고 느낍니다.',
      '마귀는 무서워서 피해야 한다고 느낍니다.',
      '고통은 하나님이 나를 사랑하지 않아서라고 느낍니다.',
      '부자는 더 사랑받는 증거라고 생각합니다.',
    ],
  },
  {
    id: 'lies-5',
    name: '자기 속임',
    questions: [
      '칭찬받으면 잘 사는 거라고 생각합니다.',
      '부유함이 성공이라고 생각합니다.',
      '세상 성공이 하나님 영광이라고 생각합니다.',
      '말씀대로 살 필요는 없다고 생각합니다.',
      '나는 죄가 별로 없다고 생각합니다.',
      '생각은 죄가 아니라고 생각합니다.',
      '죄 지어도 괜찮다고 생각합니다.',
      '세상 방식으로도 행복할 수 있다고 생각합니다.',
      '편법도 필요하다고 생각합니다.',
      '말 절제가 필요 없다고 생각합니다.',
      '나쁜 사람과 어울려도 괜찮다고 믿습니다.',
      '내 선택은 남에게 영향 없다고 믿습니다.',
      '무엇을 보든 영향 없다고 믿습니다.',
      '형식적 신앙도 괜찮다고 생각합니다.',
      '가족 안정이 최우선이라고 생각합니다.',
    ],
  },
  {
    id: 'lies-6',
    name: '잘못된 방어',
    questions: ['감정 단절', '퇴행', '분노 표출', '투사', '합리화', '속임수'],
  },
]);

const inferiorityCategories = buildCategories([
  {
    id: 'inferiority-1',
    name: '나는 부족하다는 거짓 믿음',
    questions: [
      '나는 내가 못생기고 무가치한 존재라고 생각합니다.',
      '다른 사람들에게 해줄 것이 없다고 느낍니다.',
      '사람들과 있을 때 고개를 숙입니다.',
      '아무도 나를 신경 쓰지 않는다고 생각합니다.',
      '나 자신을 싫어합니다.',
    ],
  },
  {
    id: 'inferiority-2',
    name: '자기 의식 과잉',
    questions: [
      '나는 항상 나 자신을 의식합니다.',
      '남들과 비교하며 부족함을 생각합니다.',
      '다른 사람들이 나를 어떻게 볼지 신경 씁니다.',
    ],
  },
  {
    id: 'inferiority-3',
    name: '비교와 열등감',
    questions: [
      '다른 사람의 능력과 소유를 부러워합니다.',
      '외모나 행동을 부러워합니다.',
      '성공한 사람을 집착적으로 동경합니다.',
      '나보다 못한 사람과 어울리려 합니다.',
    ],
  },
  {
    id: 'inferiority-4',
    name: '도전 회피',
    questions: [
      '책임을 맡기 두렵습니다.',
      '다른 사람이 맡으면 안심됩니다.',
      '숨고 싶습니다.',
      '쉬운 일만 하려 합니다.',
      '모험을 피합니다.',
      '실패가 두렵습니다.',
      '혼자가 편합니다.',
      '복음을 나누기 어렵습니다.',
    ],
  },
  {
    id: 'inferiority-5',
    name: '하나님에 대한 불신',
    questions: [
      '하나님이 나를 선택하셨다고 믿지 못합니다.',
      '아무도 나를 이해하지 못한다고 느낍니다.',
      '하나님이 응답하지 않을 것 같습니다.',
      '하나님이 살아계신지 의문입니다.',
      '나는 영향력이 없다고 생각합니다.',
    ],
  },
  {
    id: 'inferiority-6',
    name: '자기연민',
    questions: [
      '과거를 원망합니다.',
      '나는 원래 이런 사람이라고 포기합니다.',
      '환경 때문에 어쩔 수 없다고 생각합니다.',
      '자기 연민 속에서 위로를 느낍니다.',
    ],
  },
  {
    id: 'inferiority-7',
    name: '비판과 두려움',
    questions: [
      '다른 사람을 비판합니다.',
      '인기 있는 사람을 비난합니다.',
      '도전을 위협으로 느낍니다.',
      '사람을 두려워합니다.',
    ],
  },
  {
    id: 'inferiority-8',
    name: '격려 부족',
    questions: ['다른 사람을 잘 생각하지 않는다.', '남을 돕지 않는다.', '사람을 위협으로 느낀다.', '축복하지 않는다.'],
  },
  {
    id: 'inferiority-9',
    name: '거짓과 속임에 빠짐',
    questions: [
      '아무도 나를 주목하지 않는다.',
      '하나님이 도와주지 않는다.',
      '나는 늘 부족하다.',
      '편안함만 추구한다.',
      '내 가치는 비교로 결정된다.',
      '나는 절대 이길 수 없다.',
      '내 힘으로만 싸워야 한다.',
      '다른 죄에 쉽게 빠진다.',
    ],
  },
]);

const passivityCategories = buildCategories([
  {
    id: 'passivity-1',
    name: '행동하지 않음',
    questions: [
      '다른 사람이 먼저 다가오길 기다립니다.',
      '관계 형성에 수동적입니다.',
      '먼저 연락하지 않습니다.',
      '연락을 미룹니다.',
      '활동을 주도하지 않습니다.',
      '모임에서 먼저 말하지 않습니다.',
      '칭찬이나 축복을 잘 하지 않습니다.',
      '사람을 보호하려 하지 않습니다.',
      '영적 성장을 위해 노력하지 않습니다.',
      '기도/예배에 열정이 없습니다.',
      '하나님과의 갈망이 없습니다.',
      '도움을 요청하지 않습니다.',
      '섬김에 먼저 나서지 않습니다.',
      '변할 수 없다고 믿습니다.',
      '내 일을 남에게 맡깁니다.',
    ],
  },
  {
    id: 'passivity-2',
    name: '고립',
    questions: [
      '상호 의존 관계를 피합니다.',
      '기도 부탁을 하지 않습니다.',
      '공동체를 섬기지 않습니다.',
      '혼자 신앙생활합니다.',
      '리더를 신뢰하지 않습니다.',
      '참여 의욕이 없습니다.',
      '관계 자격이 없다고 느낍니다.',
    ],
  },
  {
    id: 'passivity-3',
    name: '하나님에 대한 저항',
    questions: [
      '회개를 회피합니다.',
      '죄를 방치합니다.',
      '권세를 사용하지 않습니다.',
      '죄에 무감각합니다.',
      '은사를 거부합니다.',
      '영적 은사를 피합니다.',
      '나는 아닐 것이라 생각합니다.',
      '리더 역할을 피합니다.',
      '내 방식대로 살고 싶습니다.',
      '강요받는 걸 싫어합니다.',
      '나는 리더가 아닙니다.',
      '비판적으로 참여를 회피합니다.',
    ],
  },
  {
    id: 'passivity-4',
    name: '자기연민',
    questions: [
      '무기력합니다.',
      '과거를 반복합니다.',
      '회복 기대가 없습니다.',
      '도전은 싫습니다.',
      '조언을 거부합니다.',
      '비교하며 낙심합니다.',
      '변할 수 없다고 믿습니다.',
      '부서진 상태가 편합니다.',
      '슬픔에 익숙합니다.',
    ],
  },
  {
    id: 'passivity-5',
    name: '영적 책임 회피',
    questions: [
      '성장 필요성을 느끼지 못합니다.',
      '영적 훈련을 피합니다.',
      '하나님이 바꾸시길 기다립니다.',
      '자연스럽게 성장할 거라 믿습니다.',
      '책임지기 싫습니다.',
      '다른 사람이 먹여주길 바랍니다.',
      '상황 탓을 합니다.',
    ],
  },
  {
    id: 'passivity-6',
    name: '거짓된 생각',
    questions: [
      '수동성은 내 성격이다.',
      '적극적인 건 나답지 않다.',
      '나서면 실패한다.',
      '변할 필요 없다.',
      '피해자로 사는 게 편하다.',
      '남 말은 소용없다.',
    ],
  },
]);

const unbeliefCategories = buildCategories([
  {
    id: 'unbelief-1',
    name: '불신의 증상',
    questions: [
      '나는 다른 사람들을 쉽게 믿지 않습니다.',
      '리더의 방향을 먼저 비판적으로 봅니다.',
      '기도 응답이 없다고 느끼면 마음이 상합니다.',
      '간증을 들으면 의심이 듭니다.',
      '왜 나에게는 역사하지 않는지 의문입니다.',
      '나는 하나님으로부터 독립하고 싶습니다.',
      '상황을 보면 불가능하다고 생각합니다.',
      '영적 권세에 자신이 없습니다.',
      '기도에 관심이 없습니다.',
      '기도는 마지막 수단입니다.',
      '불안할 때 중독에 빠집니다.',
      '내 문제는 변하지 않을 것이라 생각합니다.',
      '나쁜 소식에 미리 두려워합니다.',
      '걱정하며 통제하려 합니다.',
      '가족의 구원을 불안해합니다.',
      '사람과 상황을 내가 통제하려 합니다.',
      '성령의 역사에 의심이 있습니다.',
      '영적 사역이 두렵습니다.',
      '믿음으로 행하는 것이 두렵습니다.',
      '세상 기준에 의지하는 것이 익숙합니다.',
      '눈에 보이는 것이 더 중요합니다.',
    ],
  },
]);

const unforgivenessCategories = buildCategories([
  {
    id: 'unforgiveness-1',
    name: '용서하지 못함의 증상',
    questions: [
      '나는 원인을 알 수 없는 깊은 원망과 불만이 있습니다.',
      '나는 사람들과 고립되는 경향이 있습니다.',
      '분노가 안에서 끓어오릅니다.',
      '상처 준 사람에게 갚아줄 생각을 합니다.',
      '불의한 일을 그냥 묻어둡니다.',
      '나 자신을 불쌍하게 여깁니다.',
      '쓴 마음과 분노를 품고 있습니다.',
      '상대방을 변명해줍니다.',
      '나는 가장 불행한 사람이라고 느낍니다.',
      '방어벽 뒤에 숨습니다.',
      '남을 신뢰하지 않습니다.',
      '하나님께 화가 날 때가 있습니다.',
      '문제를 직면하지 않습니다.',
      '과거를 극복하지 못합니다.',
    ],
  },
]);

const jealousyCategories = buildCategories([
  {
    id: 'jealousy-1',
    name: '탐심',
    questions: ['더 많은 것을 얻고자 집착한다.', '다른 지위나 은사를 갈망하며 불만족스럽다.', '가지지 못한 것에 분노를 느낀다.'],
  },
  {
    id: 'jealousy-2',
    name: '질투',
    questions: ['행복한 사람을 보면 속상하다.', '가까운 사람에게서 못 받으면 원망한다.', '질투하는 사람을 무시한다.'],
  },
  {
    id: 'jealousy-3',
    name: '감사 없음',
    questions: ['쉽게 짜증난다.', '부당함에 민감하다.', '감사가 어렵다.', '남들처럼 살고 싶다.'],
  },
  {
    id: 'jealousy-4',
    name: '교만',
    questions: ['내가 더 낫다고 생각한다.', '내가 옳다고 주장한다.', '다른 것을 탐낸다.', '남을 낮추고 싶다.', '남을 깎아내린다.', '자격에 대해 자주 생각한다.'],
  },
  {
    id: 'jealousy-5',
    name: '불신',
    questions: [
      '하나님 말씀을 믿기 어렵다.',
      '성과로 가치가 결정된다.',
      '하나님이 최선을 주신다고 믿지 못한다.',
      '스스로 해결하려 한다.',
      '외모 비교로 불안하다.',
      '남의 것을 부러워한다.',
      '하나님의 사랑을 믿기 어렵다.',
      '다른 사람을 위해 기도하지 않는다.',
    ],
  },
  {
    id: 'jealousy-6',
    name: '열등감',
    questions: [
      '다른 사람을 부러워한다.',
      '비교하며 부족함을 느낀다.',
      '자책한다.',
      '원하는 걸 못 얻으면 낙심한다.',
      '축복을 기뻐하기 어렵다.',
      '남의 축복이 달갑지 않다.',
      '가치 증명 압박이 있다.',
      '재물/관계 비교로 열등감 느낀다.',
    ],
  },
  {
    id: 'jealousy-7',
    name: '다양한 질투 형태',
    questions: ['외모 질투', '능력 질투', '재물 질투', '관계 질투', '직업/성취 질투', '친구 관계 질투', '연인 질투', '배우자 질투', '하나님 축복 질투'],
  },
]);

const controlCategories = buildCategories([
  {
    id: 'control-1',
    name: '통제 행동',
    questions: [
      '나는 다른 사람의 역할에 개입합니다.',
      '불만을 표현하며 상대를 바꾸려 합니다.',
      '목적에 맞게 정보만 전달합니다.',
      '숨은 동기로 행동합니다.',
      '권위를 이용해 이익을 얻으려 합니다.',
    ],
  },
  {
    id: 'control-2',
    name: '통제 성향',
    questions: [
      '주도하고 싶습니다.',
      '조종하려 합니다.',
      '순종하지 않습니다.',
      '강압적입니다.',
      '규칙을 강하게 선호합니다.',
      '자기 의견을 고집합니다.',
      '감정 기복이 큽니다.',
      '대립적입니다.',
      '잘난 체합니다.',
      '진실하지 않습니다.',
    ],
  },
  {
    id: 'control-3',
    name: '관계 속 통제',
    questions: [
      '대화를 주도하려 합니다.',
      '모임에서 주도권을 잡습니다.',
      '관계가 자주 깨집니다.',
      '내가 더 잘 안다고 생각합니다.',
      '다른 사람이 내 일정에 맞추길 원합니다.',
      '조언 듣기 싫습니다.',
      '거절을 두려워합니다.',
      '조용히 있는 것이 어렵습니다.',
      '내 조언을 따르지 않으면 화납니다.',
      '격려를 잘 안 합니다.',
      '인정 못 받으면 화납니다.',
    ],
  },
]);

const entitlementCategories = buildCategories([
  {
    id: 'entitlement-1',
    name: '권리의식 패턴',
    questions: [
      '나는 내 시간 기준이 맞아야 한다고 생각합니다.',
      '나는 편안함을 당연히 누려야 한다고 생각합니다.',
      '외모 기준이 맞아야 한다고 생각합니다.',
      '나는 인정받아야 한다고 생각합니다.',
      '나는 내가 원하는 방식으로 섬기고 싶습니다.',
      '나는 하나님께 묻지 않고 결정합니다.',
      '나는 최상의 상태일 때만 하려고 합니다.',
      '완벽한 팀이 있어야 한다고 생각합니다.',
      '나는 특정 사람만 편애합니다.',
      '나는 감정을 이유로 순종을 미룹니다.',
      '나는 보상을 기대합니다.',
    ],
  }
]);

const instabilityCategories = buildCategories([
  {
    id: 'instability-1',
    name: '건강하지 않은 자의식',
    questions: [
      '나는 다른 사람들이 나를 어떻게 생각할지 자주 걱정한다.',
      '사람들 앞에서 지나치게 긴장한다.',
      '사람들이 내 이야기를 하고 있다고 상상한다.',
      '현실과 분리된 느낌을 받을 때가 있다.'
    ]
  },
  {
    id: 'instability-2',
    name: '가면 착용',
    questions: [
      '나는 과잉 자신감을 보인다.',
      '나는 과도하게 영적인 척한다.',
      '나는 “괜찮다”는 가면을 쓴다.',
      '나는 다른 사람을 비판하며 방어한다.',
      '나는 역할로 나를 정의한다.',
      '나는 피해자 의식을 가진다.',
      '나는 완벽주의로 자신을 숨긴다.',
      '나는 개성을 과하게 강조한다.'
    ]
  },
  {
    id: 'instability-3',
    name: '인정 욕구',
    questions: [
      '나는 자주 자신을 변호한다.',
      '나는 독립성과 자존심이 강하다.',
      '나는 시작하기 전에 포기한다.',
      '나는 패배자 시각으로 말한다.',
      '나는 남 탓을 한다.'
    ]
  },
  {
    id: 'instability-4',
    name: '부정적 감정',
    questions: [
      '나는 다른 사람을 험담한다.',
      '나는 쉽게 좌절한다.',
      '나는 관계를 돌아보며 후회한다.',
      '나는 스스로를 자책한다.',
      '나는 부정적인 미래를 상상한다.'
    ]
  }
]);

export const __TEST_CASES__ = {
  fearCount: fearCategories.reduce((sum, category) => sum + category.questions.length, 0),
  jeongjoijgamCount: jeongjoijgamCategories.reduce((sum, category) => sum + category.questions.length, 0),
  angerCount: angerCategories.reduce((sum, category) => sum + category.questions.length, 0),
  criticalCount: criticalCategories.reduce((sum, category) => sum + category.questions.length, 0),
  appearanceCount: appearanceCategories.reduce((sum, category) => sum + category.questions.length, 0),
  rejectionCount: rejectionCategories.reduce((sum, category) => sum + category.questions.length, 0),
  liesCount: liesCategories.reduce((sum, category) => sum + category.questions.length, 0),
  inferiorityCount: inferiorityCategories.reduce((sum, category) => sum + category.questions.length, 0),
  passivityCount: passivityCategories.reduce((sum, category) => sum + category.questions.length, 0),
  unbeliefCount: unbeliefCategories.reduce((sum, category) => sum + category.questions.length, 0),
  unforgivenessCount: unforgivenessCategories.reduce((sum, category) => sum + category.questions.length, 0),
  jealousyCount: jealousyCategories.reduce((sum, category) => sum + category.questions.length, 0),
  controlCount: controlCategories.reduce((sum, category) => sum + category.questions.length, 0),
  entitlementCount: entitlementCategories.reduce((sum, category) => sum + category.questions.length, 0),
};

function getCategoriesByTopic(topicId) {
  if (topicId === 'fear') return fearCategories;
  if (topicId === 'jeongjoijgam') return jeongjoijgamCategories;
  if (topicId === 'anger') return angerCategories;
  if (topicId === 'critical') return criticalCategories;
  if (topicId === 'appearance') return appearanceCategories;
  if (topicId === 'rejection') return rejectionCategories;
  if (topicId === 'lies') return liesCategories;
  if (topicId === 'inferiority') return inferiorityCategories;
  if (topicId === 'passivity') return passivityCategories;
  if (topicId === 'unbelief') return unbeliefCategories;
  if (topicId === 'unforgiveness') return unforgivenessCategories;
  if (topicId === 'jealousy') return jealousyCategories;
  if (topicId === 'control') return controlCategories;
  if (topicId === 'entitlement') return entitlementCategories;
  if (topicId === 'instability') return instabilityCatego
  return [];
}

function getTopicDisplayTotal(topicId) {
  const catalogItem = topicCatalog.find((topic) => topic.id === topicId);
  const loadedTotal = getCategoriesByTopic(topicId).reduce((sum, category) => sum + category.questions.length, 0);
  return catalogItem?.totalQuestions || loadedTotal;
}

function isAnswered(value) {
  return value === 'yes' || value === 'no';
}

function cardStyle(extra = {}) {
  return {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    ...extra,
  };
}

function buttonStyle(variant = 'solid', disabled = false) {
  return {
    border: variant === 'outline' ? '1px solid #cbd5e1' : '1px solid #111827',
    background: disabled ? '#e5e7eb' : variant === 'outline' ? '#fff' : '#111827',
    color: disabled ? '#94a3b8' : variant === 'outline' ? '#111827' : '#fff',
    borderRadius: 12,
    padding: '10px 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
  };
}

function badgeStyle() {
  return {
    display: 'inline-block',
    padding: '6px 10px',
    background: '#f1f5f9',
    borderRadius: 9999,
    fontSize: 12,
    lineHeight: 1.4,
  };
}

export default function GyeongoJinTestApp() {
  const resultsCaptureRef = useRef(null);
  const [selectedTopicId, setSelectedTopicId] = useState('fear');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [answers, setAnswers] = useState({});

  const filteredCategories = useMemo(() => getCategoriesByTopic(selectedTopicId), [selectedTopicId]);
  const selectedCategory = useMemo(() => filteredCategories.find((category) => category.id === selectedCategoryId) || null, [filteredCategories, selectedCategoryId]);

  const results = useMemo(() => {
    return filteredCategories.map((category) => {
      const totalPossible = category.questions.length;
      const answeredCount = category.questions.filter((q) => isAnswered(answers[q.id])).length;
      const checkedCount = category.questions.filter((q) => answers[q.id] === 'yes').length;
      return {
        ...category,
        totalPossible,
        answeredCount,
        checkedCount,
        percent: totalPossible ? Math.round((checkedCount / totalPossible) * 100) : 0,
      };
    });
  }, [answers, filteredCategories]);

  const topicResults = useMemo(() => {
    return topicCatalog.map((topic) => {
      const categories = getCategoriesByTopic(topic.id);
      const checkedCount = categories.reduce((sum, category) => sum + category.questions.filter((q) => answers[q.id] === 'yes').length, 0);
      const answeredCount = categories.reduce((sum, category) => sum + category.questions.filter((q) => isAnswered(answers[q.id])).length, 0);
      const totalQuestions = getTopicDisplayTotal(topic.id);
      return {
        ...topic,
        totalQuestions,
        checkedCount,
        answeredCount,
        isComplete: totalQuestions > 0 && answeredCount === totalQuestions,
        ratio: totalQuestions ? Math.round((checkedCount / totalQuestions) * 100) : 0,
      };
    });
  }, [answers]);

  const totalQuestions = filteredCategories.reduce((sum, category) => sum + category.questions.length, 0);
  const checkedQuestions = filteredCategories.reduce((sum, category) => sum + category.questions.filter((q) => answers[q.id] === 'yes').length, 0);
  const answeredQuestions = filteredCategories.reduce((sum, category) => sum + category.questions.filter((q) => isAnswered(answers[q.id])).length, 0);
  const topCategory = useMemo(() => (results.length ? [...results].sort((a, b) => b.checkedCount - a.checkedCount)[0] : null), [results]);
  const activeTopic = topicResults.find((topic) => topic.id === selectedTopicId) || null;
  const requiredTopics = topicResults.filter((topic) => topic.totalQuestions > 0);
  const allMajorTopicsComplete = requiredTopics.length > 0 && requiredTopics.every((topic) => topic.answeredCount === topic.totalQuestions);

  const setAnswer = (questionId, value) => setAnswers((prev) => ({ ...prev, [questionId]: value }));
  const resetAll = () => {
    setAnswers({});
    setSelectedTopicId('fear');
    setSelectedCategoryId(null);
    setCurrentScreen('intro');
  };
  const handleStartTest = () => setCurrentScreen('topic');
  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setSelectedCategoryId(null);
    setCurrentScreen('category');
  };
  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentScreen('questions');
  };
  const goToTopicScreen = () => {
    setSelectedCategoryId(null);
    setCurrentScreen('topic');
  };
  const goToCategoryScreen = () => setCurrentScreen('category');
  const goToResultsScreen = () => setCurrentScreen('results');
  const goToTopicCategoriesFromResults = (topicId) => {
    setSelectedTopicId(topicId);
    setSelectedCategoryId(null);
    setCurrentScreen('category');
  };

  const handleSaveResultsImage = async () => {
    if (!resultsCaptureRef.current || !allMajorTopicsComplete) return;
    try {
      const dataUrl = await htmlToImage.toPng(resultsCaptureRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = 'gyeongojin-test-result.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert('이미지 저장에 실패했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 16, fontFamily: 'system-ui, sans-serif', color: '#111827' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>견고한 진 테스트</h1>
          <button type="button" onClick={resetAll} style={buttonStyle('outline')}>초기화</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <div style={cardStyle({ padding: 14 })}>해당됨 {checkedQuestions}/{totalQuestions}</div>
          <div style={cardStyle({ padding: 14 })}>응답 {answeredQuestions}/{totalQuestions}</div>
          <div style={cardStyle({ padding: 14 })}>{topCategory?.name || '-'}</div>
        </div>

        <div style={cardStyle({ padding: 20 })}>
          <h2 style={{ marginTop: 0 }}>
            {currentScreen === 'intro' && '시작'}
            {currentScreen === 'topic' && '주제 선택'}
            {currentScreen === 'category' && '세부 항목'}
            {currentScreen === 'questions' && '문항'}
            {currentScreen === 'results' && '결과'}
          </h2>

          {currentScreen === 'intro' && (
              <button type="button" onClick={handleStartTest} style={{ ...buttonStyle(), width: '100%' }}>테스트 시작</button>
          )}

          {currentScreen === 'topic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {topicResults.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic.id)}
                  style={{
                    ...cardStyle({ padding: 14, cursor: 'pointer', background: topic.isComplete ? '#f1f5f9' : '#fff', opacity: topic.isComplete ? 0.7 : 1 }),
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{topic.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>문항 수 {topic.totalQuestions || '-'}개</div>
                    </div>
                    <div style={badgeStyle()}>
                      응답 <span style={{ color: topic.answeredCount < topic.totalQuestions ? '#ef4444' : 'inherit', fontWeight: topic.answeredCount < topic.totalQuestions ? 700 : 400 }}>{topic.answeredCount}/{topic.totalQuestions}</span>
                      {' '}· 해당 {topic.checkedCount}/{topic.totalQuestions}
                    </div>
                  </div>
                </button>
              ))}
              <button type="button" onClick={goToResultsScreen} style={{ ...buttonStyle(), width: '100%' }}>결과 보기</button>
            </div>
          )}

          {currentScreen === 'category' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button type="button" onClick={goToTopicScreen} style={buttonStyle('outline')}>뒤로</button>
              {filteredCategories.map((category) => {
                const answered = category.questions.filter((q) => isAnswered(answers[q.id])).length;
                const checked = category.questions.filter((q) => answers[q.id] === 'yes').length;
                const completed = answered === category.questions.length;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleSelectCategory(category.id)}
                    style={{
                      ...cardStyle({ padding: 14, cursor: 'pointer', background: completed ? '#f1f5f9' : '#fff', opacity: completed ? 0.7 : 1 }),
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700 }}>{category.name}</span>
                      <div style={badgeStyle()}>
                        응답 <span style={{ color: answered < category.questions.length ? '#ef4444' : 'inherit', fontWeight: answered < category.questions.length ? 700 : 400 }}>{answered}/{category.questions.length}</span>
                        {' '}· 해당 {checked}/{category.questions.length}
                      </div>
                    </div>
                  </button>
                );
              })}
              <button type="button" onClick={goToResultsScreen} style={{ ...buttonStyle(), width: '100%' }}>결과 보기</button>
            </div>
          )}

          {currentScreen === 'questions' && selectedCategory && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button type="button" onClick={goToCategoryScreen} style={buttonStyle('outline')}>뒤로</button>
              <div style={cardStyle({ padding: 14, background: '#f8fafc' })}>
                현재 항목 진행: 응답 {selectedCategory.questions.filter((q) => isAnswered(answers[q.id])).length}/{selectedCategory.questions.length}
                {' '}· 해당됨 {selectedCategory.questions.filter((q) => answers[q.id] === 'yes').length}/{selectedCategory.questions.length}
              </div>
              {selectedCategory.questions.map((question) => {
                const answered = isAnswered(answers[question.id]);
                return (
                  <div key={question.id} style={cardStyle({ padding: 14, background: answered ? '#f1f5f9' : '#fff', opacity: answered ? 0.75 : 1 })}>
                    <div style={{ marginBottom: 12, lineHeight: 1.6 }}>{question.text}</div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="radio" name={question.id} value="no" checked={answers[question.id] === 'no'} onChange={() => setAnswer(question.id, 'no')} />
                        해당없음
                      </label>
                      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="radio" name={question.id} value="yes" checked={answers[question.id] === 'yes'} onChange={() => setAnswer(question.id, 'yes')} />
                        해당됨
                      </label>
                    </div>
                  </div>
                );
              })}
              <button type="button" onClick={goToCategoryScreen} style={{ ...buttonStyle(), width: '100%' }}>목록으로</button>
            </div>
          )}

          {currentScreen === 'results' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" onClick={goToTopicScreen} style={buttonStyle('outline')}>뒤로</button>
                <button type="button" onClick={handleSaveResultsImage} disabled={!allMajorTopicsComplete} style={buttonStyle('solid', !allMajorTopicsComplete)}>결과 이미지 저장</button>
              </div>
              <div ref={resultsCaptureRef} style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#fff', borderRadius: 16 }}>
                <div style={{ overflowX: 'auto', ...cardStyle() }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                    <thead style={{ background: '#f1f5f9' }}>
                      <tr>
                        <th style={{ padding: 12, textAlign: 'left' }}>번호</th>
                        <th style={{ padding: 12, textAlign: 'left' }}>견고한 진</th>
                        <th style={{ padding: 12, textAlign: 'left' }}>테스트 문항 수</th>
                        <th style={{ padding: 12, textAlign: 'left' }}>나에게 해당되는 수</th>
                        <th style={{ padding: 12, textAlign: 'left' }}>비율</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topicResults.map((topic) => {
                        const incomplete = topic.answeredCount < topic.totalQuestions;
                        return (
                          <tr key={topic.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                            <td style={{ padding: 12 }}>{topic.order}</td>
                            <td style={{ padding: 12, color: incomplete ? '#ef4444' : '#9ca3af', fontWeight: 700 }}>
                              {incomplete ? (
                                <button
                                  type="button"
                                  onClick={() => goToTopicCategoriesFromResults(topic.id)}
                                  style={{ background: 'none', border: 'none', padding: 0, color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700 }}
                                >
                                  {topic.name} <span style={{ fontSize: 12 }}>(미완료)</span>
                                </button>
                              ) : (
                                <span>{topic.name} <span style={{ fontSize: 12 }}>(완료)</span></span>
                              )}
                            </td>
                            <td style={{ padding: 12 }}>{topic.totalQuestions || '-'}</td>
                            <td style={{ padding: 12, color: incomplete ? '#ef4444' : 'inherit', fontWeight: incomplete ? 700 : 400 }}>{topic.checkedCount}</td>
                            <td style={{ padding: 12 }}>{topic.totalQuestions ? `${topic.ratio}%` : '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {!allMajorTopicsComplete && (
                  <div style={{ ...cardStyle({ padding: 14, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }) }}>
                    아직 모든 테스트 응답이 끝나지 않아서 이미지 저장은 잠겨 있어요.
                  </div>
                )}
                {allMajorTopicsComplete && (
                  <div style={{ ...cardStyle({ padding: 14, background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857' }) }}>
                    모든 테스트 응답이 완료됐어요. 결과 이미지를 휴대폰에 저장할 수 있습니다.
                  </div>
                )}
                <div style={cardStyle({ padding: 14 })}>
                  현재 주제 합계: 해당됨 {activeTopic?.checkedCount ?? 0}/{activeTopic?.totalQuestions ?? 0}
                  {' '}· 해당 비율 {activeTopic?.ratio ?? 0}% · 응답{' '}
                  <span style={{ color: (activeTopic?.answeredCount ?? 0) < (activeTopic?.totalQuestions ?? 0) ? '#ef4444' : 'inherit', fontWeight: (activeTopic?.answeredCount ?? 0) < (activeTopic?.totalQuestions ?? 0) ? 700 : 400 }}>
                    {activeTopic?.answeredCount ?? 0}/{activeTopic?.totalQuestions ?? 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
