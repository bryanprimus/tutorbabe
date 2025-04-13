# Tutorbabe Monorepo

A centralized monorepo for the Tutorbabe project.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/9f754c67-ac62-42cb-a3a0-65499148dac6" width="100%" alt="home" /></td>
    <td><img src="https://github.com/user-attachments/assets/e3a7b024-0992-4c10-afb9-fb80c95b5aaa" width="100%" alt="sign-in" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c797a589-d9e5-46cd-8784-291bc1b35453" width="100%" alt="complete-profile" /></td>
    <td><img src="https://github.com/user-attachments/assets/9550e173-3e58-4ae9-8c22-0340272ec6bb" width="100%" alt="profile" /></td>
  </tr>
</table>



## Project Structure

This project is organized as a monorepo with the following structure:

```
├── apps/
│   ├── frontend-repo/     # Next.js frontend application
│   └── backend-repo/      # Express.js backend API
├── packages/
│   └── shared/            # Shared types and utilities
```

## Tech Stack

### Frontend
- **Next.js** - React framework with server-side rendering
- **Material UI** - Component library for modern UI
- **Redux Toolkit** - State management
- **Firebase** - Authentication and cloud services
- **TanStack React Form** - Form handling

### Backend
- **Express.js** - Node.js web application framework
- **Firebase Admin** - Server-side Firebase integration
- **Zod** - TypeScript-first schema validation

### Shared
- **TypeScript** - Type safety across the entire project
- **Zod** - Schema validation shared between frontend and backend

### Development Tools
- **Turborepo** - Monorepo build system
- **pnpm** - Fast, disk space efficient package manager
- **Biome** - Linting and formatting

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd tutorbabe
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

   - For the frontend:
     - Copy `apps/frontend-repo/.env.example` to `apps/frontend-repo/.env`
     - Fill in the Firebase configuration values

   - For the backend:
     - Create `.env` file in `apps/backend-repo/` if needed
     - The default port is 8000, but can be customized

### Development

Run the entire project in development mode:

```bash
pnpm dev
```

This will start both the frontend and backend in development mode with hot reloading.

To run only specific parts:

```bash
# Frontend only
pnpm --filter frontend-repo dev

# Backend only
pnpm --filter backend-repo dev
```

### Building

Build all packages and applications:

```bash
pnpm build
```

### Linting and Formatting

```bash
# Run linting
pnpm lint

# Run type checking
pnpm check-types

# Format code
pnpm format
```

## Deployment

### Frontend

The Next.js application can be deployed to Vercel or any other hosting platform that supports Next.js:

```bash
cd apps/frontend-repo
pnpm build
pnpm start
```

### Backend

The Express.js backend can be deployed to any Node.js hosting service:

```bash
cd apps/backend-repo
pnpm build
pnpm start
```

## Project Features

- **User Management**: Authentication and user profiles
- **Shared Types**: Type definitions shared between frontend and backend
- **Error Handling**: Consistent error handling with shared utilities

## Monorepo Benefits

- **Shared Code**: Common code is maintained in the shared package
- **Consistent Development**: Same tooling across all packages
- **Efficient Builds**: Turborepo caches build artifacts for faster builds
- **Coordinated Versioning**: Easier to maintain compatibility between packages


## Author

Bryan Primus
