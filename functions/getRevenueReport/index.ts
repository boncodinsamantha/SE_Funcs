serve(async (req) => {
  try {
    const { start_date, end_date } = await req.json();

    const { data, error } = await supabase
      .from('payments')
      .select('amount')
      .gte('payment_date', start_date)
      .lte('payment_date', end_date);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    const totalRevenue = data.reduce((sum, payment) => sum + payment.amount, 0);

    return new Response(JSON.stringify({ totalRevenue }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
