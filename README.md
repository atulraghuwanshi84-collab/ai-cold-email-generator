# 🤖 AI Cold Email Generator

An AI-powered web application that generates personalized and professional cold emails in seconds using **Google Gemini AI**. Simply provide recipient details, your role, value proposition, and preferred tone to instantly generate outreach emails.

---

## 🚀 Features

- ✨ AI-powered cold email generation using Google Gemini
- 🎯 Personalized emails based on recipient and company
- 🎨 Multiple writing tones (Professional, Friendly, Persuasive, etc.)
- ⚡ Fast and responsive React interface
- 🔄 Real-time API communication with Axios
- 🌐 RESTful Express backend
- 🔐 Environment variable support for API keys
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Axios
- CSS



### Backend

- Node.js
- Express.js
- Google Gemini API (`@google/genai`)
- dotenv
- CORS

---

## 📂 Project Structure

```
ai-cold-email-generator/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---


## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/atulraghuwanshi84-collab/ai-cold-email-generator.git

cd ai-cold-email-generator
```

---

### 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The frontend will run on

```
http://localhost:5173
```

Backend will run on

```
http://localhost:5000
```

---

## 📸 Screenshots


---

## 💡 How It Works

1. Enter the recipient's name.
2. Enter the company name.
3. Provide your role.
4. Describe your value proposition.
5. Select your preferred email tone.
6. Click **Generate Email**.
7. The application sends the request to the Express backend.
8. Google Gemini AI generates a personalized cold email.
9. The generated email is displayed instantly.

---

## 📡 API Endpoint

### Generate Email

```
POST /generate-email
```










### Request Body

```json
{
  "recipientName": "John",
  "companyName": "Google",
  "myRole": "Full Stack Developer",
  "valueProp": "Built scalable MERN applications that improve productivity.",
  "senderName": "Atul",
  "tone": "Professional"
}
```

### Response

```json
{
  "email": "Generated AI email..."
}
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=5000

GEMINI_API_KEY=your_api_key
```

---

## 🚀 Future Improvements

- 📋 Copy to Clipboard
- 📧 Email Subject Generation
- 🌍 Multiple Languages
- 🎨 Rich Text Editor
- 📁 Email Templates
- 💾 Email History
- 🔐 User Authentication
- 📊 Usage Analytics
- 📥 Export as PDF
- 🌙 Dark Mode

---

## 🚀 Deployment

### Frontend

- Vercel
- Netlify

### Backend

- Render
- Railway

---


## 👨‍💻 Author

**Atul Raghuwanshi**

GitHub: https://github.com/atulraghuwanshi84-collab

LinkedIn: https://www.linkedin.com/in/atul-raghuwanshi-b-tech/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Happy Coding! 🚀
