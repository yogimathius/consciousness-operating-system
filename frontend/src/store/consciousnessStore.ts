import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  SacredDashboardState,
  ConsciousnessState,
  ApplicationIntegration,
  SacredVisualizationData
} from '../types/consciousness';
import { ConsciousnessDomain } from '../types/consciousness';

interface ConsciousnessStore extends SacredDashboardState {
  // Actions
  updateConsciousnessState: (state: ConsciousnessState) => void;
  toggleBreathingSync: () => void;
  toggleContemplativeMode: () => void;
  updateApplicationData: (appId: string, data: Partial<ApplicationIntegration['data']>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeMockData: () => void;
  updateVisualization: (visualization: Partial<SacredVisualizationData>) => void;
}

// Sacred color palettes based on consciousness traditions
const SACRED_COLORS = {
  buddhist: {
    primary: '#8B4513', // Saffron
    secondary: '#2E8B57', // Compassion Green
    accent: '#FFD700', // Wisdom Gold
    background: '#F5F5DC', // Peaceful Beige
  },
  yogic: {
    primary: '#9932CC', // Spiritual Purple
    secondary: '#FF6347', // Heart Chakra
    accent: '#4169E1', // Throat Chakra Blue
    background: '#E6E6FA', // Lavender Light
  },
  universal: {
    primary: '#4682B4', // Universal Blue
    secondary: '#32CD32', // Life Force Green
    accent: '#DAA520', // Golden Wisdom
    background: '#F8F8FF', // Pure White
  }
};

// Generate initial sacred visualization data
const createInitialVisualization = (): SacredVisualizationData => ({
  mandalaPattern: {
    centerPoint: { x: 0, y: 0 },
    rings: [
      { radius: 20, segments: 8, color: SACRED_COLORS.universal.primary, opacity: 0.8 },
      { radius: 40, segments: 12, color: SACRED_COLORS.universal.secondary, opacity: 0.6 },
      { radius: 60, segments: 16, color: SACRED_COLORS.universal.accent, opacity: 0.4 },
      { radius: 80, segments: 24, color: SACRED_COLORS.universal.primary, opacity: 0.2 },
    ],
    sacredGeometry: 'flower-of-life',
  },
  breathingAnimation: {
    inhaleMs: 4000,
    exhaleMs: 6000,
    pauseMs: 1000,
    amplitude: 8,
  },
  energeticFlow: {
    direction: 'clockwise',
    speed: 0.5,
    particles: Array.from({ length: 12 }, (_, i) => ({
      x: Math.cos((i * Math.PI * 2) / 12) * 60,
      y: Math.sin((i * Math.PI * 2) / 12) * 60,
      energy: 0.5 + Math.random() * 0.5,
      color: SACRED_COLORS.universal.accent,
    })),
  },
});

// Generate mock application integrations
const createMockApplications = (): ApplicationIntegration[] => [
  {
    id: uuidv4(),
    name: 'Symbol Quest',
    type: 'symbol-quest',
    isConnected: true,
    lastSync: new Date(),
    data: {
      recentActivity: ['Drew The Hermit card', 'Interpreted mountain symbol', 'Connected to inner wisdom'],
      currentState: { lastCard: 'The Hermit', mood: 'contemplative', symbolsDiscovered: 23 },
      metrics: { dailyDraws: 1, weeklyInsights: 5, meaningfulConnections: 12 }
    },
    sacredTheme: {
      primaryColor: SACRED_COLORS.yogic.primary,
      symbol: '=.',
      mantraText: 'I trust my inner wisdom'
    }
  },
  {
    id: uuidv4(),
    name: 'Dream Journal',
    type: 'dream-journal',
    isConnected: true,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    data: {
      recentActivity: ['Recorded lucid dream', 'Identified recurring pattern', 'Integrated shadow work'],
      currentState: { lastEntry: '2 hours ago', lucidityLevel: 0.7, patternCount: 3 },
      metrics: { weeklyEntries: 5, lucidDreams: 2, patternRecognition: 8 }
    },
    sacredTheme: {
      primaryColor: SACRED_COLORS.buddhist.secondary,
      symbol: '<',
      mantraText: 'My dreams guide my awakening'
    }
  },
  {
    id: uuidv4(),
    name: 'Skill Tree',
    type: 'skill-tree',
    isConnected: true,
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    data: {
      recentActivity: ['Advanced in meditation', 'Unlocked breathwork mastery', 'Developed presence skill'],
      currentState: { activeSkills: 8, masteryLevel: 0.65, currentFocus: 'Mindful Communication' },
      metrics: { skillsUnlocked: 15, masteryPoints: 847, weeklyProgress: 12 }
    },
    sacredTheme: {
      primaryColor: SACRED_COLORS.universal.secondary,
      symbol: '<3',
      mantraText: 'I grow in wisdom and skill'
    }
  },
  {
    id: uuidv4(),
    name: 'Flow Tracker',
    type: 'flow-tracker',
    isConnected: true,
    lastSync: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    data: {
      recentActivity: ['Entered deep flow state', 'Completed creative session', 'Achieved peak performance'],
      currentState: { flowSessions: 3, avgDuration: 45, lastSession: '2 hours' },
      metrics: { weeklyFlowTime: 180, peakStates: 5, focusQuality: 0.85 }
    },
    sacredTheme: {
      primaryColor: SACRED_COLORS.yogic.accent,
      symbol: '🌊',
      mantraText: 'I flow with effortless grace'
    }
  },
  {
    id: uuidv4(),
    name: 'Mindfulness',
    type: 'mindfulness',
    isConnected: true,
    lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    data: {
      recentActivity: ['Completed morning meditation', 'Practiced mindful breathing', 'Cultivated presence'],
      currentState: { meditationStreak: 21, dailyMinutes: 25, awarenessLevel: 0.78 },
      metrics: { totalSessions: 156, avgDuration: 22, mindfulMoments: 341 }
    },
    sacredTheme: {
      primaryColor: SACRED_COLORS.buddhist.primary,
      symbol: '>�',
      mantraText: 'I am present in this moment'
    }
  }
];

// Generate mock consciousness state
const createMockConsciousnessState = (): ConsciousnessState => ({
  userId: 'user-123',
  timestamp: new Date(),
  overallConsciousnessScore: 0.78,
  domainScores: {
    [ConsciousnessDomain.SYMBOL_RECOGNITION]: 0.82,
    [ConsciousnessDomain.DREAM_ANALYSIS]: 0.75,
    [ConsciousnessDomain.SKILL_DEVELOPMENT]: 0.88,
    [ConsciousnessDomain.FLOW_STATES]: 0.73,
    [ConsciousnessDomain.MINDFULNESS_PRACTICE]: 0.91,
  },
  insights: [
    'Your symbol recognition is strengthening through consistent practice',
    'Dream patterns suggest deeper integration of shadow work',
    'Flow states are becoming more accessible with regular meditation',
    'Mindfulness practice is your current strength - share this wisdom',
  ],
  recommendations: [
    'Explore the connection between your dreams and daily symbols',
    'Schedule dedicated flow sessions during peak energy hours',
    'Consider teaching mindfulness to deepen your own practice',
    'Integrate breathwork with skill development exercises',
  ],
  growthTrajectory: {
    trend: 'ascending',
    predictedScore: 0.85,
    confidenceLevel: 0.87,
  },
});

export const useConsciousnessStore = create<ConsciousnessStore>()(
  devtools(
    (set) => ({
      // Initial state
      consciousnessState: null,
      applications: [],
      visualization: createInitialVisualization(),
      isLoading: false,
      lastUpdate: null,
      error: null,
      breathingSync: true,
      contemplativeMode: false,

      // Actions
      updateConsciousnessState: (state: ConsciousnessState) =>
        set(
          {
            consciousnessState: state,
            lastUpdate: new Date()
          },
          false,
          'updateConsciousnessState'
        ),

      toggleBreathingSync: () =>
        set(
          (state) => ({ breathingSync: !state.breathingSync }),
          false,
          'toggleBreathingSync'
        ),

      toggleContemplativeMode: () =>
        set(
          (state) => ({ contemplativeMode: !state.contemplativeMode }),
          false,
          'toggleContemplativeMode'
        ),

      updateApplicationData: (appId: string, data: Partial<ApplicationIntegration['data']>) =>
        set(
          (state) => ({
            applications: state.applications.map((app) =>
              app.id === appId
                ? {
                    ...app,
                    data: { ...app.data, ...data },
                    lastSync: new Date()
                  }
                : app
            ),
            lastUpdate: new Date(),
          }),
          false,
          'updateApplicationData'
        ),

      updateVisualization: (visualization: Partial<SacredVisualizationData>) =>
        set(
          (state) => ({
            visualization: { ...state.visualization, ...visualization }
          }),
          false,
          'updateVisualization'
        ),

      setLoading: (loading: boolean) =>
        set({ isLoading: loading }, false, 'setLoading'),

      setError: (error: string | null) =>
        set({ error }, false, 'setError'),

      initializeMockData: () =>
        set(
          {
            consciousnessState: createMockConsciousnessState(),
            applications: createMockApplications(),
            lastUpdate: new Date(),
            isLoading: false,
            error: null,
          },
          false,
          'initializeMockData'
        ),
    }),
    {
      name: 'consciousness-store',
    }
  )
);