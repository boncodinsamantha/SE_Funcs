serve(async (req) => {
  try {
    const { user_id, room_id, service_id, total_amount } = await req.json();

    const { data, error } = await supabase
      .from('orders')
      .insert([{ user_id, room_id, service_id, total_amount }]);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Order added successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
