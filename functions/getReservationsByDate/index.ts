serve(async (req) => {
  try {
    const { start_date, end_date } = await req.json();

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .gte('check_in_date', start_date)
      .lte('check_out_date', end_date);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ reservations: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
