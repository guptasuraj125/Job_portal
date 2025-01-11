import { useEffect } from "react";
import { useSession } from "@clerk/clerk-react";
import { getJobs } from "@/api/apijobs";

const Joblisting = () => {
  const { session } = useSession();

  useEffect(() => {
    // Log session details
    console.log("Session Data:", session);
    console.log("Session Token:", session?.getToken({ template: "supabase" }));

    // Fetch jobs if needed
    const fetchJobs = async () => {
      try {
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });

        const data = await getJobs(supabaseAccessToken);

        if (data) {
          console.log("Fetched Jobs:", data);
        } else {
          console.error("No jobs found or error occurred.");
        }
      } catch (error) {
        console.error("Error in fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [session]);

  return <div>Joblisting</div>;
};

export default Joblisting;
