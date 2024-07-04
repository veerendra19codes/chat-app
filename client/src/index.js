import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/userContext'
import { SelectedUserContextProvider } from './contexts/selectedUserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketContextProvider } from './contexts/socketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <SelectedUserContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </SelectedUserContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);


