**Team Workflow & Conventions — TasBon Bounty Platform**

Purpose
-------
This document defines our team workflow, folder structure, component conventions, branching and PR rules, commit message standards, and AI-assisted coding guidelines for the TasBon Bounty Platform (React).

Tech stack
----------
- Frontend: React (JavaScript or TypeScript)
- State: (decide per feature — e.g., Context, Redux, Zustand)
- Styling: CSS Modules / Styled Components / Tailwind (team decision per repo)

Folder structure & component conventions
--------------------------------------
We follow a standard React project layout. Two kinds of UI units:

1) Scalable / feature components (create a folder)
	 - When a feature is more than a small reusable atom (e.g., Navbar, Dashboard, Auth, TaskList), create a folder under `src/components/` (or `src/features/`) with the component name and use an entry file named `index.js` or `index.tsx`.
	 - Example: to add a Navbar feature:

		 src/components/navbar/
		 ├─ index.jsx        # main component (export default)
		 ├─ Navbar.module.css
		 ├─ Navbar.test.jsx
		 └─ helpers.js

	 - Use folder-scoped CSS or module files and colocate tests and small helper files.

2) Small reusable components (single file in `src/components/`)
	 - Atoms and small UI pieces that are reused across the app live as single files inside `src/components/` (no extra folder unless they grow).
	 - Example small components:
		 - Button
		 - Icon
		 - Input / TextField
		 - Avatar
		 - Badge
		 - Spinner / Loader

Examples — Big vs Small components
---------------------------------
- Big / feature folders (create folder): `Navbar`, `Dashboard`, `Auth`, `TaskCard`, `BountyFlow`, `ProfilePage`
- Small / single-file components (put in `src/components/`): `Button.js`, `Icon.js`, `Input.js`, `Tag.js`, `Tooltip.js`, `Skeleton.js`

Naming rules
------------
- Scalable component folder: use lowercase or kebab-case for folder (`navbar` or `task-card`) and `index.js`/`index.tsx` inside.
- Files that export React components should use PascalCase for the component name (e.g., `function Navbar() {}` in `index.js`).
- Keep file extensions consistent: use `.tsx` for TypeScript React files and `.jsx` or `.js` for JS projects.

Branching & PR Rules
--------------------
1. Never push features directly to `main`.
2. For any assigned feature create a branch named exactly:

	 FEATURE-(short-descriptive-name)

	 Example: `FEATURE-user-auth-google` or `FEATURE-navbar-redesign`

3. Push your branch to remote and open a Pull Request targeting `main` when the feature is complete.
4. PR requirements:
	 - Provide a descriptive title and a detailed description of what changed and why.
	 - Include screenshots or gifs for UI changes.
	 - Add unit/integration tests for new behavior where applicable.
	 - Link any related issue or task.
	 - Tag the TeamLead (@me) in the PR description or as a reviewer.

Commit message guidance
-----------------------
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

PR checklist (before requesting review)
-------------------------------------
- [ ] Builds locally without errors
- [ ] All tests pass
- [ ] Linting/formatting applied
- [ ] Documentation updated (if applicable)
- [ ] Screenshots or recording attached for UI changes

AI-assisted coding rules
------------------------
- You may use AI tools to draft code, but you must:
	- Ensure generated code is readable, idiomatic, and well-named; do not keep unclear variable or function names.
	- Run linters and formatters (`eslint --fix`, `prettier`) on AI-generated code.
	- Add or update unit tests covering important logic.
	- Review and understand every line before committing; remove any unused or unclear code.
	- If you paste a code snippet inspired by AI, add a short comment in the commit or PR describing this and any sources used.

Developer etiquette
------------------
- Keep PRs focused and small when possible.
- Ask for help early — open a draft PR or ping the TeamLead.
- Document assumptions and trade-offs in PR descriptions.

Where to put this document
--------------------------
- This file `Team-Convention.md` is the canonical team convention. Add a short pointer from the repo `README.md` to this file.

Next steps for contributors
--------------------------
1. Read this document and follow the branching rules.
2. When assigned a feature, create `FEATURE-(name)` branch and work there.
3. Open a PR with clear title, description, and tag the TeamLead (`@me`).

Thank you — keep code clean, documented, and review-ready.

