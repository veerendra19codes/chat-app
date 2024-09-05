import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/userContext'
import { SelectedUserContextProvider } from './contexts/selectedUserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketContextProvider } from './contexts/socketContext';
// import reportWebVitals from './reportWebVitals';
import { Analytics } from '@vercel/analytics/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <SelectedUserContextProvider>
          <SocketContextProvider>
            <App />
            <Analytics />
          </SocketContextProvider>
        </SelectedUserContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);

// reportWebVitals();


