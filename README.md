# projectRedo

A simple, intuitive, and elegant job application tracking dashboard.

## Getting Started

### 1. Set Up Environment Variables

Create a `.env` file in the root of your project and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
DATABASE_URL="YOUR_SUPABASE_DATABASE_CONNECTION_STRING"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Database Migrations

```bash
npm run db:migrate
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).
