// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/app-layout.jsx';
import LandingPage from './pages/landing';  // Keep this import only once
import './App.css';
import ProtectedRoute from "./components/protected-route";
import React from "react";

import { ThemeProvider } from "./components/theme-provider";
import Onboarding from "./pages/onboarding";
import PostJob from "./pages/post-jobs";
import Joblisting from "./pages/job-listing";
import Myjobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-jobs";
import Jobpage from "./pages/job";



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job",
        element: (
          <ProtectedRoute>
            <Jobpage /> {/* Component for the single job listing */}
          </ProtectedRoute>
        ),
      },
      
      {
        path: "/job-listing",
        element: (
          <ProtectedRoute>
            < job-listing/> {/* Component for the single job listing */}
          </ProtectedRoute>
        ),
      },
      
      {
        path: "/post-jobs",  // Correct path
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <Myjobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Jobpage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);




function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
