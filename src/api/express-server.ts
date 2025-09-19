import express from 'express';
import cors from 'cors';
import { UserProfileService } from '../core/user-profile-service';
import { ConsciousnessEngine } from '../core/consciousness-engine';
import { IntegrationData, ConsciousnessState } from '../types';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Services
const profileService = new UserProfileService();
const consciousnessEngine = new ConsciousnessEngine();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// User management
app.post('/api/users', async (req, res) => {
  try {
    const { email } = req.body;
    const profile = await profileService.createProfile(email);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Integration data sync
app.post('/api/users/:id/sync', async (req, res) => {
  try {
    const integrationData: IntegrationData = {
      ...req.body,
      userId: req.params.id,
      timestamp: new Date(),
      syncStatus: 'synced'
    };
    
    await profileService.syncIntegrationData(integrationData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync integration data' });
  }
});

// Consciousness analysis
app.get('/api/users/:id/consciousness', async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const consciousnessState = await consciousnessEngine.calculateConsciousnessState(profile);
    res.json(consciousnessState);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate consciousness state' });
  }
});

// Dashboard summary
app.get('/api/users/:id/dashboard', async (req, res) => {
  try {
    const summary = await profileService.getConsciousnessSummary(req.params.id);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get dashboard summary' });
  }
});

// Integration systems available
app.get('/api/integrations', (req, res) => {
  const integrations = [
    {
      id: 'symbol_quest',
      name: 'Symbol Quest',
      description: 'Symbol interpretation and meaning discovery',
      dataTypes: ['symbol_interpretation', 'symbol_analysis']
    },
    {
      id: 'dream_journal_pro',
      name: 'Dream Journal Pro',
      description: 'Dream analysis and pattern recognition',
      dataTypes: ['dream_pattern', 'dream_analysis']
    },
    {
      id: 'skilltree_platform',
      name: 'Skilltree Platform',
      description: 'Skill visualization and progression',
      dataTypes: ['skill_mastery', 'skill_progress']
    },
    {
      id: 'mindful_code',
      name: 'Mindful Code',
      description: 'Flow state detection and optimization',
      dataTypes: ['flow_state', 'productivity_metrics']
    }
  ];
  
  res.json(integrations);
});

// Start server
app.listen(port, () => {
  console.log(`🧠 Consciousness Operating System API running on port ${port}`);
  console.log(`📊 Dashboard: http://localhost:${port}/health`);
});