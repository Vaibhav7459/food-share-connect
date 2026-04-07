export type HotelInfo = {
  hotelName: string;
  slug: string;
  foodType: string;
  servings: number;
  rating: number;
  reviewCount: number;
  timeProcessed: string;
  urgency: "fresh" | "moderate" | "urgent";
  location: string;
  image: string;
  description: string;
  address: string;
  contact: string;
  website: string;
  lastDonation: string;
  pickupInstructions: string;
  specialNotes: string;
};

export const hotelList: HotelInfo[] = [
  {
    hotelName: "Grand Hyatt",
    slug: "grand-hyatt",
    foodType: "Biryani, Naan & Curry",
    servings: 120,
    rating: 4.8,
    reviewCount: 64,
    timeProcessed: "30 min ago",
    urgency: "fresh",
    location: "MG Road, Bangalore",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
    description:
      "Luxury hotel kitchen offering high-volume banquet surplus with priority on quick collection. Vegetarian and non-vegetarian options available.",
    address: "34 M G Road, Bangalore 560001",
    contact: "+91 80 6789 1234",
    website: "https://www.grandhyatt.com/bangalore",
    lastDonation: "2026-03-28T18:30:00Z",
    pickupInstructions:
      "Collect from loading dock C on ground floor. Bring ID and insulated boxes. Can dispatch within 30 minutes.",
    specialNotes: "Contains nuts in some dishes. Please confirm dietary tags with on-site manager.",
  },
  {
    hotelName: "Taj Palace",
    slug: "taj-palace",
    foodType: "Mixed Continental Buffet",
    servings: 85,
    rating: 4.9,
    reviewCount: 112,
    timeProcessed: "1 hour ago",
    urgency: "fresh",
    location: "Connaught Place, Delhi",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
    description:
      "Premium hotel food rescue with diverse continental menu. Ideal for NGO meal programs and community kitchens.",
    address: "2, Sardar Patel Marg, Diplomatic Enclave, New Delhi, 110021",
    contact: "+91 11 6666 5555",
    website: "https://www.tajhotels.com/tajpalace",
    lastDonation: "2026-03-28T17:00:00Z",
    pickupInstructions: "Please coordinate via WhatsApp at +91 11 6666 5555 before pickup; gate pass required.",
    specialNotes: "Gluten-free desserts available on request; no dairy-free options today.",
  },
  {
    hotelName: "Marriott Suites",
    slug: "marriott-suites",
    foodType: "Pasta, Salads & Desserts",
    servings: 60,
    rating: 4.5,
    reviewCount: 38,
    timeProcessed: "2 hours ago",
    urgency: "moderate",
    location: "Andheri West, Mumbai",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    description:
      "Casual buffet surplus from corporate lunch service. Good for smaller groups and first-responder distribution.",
    address: "Hiranandani Business Park, Andheri West, Mumbai, 400053",
    contact: "+91 22 5555 4444",
    website: "https://www.marriott.com/marriott-suites",
    lastDonation: "2026-03-28T16:10:00Z",
    pickupInstructions: "Load from the north entrance. Staff will assist with pallet trolleys.",
    specialNotes: "Some items include shellfish; check labels on pre-packed boxes.",
  },
  {
    hotelName: "ITC Royal",
    slug: "itc-royal",
    foodType: "South Indian Thali",
    servings: 200,
    rating: 4.7,
    reviewCount: 89,
    timeProcessed: "45 min ago",
    urgency: "fresh",
    location: "Jubilee Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    description:
      "Traditional Indian meals from high-end banquet set; ideal for immediate distribution and hunger relief programs.",
    address: "Road No. 36, Jubilee Hills, Hyderabad, 500033",
    contact: "+91 40 2222 3333",
    website: "https://www.itchotel.com/itc-royal",
    lastDonation: "2026-03-28T19:45:00Z",
    pickupInstructions: "Pickup at back entrance near kitchen; use drive-in gate #2 between 7-8pm.",
    specialNotes: "Contains dairy and wheat; vegan options available in separate containers.",
  },
  {
    hotelName: "The Leela",
    slug: "the-leela",
    foodType: "Chinese & Thai Combo",
    servings: 40,
    rating: 4.3,
    reviewCount: 27,
    timeProcessed: "3.5 hours ago",
    urgency: "urgent",
    location: "Park Street, Kolkata",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
    description:
      "International cuisine from last night’s event. Great for immediate hot meal distribution, limited time window.",
    address: "122/2, Old Post Office Street, Kolkata, 700071",
    contact: "+91 33 4444 3333",
    website: "https://www.theleela.com/the-leela-kolkata",
    lastDonation: "2026-03-28T14:20:00Z",
    pickupInstructions: "Deliver to banquet area; inform security you are from FoodShare Connect.",
    specialNotes: "Must be picked up within 1 hour; reheating instructions in box. Contains soy and peanuts.",
  },
  {
    hotelName: "Oberoi Grand",
    slug: "oberoi-grand",
    foodType: "Wedding Banquet Surplus",
    servings: 350,
    rating: 4.6,
    reviewCount: 53,
    timeProcessed: "1.5 hours ago",
    urgency: "moderate",
    location: "Banjara Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
    description:
      "Large-scale banquet leftovers from wedding celebrations. Best for large NGOs and disaster relief kitchens.",
    address: "37-41, M G Road, Secunderabad, Hyderabad, 500003",
    contact: "+91 40 6666 7777",
    website: "https://www.oberoihotels.com/the-oberoi-grand",
    lastDonation: "2026-03-28T18:00:00Z",
    pickupInstructions: "Park at service entrance and check in with the chef manager on duty.",
    specialNotes: "Contains eggs and shellfish; vegetarian allocations have separate labels.",
  },
];

export const getHotelBySlug = (slug: string): HotelInfo | undefined =>
  hotelList.find((it) => it.slug === slug.toLowerCase());
