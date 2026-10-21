# DevConnect

A full-stack project-sharing platform where developers can showcase their projects, explore other developers' work, and manage their own submissions.

**Live Demo:** https://devconnectapi.netlify.app/

## Features

- **Authentication:** User registration and login using JWT-based authentication.
- **Project Showcase:** Create and publish projects with descriptions, GitHub links, and technology stacks.
- **Explore Projects:** Browse projects shared by different users.
- **Search and Filtering:** Find projects using available search and technology filters.
- **Project Details:** View individual project information.
- **Project Management:** Edit and delete your own projects.
- **Protected Routes:** Restrict project management operations to authenticated users and enforce project ownership.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

## Architecture

DevConnect uses a React frontend to communicate with a REST API built with Express.js. MongoDB stores user and project data. JWT authentication protects API endpoints, while ownership checks restrict project modifications to their owners.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/om-parihar/DevConnect.git
cd DevConnect
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/projects` | Retrieve projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/:id` | Retrieve project details |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |
| GET | `/api/health` | Check API health |

Project endpoints require authentication where configured by the backend.

## Deployment

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## Future Improvements

- Project pagination and sorting
- User profile pages
- Project likes and bookmarks
- Automated testing and CI/CD

## Author

**Om Parihar**

- GitHub: https://github.com/om-parihar
- LinkedIn: https://www.linkedin.com/in/om-parihar/
- Portfolio: https://om-s-portfolio.netlify.app/
