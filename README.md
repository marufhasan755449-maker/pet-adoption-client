# PawsHome — Pet Adoption Platform

A full-stack MERN web application where people can adopt pets, post their own pets for adoption, and manage adoption requests.

## Live URL

- **Client:* https://pet-adoption-client-beta.vercel.app/
- **Server:** https://pet-adoption-client-beta.vercel.app/

---

##  Features

-  Firebase Email/Password & Google Authentication
-  JWT stored in HTTPOnly cookies for secure API access
- Browse all available pets with search, filter by species, and sorting
- Submit adoption requests with pickup date and message
-  Pet owners can manage their own listings
-  Approve/Reject adoption requests (one approval per pet)
-  Private routes — redirects to login if not authenticated
- Fully responsive design (mobile, tablet, desktop)
-  Toast notifications for all actions
- 404 friendly error page

---

## Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS          |
| Routing  | React Router v6                       |
| HTTP     | Axios                                 |
| Auth     | Firebase Authentication               |
| Backend  | Node.js, Express.js                   |
| Database | MongoDB Atlas                         |
| Security | JWT (HTTPOnly Cookie)                 |
| Deploy   | Vercel (client), Render (server)      |

---

## NPM Packages

### Client
```
react-router-dom    — routing
axios               — HTTP requests
firebase            — authentication
react-hot-toast     — notifications
tailwindcss         — styling
```

### Server
```
express             — web framework
mongodb             — database driver
jsonwebtoken        — JWT auth
cookie-parser       — read cookies
cors                — cross-origin
dotenv              — environment vars
```

---

## Folder Structure

### Client
```
src/
 ├── pages/           # All page components
 ├── components/      # Reusable UI components
 ├── layouts/         # MainLayout (Navbar + Footer + Outlet)
 ├── routes/          # PrivateRoute
 ├── providers/       # AuthProvider (Context)
 ├── firebase/        # Firebase config
 └── main.jsx         # Entry point
```

### Server
```
server/
 ├── routes/
 │   ├── auth.js      # JWT issue & logout
 │   ├── pets.js      # Pet CRUD
 │   └── adoptions.js # Adoption requests
 ├── middleware/
 │   └── verifyToken.js
 └── index.js         # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/pet-adoption.git
```

### 2. Setup Server
```bash
cd server
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### 3. Setup Client
```bash
cd client
npm install
cp .env.example .env
# Fill in your Firebase credentials
npm run dev
```

---

## Environment Variables

### Server `.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client `.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## License

MIT © 2025 PawsHome
