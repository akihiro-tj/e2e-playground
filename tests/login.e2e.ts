import { describe, test } from '@e2e-dev/web';
import { credentials, expect } from 'e2e';

describe('sign-in', { tags: ['auth'] }, () => {
  test('rejects a wrong password', async ({ app, screen, browser }) => {
    await app.open('/login');
    await screen.getByRole('textbox', 'Email').fill(credentials.user('demo').username);
    await screen.getByLabel('Password').fill('not-the-password');
    await screen.getByRole('button', 'Sign in').tap();
    // The demo password is the word "password", which the runner redacts from
    // on-screen text, so the check matches the part of the message before it.
    await expect(screen.getByRole('alert')).toContainText('Invalid email or');
    await expect(browser).toHaveURL('/login');
  });

  test('redirects a signed-out visitor to the sign-in page', async ({ app, screen, browser }) => {
    await app.open('/todos');
    await expect(browser).toHaveURL('/login');
    await expect(screen.getByRole('heading', 'Sign in')).toBeVisible();
  });
});
