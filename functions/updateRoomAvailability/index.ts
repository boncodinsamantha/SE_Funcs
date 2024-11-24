serve(async (req) => {
  try {
    const { room_id, status } = await req.json(); // status can be 'available' or 'occupied'

    const { data, error } = await supabase
      .from('rooms')
      .update({ status })
      .eq('id', room_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Room status updated successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
