# 🥗 Smart Recipe - AI-Powered Healthy Meal Recommendation Platform

Smart Recipe is a full-stack application that allows users to explore AI-generated healthy recipes, save their favorites, ask nutrition-related questions, and manage preferences — all backed by React, Node.js, MongoDB, and OpenAI.

---

## 📁 Project Structure

```bash
final-project-v2/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   └── userRoute.js
│   ├── validators/
│   │   └── userValidator.js
│   ├── Job.js
│   ├── jobRoutes.js
│   ├── .env
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore

├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Footer.jsx
│       │   ├── Navbar.jsx
│       │   ├── PageWrapper.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── admin/
│       │   │   ├── AddRecipe.jsx
│       │   │   ├── adminProfile.jsx
│       │   │   ├── Home.jsx
│       │   │   └── QA.jsx
│       │   └── user/
│       │       ├── Analysis.jsx
│       │       ├── Community.jsx
│       │       ├── Home.jsx
│       │       ├── Login.jsx
│       │       ├── Profile.jsx
│       │       ├── Recommendations.jsx
│       │       └── Subscription.jsx
│       ├── redux/
│       │   ├── jobSlice.js
│       │   ├── store.js
│       │   └── userSlice.js
│       ├── utils/
│       │   └── axios.js
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── index.html
│       ├── main.jsx
│       ├── vite.config.js
│       └── README.md

├── .gitignore
└── README.md
```

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + React Router + Redux Toolkit + Material UI
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **AI**: OpenAI GPT-3.5 for recipe generation
- **Authentication**: JWT tokens + Redux
- **Tools**: Axios, bcrypt, dotenv, concurrently

---

## 🌟 Key Features

### For Users:
- ✅ Register & login
- 🧠 Get AI-generated healthy recipes based on ingredients
- ❤️ Like/favorite recipes and view them in Profile
- 🗨️ Ask questions in the Community section
- 🧾 View and edit personal details
- 📦 Manage subscriptions

### For Admins:
- ➕ Add new recipes
- ✅ Approve/deny community questions
- 🧑‍🍳 View submissions and manage data

---

## 🌐 App Navigation

```
Smart Recipe
├── 🏠 Home
│   ├── 🙋 User Home (/user/home)
│   └── 🛠️ Admin Home (/admin/home)
│
├── 🍽️ Recommendations (/user/recommendations)
├── 🧠 AI Analysis (/user/analysis)
├── ❤️ Profile (/user/profile)
├── 👥 Community (/user/community)
├── 💬 User Q&A (/admin/QA)
├── 📦 Subscription (/user/subscription)
├── ➕ Add Recipe (/admin/addrecipe)
│
├── 🔐 Authentication
│   ├── Login (/login)
│   └── Register (optional)
│
└── ⚙️ Footer / About / Contact
```

---

## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/OctopusRuan/INFO6150_FinalProject_Group6.git/final-project-v2.git
cd final-project-v2
```

### 2. Create backend environment file `.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-connection-string>
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### 3. Install and start backend server
```bash
cd backend
npm install
npm run dev
```

### 4. Install and start frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Access the app
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

---

## 🧠 Future Enhancements

- [ ] Image-based ingredient recognition
- [ ] Enhanced nutrition breakdown and charts
- [ ] User-to-user comment interaction
- [ ] Admin dashboard analytics
- [ ] Mobile-responsive UI optimization

---

## 👨‍💻 Author

Developed by **Group 6**  
Graduate Final Project | INFO6150  
Northeastern University

---

## 📄 License

This project is built as part of a university assignment for learning purposes only.
All rights reserved. Do not distribute without permission.
OpenAI usage must follow [OpenAI terms of use](https://openai.com/policies).

