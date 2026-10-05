/**
 * ==========================================================================
 * 초등 3학년 학급경영 & 게이미피케이션 웹 앱 통합 스크립트 (app.js)
 * 파일 더블클릭(file://) 및 웹 서버(http://) 환경 모두 완벽 지원
 * 
 * - 학생/교사 개별 분리 로그인 지원
 * - 화폐 단위: '스마일' (🪙)
 * - 성장 지표: '레벨 포인트 / EXP' (⭐)
 * - 1인 1역할 교사 직접 편집 & 주간 배정 지원
 * ==========================================================================
 */

// ================= 1. 초기 데이터 정의 =================
const INITIAL_ROLES = [
  { id: 'role-1', name: '칠판 지우미', icon: '🧹', desc: '쉬는 시간마다 칠판을 깨끗하게 닦고 분필 가루 털기' },
  { id: 'role-2', name: '우유 급식 도우미', icon: '🥛', desc: '아침 우유 배부하고 남은 우유 상자 정리하기' },
  { id: 'role-3', name: '줄반장', icon: '🚶‍♂️', desc: '급식실 및 이동 수업 갈 때 줄 반듯하게 세우기' },
  { id: 'role-4', name: '에너지 지킴이', icon: '💡', desc: '교실 비울 때 전등 끄기, 에어컨/히터 전원 관리' },
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
  { id: 'role-20', name: '인사 알리미', icon: '😊', desc: '하루 시작할 때 친구들에게 밝은 미소로 반갑게 인사하기' }
];

const LEVEL_TIERS = [
  { level: 1, name: '새싹 탐험가', minExp: 0, maxExp: 19, badge: '🌱', color: '#10B981' },
  { level: 2, name: '성장하는 모험가', minExp: 20, maxExp: 49, badge: '🌿', color: '#06B6D4' },
  { level: 3, name: '열정의 열매', minExp: 50, maxExp: 99, badge: '🍎', color: '#F59E0B' },
  { level: 4, name: '학급의 달인', minExp: 100, maxExp: 199, badge: '⭐', color: '#8B5CF6' },
  { level: 5, name: '최고 레벨 마스터', minExp: 200, maxExp: 9999, badge: '👑', color: '#EC4899' }
];

const INITIAL_STUDENTS = [
  { id: 's-1', no: 1, name: '김민준', avatar: '🦁', coins: 180, exp: 28, roleId: 'role-1', roleCompleted: false },
  { id: 's-2', no: 2, name: '이서아', avatar: '🐰', coins: 250, exp: 55, roleId: 'role-2', roleCompleted: true },
  { id: 's-3', no: 3, name: '박도윤', avatar: '🐯', coins: 120, exp: 18, roleId: 'role-3', roleCompleted: false },
  { id: 's-4', no: 4, name: '정하은', avatar: '🦊', coins: 310, exp: 72, roleId: 'role-4', roleCompleted: true },
  { id: 's-5', no: 5, name: '최지호', avatar: '🐼', coins: 150, exp: 25, roleId: 'role-5', roleCompleted: false },
  { id: 's-6', no: 6, name: '윤아인', avatar: '🐨', coins: 220, exp: 44, roleId: 'role-6', roleCompleted: false },
  { id: 's-7', no: 7, name: '한시우', avatar: '🐶', coins: 190, exp: 36, roleId: 'role-7', roleCompleted: true },
  { id: 's-8', no: 8, name: '송지우', avatar: '🐱', coins: 280, exp: 63, roleId: 'role-8', roleCompleted: false },
  { id: 's-9', no: 9, name: '강유준', avatar: '🐻', coins: 140, exp: 22, roleId: 'role-9', roleCompleted: false },
  { id: 's-10', no: 10, name: '조은서', avatar: '🐸', coins: 300, exp: 68, roleId: 'role-10', roleCompleted: true },
  { id: 's-11', no: 11, name: '오민서', avatar: '🦄', coins: 210, exp: 40, roleId: 'role-11', roleCompleted: false },
  { id: 's-12', no: 12, name: '배현우', avatar: '🐵', coins: 170, exp: 30, roleId: 'role-12', roleCompleted: false },
  { id: 's-13', no: 13, name: '백소율', avatar: '🐹', coins: 260, exp: 52, roleId: 'role-13', roleCompleted: true },
  { id: 's-14', no: 14, name: '유서진', avatar: '🐧', coins: 190, exp: 35, roleId: 'role-14', roleCompleted: false },
  { id: 's-15', no: 15, name: '임예준', avatar: '🐤', coins: 130, exp: 19, roleId: 'role-15', roleCompleted: false },
  { id: 's-16', no: 16, name: '황채원', avatar: '🦔', coins: 240, exp: 48, roleId: 'role-16', roleCompleted: true },
  { id: 's-17', no: 17, name: '신은우', avatar: '🐿️', coins: 200, exp: 38, roleId: 'role-17', roleCompleted: false },
  { id: 's-18', no: 18, name: '안서윤', avatar: '🦭', coins: 290, exp: 65, roleId: 'role-18', roleCompleted: false },
  { id: 's-19', no: 19, name: '류하준', avatar: '🐺', coins: 160, exp: 26, roleId: 'role-19', roleCompleted: false },
  { id: 's-20', no: 20, name: '문지안', avatar: '🦉', coins: 330, exp: 85, roleId: 'role-20', roleCompleted: true }
];

const INITIAL_SHOP_ITEMS = [
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

const INITIAL_DAILY_MISSIONS = [
  { id: 'mission-1', title: '아침 독서 10분 몰입하기', icon: '📖', rewardExp: 2, rewardCoins: 10 },
  { id: 'mission-2', title: '책상 위와 서랍 깨끗이 정리하기', icon: '🧹', rewardExp: 1, rewardCoins: 5 },
  { id: 'mission-3', title: '친구에게 고운 말 & 따뜻한 칭찬하기', icon: '💖', rewardExp: 2, rewardCoins: 10 }
];

const REASON_PRESETS = [
  { label: '발표 적극 참여', coins: 20, exp: 3 },
  { label: '친구 배려 및 도움', coins: 30, exp: 5 },
  { label: '교실 청소 성실히', coins: 25, exp: 4 },
  { label: '1인 1역 완벽 수행', coins: 30, exp: 5 },
  { label: '과제 및 일기 제출 우수', coins: 20, exp: 3 },
  { label: '급식 골고루 다 먹기', coins: 15, exp: 2 }
];

const DEDUCT_REASON_PRESETS = [
  { label: '수업 중 딴짓/규칙 위반', coins: 15 },
  { label: '친구와 다툼/비속어 사용', coins: 25 },
  { label: '1인 1역 깜빡 잊음', coins: 15 },
  { label: '정리정돈 미흡', coins: 10 }
];

// ================= 2. 컨페티(꽃가루 폭죽) 모듈 =================
function fireConfetti(options = {}) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6', '#F43F5E'];
  const particleCount = options.count || 80;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: options.x !== undefined ? options.x : canvas.width * 0.5,
      y: options.y !== undefined ? options.y : canvas.height * 0.4,
      w: Math.random() * 8 + 6,
      h: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      gravity: 0.35,
      opacity: 1
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let aliveCount = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRotation;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        aliveCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (aliveCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}

// ================= 3. 레벨 계산 및 스토리지 매니저 =================
const STORAGE_KEY = 'CLASS_ECONOMY_APP_STATE_V2';

function calculateLevel(exp) {
  const currentExp = Number(exp) || 0;
  let currentTier = LEVEL_TIERS[0];
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (currentExp >= LEVEL_TIERS[i].minExp) {
      currentTier = LEVEL_TIERS[i];
      break;
    }
  }

  const nextTier = LEVEL_TIERS.find(t => t.level === currentTier.level + 1);
  let progressPercent = 100;
  let remainingExp = 0;

  if (nextTier) {
    const range = nextTier.minExp - currentTier.minExp;
    const currentProgress = currentExp - currentTier.minExp;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
    remainingExp = nextTier.minExp - currentExp;
  }

  return {
    level: currentTier.level,
    name: currentTier.name,
    badge: currentTier.badge,
    color: currentTier.color,
    progressPercent,
    remainingExp,
    nextLevelMinExp: nextTier ? nextTier.minExp : null,
    isMaxLevel: !nextTier
  };
}

function getInitialState() {
  const studentMissionStatus = {};
  INITIAL_STUDENTS.forEach(s => {
    studentMissionStatus[s.id] = {
      'mission-1': Math.random() > 0.5,
      'mission-2': Math.random() > 0.5,
      'mission-3': false
    };
  });

  const initialRequests = [
    {
      id: 'req-1',
      studentId: 's-2',
      studentName: '이서아',
      itemId: 'item-1',
      itemName: '하루 원하는 자리 앉기 쿠폰',
      itemIcon: '🪑',
      price: 150,
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      status: 'pending'
    },
    {
      id: 'req-2',
      studentId: 's-4',
      studentName: '정하은',
      itemId: 'item-2',
      itemName: '급식 1등 줄서기 쿠폰',
      itemIcon: '🍱',
      price: 100,
      timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
      status: 'pending'
    },
    {
      id: 'req-3',
      studentId: 's-10',
      studentName: '조은서',
      itemId: 'item-6',
      itemName: '반짝반짝 홀로그램 스티커',
      itemIcon: '🌟',
      price: 60,
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      status: 'approved'
    }
  ];

  const initialLogs = [
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      type: 'grant',
      target: '김민준',
      coins: 20,
      exp: 3,
      reason: '수업 발표 적극 참여'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      type: 'grant',
      target: '이서아',
      coins: 30,
      exp: 5,
      reason: '1인 1역(우유 급식) 성실 수행'
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      type: 'shop',
      target: '조은서',
      coins: -60,
      exp: 0,
      reason: '상점 구매 승인 [반짝반짝 홀로그램 스티커]'
    }
  ];

  return {
    version: '2.0',
    currentUser: null, // null | { role: 'teacher' } | { role: 'student', studentId: 's-1' }
    teacherPin: '0000',
    previewStudentId: null, // 교사가 학생 화면 미리보기 중일 때 사용
    students: INITIAL_STUDENTS,
    roles: INITIAL_ROLES,
    shopItems: INITIAL_SHOP_ITEMS,
    missions: INITIAL_DAILY_MISSIONS,
    studentMissionStatus,
    purchaseRequests: initialRequests,
    activityLogs: initialLogs,
    weekInfo: '10월 2주차'
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const state = getInitialState();
      saveState(state);
      return state;
    }
    const parsed = JSON.parse(raw);

    // 하위 호환성 및 보정
    if (parsed.students) {
      parsed.students.forEach(s => {
        if (s.exp === undefined && s.smiles !== undefined) {
          s.exp = s.smiles;
        }
      });
    }
    if (!parsed.teacherPin) {
      parsed.teacherPin = '0000';
    }
    if (!parsed.roles || parsed.roles.length === 0) {
      parsed.roles = INITIAL_ROLES;
    }

    return parsed;
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return getInitialState();
  }
}

function saveState(stateObj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

function resetState() {
  const initial = getInitialState();
  saveState(initial);
  return initial;
}

// ================= 4. 앱 전역 상태 및 UI 헬퍼 =================
let state = loadState();
let selectedStudentForModal = null;
let currentRoleEditList = []; // 1인 1역 모달 내 편집용 임시 버퍼

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '🎉' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : '💡';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px) scale(0.95)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
}

function initModalEvents() {
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = e.currentTarget.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

// ================= 5. 분리 로그인 및 뷰 제어 시스템 =================
function initAuthAndViews() {
  const btnLogout = document.getElementById('btn-logout');
  const brandLogo = document.getElementById('brand-logo');
  const btnReturnTeacher = document.getElementById('btn-return-teacher-view');

  // 로그인 탭 전환 (학생 로그인 vs 교사 로그인)
  const tabStudent = document.getElementById('tab-login-student');
  const tabTeacher = document.getElementById('tab-login-teacher');
  const panelStudent = document.getElementById('panel-login-student');
  const panelTeacher = document.getElementById('panel-login-teacher');

  if (tabStudent && tabTeacher) {
    tabStudent.addEventListener('click', () => {
      tabStudent.classList.add('active');
      tabTeacher.classList.remove('active');
      panelStudent.style.display = 'block';
      panelTeacher.style.display = 'none';
    });

    tabTeacher.addEventListener('click', () => {
      tabTeacher.classList.add('active');
      tabStudent.classList.remove('active');
      panelStudent.style.display = 'none';
      panelTeacher.style.display = 'block';
      const pwInput = document.getElementById('input-teacher-pw');
      if (pwInput) pwInput.focus();
    });
  }

  // 교사 로그인 폼 제출
  const formTeacherLogin = document.getElementById('form-teacher-login');
  if (formTeacherLogin) {
    formTeacherLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwInput = document.getElementById('input-teacher-pw');
      const enteredPw = (pwInput ? pwInput.value : '').trim();

      if (enteredPw === state.teacherPin) {
        state.currentUser = { role: 'teacher' };
        state.previewStudentId = null;
        saveState(state);
        if (pwInput) pwInput.value = '';
        fireConfetti({ count: 60 });
        showToast('👩‍🏫 선생님 환영합니다! 교사 관리자 모드로 접속했습니다.', 'success');
        updateAppView();
      } else {
        showToast('비밀번호가 올바르지 않습니다. (초기 비밀번호: 0000)', 'error');
        if (pwInput) {
          pwInput.value = '';
          pwInput.focus();
        }
      }
    });
  }

  // 학생 20명 로그인 타일 그리드 렌더링
  renderStudentLoginGrid();

  // 로그아웃 버튼
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('로그아웃하고 로그인 선택 화면으로 이동할까요?')) {
        state.currentUser = null;
        state.previewStudentId = null;
        saveState(state);
        updateAppView();
        showToast('로그아웃되었습니다.', 'info');
      }
    });
  }

  // 교사 학생화면 미리보기 복귀 버튼
  if (btnReturnTeacher) {
    btnReturnTeacher.addEventListener('click', () => {
      state.previewStudentId = null;
      saveState(state);
      updateAppView();
      showToast('선생님 화면으로 복귀했습니다.', 'info');
    });
  }

  // 로고 클릭 시 기본 홈으로
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      if (state.currentUser?.role === 'teacher') {
        state.previewStudentId = null;
        saveState(state);
        updateAppView();
      }
    });
  }

  // 초기 뷰 업데이트 실행
  updateAppView();
}

function renderStudentLoginGrid() {
  const container = document.getElementById('student-login-grid-container');
  if (!container) return;

  container.innerHTML = '';
  state.students.forEach(student => {
    const levelInfo = calculateLevel(student.exp);
    const item = document.createElement('div');
    item.className = 'student-login-item';
    item.innerHTML = `
      <span class="student-login-no">${student.no}번</span>
      <span class="student-login-avatar">${student.avatar}</span>
      <span class="student-login-name">${student.name}</span>
      <span style="font-size: 11px; color: ${levelInfo.color}; font-weight: 700;">Lv.${levelInfo.level} ${levelInfo.name}</span>
    `;

    item.addEventListener('click', () => {
      state.currentUser = { role: 'student', studentId: student.id };
      state.previewStudentId = null;
      saveState(state);
      fireConfetti({ count: 70 });
      showToast(`🎒 ${student.no}번 ${student.name} 어린이 환영해요!`, 'success');
      updateAppView();
    });

    container.appendChild(item);
  });
}

function updateAppView() {
  const viewLogin = document.getElementById('view-login');
  const viewTeacher = document.getElementById('view-teacher');
  const viewStudent = document.getElementById('view-student');
  const sessionBadge = document.getElementById('session-user-badge');
  const btnLogout = document.getElementById('btn-logout');
  const bannerPreview = document.getElementById('banner-teacher-preview');

  // 1. 미로그인 상태
  if (!state.currentUser) {
    viewLogin.style.display = 'block';
    viewTeacher.style.display = 'none';
    viewStudent.style.display = 'none';
    if (bannerPreview) bannerPreview.style.display = 'none';

    sessionBadge.className = 'user-badge-pill';
    sessionBadge.innerHTML = '<span>🔒</span><span>로그인이 필요합니다</span>';
    btnLogout.style.display = 'none';

    renderStudentLoginGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // 2. 로그인 상태
  viewLogin.style.display = 'none';
  btnLogout.style.display = 'inline-flex';

  // 2-A. 교사(관리자) 로그인
  if (state.currentUser.role === 'teacher') {
    // 교사가 학생 화면 미리보기 중인 경우
    if (state.previewStudentId) {
      viewTeacher.style.display = 'none';
      viewStudent.style.display = 'block';
      if (bannerPreview) bannerPreview.style.display = 'flex';

      const previewStudent = state.students.find(s => s.id === state.previewStudentId);
      sessionBadge.className = 'user-badge-pill teacher';
      sessionBadge.innerHTML = `<span>👩‍🏫</span><span>선생님 (미리보기: ${previewStudent ? previewStudent.name : ''})</span>`;
      renderStudentDashboard(state.previewStudentId);
    } else {
      // 일반 교사 대시보드
      viewTeacher.style.display = 'block';
      viewStudent.style.display = 'none';
      if (bannerPreview) bannerPreview.style.display = 'none';

      sessionBadge.className = 'user-badge-pill teacher';
      sessionBadge.innerHTML = '<span>👩‍🏫</span><span>선생님 (관리자) 접속 중</span>';
      renderTeacherDashboard();
    }
  } 
  // 2-B. 학생 로그인
  else if (state.currentUser.role === 'student') {
    viewTeacher.style.display = 'none';
    viewStudent.style.display = 'block';
    if (bannerPreview) bannerPreview.style.display = 'none';

    const currentStudent = state.students.find(s => s.id === state.currentUser.studentId) || state.students[0];
    sessionBadge.className = 'user-badge-pill student';
    sessionBadge.innerHTML = `<span>🎒</span><span>${currentStudent.no}번 ${currentStudent.avatar} ${currentStudent.name} 어린이</span>`;
    renderStudentDashboard(currentStudent.id);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================= 6. 교사 대시보드 렌더링 =================
function renderTeacherDashboard() {
  renderTeacherStats();
  renderPendingApprovals();
  renderStudentsGrid();
}

function renderTeacherStats() {
  const totalStudents = state.students.length;
  const totalCoins = state.students.reduce((acc, cur) => acc + (cur.coins || 0), 0);
  const totalExp = state.students.reduce((acc, cur) => acc + (cur.exp || 0), 0);
  const pendingRequests = state.purchaseRequests.filter(r => r.status === 'pending');

  document.getElementById('stat-total-students').textContent = `${totalStudents}명`;
  document.getElementById('stat-total-coins').textContent = `${totalCoins.toLocaleString()} 스마일`;
  document.getElementById('stat-total-smiles').textContent = `${totalExp.toLocaleString()} 점`;

  const pendingCountEl = document.getElementById('stat-pending-count');
  const pulseBadge = document.getElementById('badge-pending-pulse');
  pendingCountEl.textContent = pendingRequests.length;

  if (pendingRequests.length > 0) {
    pulseBadge.style.display = 'inline-block';
  } else {
    pulseBadge.style.display = 'none';
  }
}

function renderPendingApprovals() {
  const banner = document.getElementById('section-approval-banner');
  const list = document.getElementById('approval-list-container');
  const pendingRequests = state.purchaseRequests.filter(r => r.status === 'pending');

  if (pendingRequests.length === 0) {
    banner.style.display = 'none';
    list.innerHTML = '';
    return;
  }

  banner.style.display = 'block';
  list.innerHTML = '';

  pendingRequests.forEach(req => {
    const card = document.createElement('div');
    card.className = 'approval-card';
    card.innerHTML = `
      <div class="approval-details">
        <span class="approval-item-icon">${req.itemIcon || '🎁'}</span>
        <div class="approval-text">
          <h4>${req.studentName} 학생</h4>
          <p>${req.itemName} <span class="cost">(🪙 ${req.price} 스마일)</span></p>
        </div>
      </div>
      <div class="approval-actions">
        <button type="button" class="btn-approve" data-req-id="${req.id}">승인하기</button>
        <button type="button" class="btn-reject" data-req-id="${req.id}">반려</button>
      </div>
    `;

    card.querySelector('.btn-approve').addEventListener('click', () => handleApprovePurchase(req.id));
    card.querySelector('.btn-reject').addEventListener('click', () => handleRejectPurchase(req.id));

    list.appendChild(card);
  });
}

function handleApprovePurchase(reqId) {
  const req = state.purchaseRequests.find(r => r.id === reqId);
  if (!req) return;

  const student = state.students.find(s => s.id === req.studentId);
  if (!student) return;

  if (student.coins < req.price) {
    showToast(`${student.name} 학생의 보유 화폐가 부족합니다! (현재 ${student.coins} 스마일)`, 'warning');
    return;
  }

  student.coins -= req.price;
  req.status = 'approved';
  req.approvedAt = new Date().toISOString();

  const item = state.shopItems.find(i => i.id === req.itemId);
  if (item && item.stock > 0) {
    item.stock -= 1;
  }

  state.activityLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'shop',
    target: student.name,
    coins: -req.price,
    exp: 0,
    reason: `상점 구매 승인 [${req.itemName}]`
  });

  saveState(state);
  fireConfetti({ count: 70 });
  showToast(`✅ ${student.name} 학생의 [${req.itemName}] 구매를 승인했습니다! (화폐 ${req.price} 스마일 차감)`, 'success');
  renderTeacherDashboard();
}

function handleRejectPurchase(reqId) {
  const req = state.purchaseRequests.find(r => r.id === reqId);
  if (!req) return;

  const reason = prompt('반려 사유를 입력해 주세요 (예: 재고 소진, 선생님과 상담 등):', '선생님과 상담 후 재신청해 주세요');
  if (reason === null) return;

  req.status = 'rejected';
  req.rejectReason = reason;

  saveState(state);
  showToast(`❌ ${req.studentName} 학생의 구매 신청을 반려했습니다.`, 'info');
  renderTeacherDashboard();
}

function renderStudentsGrid() {
  const container = document.getElementById('students-grid-container');
  if (!container) return;

  container.innerHTML = '';

  state.students.forEach(student => {
    const role = state.roles.find(r => r.id === student.roleId) || { name: '미배정', icon: '❓' };
    const levelInfo = calculateLevel(student.exp);

    const card = document.createElement('article');
    card.className = 'student-card';
    card.innerHTML = `
      <div class="student-card-top">
        <div class="student-avatar">
          <span class="student-no-badge">${student.no}</span>
          <span>${student.avatar}</span>
        </div>
        <div class="student-meta">
          <div class="student-name-row">
            <span class="student-name">${student.name}</span>
            <span class="level-badge" style="background: ${levelInfo.color}">
              ${levelInfo.badge} Lv.${levelInfo.level}
            </span>
          </div>
          <span class="role-chip ${student.roleCompleted ? 'completed' : ''}" title="${role.desc || ''}">
            <span>${role.icon}</span>
            <span>${role.name}</span>
            ${student.roleCompleted ? '<span>(완료✓)</span>' : ''}
          </span>
        </div>
      </div>

      <div class="student-stats-row">
        <div class="stat-pill coin">
          <span>🪙</span>
          <span>${student.coins.toLocaleString()} 스마일</span>
        </div>
        <div class="stat-pill smile">
          <span>⭐</span>
          <span>Lv.${levelInfo.level} (${student.exp} EXP)</span>
        </div>
      </div>

      <div class="smile-progress-wrap">
        <div class="progress-meta">
          <span>${levelInfo.name}</span>
          <span>${levelInfo.isMaxLevel ? 'MAX' : `${levelInfo.remainingExp}점 남음`}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${levelInfo.progressPercent}%; background: ${levelInfo.color}"></div>
        </div>
      </div>

      <div class="student-card-actions">
        <button type="button" class="btn-card-action grant" data-id="${student.id}" title="화폐(스마일)/레벨 포인트 지급">
          <span>➕</span>
          <span>지급</span>
        </button>
        <button type="button" class="btn-card-action deduct" data-id="${student.id}" title="화폐 차감">
          <span>➖</span>
          <span>차감</span>
        </button>
        <button type="button" class="btn-card-action switch-view" data-id="${student.id}" title="학생 시점으로 보기">
          <span>🎒</span>
          <span>시점</span>
        </button>
      </div>
    `;

    card.querySelector('.btn-card-action.grant').addEventListener('click', () => openGrantDeductModal(student.id, 'grant'));
    card.querySelector('.btn-card-action.deduct').addEventListener('click', () => openGrantDeductModal(student.id, 'deduct'));
    card.querySelector('.btn-card-action.switch-view').addEventListener('click', () => {
      state.previewStudentId = student.id;
      saveState(state);
      updateAppView();
    });

    container.appendChild(card);
  });
}

// ================= 7. 보상 지급/차감 및 일괄 지급 모달 =================
function openGrantDeductModal(studentId, actionType = 'grant') {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  selectedStudentForModal = student;
  const titleEl = document.getElementById('modal-grant-title');
  const targetIdInput = document.getElementById('grant-target-student-id');
  const actionTypeInput = document.getElementById('grant-action-type');
  const smilesGroup = document.getElementById('group-grant-smiles');
  const coinsInput = document.getElementById('input-grant-coins');
  const smilesInput = document.getElementById('input-grant-smiles');
  const reasonInput = document.getElementById('input-grant-reason');
  const submitBtn = document.getElementById('btn-submit-grant');
  const presetChips = document.getElementById('grant-preset-chips');

  targetIdInput.value = student.id;
  actionTypeInput.value = actionType;
  presetChips.innerHTML = '';

  if (actionType === 'grant') {
    titleEl.textContent = `🎁 ${student.no}번 ${student.name} 학생에게 칭찬 보상 지급`;
    submitBtn.textContent = '지급 완료 ✨';
    submitBtn.className = 'btn btn-primary';
    smilesGroup.style.display = 'block';
    coinsInput.value = '20';
    smilesInput.value = '3';
    reasonInput.value = '수업 발표 적극 참여';

    REASON_PRESETS.forEach(p => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip-btn';
      chip.textContent = `${p.label} (+${p.coins}🪙, +${p.exp}⭐)`;
      chip.addEventListener('click', () => {
        coinsInput.value = p.coins;
        smilesInput.value = p.exp;
        reasonInput.value = p.label;
      });
      presetChips.appendChild(chip);
    });
  } else {
    titleEl.textContent = `⚠️ ${student.no}번 ${student.name} 학생 화폐 차감`;
    submitBtn.textContent = '화폐 차감 적용';
    submitBtn.className = 'btn btn-outline';
    submitBtn.style.color = '#DC2626';
    submitBtn.style.borderColor = '#FCA5A5';
    smilesGroup.style.display = 'none';
    coinsInput.value = '15';
    smilesInput.value = '0';
    reasonInput.value = '수업 중 규칙 위반';

    DEDUCT_REASON_PRESETS.forEach(p => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip-btn';
      chip.textContent = `${p.label} (-${p.coins}🪙)`;
      chip.addEventListener('click', () => {
        coinsInput.value = p.coins;
        reasonInput.value = p.label;
      });
      presetChips.appendChild(chip);
    });
  }

  openModal('modal-grant-deduct');
}

function initGrantDeductForm() {
  const form = document.getElementById('form-grant-deduct');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentId = document.getElementById('grant-target-student-id').value;
    const actionType = document.getElementById('grant-action-type').value;
    const coins = parseInt(document.getElementById('input-grant-coins').value, 10) || 0;
    const exp = parseInt(document.getElementById('input-grant-smiles').value, 10) || 0;
    const reason = document.getElementById('input-grant-reason').value.trim();

    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    if (actionType === 'grant') {
      student.coins += coins;
      student.exp += exp;

      state.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'grant',
        target: student.name,
        coins,
        exp,
        reason
      });

      closeModal('modal-grant-deduct');
      fireConfetti({ count: 70 });
      showToast(`🎉 ${student.name} 학생에게 화폐 ${coins} 스마일과 레벨 포인트 ${exp}점을 지급했습니다!`, 'success');
    } else {
      if (student.coins < coins) {
        showToast(`보유 화폐가 부족하여 차감 후 잔액이 0 스마일이 됩니다.`, 'warning');
        student.coins = 0;
      } else {
        student.coins -= coins;
      }

      state.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'deduct',
        target: student.name,
        coins: -coins,
        exp: 0,
        reason
      });

      closeModal('modal-grant-deduct');
      showToast(`⚠️ ${student.name} 학생의 화폐 ${coins} 스마일을 차감했습니다.`, 'info');
    }

    saveState(state);
    renderTeacherDashboard();
  });
}

function initBatchGrantModal() {
  const openBtn = document.getElementById('btn-open-batch-grant');
  const form = document.getElementById('form-batch-grant');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openModal('modal-batch-grant');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const coins = parseInt(document.getElementById('input-batch-coins').value, 10) || 0;
      const exp = parseInt(document.getElementById('input-batch-smiles').value, 10) || 0;
      const reason = document.getElementById('input-batch-reason').value.trim();

      state.students.forEach(student => {
        student.coins += coins;
        student.exp += exp;
      });

      state.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'grant',
        target: '학급 전체 20명',
        coins,
        exp,
        reason
      });

      saveState(state);
      closeModal('modal-batch-grant');
      fireConfetti({ count: 120 });
      showToast(`🌟 우리 반 전체 20명에게 화폐 ${coins} 스마일과 레벨 포인트 ${exp}점을 일괄 지급했습니다!`, 'success');
      renderTeacherDashboard();
    });
  }
}

// ================= 8. 1인 1역 교사 직접 편집 & 주간 배정 모달 =================
function initRoleAssignModal() {
  const openBtn = document.getElementById('btn-open-role-assign');
  const subtabEdit = document.getElementById('subtab-role-edit');
  const subtabAssign = document.getElementById('subtab-role-assign');
  const subpaneEdit = document.getElementById('subpane-role-edit');
  const subpaneAssign = document.getElementById('subpane-role-assign');

  const btnAddNewRole = document.getElementById('btn-add-new-role');
  const btnResetDefaultRoles = document.getElementById('btn-reset-default-roles');
  const btnSaveRoleEdits = document.getElementById('btn-save-role-edits');

  const btnShuffle = document.getElementById('btn-shuffle-roles');
  const btnSaveAssignments = document.getElementById('btn-save-role-assignments');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      // 역할 편집 버퍼 복사
      currentRoleEditList = JSON.parse(JSON.stringify(state.roles));
      renderRoleEditorList();
      renderRoleAssignmentList();

      // 기본으로 편집 탭 열람
      if (subtabEdit && subtabAssign) {
        subtabEdit.classList.add('active');
        subtabAssign.classList.remove('active');
        subpaneEdit.style.display = 'block';
        subpaneAssign.style.display = 'none';
      }

      openModal('modal-role-assign');
    });
  }

  // 서브 탭 전환
  if (subtabEdit && subtabAssign) {
    subtabEdit.addEventListener('click', () => {
      subtabEdit.classList.add('active');
      subtabAssign.classList.remove('active');
      subpaneEdit.style.display = 'block';
      subpaneAssign.style.display = 'none';
      renderRoleEditorList();
    });

    subtabAssign.addEventListener('click', () => {
      subtabAssign.classList.add('active');
      subtabEdit.classList.remove('active');
      subpaneAssign.style.display = 'block';
      subpaneEdit.style.display = 'none';
      renderRoleAssignmentList();
    });
  }

  // 새 역할 추가
  if (btnAddNewRole) {
    btnAddNewRole.addEventListener('click', () => {
      currentRoleEditList.push({
        id: `role-${Date.now()}`,
        name: '새 역할',
        icon: '⭐',
        desc: '쉬는 시간 및 담당 활동을 입력해 주세요.'
      });
      renderRoleEditorList();
      showToast('새 역할 항목이 추가되었습니다. 내용을 입력해 주세요.', 'info');
    });
  }

  // 추천 기본 20개 역할로 복원
  if (btnResetDefaultRoles) {
    btnResetDefaultRoles.addEventListener('click', () => {
      if (confirm('추천 기본 20개 역할 목록으로 되돌릴까요?')) {
        currentRoleEditList = JSON.parse(JSON.stringify(INITIAL_ROLES));
        renderRoleEditorList();
        showToast('기본 추천 20개 역할로 복원되었습니다. [역할 수정사항 저장]을 눌러 적용하세요.', 'info');
      }
    });
  }

  // 역할 수정사항 저장
  if (btnSaveRoleEdits) {
    btnSaveRoleEdits.addEventListener('click', () => {
      // 폼 입력값들을 currentRoleEditList에 동기화
      const rows = document.querySelectorAll('#role-editor-list .role-editor-item');
      const updatedRoles = [];

      rows.forEach(row => {
        const id = row.dataset.roleId;
        const iconInput = row.querySelector('.input-role-icon');
        const nameInput = row.querySelector('.input-role-name');
        const descInput = row.querySelector('.input-role-desc');

        const icon = (iconInput ? iconInput.value : '').trim() || '⭐';
        const name = (nameInput ? nameInput.value : '').trim() || '학급 역할';
        const desc = (descInput ? descInput.value : '').trim() || '학급을 위한 멋진 활동하기';

        updatedRoles.push({ id, icon, name, desc });
      });

      if (updatedRoles.length === 0) {
        showToast('최소 1개 이상의 역할이 필요합니다.', 'warning');
        return;
      }

      state.roles = updatedRoles;
      currentRoleEditList = JSON.parse(JSON.stringify(updatedRoles));
      saveState(state);

      showToast(`📋 ${state.roles.length}개의 1인 1역할 정보가 저장되었습니다!`, 'success');
      renderTeacherDashboard();
      renderRoleAssignmentList();
    });
  }

  // 랜덤 자동 배정
  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      const shuffledRoles = [...state.roles].sort(() => Math.random() - 0.5);
      const selects = document.querySelectorAll('#role-assignment-list select[data-student-id]');

      selects.forEach((sel, index) => {
        const assignedRole = shuffledRoles[index % shuffledRoles.length];
        if (assignedRole) {
          sel.value = assignedRole.id;
        }
      });

      showToast('🎲 역할이 학생들에게 랜덤 배정되었습니다. [배정 내용 저장]을 눌러주세요!', 'info');
    });
  }

  // 학생 배정 저장
  if (btnSaveAssignments) {
    btnSaveAssignments.addEventListener('click', () => {
      const selects = document.querySelectorAll('#role-assignment-list select[data-student-id]');
      selects.forEach(sel => {
        const sId = sel.dataset.studentId;
        const student = state.students.find(s => s.id === sId);
        if (student) {
          student.roleId = sel.value;
          student.roleCompleted = false;
        }
      });

      saveState(state);
      closeModal('modal-role-assign');
      fireConfetti({ count: 70 });
      showToast('📋 이번 주 1인 1역 학생 배정이 저장되었습니다!', 'success');
      renderTeacherDashboard();
    });
  }
}

function renderRoleEditorList() {
  const container = document.getElementById('role-editor-list');
  if (!container) return;

  container.innerHTML = '';
  currentRoleEditList.forEach((role, idx) => {
    const row = document.createElement('div');
    row.className = 'role-editor-item';
    row.dataset.roleId = role.id;
    row.innerHTML = `
      <span style="font-size: 13px; font-weight: 800; color: #64748B; width: 24px;">${idx + 1}.</span>
      <input type="text" class="form-input input-role-icon" value="${role.icon || '⭐'}" style="width: 48px; text-align: center; font-size: 18px; padding: 6px 4px;" title="이모지">
      <input type="text" class="form-input input-role-name" value="${role.name || ''}" style="width: 140px; font-weight: 800; padding: 6px 10px;" placeholder="역할 이름">
      <input type="text" class="form-input input-role-desc" value="${role.desc || ''}" style="flex: 1; padding: 6px 10px;" placeholder="구체적인 할 일 안내">
      <button type="button" class="btn btn-outline btn-sm btn-delete-role" style="color: #DC2626; border-color: #FCA5A5; padding: 6px 10px;" title="이 역할 삭제">🗑️</button>
    `;

    row.querySelector('.btn-delete-role').addEventListener('click', () => {
      if (confirm(`'${role.name}' 역할을 목록에서 삭제할까요?`)) {
        currentRoleEditList = currentRoleEditList.filter(r => r.id !== role.id);
        renderRoleEditorList();
        showToast('역할이 삭제되었습니다. 저장을 눌러 적용하세요.', 'info');
      }
    });

    container.appendChild(row);
  });
}

function renderRoleAssignmentList() {
  const listContainer = document.getElementById('role-assignment-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  state.students.forEach(student => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #FFFFFF; border: 1.5px solid #E2E8F0; padding: 8px 12px; border-radius: 10px;';

    const left = document.createElement('div');
    left.style.cssText = 'display: flex; align-items: center; gap: 8px; font-weight: 700;';
    left.innerHTML = `
      <span style="font-size: 11px; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 99px;">${student.no}번</span>
      <span style="font-size: 20px;">${student.avatar}</span>
      <span style="color: #1E293B;">${student.name}</span>
    `;

    const select = document.createElement('select');
    select.className = 'form-select';
    select.dataset.studentId = student.id;
    select.style.cssText = 'max-width: 320px; padding: 6px 10px; font-size: 13px;';

    state.roles.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.icon} ${r.name}`;
      if (r.id === student.roleId) opt.selected = true;
      select.appendChild(opt);
    });

    row.appendChild(left);
    row.appendChild(select);
    listContainer.appendChild(row);
  });
}

// ================= 9. 상점 물품 관리 모달 =================
function initShopManageModal() {
  const openBtn = document.getElementById('btn-open-shop-manage');
  const listContainer = document.getElementById('shop-manage-list');
  const addForm = document.getElementById('form-add-shop-item');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      renderShopManageList();
      openModal('modal-shop-manage');
    });
  }

  function renderShopManageList() {
    listContainer.innerHTML = '';

    state.shopItems.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 10px; background: #FFFFFF; border: 1.5px solid #E2E8F0; padding: 10px 14px; border-radius: 10px;';
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 28px;">${item.icon}</span>
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #1E293B;">
              ${item.name}
              <span style="font-size: 11px; background: #EEF2FF; color: #4338CA; padding: 2px 6px; border-radius: 99px; margin-left: 4px;">
                ${item.category === 'coupon' ? '쿠폰' : '물건'}
              </span>
            </div>
            <div style="font-size: 12px; color: #64748B;">
              가격: <b style="color: #D97706;">🪙 ${item.price} 스마일</b> | 재고: <b>${item.stock}개</b>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-outline btn-sm" style="color: #DC2626; border-color: #FCA5A5;" data-delete-item="${item.id}">삭제</button>
      `;

      card.querySelector('[data-delete-item]').addEventListener('click', () => {
        if (confirm(`'${item.name}' 항목을 상점에서 삭제할까요?`)) {
          state.shopItems = state.shopItems.filter(i => i.id !== item.id);
          saveState(state);
          renderShopManageList();
          showToast('품목이 삭제되었습니다.', 'info');
        }
      });

      listContainer.appendChild(card);
    });
  }

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('input-item-name').value.trim();
      const icon = document.getElementById('input-item-icon').value.trim() || '🎁';
      const category = document.getElementById('select-item-category').value;
      const price = parseInt(document.getElementById('input-item-price').value, 10) || 100;
      const stock = parseInt(document.getElementById('input-item-stock').value, 10) || 5;
      const desc = document.getElementById('input-item-desc').value.trim();

      state.shopItems.push({
        id: `item-${Date.now()}`,
        name,
        category,
        icon,
        price,
        stock,
        desc
      });

      saveState(state);
      addForm.reset();
      renderShopManageList();
      showToast(`🛍️ 새 품목 [${name}]이 상점에 등록되었습니다!`, 'success');
    });
  }
}

// ================= 10. 오늘의 미션 관리 모달 =================
function initMissionManageModal() {
  const openBtn = document.getElementById('btn-open-mission-manage');
  const listContainer = document.getElementById('mission-manage-list');
  const addForm = document.getElementById('form-add-mission');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      renderMissionManageList();
      openModal('modal-mission-manage');
    });
  }

  function renderMissionManageList() {
    listContainer.innerHTML = '';

    state.missions.forEach(mission => {
      const card = document.createElement('div');
      card.style.cssText = 'display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1.5px solid #E2E8F0; padding: 10px 14px; border-radius: 10px;';
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 22px;">${mission.icon}</span>
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #1E293B;">${mission.title}</div>
            <div style="font-size: 12px; color: #64748B;">
              보상: <span style="color: #4F46E5; font-weight: 700;">+${mission.rewardExp || 2}⭐ 레벨</span>, 
              <span style="color: #D97706; font-weight: 700;">+${mission.rewardCoins || 10}🪙 스마일</span>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-outline btn-sm" style="color: #DC2626; border-color: #FCA5A5;" data-del-mission="${mission.id}">삭제</button>
      `;

      card.querySelector('[data-del-mission]').addEventListener('click', () => {
        if (confirm(`'${mission.title}' 미션을 삭제할까요?`)) {
          state.missions = state.missions.filter(m => m.id !== mission.id);
          saveState(state);
          renderMissionManageList();
          showToast('미션이 삭제되었습니다.', 'info');
        }
      });

      listContainer.appendChild(card);
    });
  }

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('input-mission-title').value.trim();
      const icon = document.getElementById('input-mission-icon').value.trim() || '✨';
      const rewardExp = parseInt(document.getElementById('input-mission-smiles').value, 10) || 2;
      const rewardCoins = parseInt(document.getElementById('input-mission-coins').value, 10) || 10;

      state.missions.push({
        id: `mission-${Date.now()}`,
        title,
        icon,
        rewardExp,
        rewardCoins
      });

      saveState(state);
      addForm.reset();
      renderMissionManageList();
      showToast(`🎯 새 미션 [${title}]이 등록되었습니다!`, 'success');
    });
  }
}

// ================= 11. 데이터 초기화 버튼 =================
function initResetDataButton() {
  const btn = document.getElementById('btn-reset-data');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (confirm('정말로 학급 데이터를 초기 샘플 데이터로 복원하시겠습니까? (현재 변경사항이 모두 리셋됩니다)')) {
      state = resetState();
      updateAppView();
      showToast('🔄 모든 데이터가 초기 상태로 안전하게 복원되었습니다.', 'info');
    }
  });
}

// ================= 12. 학생 개인 화면 렌더링 =================
function renderStudentDashboard(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  const role = state.roles.find(r => r.id === student.roleId) || { name: '미배정', icon: '❓', desc: '역할을 준비 중입니다.' };
  const levelInfo = calculateLevel(student.exp);

  document.getElementById('hero-student-avatar').textContent = student.avatar;
  const levelBadge = document.getElementById('hero-student-level-badge');
  levelBadge.textContent = `${levelInfo.badge} Lv.${levelInfo.level} ${levelInfo.name}`;
  levelBadge.style.background = levelInfo.color;

  document.getElementById('hero-student-name').textContent = student.name;
  document.getElementById('hero-role-name').textContent = role.name;
  document.getElementById('hero-role-desc').textContent = role.desc || '';
  document.getElementById('hero-coins-val').innerHTML = `${student.coins.toLocaleString()} <span style="font-size: 18px;">스마일</span>`;
  document.getElementById('hero-smiles-val').innerHTML = `${student.exp} <span style="font-size: 18px;">점</span>`;

  document.getElementById('hero-smiles-label').textContent = `⭐ 내 레벨 포인트: ${student.exp}점 (${levelInfo.name})`;
  document.getElementById('hero-smiles-next').textContent = levelInfo.isMaxLevel ? '최고 레벨 도달! 👑' : `다음 레벨까지 ${levelInfo.remainingExp}점 남음!`;
  const bar = document.getElementById('hero-smiles-bar');
  bar.style.width = `${levelInfo.progressPercent}%`;
  bar.style.background = levelInfo.color;

  // 탭 상태 초기화: 기본 탭(오늘의 할 일) 활성화
  document.querySelectorAll('.student-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  const defaultTabBtn = document.getElementById('tab-btn-tasks');
  if (defaultTabBtn) defaultTabBtn.classList.add('active');
  document.querySelectorAll('.student-tab-pane').forEach(p => p.style.display = 'none');
  const defaultPane = document.getElementById('pane-tab-tasks');
  if (defaultPane) defaultPane.style.display = 'block';

  initStudentTabs(student);
  renderStudentRoleTask(student, role);
  renderStudentMissions(student);
  renderStudentShop(student);
  renderStudentHistory(student);
}

function initStudentTabs(student) {
  const tabBtns = document.querySelectorAll('.student-tabs .tab-btn');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.dataset.tab;
      document.querySelectorAll('.student-tab-pane').forEach(p => p.style.display = 'none');
      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) activePane.style.display = 'block';

      if (targetTab === 'tab-shop') renderStudentShop(student);
      if (targetTab === 'tab-history') renderStudentHistory(student);
    };
  });
}

function renderStudentRoleTask(student, role) {
  document.getElementById('task-role-icon').textContent = role.icon;
  document.getElementById('task-role-title').textContent = role.name;
  document.getElementById('task-role-description').textContent = role.desc || '오늘의 1인 1역을 성실히 실천해 보세요!';

  const completeBtn = document.getElementById('btn-complete-role');
  const completeText = document.getElementById('btn-complete-role-text');

  if (student.roleCompleted) {
    completeBtn.className = 'role-complete-btn completed';
    completeText.textContent = '오늘의 1인 1역 실천 완료! 참 잘했어요 👏';
    completeBtn.disabled = true;
  } else {
    completeBtn.className = 'role-complete-btn incomplete';
    completeText.textContent = '오늘의 1인 1역 실천 완료하기! (+10🪙 스마일, +2⭐ 레벨)';
    completeBtn.disabled = false;

    completeBtn.onclick = () => {
      student.roleCompleted = true;
      student.coins += 10;
      student.exp += 2;

      state.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'grant',
        target: student.name,
        coins: 10,
        exp: 2,
        reason: `1인 1역 [${role.name}] 당일 실천 완료`
      });

      saveState(state);
      fireConfetti({ count: 90 });
      showToast('🎉 1인 1역 실천을 완료하여 보너스를 받았습니다!', 'success');
      renderStudentDashboard(student.id);
    };
  }
}

function renderStudentMissions(student) {
  const container = document.getElementById('student-mission-list');
  container.innerHTML = '';

  if (!state.studentMissionStatus[student.id]) {
    state.studentMissionStatus[student.id] = {};
  }
  const myMissions = state.studentMissionStatus[student.id];

  state.missions.forEach(mission => {
    const isChecked = !!myMissions[mission.id];

    const item = document.createElement('div');
    item.className = `mission-item ${isChecked ? 'checked' : ''}`;
    item.innerHTML = `
      <div class="mission-left">
        <div class="mission-checkbox">${isChecked ? '✓' : ''}</div>
        <span style="font-size: 20px;">${mission.icon}</span>
        <span class="mission-title">${mission.title}</span>
      </div>
      <div class="mission-rewards">
        <span class="reward-tag smile">+${mission.rewardExp || 2}⭐</span>
        <span class="reward-tag coin">+${mission.rewardCoins || 10}🪙</span>
      </div>
    `;

    item.addEventListener('click', () => {
      const currentVal = !myMissions[mission.id];
      myMissions[mission.id] = currentVal;

      if (currentVal) {
        student.exp += (mission.rewardExp || 2);
        student.coins += (mission.rewardCoins || 10);

        state.activityLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'grant',
          target: student.name,
          coins: mission.rewardCoins || 10,
          exp: mission.rewardExp || 2,
          reason: `일일 미션 [${mission.title}] 완료`
        });

        fireConfetti({ count: 50 });
        showToast(`🎯 미션 완료! 레벨 +${mission.rewardExp || 2}⭐, 스마일 +${mission.rewardCoins || 10}🪙 획득!`, 'success');
      } else {
        student.exp = Math.max(0, student.exp - (mission.rewardExp || 2));
        student.coins = Math.max(0, student.coins - (mission.rewardCoins || 10));
        showToast('미션 체크를 해제했습니다.', 'info');
      }

      saveState(state);
      renderStudentDashboard(student.id);
    });

    container.appendChild(item);
  });
}

function renderStudentShop(student) {
  const grid = document.getElementById('student-shop-grid');
  const chipsContainer = document.getElementById('student-pending-status-chips');
  grid.innerHTML = '';
  chipsContainer.innerHTML = '';

  const myRequests = state.purchaseRequests.filter(r => r.studentId === student.id);

  if (myRequests.length === 0) {
    chipsContainer.innerHTML = '<span style="font-size: 13px; color: #94A3B8;">아직 신청한 내역이 없습니다.</span>';
  } else {
    myRequests.slice(0, 5).forEach(req => {
      const chip = document.createElement('span');
      chip.style.cssText = 'font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 99px; display: inline-flex; align-items: center; gap: 4px;';
      if (req.status === 'pending') {
        chip.style.background = '#FEF3C7';
        chip.style.color = '#B45309';
        chip.innerHTML = `<span>⏳</span><span>${req.itemName} (승인 대기)</span>`;
      } else if (req.status === 'approved') {
        chip.style.background = '#D1FAE5';
        chip.style.color = '#065F46';
        chip.innerHTML = `<span>🎟️</span><span>${req.itemName} (보유 중)</span>`;
      } else {
        chip.style.background = '#FEE2E2';
        chip.style.color = '#991B1B';
        chip.innerHTML = `<span>❌</span><span>${req.itemName} (반려)</span>`;
      }
      chipsContainer.appendChild(chip);
    });
  }

  state.shopItems.forEach(item => {
    const isOutOfStock = item.stock <= 0;
    const canAfford = student.coins >= item.price;
    const isPending = myRequests.some(r => r.itemId === item.id && r.status === 'pending');

    const card = document.createElement('article');
    card.className = `shop-item-card ${isOutOfStock ? 'out-of-stock' : ''}`;
    card.innerHTML = `
      <div class="shop-badge ${item.category}">${item.category === 'coupon' ? '쿠폰' : '물건'}</div>
      <div class="shop-icon">${item.icon}</div>
      <div class="shop-item-title">${item.name}</div>
      <div class="shop-item-desc">${item.desc}</div>
      <div class="shop-card-footer">
        <div class="shop-price">🪙 ${item.price.toLocaleString()} 스마일</div>
        <div class="shop-stock">${isOutOfStock ? '품절' : `남은 수량: ${item.stock}개`}</div>
      </div>
      <button type="button" class="btn btn-primary shop-buy-btn" ${isOutOfStock || isPending ? 'disabled' : ''}>
        ${isPending ? '⏳ 승인 대기 중' : isOutOfStock ? '품절되었습니다' : !canAfford ? '스마일 부족' : '구매 신청하기'}
      </button>
    `;

    const buyBtn = card.querySelector('.shop-buy-btn');
    if (!isOutOfStock && !isPending && canAfford) {
      buyBtn.addEventListener('click', () => openPurchaseConfirmModal(student, item));
    }

    grid.appendChild(card);
  });
}

let pendingPurchaseItem = null;
let purchasingStudent = null;

function openPurchaseConfirmModal(student, item) {
  purchasingStudent = student;
  pendingPurchaseItem = item;

  document.getElementById('confirm-item-icon').textContent = item.icon;
  document.getElementById('confirm-item-name').textContent = item.name;
  document.getElementById('confirm-item-desc').textContent = item.desc;
  document.getElementById('confirm-item-price').textContent = `${item.price.toLocaleString()} 스마일`;

  openModal('modal-purchase-confirm');
}

function initPurchaseConfirmModal() {
  const submitBtn = document.getElementById('btn-submit-purchase-request');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    if (!purchasingStudent || !pendingPurchaseItem) return;

    state.purchaseRequests.unshift({
      id: `req-${Date.now()}`,
      studentId: purchasingStudent.id,
      studentName: purchasingStudent.name,
      itemId: pendingPurchaseItem.id,
      itemName: pendingPurchaseItem.name,
      itemIcon: pendingPurchaseItem.icon,
      price: pendingPurchaseItem.price,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });

    saveState(state);
    closeModal('modal-purchase-confirm');
    fireConfetti({ count: 60 });
    showToast(`🛍️ 선생님께 [${pendingPurchaseItem.name}] 구매 신청을 보냈습니다!`, 'success');
    renderStudentDashboard(purchasingStudent.id);
  });
}

function renderStudentHistory(student) {
  const container = document.getElementById('student-history-timeline');
  container.innerHTML = '';

  const myLogs = state.activityLogs.filter(l => l.target === student.name || l.target === '학급 전체 20명');

  if (myLogs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
        <span style="font-size: 40px; display: block; margin-bottom: 8px;">📜</span>
        아직 기록된 활동 내역이 없습니다.
      </div>
    `;
    return;
  }

  myLogs.forEach(log => {
    const timeFormatted = new Date(log.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const isPositiveCoin = log.coins > 0;
    const isNegativeCoin = log.coins < 0;

    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot ${log.type}"></div>
      <div class="timeline-time">${timeFormatted}</div>
      <div class="timeline-content">
        <h4>${log.reason}</h4>
        <div class="timeline-diff">
          ${log.exp ? `<span style="color: #4F46E5; font-weight: 800;">⭐ 레벨 +${log.exp}점</span>` : ''}
          ${isPositiveCoin ? `<span style="color: #D97706; font-weight: 800;">🪙 +${log.coins} 스마일</span>` : ''}
          ${isNegativeCoin ? `<span style="color: #DC2626; font-weight: 800;">🪙 ${log.coins} 스마일</span>` : ''}
        </div>
      </div>
    `;

    container.appendChild(item);
  });
}

// ================= 13. DOM 로드 완료 후 전체 초기화 =================
document.addEventListener('DOMContentLoaded', () => {
  initModalEvents();
  initAuthAndViews();
  initGrantDeductForm();
  initBatchGrantModal();
  initRoleAssignModal();
  initShopManageModal();
  initMissionManageModal();
  initPurchaseConfirmModal();
  initResetDataButton();
});
