import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoute from './components/routes/AdminRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetailsPage from './pages/EventDetails';
import Blogs from './pages/Blogs';
import BlogPostPage from './pages/BlogPost';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      { path: '/privacy', element: <PrivacyPolicy /> },
{ path: '/terms', element: <TermsOfService /> },
{ path: '/faq', element: <FAQ /> },
{ path: '/about', element: <About /> },
{ path: '/contact', element: <Contact /> },
{ path: '*', element: <NotFound /> },
{ path: '/admin/blogs', element: <AdminRoute><AdminBlogEditor /></AdminRoute> },
      {
        path: 'events',
        element: <Events />
      },
      {
        path: 'events/:id',
        element: <EventDetailsPage />
      },
      {
        path: 'blogs',
        element: <Blogs />
      },
      {
        path: 'blogs/:id',
        element: <BlogPostPage />
      },

      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },{
  path: '*',
  element: <NotFound />
},
            { path: '/privacy', element: <PrivacyPolicy /> },
      { path: '/terms', element: <TermsOfService /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        )
      }
    ]
  }
]);

export default router;