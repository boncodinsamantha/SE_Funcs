export default async function handler(req, res) {
  const { userId } = req.body;

  const { data, error } = await supabase
    .from("order_history")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ orderHistory: data });
}
