/** Open Library Search API ile kitap arama servisi. */
import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/search.json';

/**
 * @param {string} query
 * @param {number} [limit=20]
 * @returns {Promise<import('../Interfaces/bookTypes').SearchResult[]>}
 */
export async function searchBooks(query, limit = 20) {
  const response = await axios.get(BASE_URL, {
    params: { q: query, limit },
  });

  return response.data.docs.map((doc) => ({
    id: doc.key,
    title: doc.title,
    authors: doc.author_name || [],
    firstPublishYear: doc.first_publish_year ?? null,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
  }));
}

/**
 * Uygulama açılışında gösterilecek varsayılan kitap listesini döndürür.
 * @returns {Promise<import('../Interfaces/bookTypes').SearchResult[]>}
 */
export async function getInitialBooks() {
  return searchBooks('bestseller', 12);
}
