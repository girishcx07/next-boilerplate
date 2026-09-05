# Next.js 16 Boilerplate with Next Auth, tRPC, Drizzle, Tailwind CSS 4, and TypeScript

Next.js 16 boilerplate with App Router support, React 19, Next Auth, tRPC, Drizzle ORM with PostgreSQL, Tailwind CSS 4, and TypeScript ⚡️ Prioritizing developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, Testing Library, Commitlint, VSCode, PostCSS, Tailwind CSS, Authentication with [NextAuth](https://next-auth.js.org/), Storybook and more.

Clone this project and use it to create your own [Next.js](https://nextjs.org) project. This project is a minimalistic boilerplate for Next.js with the following features:

## Features

Developer experience first, extremely flexible code structure and only keep what you need:

- ⚡ [Next.js](https://nextjs.org) with App Router support
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com)
- ✅ Strict Mode for TypeScript and React 19
- 🔒 Authentication with [Next Auth](https://next-auth.js.org/): Sign up, Sign in, Sign out.
- 🗄️ Type-safe PostgreSQL database access with [Drizzle ORM](https://orm.drizzle.team/)
- ♻️ Type-safe environment variables with T3 Env
- ⌨️ Form handling with React Hook Form
- 🔴 Validation library with Zod
- 📏 Linter with [ESLint](https://eslint.org) (Next.js Core Web Vitals, Tailwind CSS, Storybook, Jest, and Playwright configuration)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🚓 Lint git commit with Commitlint
- 📓 Write standard compliant commit messages with Commitizen
- 🦺 Unit Testing with Jest and React Testing Library
- 🧪 Integration and E2E Testing with Playwright
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development
- 🎁 Automatic changelog generation with Semantic Release
- 🔍 Visual testing
- 💡 Absolute Imports using `@` prefix
- 🗂 VSCode configuration: Debug, Settings, Tasks and Extensions
- 🤖 SEO metadata, JSON-LD and Open Graph tags
- 🗺️ Sitemap.xml and robots.txt
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- 🌈 Include a FREE minimalist theme
- 💯 Maximize lighthouse score

Built-in feature from Next.js:

- ☕ Minify HTML & CSS
- 💨 Live reload
- ✅ Cache busting

### Philosophy

- Nothing is hidden from you, so you have the freedom to make the necessary adjustments to fit your needs and preferences.
- Easy to customize
- Minimal code
- SEO-friendly
- 🚀 Production-ready

### Requirements

- Node.js 24+ and pnpm. You can install Node.js by running:

```sh
nvm install 24.20.0 && nvm use 24.20.0
```

### Getting started

Run the following command on your local environment:

```shell
git clone --depth=1 https://github.com/paalamugan/next14-biolerplate-with-next-auth.git my-project-name
cd my-project-name
pnpm install
```

#### Prerequisites

- Copy the `.env.example` file to `.env.local` and update the environment variables with your own values.

```shell
cp .env.example .env.local
```

and update the environment variables with your own values.

### Database

This boilerplate uses Drizzle ORM with PostgreSQL through the `postgres` driver. Set `DATABASE_URL` in `.env.local` before running database commands:

```dotenv
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/next_boilerplate
```

The Drizzle client is available from `@/server/db` and the schema is maintained in `src/server/db/schema.ts`. Database access belongs in Server Components, Route Handlers, server actions, or tRPC procedures; do not import the database client into Client Components.

Run the following commands from the project root:

```shell
# Generate SQL migrations from schema changes
pnpm db:generate

# Apply committed migrations to PostgreSQL
pnpm db:migrate

# Push the schema directly during local prototyping
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

Drizzle output under `/drizzle` is intentionally ignored by Git in this boilerplate. Use `db:generate` followed by `db:migrate` when working locally with generated migrations, or use `db:push` to sync a local database directly from the schema.

Then, you can run the project locally in development mode with live reload by executing:

```shell
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser to see your project.

### Project structure

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── scripts                         # Scripts folder
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # React components
│   │   ├── __stories__              # Storybook stories
│   │   └── __tests__                # Jest/RTL component tests
│   ├── constants                   # constants folder
│   ├── server                      # server folder
│   │   └── db                      # Drizzle client and PostgreSQL schema
│   ├── stores                      # Store folder (Zustand)
│   ├── hooks                       # hooks folder
│   |   ├── react-client            # client side hooks
│   |   ├── react-server            # server side hooks
│   |   ├── react-generic           # generic hooks (both client and server)
│   ├── layouts                     # layouts folder
│   ├── lib                         # 3rd party libraries configuration
│   ├── providers                   # providers folder
│   ├── styles                      # Styles folder
│   ├── templates                   # Templates folder
│   ├── trpc                        # tRPC folder
│   ├── types                       # Type definitions
│   ├── utils                       # Utilities folder
│   └── validations                 # Validation schemas(Zod)
├── tests
│   ├── e2e                         # E2E tests, also includes Monitoring as Code
│   └── integration                 # Integration tests
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── drizzle.config.ts               # Drizzle Kit configuration
└── drizzle                         # Ignored Drizzle-generated artifacts
```

### Customization

You can easily configure Next js Boilerplate by making a search in the whole project with `FIXME:` for making quick customization. Here is some of the most important files to customize:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your website favicon, you can generate from [https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/)
- `src/constants/appConfig.ts`: configuration file
- `src/templates/BaseTemplate.tsx`: default theme
- `next.config.mjs`: Next.js configuration
- `.env`: default environment variables

You have access to the whole code source if you need further customization. The provided code is only example for you to start your project. The sky is the limit 🚀.

### Commit Message Format

The project enforces [Conventional Commits](https://www.conventionalcommits.org/) specification. This means that all your commit messages must be formatted according to the specification. To help you write commit messages, the project uses [Commitizen](https://github.com/commitizen/cz-cli), an interactive CLI that guides you through the commit process. To use it, run the following command:

```shell
pnpm commit
```

One of the benefits of using Conventional Commits is that it allows us to automatically generate a `CHANGELOG` file. It also allows us to automatically determine the next version number based on the types of commits that are included in a release.

### Testing

All unit tests are located with the source code inside the same directory. So, it makes it easier to find them. The project uses Jest and React Testing Library for unit testing. You can run the tests with:

Storybook stories are grouped under `src/components/__stories__`. They are component scenarios for Storybook, not Jest tests, and are discovered by `.storybook/main.ts`.

```shell
pnpm test
```

### Integration & E2E Testing

The project uses Playwright for Integration and E2E testing. You can run the tests with:

```shell
npx playwright install # Only for the first time in a new environment
pnpm test:e2e
```

### Enable Edge runtime (optional)

The App Router folder is compatible with the Edge runtime. You can enable it by uncommenting the following lines `src/app/layout.tsx`:

```tsx
// export const runtime = 'edge';
```

### Deploy to production

Then, you can generate a production build with:

```shell
pnpm build
```

It generates an optimized production build of the boilerplate. For testing the generated build, you can run:

```shell
pnpm start
```

The command starts a local server with the production build. Then, you can now open [http://localhost:3000](http://localhost:3000) with your favorite browser to see the project.

### Useful commands

#### Bundle Analyzer

Next.js Boilerplate comes with a built-in bundle analyzer. It can be used to analyze the size of your JavaScript bundles. To begin, run the following command:

```shell
pnpm build-stats
```

By running the command, it'll automatically open a new browser window with the results.

### VSCode information (optional)

If you are VSCode users, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

With the plugins installed on your VSCode, ESLint and Prettier can automatically fix the code and show you the errors. Same goes for testing, you can install VSCode Jest extension to automatically run your tests and it also show the code coverage in context.

Pro tips: if you need a project wide type checking with TypeScript, you can run a build with `Cmd` + `Shift` + `B` on Mac.

### License

Licensed under the MIT License, Copyright © 2024

See [LICENSE](LICENSE) for more information.
