function ListingCard({ item }) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-slate-100 to-slate-200 grid place-items-center text-slate-400 text-sm">
          No image
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
            <p className="text-sm text-slate-500 line-clamp-1">{item.author}</p>
          </div>
          <span className="text-green-700 font-semibold">${item.price?.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{item.condition}</span>
          {item.location && <span className="text-xs text-slate-500">{item.location}</span>}
        </div>
        {item.description && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{item.description}</p>
        )}
        <a
          href={`#/listing/${item.id}`}
          className="mt-3 inline-block text-sm text-green-700 hover:text-green-800"
        >
          View details →
        </a>
      </div>
    </div>
  );
}

export default ListingCard;
