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

2️⃣ Backend Setup (Spring Boot)

Navigate to the backend folder and update credentials:

Open application.properties (or .env if configured).

Update your AWS credentials (for S3 storage / deployment).

Update your Razorpay API Key & Secret.

Run backend using:

./mvnw spring-boot:run


(or import into IntelliJ/Eclipse and run).

If using Docker (recommended for smooth setup):

docker build -t nammafood-backend .
docker run -p 8080:8080 nammafood-backend


Backend will start at:
👉 http://localhost:8080

