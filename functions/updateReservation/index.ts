serve(async (req) => {
  try {
    const { reservation_id, updated_info } = await req.json();

    const { data, error } = await supabase
      .from('reservations')
      .update(updated_info)
      .eq('id', reservation_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Reservation updated successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
