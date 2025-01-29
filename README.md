
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

![alt text]({EA76FB19-5914-4184-B127-6941C6191628}.png)
![alt text]({0866A545-1C1E-47EC-89E7-D8BE24D33CA2}.png)
![alt text]({233C19B4-AA63-4403-8FF1-600A0B0378B7}.png)
![alt text]({86CD92A2-8E76-4CAF-BF34-987D8D77B76D}.png)

<table>
  <tr>
    <td><img src="https://github.com/vishal1patidar/Quicksell-Frontend-assignment/assets/79128256/6119f174-c748-40c7-98a9-0b80c5573151" alt="" /></td>
    <td><img src="https://github.com/vishal1patidar/Quicksell-Frontend-assignment/assets/79128256/870bb1a3-33b7-443b-add5-dcc1fc81a4c6" alt="" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/vishal1patidar/Quicksell-Frontend-assignment/assets/79128256/ae532c31-ceb8-4414-aae2-735c2b4c40d1" alt="" /></td>
    <td><img src="https://github.com/vishal1patidar/Quicksell-Frontend-assignment/assets/79128256/bf8202a8-6633-49b2-8e26-19f0db1e17ce" alt="" /></td>
  </tr>
</table>


