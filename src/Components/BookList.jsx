/**
 * Kitap dizisini responsive grid'e dizer.
 * @param {{ books: Array, variant: 'search'|'library', onAdd?: function, onRemove?: function, onStatusChange?: function, emptyMessage?: string }} props
 */
import BookCard from './BookCard';

function BookList({ books, variant, onAdd, onRemove, onStatusChange, emptyMessage = 'Henüz kitap yok.' }) {
  return books.length === 0 ? (
    <div className="text-center text-slate-400 py-12">{emptyMessage}</div>
  ) : (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          variant={variant}
          onAdd={onAdd}
          onRemove={onRemove}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default BookList;
