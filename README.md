# React + Clerk + Convex Template

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Clerk](https://img.shields.io/badge/-Clerk-%23E5E5E5?style=for-the-badge&logo=Clerk&logoColor=058a5e)
![Convex](https://img.shields.io/badge/Convex-FF6600?style=for-the-badge&logo=convex&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

This is a template for building a React app with [Clerk](https://clerk.com) and [Convex](https://convex.dev).

## Functionality

This template includes the following functionality:
<ul>
   <li>Authentication with Clerk</li>
   <li>Backend with Convex</li>
   <li>Routing with react-router-dom</li>
   <li>Styling with Chakra UI</li>
   <li>E2E Testing with Cypress</li>
   <li>Tailwind CSS</li>
   <li>Material Design Icons</li>
</ul>

## Getting Started

You'll need an account on [Clerk](https://clerk.com) and [Convex](https://convex.dev) to get started. You'll also need to have installed [Node.js](https://nodejs.org/en/).

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/OccultSlolem/ReactClerkConvexTemplate.git
mv ReactClerkConvexTemplate <your-project-name> # Optionally, rename the project
cd <your-project-name>

# Change the remote origin to your own repository:
git remote set-url origin <your-repository-url>

# Install dependencies
npm install
```

### 2. Create Convex and Clerk applications

1. Run `npx convex init` inside the repository and follow the prompts to either create a new Convex application or connect to an existing one.
2. Create a new Clerk application on the [Clerk dashboard](https://dashboard.clerk.com).
3. Go into the application you just created and copy the Clerk publishable key into the `VITE_REACT_APP_CLERK_PUBLISHABLE_KEY` field in `.env.local`. Create it if it doesn't exist.

**Warning: All dotenv files are present in this repository for demonstrative purposes.** Make sure to gitignore them and remove them from the repository if you're using this template for your own project.

4. Go into the application settings and create a new JWT template for Convex.
5. Copy the Issuer field to your clipboard. Hold onto it for now.
6. Go to the [Convex dashboard](https://dashboard.convex.dev) and select your application.
7. Go to the "Settings" tab and go to the "Environment Variables" section.
8. Add a new environment variable with the key `AUTH_DOMAIN` and the value of the Issuer field you copied earlier. 

### 3. Run the app

```bash
# Start the dev server for the React app
npm run dev

# Start the dev server for Convex
npx convex dev
```
