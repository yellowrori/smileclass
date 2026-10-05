/**
 * LocalStorage 기반 데이터 지속성 관리 및 헬퍼 함수
 */

import { INITIAL_STUDENTS, INITIAL_ROLES, INITIAL_SHOP_ITEMS, INITIAL_DAILY_MISSIONS, LEVEL_TIERS } from './data.js';

const STORAGE_KEY = 'CLASS_ECONOMY_APP_STATE_V1';

export function calculateLevel(smiles) {
  let currentTier = LEVEL_TIERS[0];
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (smiles >= LEVEL_TIERS[i].minSmiles) {
      currentTier = LEVEL_TIERS[i];
      break;
    }
  }

  const nextTier = LEVEL_TIERS.find(t => t.level === currentTier.level + 1);
  let progressPercent = 100;
  let remainingSmiles = 0;

  if (nextTier) {
    const range = nextTier.minSmiles - currentTier.minSmiles;
    const currentProgress = smiles - currentTier.minSmiles;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
    remainingSmiles = nextTier.minSmiles - smiles;
  }

  return {
    level: currentTier.level,
    name: currentTier.name,
    badge: currentTier.badge,
    color: currentTier.color,
    progressPercent,
    remainingSmiles,
    nextLevelMinSmiles: nextTier ? nextTier.minSmiles : null,
    isMaxLevel: !nextTier
  };
}

export function getInitialState() {
  // 기본 미션 완료 상태 및 활동 내역 초기화
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
      smiles: 3,
      reason: '수업 발표 적극 참여'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      type: 'grant',
      target: '이서아',
      coins: 30,
      smiles: 5,
      reason: '1인 1역(우유 급식) 성실 수행'
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      type: 'shop',
      target: '조은서',
      coins: -60,
      smiles: 0,
      reason: '상점 구매 승인 [반짝반짝 홀로그램 스티커]'
    }
  ];

  return {
    version: '1.0',
    currentView: 'teacher', // 'teacher' or studentId (e.g. 's-1')
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

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const state = getInitialState();
      saveState(state);
      return state;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return getInitialState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function resetState() {
  const initial = getInitialState();
  saveState(initial);
  return initial;
}
