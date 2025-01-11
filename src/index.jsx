// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBouNsFk4bdJovI7mIfG9s3HdavP4gNP84",
  authDomain: "jobportal-ba8c9.firebaseapp.com",
  projectId: "jobportal-ba8c9",
  storageBucket: "jobportal-ba8c9.firebasestorage.app",
  messagingSenderId: "922748778951",
  appId: "1:922748778951:web:a5d9c2f4d8a256db2681e2",
  measurementId: "G-36JWW5QDNG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: "neobrutalism",
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <App firebaseAuth={firebaseAuth} /> {/* Pass Firebase auth to your app */}
    </ClerkProvider>
  </React.StrictMode>
);
