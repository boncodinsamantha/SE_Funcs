serve(async (req) => {
  try {
    const { code, discount, expiration_date } = await req.json();

    const { data, error } = await supabase
      .from('discounts')
      .insert([{ code, discount, expiration_date }]);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: 'Discount code generated successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
});
