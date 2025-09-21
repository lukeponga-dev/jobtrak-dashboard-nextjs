# JobTrackr: Professional Job Application Tracker

JobTrackr is a modern, responsive dashboard designed to help you efficiently track your job applications. Built with Next.js, ShadCN UI, and Supabase, it provides a clean and intuitive interface for managing your job search process.

## ✨ Features

- **Secure Authentication**: Sign up and log in securely with email/password, powered by Supabase Auth.
- **Intuitive Dashboard**: Get a quick overview of your application stats with clean, easy-to-read cards.
- **Application Tracking**: Add, update, and delete job applications with details like company, role, date applied, and status.
- **AI-Powered Suggestions**: Get smart suggestions for your application's status based on the role and application date.
- **Responsive Design**: A fully responsive layout that works beautifully on desktops, tablets, and mobile devices.
- **Data Export**: Export your application data to a CSV file with a single click.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Database & Auth**: [Supabase](https://supabase.io/)
- **AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 📦 Getting Started (Running This Project)

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later)
- [npm](https://www.npmjs.com/)

### 1. Set Up Environment Variables

Create a `.env` file in the root of your project and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
DATABASE_URL="YOUR_SUPABASE_DATABASE_CONNECTION_STRING"
```

You can find these in your Supabase project settings.

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Run the Database Migrations

Apply the database schema to your Supabase instance:

```bash
npm run db:migrate
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🛠️ Building It Yourself: A High-Level Guide

This project was initially created using [Firebase Studio](https://firebase.google.com/docs/studio), which automates much of the setup. However, you can build a similar application from scratch by following these steps.

### 1. Initialize Next.js Project

Start by creating a new Next.js application with TypeScript and Tailwind CSS.

```bash
npx create-next-app@latest my-job-tracker --typescript --tailwind --eslint
cd my-job-tracker
```

### 2. Set Up ShadCN UI

Integrate ShadCN UI for a library of high-quality, accessible components.

```bash
npx shadcn-ui@latest init
```

The CLI will ask you a few questions to configure `components.json`. You can accept the defaults or customize them to your liking. After initialization, you can add components as needed:

```bash
npx shadcn-ui@latest add button card input label
```

### 3. Set Up Supabase

Supabase will handle your database and authentication.

1.  **Create a Supabase Project**: Go to [supabase.com](https://supabase.com), create an account, and start a new project.
2.  **Get API Credentials**: In your project's settings, find the API URL and `anon` key. Add them to a new `.env.local` file.
3.  **Install Supabase SDK**: `npm install @supabase/supabase-js @supabase/ssr`
4.  **Define Schema**: Create a `supabase/migrations` directory and define your SQL schema for the `job_applications` table. You can use the schema from this project as a reference.

### 4. Implement Authentication and Actions

- Create Supabase clients for server (`/lib/supabase/server.ts`), client (`/lib/supabase/client.ts`), and middleware (`/lib/supabase/middleware.ts`).
- Implement server actions (`/lib/actions.ts`) for `signIn`, `signUp`, and `signOut`.
- Set up protected routes using Next.js middleware (`/src/middleware.ts`) to manage sessions.

### 5. Integrate Genkit for AI Features

Genkit powers the AI-driven status suggestions.

1.  **Install Genkit and Google AI Plugin**: `npm install genkit @genkit-ai/googleai @genkit-ai/next`
2.  **Get a Gemini API Key**: Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  **Configure Genkit**: Create an AI configuration file (`/src/ai/genkit.ts`) to initialize the Genkit instance with the Google AI plugin.
4.  **Create a Flow**: Define a Genkit flow (`/src/ai/flows/suggest-application-status.ts`) that takes job details as input and uses a Gemini model to suggest a likely status. Use Zod for schema validation.
5.  **Expose the Flow**: Call the Genkit flow from a server action to make it available to your client-side components.

This guide provides a high-level overview. Each step involves writing code for UI components, pages, and logic, which you can reference from this project's source code. Happy building!

## 📁 Project Structure

```
.
├── src
│   ├── app         # Next.js App Router pages and layouts
│   ├── ai          # Genkit AI flows and configuration
│   ├── components  # Reusable React components
│   ├── lib         # Core logic, Supabase clients, and actions
│   ├── hooks       # Custom React hooks
│   └── middleware.ts # Next.js middleware for session management
├── supabase
│   └── migrations  # Database migration files
└── ...
```
