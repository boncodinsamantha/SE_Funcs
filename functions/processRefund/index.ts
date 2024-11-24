serve(async (req) => {
  try {
    const { reservation_id, amount } = await req.json();

    // Check if the reservation exists
    const { data: reservation, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', reservation_id)
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    // Process the refund (mock logic for refund)
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert([{ reservation_id, amount, status: 'refunded' }]);

    if (paymentError) return new Response(JSON.stringify({ error: paymentError.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Refund processed successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
