import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    try {
      // Update the user's role in the unsafe metadata
      await user.update({
        unsafeMetadata: { role },
      });

      // Redirect to the correct page based on the role
      if (role === "recruiter") {
        navigate("/post-jobs");
      } else if (role === "candidate") {
        navigate("/job");
      }
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  useEffect(() => {
    // Check if the user is loaded and has a role
    if (user?.unsafeMetadata?.role) {
      // Redirect based on role
      navigate(user.unsafeMetadata.role === "recruiter" ? "/post-jobs" : "/job");
    }
  }, [user, navigate]); // Ensure to add navigate as a dependency

  // Show loader while user data is being fetched
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Onboarding
      </h1>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
