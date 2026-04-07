import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getHotelBySlug } from "@/lib/hotels";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HotelDetails = () => {
  const { hotelName } = useParams<{ hotelName: string }>();
  const navigate = useNavigate();

  if (!hotelName) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto p-6">
          <h1 className="text-2xl font-bold">Hotel information not found</h1>
          <p className="text-muted-foreground mt-2">No hotel selected.</p>
          <Link to="/" className="mt-4 inline-block text-primary">
            Back to list
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const hotel = getHotelBySlug(decodeURIComponent(hotelName));

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto p-6">
          <h1 className="text-2xl font-bold">Hotel not found</h1>
          <p className="text-muted-foreground mt-2">
            We could not find detailed info for <strong>{hotelName}</strong>.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <img
            src={hotel.image}
            alt={hotel.hotelName}
            className="lg:col-span-1 h-72 w-full object-cover rounded-xl border border-border"
          />

          <section className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl font-display font-bold">{hotel.hotelName}</h1>
            <p className="text-muted-foreground">{hotel.description}</p>

            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="font-semibold text-xl">Current Donation Details</h2>
              <ul className="mt-2 space-y-1 text-sm text-foreground/90">
                <li>
                  <strong>Menu:</strong> {hotel.foodType}
                </li>
                <li>
                  <strong>Servings:</strong> {hotel.servings}
                </li>
                <li>
                  <strong>Rating:</strong> {hotel.rating} ({hotel.reviewCount} reviews)
                </li>
                <li>
                  <strong>When:</strong> {hotel.timeProcessed}
                </li>
                <li>
                  <strong>Urgency:</strong> {hotel.urgency}
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <h2 className="font-semibold text-xl">Hotel Info</h2>
              <p>
                <strong>Location:</strong> {hotel.location}
              </p>
              <p>
                <strong>Address:</strong> {hotel.address}
              </p>
              <p>
                <strong>Contact:</strong> {hotel.contact}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={hotel.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  {hotel.website}
                </a>
              </p>
              <p>
                <strong>Last Donation:</strong> {new Date(hotel.lastDonation).toLocaleString()}
              </p>
              <p>
                <strong>Pickup Instructions:</strong> {hotel.pickupInstructions}
              </p>
              <p>
                <strong>Special Notes:</strong> {hotel.specialNotes}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/claim?hotel=${encodeURIComponent(hotel.hotelName)}`}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Claim this donation
              </Link>
              <Link
                to="/"
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Back to available listings
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetails;
