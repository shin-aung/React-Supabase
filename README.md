🚀 React + TypeScript + Vite + Supabase

This project is built using:

⚛️ React

🔷 TypeScript

⚡ Vite

🗄️ Supabase

It provides a modern frontend setup with backend services powered by Supabase.

📦 Installation

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install required packages:

npm install
🔐 Environment Variables Setup

This project requires environment variables to connect to Supabase.

Please request the .env file from the developer.

Create a .env file in the root directory and add the required variables:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

⚠️ Do NOT commit your .env file to GitHub.

Make sure .env is included in your .gitignore.

▶️ Running the Application

Start the development server:

npm run dev

The app will typically run at:

http://localhost:5173
🏗️ Build for Production

To create a production build:

npm run build

To preview the production build:

npm run preview
📁 Tech Stack Overview

Frontend: React + TypeScript

Build Tool: Vite

Backend & Auth: Supabase
