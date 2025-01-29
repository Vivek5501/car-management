
🚗 Car Management System

A Car Management System built with React, Supabase, and Tailwind CSS to manage car listings. It includes authentication, CRUD operations, and protected routes.


🛠️ Tech Stack

**Frontend:** React, React Router, Tailwind CSS

**Backend:** Supabase (PostgreSQL, Authentication)

**Authentication:** Vercel

**Deployment:** Supabase Auth



🚀 Features

✅ User Authentication (Login & Register)

✅ View, Add, Edit, and Delete Cars

✅ Protected Routes (Only logged-in users can access)

✅ Responsive Design with Tailwind CSS

✅ Deployed on Vercel


## Installation

Install my-project with npm

1️⃣ Clone the Repository
```bash
  git clone https://github.com/Vivek5501/car-management.git
  cd car-management
```

2️⃣ Install Dependencies
```bash
  npm install
```

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:
```bash
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4️⃣ Run the Development Server
```bash
  npm run dev
```
## Deployment

1️⃣ Install Vercel CLI (if not installed)

```bash
  npm install -g vercel
```

2️⃣ Log in to Vercel
```bash
  vercel login
```

3️⃣ Deploy the Project
```bash
  vercel
```

4️⃣ Fix Routing Issues (if needed)

Create vercel.json in the root folder:
```bash
  {
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

```


## Screenshots



