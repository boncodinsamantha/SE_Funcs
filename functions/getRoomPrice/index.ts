serve(async (req) => {
  try {
    const { room_type } = await req.json();

    const { data, error } = await supabase
      .from('rooms')
      .select('price')
      .eq('type', room_type)
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ price: data?.price }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
