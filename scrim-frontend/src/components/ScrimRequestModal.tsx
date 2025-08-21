'use client';

export default function ScrimRequestModal({
  scrim,
  onClose,
}: {
  scrim: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-card p-6 w-full max-w-md shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Scrim vs {scrim.team}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>🕒 {scrim.time}</span>
            <span className="text-muted">Today</span>
          </div>

          <div>
            <label className="block text-sm mb-1">Match Format</label>
            <select className="bg-background text-white p-2 rounded w-full">
              <option>Bo1</option>
              <option>Bo2</option>
              <option>Bo3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Map</label>
            <select className="bg-background text-white p-2 rounded w-full">
              <option>Any Map</option>
              <option>Ascent</option>
              <option>Bind</option>
              <option>Lotus</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Region</label>
            <div className="flex flex-wrap gap-2">
              {['HK', 'SG', 'JP', 'SYD', 'MB'].map(region => (
                <button
                  key={region}
                  className="px-3 py-1 bg-background rounded-full text-sm hover:bg-accent hover:text-white"
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Message (optional)</label>
            <textarea
              className="bg-background text-white p-2 rounded w-full resize-none"
              rows={3}
              placeholder="Send a message..."
            />
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="px-4 py-2 text-muted hover:text-white">Discard</button>
            <button className="px-4 py-2 bg-accent rounded hover:bg-blue-600">Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
}
