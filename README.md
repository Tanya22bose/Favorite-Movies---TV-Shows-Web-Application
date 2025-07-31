## 🎬 Favorite Movies & TV Shows Web App
A full-stack web app to manage your favorite movies and TV shows. Supports adding, editing, deleting, and viewing entries with infinite scrolling.

## 🛠 Tech Stack
Frontend
- React + Vite + TypeScript
- Tailwind CSS
- Ant Design
- Redux Toolkit

Backend
- Node.js
- Express
- Mongo DB
- Yup for validation

## ⚙️ Setup Instructions
1. Clone the Repo
```git clone https://github.com/your-username/movies-app.git 
cd movies-app
```

2. Backend Setup
```
cd backend
npm install
```

3. Create DB in Mongo DB Atlas:

4. Create .env in /backend, add mongo url from mongo db atlas cluster:
```
mongo_url = ''
JWT_SECRET = ''
```

5. Start server:
```
npx nodemon server.js
```

6. Frontend Setup
```
cd frontend
npm install
```

7. Start frontend:
```npm run dev```

## ✨ Features
- Add, edit, delete movies/TV shows
- Modal confirmations
- Responsive UI
- Poster upload
- Authentication (login/signup)
