serve(async (req) => {
  try {
    const { room_id } = await req.json();
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', room_id)
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ room: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
