/**
 * 학급관리 웹 앱 초기 데이터 (20명 학생, 1인 1역, 기본 상점 품목, 기본 미션)
 */

export const INITIAL_ROLES = [
  { id: 'role-1', name: '칠판 지우미', icon: '🧹', desc: '쉬는 시간마다 칠판을 깨끗하게 닦고 분필 가루 털기' },
  { id: 'role-2', name: '우유 급식 도우미', icon: '🥛', desc: '아침 우유 배부하고 남은 우유 상자 정리하기' },
  { id: 'role-3', name: '줄반장', icon: '🚶‍♂️', desc: '급식실 및 이동 수업 갈 때 줄 반듯하게 세우기' },
  { id: 'role-4', name: '에너지 지킴이', icon: '💡', desc: '교실 비울 때 전등 끄기, 에어컨/히터 온도 관리' },
  { id: 'role-5', name: '도서 도우미', icon: '📚', desc: '학급 문고 책장 정리하고 빌려간 책 제자리에 꽂기' },
  { id: 'role-6', name: '환기 지킴이', icon: '🪟', desc: '중간 놀이 시간 및 점심시간에 창문 열어 환기하기' },
  { id: 'role-7', name: '식물 돌보미', icon: '🌱', desc: '교실 화분에 주기적으로 물 주고 시든 잎 정리하기' },
  { id: 'role-8', name: '분리수거 도우미', icon: '♻️', desc: '종이류와 플라스틱 분리배출함 바르게 정리하기' },
  { id: 'role-9', name: '학습지 도우미', icon: '📑', desc: '수업 시간 활동지 및 유인물 모둠별로 배부하기' },
  { id: 'role-10', name: '칭찬 배달원', icon: '💌', desc: '친구들의 칭찬 쪽지를 칭찬 우체통에서 꺼내 전달하기' },
  { id: 'role-11', name: '신발장 지킴이', icon: '👟', desc: '신발장 실내화와 신발이 가지런한지 확인하기' },
  { id: 'role-12', name: '체육 도우미', icon: '⚽', desc: '체육 시간 공과 운동 기구 챙기고 정리하기' },
  { id: 'role-13', name: '시간 알리미', icon: '⏰', desc: '수업 시작 2분 전 친구들에게 자리에 앉도록 알리기' },
  { id: 'role-14', name: '방역 지킴이', icon: '🧼', desc: '점심시간 전 손 씻기 및 손 소독제 정리하기' },
  { id: 'role-15', name: '음악 도우미', icon: '🎵', desc: '음악 시간 악기 상자 챙기고 제자리에 정리하기' },
  { id: 'role-16', name: '미술 도우미', icon: '🎨', desc: '미술 활동 후 교실 바닥 정리 및 물통 씻기 돕기' },
  { id: 'role-17', name: '환경 지킴이', icon: '🗑️', desc: '교실 바닥에 떨어진 쓰레기 줍고 정리 솔선수범하기' },
  { id: 'role-18', name: '문단속 도우미', icon: '🔑', desc: '하교 시 교실 앞문과 뒷문 잠겼는지 확인하기' },
  { id: 'role-19', name: '게시판 도우미', icon: '📌', desc: '학급 게시판 작품 및 안내장 가지런히 고정하기' },
  { id: 'role-20', name: '스마일 알리미', icon: '😊', desc: '하루 시작할 때 친구들에게 밝은 미소로 인사 건네기' }
];

export const LEVEL_TIERS = [
  { level: 1, name: '새싹 탐험가', minSmiles: 0, maxSmiles: 19, badge: '🌱', color: '#10B981' },
  { level: 2, name: '성장하는 모험가', minSmiles: 20, maxSmiles: 49, badge: '🌿', color: '#06B6D4' },
  { level: 3, name: '열정의 열매', minSmiles: 50, maxSmiles: 99, badge: '🍎', color: '#F59E0B' },
  { level: 4, name: '학급의 달인', minSmiles: 100, maxSmiles: 199, badge: '⭐', color: '#8B5CF6' },
  { level: 5, name: '스마일 마스터', minSmiles: 200, maxSmiles: 9999, badge: '👑', color: '#EC4899' }
];

export const INITIAL_STUDENTS = [
  { id: 's-1', no: 1, name: '김민준', avatar: '🦁', coins: 180, smiles: 28, roleId: 'role-1', roleCompleted: false },
  { id: 's-2', no: 2, name: '이서아', avatar: '🐰', coins: 250, smiles: 55, roleId: 'role-2', roleCompleted: true },
  { id: 's-3', no: 3, name: '박도윤', avatar: '🐯', coins: 120, smiles: 18, roleId: 'role-3', roleCompleted: false },
  { id: 's-4', no: 4, name: '정하은', avatar: '🦊', coins: 310, smiles: 72, roleId: 'role-4', roleCompleted: true },
  { id: 's-5', no: 5, name: '최지호', avatar: '🐼', coins: 150, smiles: 25, roleId: 'role-5', roleCompleted: false },
  { id: 's-6', no: 6, name: '윤아인', avatar: '🐨', coins: 220, smiles: 44, roleId: 'role-6', roleCompleted: false },
  { id: 's-7', no: 7, name: '한시우', avatar: '🐶', coins: 190, smiles: 36, roleId: 'role-7', roleCompleted: true },
  { id: 's-8', no: 8, name: '송지우', avatar: '🐱', coins: 280, smiles: 63, roleId: 'role-8', roleCompleted: false },
  { id: 's-9', no: 9, name: '강유준', avatar: '🐻', coins: 140, smiles: 22, roleId: 'role-9', roleCompleted: false },
  { id: 's-10', no: 10, name: '조은서', avatar: '🐸', coins: 300, smiles: 68, roleId: 'role-10', roleCompleted: true },
  { id: 's-11', no: 11, name: '오민서', avatar: '🦄', coins: 210, smiles: 40, roleId: 'role-11', roleCompleted: false },
  { id: 's-12', no: 12, name: '배현우', avatar: '🐵', coins: 170, smiles: 30, roleId: 'role-12', roleCompleted: false },
  { id: 's-13', no: 13, name: '백소율', avatar: '🐹', coins: 260, smiles: 52, roleId: 'role-13', roleCompleted: true },
  { id: 's-14', no: 14, name: '유서진', avatar: '🐧', coins: 190, smiles: 35, roleId: 'role-14', roleCompleted: false },
  { id: 's-15', no: 15, name: '임예준', avatar: '🐤', coins: 130, smiles: 19, roleId: 'role-15', roleCompleted: false },
  { id: 's-16', no: 16, name: '황채원', avatar: '🦔', coins: 240, smiles: 48, roleId: 'role-16', roleCompleted: true },
  { id: 's-17', no: 17, name: '신은우', avatar: '🐿️', coins: 200, smiles: 38, roleId: 'role-17', roleCompleted: false },
  { id: 's-18', no: 18, name: '안서윤', avatar: '🦭', coins: 290, smiles: 65, roleId: 'role-18', roleCompleted: false },
  { id: 's-19', no: 19, name: '류하준', avatar: '🐺', coins: 160, smiles: 26, roleId: 'role-19', roleCompleted: false },
  { id: 's-20', no: 20, name: '문지안', avatar: '🦉', coins: 330, smiles: 85, roleId: 'role-20', roleCompleted: true }
];

export const INITIAL_SHOP_ITEMS = [
  {
    id: 'item-1',
    name: '하루 원하는 자리 앉기 쿠폰',
    category: 'coupon',
    icon: '🪑',
    price: 150,
    stock: 5,
    desc: '하루 동안 내가 원하는 빈자리나 단짝 친구 옆자리 앉기'
  },
  {
    id: 'item-2',
    name: '급식 1등 줄서기 쿠폰',
    category: 'coupon',
    icon: '🍱',
    price: 100,
    stock: 8,
    desc: '오늘 급식 시간에 가장 먼저 줄 설 수 있는 특별 우선권'
  },
  {
    id: 'item-3',
    name: '선생님과 1:1 보드게임 10분',
    category: 'coupon',
    icon: '🎲',
    price: 200,
    stock: 3,
    desc: '중간 놀이 시간에 선생님과 좋아하는 보드게임 한 판 즐기기'
  },
  {
    id: 'item-4',
    name: '숙제 1회 면제권 (일기 1회)',
    category: 'coupon',
    icon: '✨',
    price: 250,
    stock: 4,
    desc: '주말 일기 1회 면제 (단, 알림장은 꼭 쓰기!)'
  },
  {
    id: 'item-5',
    name: '폭신폭신 캐릭터 지우개',
    category: 'goods',
    icon: '🧸',
    price: 80,
    stock: 12,
    desc: '귀여운 동물 모양 말랑말랑 지우개 실물 선물'
  },
  {
    id: 'item-6',
    name: '반짝반짝 홀로그램 스티커',
    category: 'goods',
    icon: '🌟',
    price: 60,
    stock: 15,
    desc: '필통이나 공책을 꾸밀 수 있는 반짝이 스티커 팩'
  },
  {
    id: 'item-7',
    name: '아침 음악 선곡권',
    category: 'coupon',
    icon: '🎧',
    price: 120,
    stock: 6,
    desc: '아침 자습 시간에 내가 추천한 신나는 동요/클래식 틀어주기'
  },
  {
    id: 'item-8',
    name: '알록달록 형광펜 세트',
    category: 'goods',
    icon: '🖍️',
    price: 140,
    stock: 7,
    desc: '공부할 때 중요한 곳을 칠하는 파스텔톤 형광펜 세트'
  }
];

export const INITIAL_DAILY_MISSIONS = [
  { id: 'mission-1', title: '아침 독서 10분 몰입하기', icon: '📖', rewardSmiles: 2, rewardCoins: 10 },
  { id: 'mission-2', title: '책상 위와 서랍 깨끗이 정리하기', icon: '🧹', rewardSmiles: 1, rewardCoins: 5 },
  { id: 'mission-3', title: '친구에게 고운 말 & 따뜻한 칭찬하기', icon: '💖', rewardSmiles: 2, rewardCoins: 10 }
];

export const REASON_PRESETS = [
  { label: '발표 적극 참여', coins: 20, smiles: 3 },
  { label: '친구 배려 및 도움', coins: 30, smiles: 5 },
  { label: '교실 청소 성실히', coins: 25, smiles: 4 },
  { label: '1인 1역 완벽 수행', coins: 30, smiles: 5 },
  { label: '과제 및 일기 제출 우수', coins: 20, smiles: 3 },
  { label: '급식 골고루 다 먹기', coins: 15, smiles: 2 }
];

export const DEDUCT_REASON_PRESETS = [
  { label: '수업 중 딴짓/규칙 위반', coins: 15 },
  { label: '친구와 다툼/비속어 사용', coins: 25 },
  { label: '1인 1역 깜빡 잊음', coins: 15 },
  { label: '정리정돈 미흡', coins: 10 }
];
