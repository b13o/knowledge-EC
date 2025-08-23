// import { Database } from "@/types/database.types";
// import { createClient } from "@supabase/supabase-js";

// if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
//   throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
// }

// if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
//   throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined");
// }

// // サービスロールを使ったクライアント
// const supabaseAdmin = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// export { supabaseAdmin };
