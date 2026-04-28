// Bu dosya JSDoc tip tanımları içindir. Runtime'da hiçbir şey yapmaz.

/**
 * @typedef {'wishlist'|'reading'|'completed'} BookStatus
 */

/**
 * API'den dönen ham arama sonucu. Kullanıcı henüz listesine eklemedi.
 * @typedef {Object} SearchResult
 * @property {string} id                          - Open Library key (örn: /works/OL12345W)
 * @property {string} title                       - Kitap adı
 * @property {string[]} authors                   - Yazar listesi (boş olabilir)
 * @property {number|null} firstPublishYear       - İlk yayın yılı
 * @property {string|null} coverUrl               - Kapak görseli URL'si
 */

/**
 * Kullanıcının okuma listesindeki kitap. SearchResult'tan türetilir, status ve addedAt eklenir.
 * @typedef {SearchResult & { status: BookStatus, addedAt: string }} Book
 */
