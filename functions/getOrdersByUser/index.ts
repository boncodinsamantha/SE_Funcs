serve(async (req) => {
  try {
    const { user_id } = await req.json();

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ orders: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
