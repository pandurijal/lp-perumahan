-- Allow anon key to SELECT reservations (for admin page)
CREATE POLICY "anon_can_select_reservations"
  ON reservations
  FOR SELECT
  TO anon
  USING (true);
