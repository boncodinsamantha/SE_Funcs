import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    const { email, password, role } = await req.json();
    const { data: user, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return new Response(JSON.stringify({ error: authError.message }), { status: 400 });

    const { data, error } = await supabase
      .from('users')
      .insert([{ id: user.id, role }]);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
