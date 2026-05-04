**Team Workflow & Conventions — TasBon Bounty Platform**

## Purpose

This document defines our team workflow, folder structure, component conventions, branching and PR rules, commit message standards, and AI-assisted coding guidelines for the TasBon Bounty Platform (React).

## Tech stack

- Frontend: React (JavaScript or TypeScript)
- State: (decide per feature — e.g., Context, Redux, Zustand)
- Styling: CSS Modules / Styled Components / Tailwind (team decision per repo)

## Folder structure & component conventions

Feature-based folders scale best for complex apps. Group related components, hooks, and data access by feature, and keep truly shared code in top-level `src/` directories.

Top-level layout suggestion:

src/
├─ app/ # App composition, providers, routing, and startup wiring
├─ assets/ # Static assets imported by the app
├─ components/ # Shared UI atoms and reusable presentational pieces
├─ config/ # Environment and app configuration
├─ features/ # Feature folders (each complex feature lives here)
├─ hooks/ # Shared hooks
├─ lib/ # Shared helpers and library adapters
├─ stores/ # Shared state stores
├─ testing/ # Test utilities, mocks, and setup helpers
└─ utils/ # Shared utilities

`src/app/`: Holds the application shell and wiring that composes the features together.

`src/assets/`: Stores static images, icons, and other imported assets.

`src/components/`: Houses shared UI elements like buttons and inputs. Keep only small, reusable atoms here.

`src/config/`: Stores app-wide configuration values and environment-specific settings.

`src/features/`: Contains sub-folders for each complex feature. Each feature folder encapsulates feature-specific UI, logic, and data access.

`src/hooks/`: Stores shared hooks that can be reused across multiple features.

`src/lib/`: Stores reusable helpers, adapters, and integrations for third-party libraries.

`src/stores/`: Stores shared state containers when the app uses a global store.

`src/testing/`: Stores shared test helpers, mocks, fixtures, and setup utilities.

`src/utils/`: Stores shared utility functions that do not belong to a feature.

Codebase architecture rule:

- Shared code should stay reusable and stay outside feature-specific folders.
- Features should stay isolated from one another and should not import from other feature folders directly.
- The app layer should compose features together.
- Keep feature-local UI, hooks, and data access inside the feature folder instead of promoting them too early.

Feature folder structure (per-feature):

feature-name/
├─ components/ # UI specific to this feature
├─ hooks/ # Feature-specific hooks
├─ api/ # Data-fetching services / adapters
├─ tests/ # Feature-level tests (optional)
└─ index.ts # Entry point exporting the feature's main components

Example: `src/features/navbar/`

    components/
      MobileMenu.tsx
    hooks/
      useNavbarState.ts
    api/
      navbarService.ts
    index.ts

Benefits:

- Encapsulates feature concerns and keeps imports local to the feature.
- Easier to scale: add new features without polluting global directories.
- Simplifies code ownership and testing.

Guidelines when to create a feature folder:

- Create a feature folder when the UI requires multiple components, feature-specific hooks, or API services (e.g., `Auth`, `Dashboard`, `BountyFlow`).
- Keep simple, reusable UI atoms (e.g., `Button`, `Icon`, `Input`) in `src/components/` as single files until they grow.

Small reusable components examples (stay in `src/components/`):

- Button
- Icon
- Input / TextField
- Avatar
- Badge
- Spinner / Loader

Feature (big) components examples (create feature folder in `src/features/`):

- Navbar
- Dashboard
- Auth
- TaskCard
- BountyFlow
- ProfilePage

## Examples — Big vs Small components

- Big / feature folders (create folder): `Navbar`, `Dashboard`, `Auth`, `TaskCard`, `BountyFlow`, `ProfilePage`
- Small / single-file components (put in `src/components/`): `Button.js`, `Icon.js`, `Input.js`, `Tag.js`, `Tooltip.js`, `Skeleton.js`

## Naming rules

- Scalable component folder: use lowercase or kebab-case for folder (`navbar` or `task-card`) and `index.js`/`index.tsx` inside.
- Files that export React components should use PascalCase for the component name (e.g., `function Navbar() {}` in `index.js`).
- Keep file extensions consistent: use `.jsx` or `.js` for JS Files.

## Branching & PR Rules

1. Never push features directly to `main`.
2. For any assigned feature create a branch named exactly:

   FEATURE-(short-descriptive-name)

   Example: `FEATURE-user-auth-google` or `FEATURE-navbar-redesign`

3. Push your branch to remote and open a Pull Request targeting `main` when the feature is complete.
4. PR requirements:
   - Provide a descriptive title and a detailed description of what changed and why.
   - Link any related issue or task.
   - Tag the TeamLead (@Dave) as a reviewer.

## Commit message guidance

- Make every commit focused and descriptive. Use the following pattern for longer changes:

  <type>(<scope>): short summary

  Detailed description (one or more paragraphs). Explain why the change is made, any important implementation details, and side effects. Reference tickets/issues if relevant.

- Types examples: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`.

Example detailed commit message

    feat(auth): add Google OAuth social login

    Add Google OAuth support to the authentication flow. This includes:
    - New `GoogleSignIn` component with logout support
    - Backend token exchange endpoint integration
    - Unit tests for login flow and error cases
    - Updated README with setup details for Google credentials

    Closes: ISSUE-123

## PR checklist (before requesting review)

- [ ] Builds locally without errors
- [ ] All tests pass
- [ ] Linting/formatting applied
- [ ] Documentation updated (if applicable)

## AI-assisted coding rules

- You may use AI tools to draft code, but you must:
  - Ensure generated code is readable, idiomatic, and well-named; do not keep unclear variable or function names.
  - Run linters and formatters (`eslint --fix`, `prettier`) on AI-generated code.
  - Review and understand every line before committing; remove any unused or unclear code.
  - If you paste a code snippet inspired by AI, add a short comment in the commit or PR describing this and any sources used.

## Developer etiquette

- Keep PRs focused and small when possible.
- Ask for help early — open a draft PR or ping the TeamLead.
- Document assumptions and trade-offs in PR descriptions.

Thank you — keep code clean, documented, and review-ready.
