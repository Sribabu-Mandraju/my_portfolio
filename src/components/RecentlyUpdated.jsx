export default function RecentlyUpdated({ items }) {
  return (
    <section className="bg-gray-800 border border-gray-700 rounded-lg p-4" aria-labelledby="recently-updated-title">
      <h3 className="text-lg font-semibold text-gray-100 mb-4" id="recently-updated-title">Recently Updated</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 block py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
} 