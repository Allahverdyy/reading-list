/**
 * Kitap arama input'u — debounce ile dinamik arama.
 * En az 3 karakter girildiğinde 350ms beklemeden sonra arama tetiklenir.
 * @param {{ onSearch: (query: string) => void, isLoading: boolean, onClear: () => void }} props
 */
import { useState, useEffect } from 'react';

const MIN_QUERY_LENGTH = 3;

function SearchBar({ onSearch, isLoading, onClear }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      onClear();
      return;
    }
    const timerId = setTimeout(() => {
      onSearch(trimmed);
    }, 350);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Kitap adı veya yazar yaz, otomatik arar..."
        aria-label="Kitap arama"
        className="w-full px-4 py-3 pr-28 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base"
      />
      {isLoading && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-emerald-600 font-medium">
          Aranıyor...
        </span>
      )}
    </div>
  );
}

export default SearchBar;
