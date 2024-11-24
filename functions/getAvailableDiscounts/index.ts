serve(async (req) => {
  try {
    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .gt('expiration_date', new Date().toISOString());

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ discounts: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
