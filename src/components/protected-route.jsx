import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // If user is not signed in, redirect to the login page
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  // If the user doesn't have a role, redirect to onboarding
  if (
    user &&
    (!user?.unsafeMetadata?.role || user?.unsafeMetadata?.role === "") &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoute;
