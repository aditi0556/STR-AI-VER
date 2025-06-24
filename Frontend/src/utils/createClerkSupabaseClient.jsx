import { useSession, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

export default function createClerkSupabaseClient(session) {
  //   const { session } = useSession();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return createClient(
    supabaseUrl,
    supabaseAnonKey,

    {
      global: {
        // Get the custom Supabase token from Clerk
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: "supabase",
          });
          
          const headers = new Headers(options?.headers);
          headers.set("apikey", supabaseAnonKey);
          headers.set("Authorization", `Bearer ${clerkToken}`);
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}
