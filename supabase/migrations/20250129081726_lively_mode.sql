/*
  # Car Management Application Schema

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `images` (text array) - URLs of car images
      - `car_type` (text)
      - `company` (text)
      - `dealer` (text)
      - `user_id` (uuid, foreign key)
      - `tags` (text array)
    
  2. Security
    - Enable RLS on `cars` table
    - Add policies for CRUD operations
*/

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  images text[] NOT NULL DEFAULT '{}',
  car_type text,
  company text,
  dealer text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tags text[] DEFAULT '{}',
  CONSTRAINT images_length CHECK (array_length(images, 1) <= 10)
);

-- Enable RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can create their own cars"
  ON cars
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own cars"
  ON cars
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own cars"
  ON cars
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cars"
  ON cars
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better search performance
CREATE INDEX cars_title_idx ON cars USING GIN (to_tsvector('english', title));
CREATE INDEX cars_description_idx ON cars USING GIN (to_tsvector('english', description));
CREATE INDEX cars_tags_idx ON cars USING GIN (tags);