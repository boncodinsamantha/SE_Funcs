export default async function handler(req, res) {
  const { userId, reservationId, amount, paymentMethod } = req.body;

  if (!userId || !reservationId || !amount || !paymentMethod) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase
    .from("payments")
    .insert([{ user_id: userId, reservation_id: reservationId, amount, payment_method: paymentMethod }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: "Payment processed successfully", receipt: data });
}
