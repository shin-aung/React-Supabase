# 🚀 React + TypeScript + Vite + Supabase

This project is built using modern web technologies:

- ⚛️ React  
- 🔷 TypeScript  
- ⚡ Vite  
- 🗄️ Supabase  

It provides a fast frontend development environment with backend services powered by Supabase.

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Required Packages

```bash
npm install
```

---

## 🔐 Environment Variables Setup

This project requires environment variables to connect to Supabase.

Please request the `.env` file from the developer.

Create a `.env` file in the root directory and add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### ⚠️ Important

- Do **NOT** commit your `.env` file to GitHub.
- Make sure `.env` is included in your `.gitignore`.

Example `.gitignore` entry:

```
.env
node_modules
dist
```

---

## ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will usually run at:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript  
- **Build Tool:** Vite  
- **Backend & Authentication:** Supabase  

---

## 📄 Notes

- Ensure Node.js (v16 or higher recommended) is installed.
- Make sure environment variables are properly configured before running the application.
- Do not expose your Supabase keys publicly.
