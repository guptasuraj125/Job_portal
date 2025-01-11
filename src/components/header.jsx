import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { PenBox, BriefcaseBusiness, Heart, ChevronLeft } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handlePostJob = () => {
    // Check if the user is signed in and if they are a recruiter
    if (!user) {
      // Redirect to onboarding if not signed in
      navigate("/onboarding");
    } else if (user?.unsafeMetadata?.role !== "recruiter") {
      // Redirect to home if the user is not a recruiter
      navigate("/");
    } else {
      // Redirect to post-jobs page if the user is a recruiter
      navigate('/post-jobs');
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8 items-center">
          {/* Login Button - Visible Only to Signed-Out Users */}
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          {/* Post Job Button - Visible Only to Recruiters */}
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-jobs">
                <Button
                  variant="destructive"
                  onClick={handlePostJob}
                  className="rounded-full"
                >
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            {/* User Profile Button - Visible Only to Signed-In Users */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-16 h-16", // Increased avatar size
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/job"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* Sign-in Overlay */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-transparent p-6 z-60">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
              className="p-0"
            />
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      {showSignIn && (
        <button
          onClick={handleBackToHome}
          className="absolute top-4 left-4 bg-black text-white rounded-full p-3 shadow-full flex items-center gap-2 hover:bg-gray-200 transition-all transform hover:scale-105"
        >
          <ChevronLeft size={50} />
        </button>
      )}
    </>
  );
};

export default Header;
