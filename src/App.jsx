import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ListingCard from "./components/ListingCard";
import NewListingModal from "./components/NewListingModal";

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const fetchListings = async () => {
    const url = new URL(`${baseUrl}/api/listings`);
    if (query) url.searchParams.set("q", query);
    const res = await fetch(url);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const empty = items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar onSearch={setQuery} onNewListing={() => setOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">readopt</h1>
          <p className="text-slate-600">Buy and sell pre-loved books in your community.</p>
        </div>

        {empty ? (
          <div className="bg-white border rounded-xl p-10 text-center text-slate-600">
            <p>No books yet. Be the first to list a book!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((it) => (
              <ListingCard key={it.id} item={it} />
            ))}
          </div>
        )}
      </main>

      <NewListingModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={() => {
          setOpen(false);
          fetchListings();
        }}
      />
    </div>
  );
}

export default App;
