/**
 * Uygulamanın ana sayfası. Arama, kütüphane ve filtreleme orchestrator'ı.
 */
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import useLocalStorage from '../hooks/useLocalStorage';
import { searchBooks, getInitialBooks } from '../services/bookApi';
import SearchBar from '../Components/SearchBar';
import BookList from '../Components/BookList';
import StatusFilter from '../Components/StatusFilter';

const STATUS_TR = {
  wishlist: 'Okumak istiyorum',
  reading: 'Okuyorum',
  completed: 'Okudum',
};

function HomePage() {
  const [library, setLibrary] = useLocalStorage('reading-list:books', []);
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    if (initialLoaded) return;
    if (library.length > 0) {
      setInitialLoaded(true);
      return;
    }
    (async () => {
      try {
        const results = await getInitialBooks();
        setSearchResults(results);
      } catch {
        setSearchError('Başlangıç listesi yüklenemedi.');
      } finally {
        setInitialLoaded(true);
      }
    })();
  }, [initialLoaded, library.length]);

  const handleSearch = async (query) => {
    setIsSearching(true);
    setSearchError(null);
    try {
      const results = await searchBooks(query, 20);
      setSearchResults(results);
    } catch {
      setSearchError('Arama başarısız oldu. Lütfen tekrar deneyin.');
      setSearchResults([]);
      toast.error('Arama başarısız oldu');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdd = (searchResult) => {
    if (library.some((b) => b.id === searchResult.id)) {
      toast('Bu kitap zaten listede', { icon: 'ℹ️' });
      return;
    }
    const newBook = {
      ...searchResult,
      status: 'wishlist',
      addedAt: new Date().toISOString(),
    };
    setLibrary((prev) => [newBook, ...prev]);
    toast.success(`"${searchResult.title}" listene eklendi`);
  };

  const handleRemove = (id) => {
    const book = library.find((b) => b.id === id);
    setLibrary((prev) => prev.filter((b) => b.id !== id));
    if (book) toast.success(`"${book.title}" kaldırıldı`);
  };

  const handleStatusChange = (id, newStatus) => {
    setLibrary((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Durum: ${STATUS_TR[newStatus]}`);
  };

  const filteredLibrary = useMemo(() => {
    if (filter === 'all') return library;
    return library.filter((b) => b.status === filter);
  }, [library, filter]);

  const counts = useMemo(() => ({
    all: library.length,
    wishlist: library.filter((b) => b.status === 'wishlist').length,
    reading: library.filter((b) => b.status === 'reading').length,
    completed: library.filter((b) => b.status === 'completed').length,
  }), [library]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        <header>
          <h1 className="text-3xl font-bold text-slate-800">Okuma Listem</h1>
          <p className="text-slate-500 mt-1">Okuduğun, okumakta olduğun ve okumak istediğin kitapları yönet.</p>
        </header>

        <section className="space-y-3">
          <SearchBar
            onSearch={handleSearch}
            onClear={() => {
              setSearchResults([]);
              setSearchError(null);
            }}
            isLoading={isSearching}
          />
          {searchError && (
            <p className="text-sm text-red-600">{searchError}</p>
          )}
        </section>

        {searchResults.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-800">Arama Sonuçları</h2>
            <BookList
              books={searchResults}
              variant="search"
              onAdd={handleAdd}
              emptyMessage="Sonuç bulunamadı."
            />
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">Kütüphanem</h2>
          <StatusFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
          <BookList
            books={filteredLibrary}
            variant="library"
            onRemove={handleRemove}
            onStatusChange={handleStatusChange}
            emptyMessage={
              library.length === 0
                ? 'Henüz kitap eklemedin. Yukarıdan arama yapıp kitap ekle.'
                : 'Bu filtrede kitap yok.'
            }
          />
        </section>

      </div>
    </div>
  );
}

export default HomePage;
