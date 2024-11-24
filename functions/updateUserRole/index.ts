serve(async (req) => {
  try {
    const { user_id, role } = await req.json();

    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', user_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Role updated successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
