# Blog Application (Full Stack)

This is a full-stack **Blog Application** consisting of a frontend built with **Angular** and a backend built with **Node.js, Express, and Prisma**. The app allows users to create, edit, and manage blog posts with a rich text editor, and provides secure authentication and database management using Prisma ORM.

---

## 📦 Project Structure

```plaintext
├── blog-application/   # Frontend (Angular)
├── blog-server/        # Backend (Node.js, Express, Prisma)
├── README.md           # Project documentation
├── .gitignore
```

---

## 🖥️ Tech Stack

### Frontend (Angular)
- **Angular 18**
- **PrimeNG** for UI components
- **Quill.js** for the rich text editor
- **RxJS** for state management and async operations

### Backend (Node.js & Prisma)
- **Node.js + Express**
- **Prisma ORM** for database interaction
- **PostgreSQL** (or any supported Prisma database)
- **JWT** for authentication
- **Bcrypt.js** for password hashing

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) (v8+)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- PostgreSQL (or another Prisma-supported database)

---

## 🔧 Setup Instructions

### 1. Clone the repository:
```bash
git clone <repo-url>
cd blog-application
```

### 2. Environment Setup:
#### Frontend:
No additional setup is required.

#### Backend:
Create a `.env` file in the `blog-server` directory:
```plaintext
DATABASE_URL="postgresql://user:password@localhost:5432/blogdb"
JWT_SECRET="your_jwt_secret"
```

---

## 📦 Installation

### Frontend:
```bash
cd blog-application
npm install
```

### Backend:
```bash
cd blog-server
npm install
```

---

## 🗃️ Database Setup (Backend Only)

1. **Initialize Prisma**:
   ```bash
   npm run prisma:init
   ```
2. **Run Migrations**:
   ```bash
   npm run prisma:migrate
   ```
3. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   ```
4. **Open Prisma Studio** (for GUI-based database management):
   ```bash
   npm run prisma:studio
   ```

---

## ▶️ Running the Applications

### Frontend:
```bash
cd blog-application
npm start
```
- The app will be available at `http://localhost:4200`.

### Backend:
```bash
cd blog-server
npm run dev
```
- The server will be running at `http://localhost:3000`.

---

## 📂 Project Scripts (Cheat Sheet)

### **Frontend Scripts:**
| Command             | Description                         |
|---------------------|-------------------------------------|
| `npm start`        | Start the Angular development server|
| `npm run build`    | Build the Angular app for production|

### **Backend Scripts:**
| Command                   | Description                           |
|---------------------------|---------------------------------------|
| `npm run dev`             | Start the server with **nodemon**    |
| `npm run prisma:init`     | Initialize Prisma project            |
| `npm run prisma:migrate`  | Run migrations                       |
| `npm run prisma:generate` | Generate Prisma client               |
| `npm run prisma:studio`   | Open Prisma Studio for database GUI  |

---

## ✅ Features
- **Rich Text Blogging**: Create and edit posts using Quill.js.
- **JWT Authentication**: Secure user authentication with JSON Web Tokens.
- **Database Management**: Prisma ORM with PostgreSQL integration.
- **UI Components**: Pre-built UI elements using PrimeNG.
- **Modular Code Structure**: Clean and maintainable codebase.

---

## 📖 Folder Structure Overview

### `blog-application` (Frontend)
- `/src`: Angular source files.
- `/src/app`: Components, modules, and services.

### `blog-server` (Backend)
- `/src`: Main server code.
- `/src/prisma`: Prisma schema and migrations.

---

## 🎯 Roadmap
- [ ] Implement Comment System
- [ ] Add User Profile Management
- [ ] Integrate Image Upload
- [ ] Deploy on Cloud (e.g., Vercel, Netlify)

---

## 🤝 Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

---

## 📄 License
This project is licensed under the MIT License.

---

### 📧 Contact
- **Author:** [Muhammad Hassan](https://github.com/MrHassanKhan)
- **Email:** muhammadhsn09@gmail.com

---

_Star ⭐ this repo if you found it useful!_
