import { UserProfile } from './consciousness';

// Define partial update types that allow individual consciousness domain updates
export type PartialConsciousnessData = {
  symbolRecognition?: Partial<UserProfile['consciousnessData']['symbolRecognition']>;
  dreamAnalysis?: Partial<UserProfile['consciousnessData']['dreamAnalysis']>;
  skillDevelopment?: Partial<UserProfile['consciousnessData']['skillDevelopment']>;
  flowStates?: Partial<UserProfile['consciousnessData']['flowStates']>;
  mindfulnessPractice?: Partial<UserProfile['consciousnessData']['mindfulnessPractice']>;
};

export type UserProfileUpdate = Partial<Omit<UserProfile, 'consciousnessData'>> & {
  consciousnessData?: PartialConsciousnessData;
};