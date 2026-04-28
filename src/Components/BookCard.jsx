/**
 * Tek bir kitap kartı render eder.
 * @param {{ book: import('../Interfaces/bookTypes').Book|import('../Interfaces/bookTypes').SearchResult, variant: 'search'|'library', onAdd?: function, onRemove?: function, onStatusChange?: function }} props
 */

const STATUS_LABELS = {
  wishlist: 'Okumak istiyorum',
  reading: 'Okuyorum',
  completed: 'Okudum',
};

const STATUS_BADGE_COLORS = {
  wishlist: 'bg-blue-100 text-blue-700',
  reading: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
};

function BookCard({ book, variant, onAdd, onRemove, onStatusChange }) {
  return (
    <div className="card-animate-in rounded-lg shadow-sm border border-slate-200 bg-white overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Kapak görseli */}
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
          Kapak yok
        </div>
      )}

      {/* Kart içeriği */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 line-clamp-2 leading-snug">
          {book.title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {book.authors.length > 0 ? book.authors.join(', ') : 'Bilinmeyen yazar'}
        </p>

        {book.firstPublishYear && (
          <p className="text-xs text-slate-400 mt-0.5">{book.firstPublishYear}</p>
        )}

        {/* Kütüphane kontrolleri */}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          {variant === 'library' && (
            <>
              <span
                className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE_COLORS[book.status]}`}
              >
                {STATUS_LABELS[book.status]}
              </span>

              <select
                value={book.status}
                onChange={(e) => onStatusChange(book.id, e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-md px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="wishlist">Okumak istiyorum</option>
                <option value="reading">Okuyorum</option>
                <option value="completed">Okudum</option>
              </select>

              <button
                onClick={() => onRemove(book.id)}
                className="w-full text-sm bg-red-50 text-red-600 border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-100 transition-colors"
              >
                Sil
              </button>
            </>
          )}

          {variant === 'search' && (
            <button
              onClick={() => onAdd(book)}
              className="w-full text-sm bg-emerald-500 text-white rounded-md px-3 py-1.5 hover:bg-emerald-600 transition-colors"
            >
              Listeme Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
