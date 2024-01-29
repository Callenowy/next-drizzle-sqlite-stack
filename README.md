<!-- Improved compatibility of back-to-top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

# The Stack

<div style="text-align: center">
<img src="public/developer-logo.svg" alt="the stack logo" height="120px" width="auto" />
</div>

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#env-config)
    - [App Pepper](#app-pepper)
    - [AuthJS Secret](#authjs-secret)
    - [Env variables](#env-vars)
  - [Running the Application](#running-app)
- [Production build](#production-build)
  - [Create the production image](#create-production-image)
  - [Run the production image](#run-production-image)
  - [Useful Commands](#useful-commands)
- [Features](#features)
- [Version Control and Maintenance](#version-control)
- [Roadmap](#roadmap)
- [License](#license)

## <a name="overview">Overview</a>

The Stack is a web application developed using Next.js. It serves as a recruitment task, allowing users to interact with a server explorer interface. This app displays a list of servers along with their distance from the user, and users can sort this list by name or distance. The flag of the country to which the server belongs accompanies it.

Solution available at URL [https://developer-app-rana.fly.dev](https://developer-app-rana.fly.dev)

## <a name="getting-started">Getting Started</a>

### <a name="prerequisites">Prerequisites</a>

To install this project, you will need to have the following on your machine :

![Node](https://img.shields.io/badge/-nodejs-black?style=for-the-badge&logoColor=white&logo=node.js&color=366A31)
![NPM](https://img.shields.io/badge/-npm-black?style=for-the-badge&logoColor=white&logo=npm&color=B76507)
![Docker](https://img.shields.io/badge/-Docker-black?style=for-the-badge&logoColor=white&logo=docker&color=004EA2)

We recommend to use the node version specified in the `.nvmrc` file.

### <a name="installation">Installation</a>

Run the following commands :

```bash
 # Install dependencies and Husky hooks
npm install
```

### <a name="env-config">Environment Configuration</a>

#### <a name="app-pepper">App Pepper</a>

The "pepper" is a secret added to the hashing process to provide an additional layer of security. It's similar to salt, but while salt is typically stored alongside the hashed password in the database and is unique for each user, pepper is a secret value that is kept separate from the database and is the same across all users.

The purpose of a pepper is to defend against attacks where the attacker has gained access to the hashed passwords and the salts but not the application code or configuration where the pepper is stored. In such a case, the attacker would not be able to crack the passwords using a rainbow table or similar precomputed table attack because they would not have the pepper value that was used in the hashing process.

To generate an arbitrary string, you can use the following command in the terminal:

```bash
openssl rand -base64 32
```

#### <a name="authjs-secret">AuthJS Secret</a>

An AuthJS secret is a random string used to hash tokens, sign cookies, and generate cryptographic keys. To generate an arbitrary string, you can use the following command in the terminal:

```bash
openssl rand -base64 32
```

Or generate one [online](https://generate-secret.vercel.app/32)

#### <a name="env-vars">Env variables</a>

Create a `.env` file with the following variables:

- `NEXT_PUBLIC_HOST`: The host URL.
- `DB_PATH`: A path where the database file will be stored
- `APP_PEPPER`: The secret key used as a "pepper" in the password hashing process.
- `NEXTAUTH_SECRET`: The secret key for NextAuth. Paste here AuthJS Secret.
- `NEXTAUTH_URL`: Same as `NEXT_PUBLIC_HOST`.
- `E2E_TEST_USERNAME`: Username for E2E testing.
- `E2E_TEST_PASSWORD`: Password for the E2E test user.

### <a name="running-app">Running the Application</a>

To run the app in dev mode, run the following commands in the terminal:

```bash
# Create the database
npm run db:migration:run

# Seed the data base
npm run db:seed

# Create application user
npm run db:user:create

# Run the app in dev mode
npm run dev
```

## <a name="production-build">Production build</a>

The app contains everything needed to get all Next.js production environments up and running with Docker Compose.

Combined with the Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) feature, only `node_modules` files required for production are copied into the final Docker image.

First, build the production server (Final image approximately 110 MB).

### <a name="create-production-image">Create the production image</a>

```bash
# Create a network that allows containers to communicate
# with each other by using their container name as a hostname
docker network create the_stack_network

# Build prod
docker compose -f docker-compose.prod.yml build
```

### <a name="run-production-image">Run the production image</a>

To run the app in production mode, run the following command in the terminal:

```bash
# Up prod in detached mode
docker compose -f docker-compose.prod.yml up -d
```

Open [http://localhost:3000](http://localhost:3000).

### <a name="useful-commands">Useful commands</a>

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes
```

## <a name="features">Features</a>

- Built with `Next.js`, `Drizzle ORM` and `SQLite`.
- Utilize `@node-rs/argon2` to hash and verify passwords, providing a high level of security for user data.
- Responsive Web Design (RWD).
- Unit, Integration, and E2E Testing with Vitest and Playwright.
- SVG sprites for icons.
- Static code linting and formatting using `Eslint` and `Prettier`,
- Continuous Integration and Deployment with GitHub Actions running `lint`, `vitest`, `playwright`, and `deploy` commands.
- Deployment automated on `Fly.io`.
- Semantic versioning with `semantic-release`.
- Automatic dependency updates with `Renovate`.
- Adherence to `Conventional Commits` standards.
- Use of `lint-staged` for code quality.
- Incorporation of `Class Variance Authority (CVA)` and TypeScript reset utility (ts-reset) for better type safety and cleaner code.

## <a name="version-control">Version Control and Maintenance</a>

This project uses `semantic-release` for version management, ensuring automated versioning and changelog generation. Before committing, we provide code quality by using `lint-staged` and following the `Conventional Commits` standard for commit messages. Renovate helps in keeping dependencies up-to-date.

## <a name="roadmap">Roadmap</a>

Here is a list of upcoming functionalities and improvements:

- Integration with Microsoft Clarity.
- Integration with New Relic.
- Integration with Sentry.
- I18n support using (next-intl).
- MFA support.
- Passwordless login using GitHub, Apple, and Microsoft providers.
- Magic link authentication.
- Password reset functionality.
- Dark theme.
- Lazy loading mechanism for server list.
- Improve app colors for accessibility.
- Integration tests and enhanced coverage

## <a name="license">License</a>

The Stack App is software licensed under the [MIT license](LICENSE).
