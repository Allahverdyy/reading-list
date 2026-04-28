/**
 * Okuma listesini duruma göre filtreleyen buton grubu.
 * @param {{ currentFilter: string, onFilterChange: (filter: string) => void, counts: { all: number, wishlist: number, reading: number, completed: number } }} props
 */

const FILTER_OPTIONS = [
  { key: 'all', label: 'Tümü' },
  { key: 'wishlist', label: 'Okumak istiyorum' },
  { key: 'reading', label: 'Okuyorum' },
  { key: 'completed', label: 'Okudum' },
];

function StatusFilter({ currentFilter, onFilterChange, counts }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.key}
          onClick={() => onFilterChange(option.key)}
          className={
            currentFilter === option.key
              ? 'px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white'
              : 'px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors'
          }
        >
          {option.label} ({counts[option.key]})
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;
