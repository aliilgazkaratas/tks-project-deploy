import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';  // ADD THIS
import './styles/modern-theme.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>  {/* ADD THIS */}
        <RouterProvider router={router} />
      </EventProvider>  {/* ADD THIS */}
    </AuthProvider>
  </React.StrictMode>
);