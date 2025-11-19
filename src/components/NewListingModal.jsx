import { useState } from "react";

function NewListingModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    condition: "good",
    description: "",
    image_url: "",
    seller_name: "",
    seller_email: "",
    location: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price || 0),
        }),
      });
      if (!res.ok) throw new Error("Failed to create listing");
      const data = await res.json();
      onCreated?.(data.id);
      onClose?.();
      setForm({
        title: "",
        author: "",
        price: "",
        condition: "good",
        description: "",
        image_url: "",
        seller_name: "",
        seller_email: "",
        location: "",
        category: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">List a book</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <form onSubmit={submit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Title</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Author</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} required />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Price (USD)</label>
            <input type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Condition</label>
            <select className="w-full border rounded-lg px-3 py-2" value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})}>
              <option>new</option>
              <option>like new</option>
              <option>good</option>
              <option>fair</option>
              <option>poor</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-500 mb-1">Description</label>
            <textarea className="w-full border rounded-lg px-3 py-2" rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-500 mb-1">Image URL</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Seller name</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.seller_name} onChange={e=>setForm({...form,seller_name:e.target.value})} required />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Seller email</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2" value={form.seller_email} onChange={e=>setForm({...form,seller_email:e.target.value})} required />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Location</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Category</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
          </div>

          {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}

          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg border">Cancel</button>
            <button disabled={loading} className="px-3 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50">
              {loading ? "Listing..." : "Create listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewListingModal;
