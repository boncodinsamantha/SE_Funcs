import { serve } from "https://deno.land/x/sift/mod.ts";

serve(async (req) => {
    if (req.method !== "POST") {
        return new Response("Only POST requests are allowed", { status: 405 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
        return new Response("Missing required fields", { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_KEY");
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js");
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    }

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
});
