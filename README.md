# JobTrackr: Professional Job Application Tracker

JobTrackr is a modern, responsive dashboard designed to help you efficiently track your job applications. Built with Next.js, ShadCN UI, and Supabase, it provides a clean and intuitive interface for managing your job search process.

## ✨ Features

- **Secure Authentication**: Sign up and log in securely with email/password or Google, powered by Supabase Auth.
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

## 📦 Getting Started

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

The application will be available at [http://localhost:9002](http://localhost:9002).

## 📁 Project Structure

```
.
├── src
│   ├── app         # Next.js App Router (pages, layouts, etc.)
│   ├── ai          # Genkit AI flows and configuration
│   ├── components  # Reusable React components (UI and dashboard)
│   ├── lib         # Core logic, Supabase clients, actions, and types
│   ├── hooks       # Custom React hooks
│   └── ...
├── supabase
│   └── migrations  # Database migration files
└── ...
```

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/docs/studio).
