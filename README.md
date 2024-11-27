# Real-Time Chat Application (MERN Stack)

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, and Node.js). The application supports user authentication, real-time messaging, and online/offline user presence indicators.

## Features

### User Authentication

- **JWT-based session management** for secure authentication.
- User registration and login with proper validation.
- Passwords are hashed using **bcrypt** before storing in MongoDB.

### Chat Functionality

- Authenticated users can send and receive messages in real-time.
- Messages are transmitted using **WebSockets** via **Socket.io**.
- Chat history is stored in MongoDB and is retrievable upon login.

### User Interface

- A **React-based frontend** for sending and receiving messages.
- Displays a list of online users.
- A minimalist chat UI with:
  - Input field for typing messages.
  - Display area for conversation history.
  - Automatic scrolling for the latest messages.

### Online Presence Indicator

- Users are marked as **online** or **offline** based on their connection status.
- Real-time status updates broadcasted via WebSockets.


---

## Tech Stack

### Backend

- **Node.js**: Backend runtime.
- **Express.js**: Server framework.
- **MongoDB**: Database for storing user profiles and chat history.
- **Socket.io**: WebSocket library for real-time communication.

### Frontend

- **React**: Frontend library for building the user interface.
- **Socket.io-client**: For connecting the frontend to the WebSocket server.

### Other Libraries/Tools

- **bcrypt**: For hashing passwords.
- **jsonwebtoken**: For JWT-based authentication.
- **Mongoose**: For MongoDB object modeling.

---

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

- **Node.js** (v16 or later)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd real-time-chat-app

2. Install dependencies for both the backend and frontend:
  ```bash
  # Backend
  cd backend
  npm install

  # Frontend
  cd ../frontend
  npm install


### Environment Variables

Create .env files in both the backend and frontend directories.

Backend .env:
env
  ```bash
  PORT=5000
  MONGO_URI=<your-mongodb-connection-string>
  JWT_SECRET=<your-jwt-secret>

Frontend .env:
  ```bash
  REACT_APP_BACKEND_URL=http://localhost:5000
  
### Running the Application

Start the backend server:
  ```bash
  cd backend
  npm install
  npm start

Start the frontend development server:

  ```bash
  cd frontend
  npm install
  npm start

Open the app in your browser at http://localhost:3000.

Deployment
This app is deployed on:

Frontend: Netlify or Vercel
Backend: Render 

To deploy, follow these steps:

Update .env files with production values.

Push your code to GitHub and connect it to your hosting services.
For Netlify or Vercel, ensure the frontend is set to use the correct backend URL.

### Future Improvements

Improve UI design for better user experience.
Add group chat functionality.
Enhance typing indicator for multiple users.
Integrate push notifications for new messages.

Author
Name: Veerendra Gumate
GitHub: https://github.com/veerendra19codes
LinkedIn: https://linkedin.in/in/veerendragumate



