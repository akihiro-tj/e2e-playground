import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { claudeCode } from '@e2e-dev/acp';

export default {
  // Agent steps run on Claude Code over ACP, signed in with `claude` (or ANTHROPIC_API_KEY).
  agents: {
    default: {
      executor: claudeCode({
        model: 'sonnet',
        system: 'You are a thorough QA agent. Verify every outcome.',
      }),
    },
  },
  credentials: {
    // The app's built-in demo account; override with E2E_USER_DEMO_USERNAME / E2E_USER_DEMO_PASSWORD.
    demo: { username: 'demo@example.test', password: 'password' },
  },
  targets: [{
    engine: web(),
    app: {
      url: 'http://localhost:3000',
      command: { executable: 'pnpm', args: ['dev'], log: '.e2e/logs/app.log', reuseExisting: true },
    },
  }],
} satisfies E2EConfig;
