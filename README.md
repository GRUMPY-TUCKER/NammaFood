# 🍴 Namma Food – Full-Stack Food & Services Application  

Namma Food is my **first full-stack Java project**, built to deliver a seamless food ordering and services experience with **admin panel controls**, **user management**, and **secure payment integration**.  

This project helped me learn the **end-to-end software development lifecycle (SDLC)** — from designing the backend with **Spring Boot**, building the frontend with **React.js** (and Vue.js experiments), setting up **MongoDB**, integrating **Razorpay for payments**, deploying on **AWS**, and finally **Dockerizing backend services** for smooth processing.  

---

## Quick overview

- adminpanel — Vite React admin UI for managing food items and orders  
- foodies — Vite React user app (explore, cart, orders, auth)  
- foodiesapi-backend — Spring Boot backend (REST API, DB integration)  
- foodies-credentials — environment properties used by backend

---

## 🚀 Features
- 👨‍💻 **Admin Panel** – Manage users, food items, and orders.  
- 🍔 **User Portal** – Registration, login, ordering services, tracking.  
- 💳 **Secure Payments** – Razorpay integration for transactions.  
- ☁️ **Cloud Deployment** – AWS-based deployment.  
- 🐳 **Dockerized Backend** – Backend services containerized for scalability.  

---

## 🛠️ Tech Stack
- **Backend**: Java, Spring Boot  
- **Frontend**: React.js (with some Vue.js modules)  
- **Database**: MongoDB  
- **Payments**: Razorpay API Integration  
- **Deployment**: AWS  
- **Containerization**: Docker  

---

## 📁 Repository Overview

📁 NammaFood/
│
├── ⚙️ .github/
│   └── 🔄 workflows/
│       └── maven.yml              # GitHub Actions CI workflow for Maven build
│
├── 🔐 foodies-credentials/        # Environment configuration and secrets
│   └── env.config.properties
│
├── 👨‍💻 foodiesapi-backend/        # Spring Boot Backend (REST APIs)
│   ├── 📂 src/
│   │   ├── 🧠 main/                # Application source code
│   │   └── 🧪 test/                # Unit and integration tests
│   ├── 🪶 mvnw.cmd                # Maven wrapper (Windows)
│   ├── 🪶 mvnw                    # Maven wrapper (Unix)
│   └── 🏗️ pom.xml                 # Maven build file
│
├── 💻 foodies-frontend/           # Customer-facing React App
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 🎨 components/         # UI components for users
│   │   ├── 📄 pages/              # Page routes (Home, Cart, Orders, etc.)
│   │   └── 🔧 service/            # API calls and utility functions
│
├── 🧠 adminpanel/                 # Admin Dashboard (React)
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 🎨 components/         # Reusable UI components
│   │   └── 📄 pages/              # Individual admin pages
│
├── 📜 .gitignore                  # Ignored files and directories
└── 📦 README.md                   # Project documentation



---

## Prerequisites

- Node.js (LTS) and npm
- Java 17 (or compatible with the project) or 21
- Maven (or use the included Maven wrapper)
- Git
---

## Local development

1. Admin panel
   - Open terminal (Windows)
   - cd adminpanel
   - npm install
   - npm run dev

2. User app (foodies)
   - cd foodies
   - npm install
   - npm run dev

3. Backend (Windows)
   - cd foodiesapi-backend
   - Use the wrapper:
     - mvnw.cmd spring-boot:run
   - Or with installed Maven:
     - mvn spring-boot:run

To build backend jar:
- Windows: mvnw.cmd package
- Then run: java -jar target/*.jar
  
---

### Ports used (recommended)
- Backend (Spring Boot): 8080
- Frontend (foodies user): 5173 (Vite default)
- Admin panel: 5174 (or another free port)

You can change ports by editing Vite config or Spring Boot `server.port`.

---

## 📦 Installation & Setup Guide  

### 1️⃣ Clone or Download  
Clone this repository or download the ZIP and extract it:  
```bash
git clone https://github.com/GRUMPY-TUCKER/NammaFood.git
cd namma-food
```
2️⃣ Backend Setup (Spring Boot)

Navigate to the backend folder and update credentials:

Open application.properties (or .env if configured).

Update your AWS credentials (for S3 storage / deployment).

Update your Razorpay API Key & Secret.

Run backend using:
```bash
./mvnw spring-boot:run
```

(or import into IntelliJ/Eclipse and run).

If using Docker (recommended for smooth setup):
```bash
docker build -t nammafood-backend .
docker run -p 8080:8080 nammafood-backend
```

Backend will start at:
```bash
👉 http://localhost:8080
```

3️⃣ Frontend Setup (React.js / Vue.js)

Navigate to frontend folder:

```bash
cd frontend
npm install
npm run dev

```
Frontend will start at:
```bash
👉 http://localhost:5173 (React + Vite default) -- for frontend panel
👉 http://localhost:5174 (React + Vite default) -- for adminpanel
👉 http://localhost:3000 (if using CRA / Vue setup)
```
4️⃣ Access Application

Open frontend in browser (http://localhost:5173)

Backend API will be served from (http://localhost:8080)

Ensure backend is running before starting frontend.

🧪 Testing Credentials

Create dummy users via registration.

Admin account can be seeded manually in DB (MongoDB).

Use Razorpay test keys for payment gateway testing.

📌 Notes

Update AWS_ACCESS_KEY, AWS_SECRET_KEY, and RAZORPAY_API_KEY before deploying.

For production deployment, configure Docker Compose for frontend + backend.

MongoDB can be connected either locally or via a cloud cluster (MongoDB Atlas).

🌟 Future Improvements

Add Recommendation Engine for personalized food suggestions.

Multi-language support for inclusivity.

Delivery tracking with Google Maps API.


---

## Security & best practices

- Do NOT commit secrets, API keys, or passwords. Add `foodies-credentials/` to `.gitignore`.
- Use environment-specific secrets management in production (Vault, cloud secret manager).
- Regenerate JWT secret and API keys before deploying to production.

---


