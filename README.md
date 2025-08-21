# 🍴 Namma Food – Full-Stack Food & Services Application  

Namma Food is my **first full-stack Java project**, built to deliver a seamless food ordering and services experience with **admin panel controls**, **user management**, and **secure payment integration**.  

This project helped me learn the **end-to-end software development lifecycle (SDLC)** — from designing the backend with **Spring Boot**, building the frontend with **React.js** (and Vue.js experiments), setting up **MongoDB**, integrating **Razorpay for payments**, deploying on **AWS**, and finally **Dockerizing backend services** for smooth processing.  

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
👉 http://localhost:5173 (React + Vite default)
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


