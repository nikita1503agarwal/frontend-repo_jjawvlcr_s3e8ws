import { Search, BookOpen, Plus, Menu } from "lucide-react";

function Navbar({ onSearch, onNewListing }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <button className="md:hidden p-2 rounded-lg hover:bg-slate-100">
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-600 text-white grid place-items-center font-bold shadow-sm">r</div>
          <span className="font-semibold text-slate-800 text-lg">readopt</span>
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100/80 border border-transparent focus:outline-none focus:border-green-600 text-sm"
              placeholder="Search by title, author, genre..."
            />
          </div>
        </div>

        <button
          onClick={onNewListing}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-sm"
        >
          <Plus className="w-4 h-4" />
          List a book
        </button>
      </div>
    </header>
  );
}

export default Navbar;
