import { serve } from "https://deno.land/x/sift/mod.ts";

serve(async (req) => {
    if (req.method !== "GET") {
        return new Response("Only GET requests are allowed", { status: 405 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js");
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, orders: data }), { status: 200 });
});
