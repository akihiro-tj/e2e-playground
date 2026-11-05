import { beforeEach, describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import type { Screen } from 'e2e';

async function addTodo(screen: Screen, title: string) {
  await screen.getByRole('textbox', 'New todo').fill(title);
  await screen.getByRole('button', 'Add').tap();
  await expect(screen.getByRole('checkbox', title)).toBeVisible();
}

describe('todos', { tags: ['todos'] }, () => {
  beforeEach(async ({ app }) => {
    await app.open('/todos');
  });

  test('adds a todo', { session: 'demo' }, async ({ agent, screen }) => {
    await agent.act('add a todo named {title}', { params: { title: 'Buy milk' } });
    await expect(screen.getByRole('checkbox', 'Buy milk')).not.toBeChecked();
    await expect(screen.getByRole('listitem')).toHaveCount(1);
    await expect(screen.getByRole('status')).toHaveText('1 remaining');
  });

  test('completes a todo', { session: 'demo' }, async ({ agent, screen }) => {
    await addTodo(screen, 'Buy milk');

    await agent.act('mark the todo {title} as done', { params: { title: 'Buy milk' } });
    await expect(screen.getByRole('checkbox', 'Buy milk')).toBeChecked();
    await expect(screen.getByRole('status')).toHaveText('0 remaining');
    await expect(screen.getByRole('button', 'Clear completed')).toBeVisible();
  });

  test('filters active and completed todos', { session: 'demo' }, async ({ agent, screen }) => {
    await addTodo(screen, 'Buy milk');
    await addTodo(screen, 'Walk the dog');
    await screen.getByRole('checkbox', 'Buy milk').check();

    await agent.act('show only the active todos');
    await expect(screen.getByRole('button', 'Active', { pressed: true })).toBeVisible();
    await expect(screen.getByRole('checkbox')).toHaveCount(1);
    await expect(screen.getByRole('checkbox', 'Walk the dog')).not.toBeChecked();

    await agent.act('show only the completed todos');
    await expect(screen.getByRole('button', 'Completed', { pressed: true })).toBeVisible();
    await expect(screen.getByRole('checkbox')).toHaveCount(1);
    await expect(screen.getByRole('checkbox', 'Buy milk')).toBeChecked();
  });

  test('deletes a todo', { session: 'demo' }, async ({ agent, screen }) => {
    await addTodo(screen, 'Buy milk');

    await agent.act('delete the todo {title}', { params: { title: 'Buy milk' } });
    await expect(screen.getByText('No todos to show.')).toBeVisible();
    await expect(screen.getByRole('status')).toHaveText('0 remaining');
  });

  test('clears completed todos', { session: 'demo' }, async ({ agent, screen }) => {
    await addTodo(screen, 'Buy milk');
    await addTodo(screen, 'Walk the dog');
    await screen.getByRole('checkbox', 'Buy milk').check();

    await agent.act('clear the completed todos');
    await expect(screen.getByRole('checkbox')).toHaveCount(1);
    await expect(screen.getByRole('checkbox', 'Walk the dog')).toBeVisible();
    await expect(screen.getByRole('button', 'Clear completed')).toBeHidden();
  });

  test('ignores an empty submission', { session: 'demo' }, async ({ screen }) => {
    // The empty submit itself is the point of the test, so it stays an exact step.
    await screen.getByRole('button', 'Add').tap();
    await expect(screen.getByText('No todos to show.')).toBeVisible();
    await expect(screen.getByRole('status')).toHaveText('0 remaining');
  });

  test('signs out', { session: 'demo' }, async ({ agent, screen, browser }) => {
    await agent.act('sign out');
    await expect(browser).toHaveURL('/login');
    await expect(screen.getByRole('heading', 'Sign in')).toBeVisible();
  });
});
