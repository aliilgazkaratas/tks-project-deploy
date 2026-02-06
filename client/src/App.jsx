import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import router from './router';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <RouterProvider router={router} />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;