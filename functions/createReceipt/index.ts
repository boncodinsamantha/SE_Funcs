serve(async (req) => {
  try {
    const { order_id, amount_paid, payment_method } = await req.json();

    const { data, error } = await supabase
      .from('receipts')
      .insert([{ order_id, amount_paid, payment_method }]);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Receipt generated successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
