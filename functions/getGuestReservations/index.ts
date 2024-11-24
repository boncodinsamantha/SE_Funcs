serve(async (req) => {
  try {
    const { guest_id } = await req.json();

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('guest_id', guest_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ reservations: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
