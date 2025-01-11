export async function getJobs(token, { location, company_id, searchQuery } = {}) {
    try {
      const supabase = supabaseClient(token);
  
      let query = supabase.from("jobs").select("description, requirements");
  
      if (location) query = query.eq("location", location);
      if (company_id) query = query.eq("company_id", company_id);
      if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);
  
      const { data, error } = await query;
  
      if (error) {
        console.error("Error fetching jobs:", error.message);
        return null;
      }
  
      console.log("Fetched data:", data);  // Log the data returned
      return data;
    } catch (error) {
      console.error("Error in getJobs function:", error.message);
      return null;
    }
  }
  