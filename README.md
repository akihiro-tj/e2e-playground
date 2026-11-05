# e2e-playground

A small todo app for trying out end-to-end testing tools, built with Vite, React, and TypeScript. There is no backend; all state is stored in the browser's `localStorage`.

## Getting started

```sh
pnpm install
pnpm dev   # http://localhost:3000
```

## Demo account

| Email | Password |
| --- | --- |
| `demo@example.test` | `password` |

## Pages and behavior

- `/login`: Enter Email and Password, then click "Sign in". Invalid credentials show an error with `role="alert"`.
- `/todos`: Requires sign-in. Unauthenticated visitors are redirected to `/login`.
  - Type in "New todo" and click "Add" to create a todo. Empty input is ignored.
  - Toggle completion with the checkbox; remove a todo with "Delete" (accessible name: `Delete <title>`).
  - Filter with "All / Active / Completed". The selected button has `aria-pressed="true"`.
  - The number of incomplete todos is shown as "N remaining" in a `role="status"` element.
  - "Clear completed" appears when at least one todo is completed.
  - "Sign out" ends the session.
