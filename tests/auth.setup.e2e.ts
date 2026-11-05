import { test } from '@e2e-dev/web';
import { credentials, expect } from 'e2e';

test.setup('sign in as the demo user', { sessions: ['demo'] }, async ({ app, screen, session, browser }) => {
  const demo = credentials.user('demo');
  await app.open('/login');
  await screen.getByRole('textbox', 'Email').fill(demo.username);
  await screen.getByLabel('Password').fill(demo.password);
  await screen.getByRole('button', 'Sign in').tap();
  await expect(browser).toHaveURL('/todos');
  await expect(screen.getByText('Signed in as Demo User')).toBeVisible();
  await session.save('demo');
});
