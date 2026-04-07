-- Create hotel donations table
CREATE TABLE public.hotel_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_name TEXT NOT NULL,
  food_type TEXT NOT NULL,
  prepared_time TEXT,
  servings INTEGER,
  quantity TEXT,
  price TEXT,
  notes TEXT,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hotel_donations ENABLE ROW LEVEL SECURITY;

-- Readable by everyone
CREATE POLICY "Hotel donations are viewable by everyone"
  ON public.hotel_donations FOR SELECT USING (true);

-- Allow insert for authenticated users
CREATE POLICY "Users can insert hotel donations"
  ON public.hotel_donations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow updates only by authenticated users (or later by owner policy)
CREATE POLICY "Users can update hotel donations"
  ON public.hotel_donations FOR UPDATE USING (auth.role() = 'authenticated');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_hotel_donations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hotel_donations_updated_at
  BEFORE UPDATE ON public.hotel_donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_hotel_donations_updated_at();
