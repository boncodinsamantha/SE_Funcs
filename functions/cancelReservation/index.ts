serve(async (req) => {
  try {
    const { reservation_id } = await req.json();

    // First, delete the reservation
    const { data, error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', reservation_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    // Update the room status to available
    await supabase
      .from('rooms')
      .update({ status: 'available' })
      .eq('reservation_id', reservation_id);

    return new Response(JSON.stringify({ message: 'Reservation canceled successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
