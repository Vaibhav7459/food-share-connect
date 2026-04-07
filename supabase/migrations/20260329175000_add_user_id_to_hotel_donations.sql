-- Add user_id column to hotel_donations table
ALTER TABLE public.hotel_donations ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update policies to restrict edit/delete to owner
DROP POLICY "Users can update hotel donations" ON public.hotel_donations;
CREATE POLICY "Users can update their own hotel donations"
  ON public.hotel_donations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hotel donations"
  ON public.hotel_donations FOR DELETE USING (auth.uid() = user_id);