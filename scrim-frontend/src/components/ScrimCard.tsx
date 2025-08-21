'use client';

export default function ScrimCard({
  scrim,
  onOpen,
}: {
  scrim: any;
  onOpen: () => void;
}) {
  return (
    <div className="bg-surface rounded-card p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={scrim.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-white">{scrim.team}</h3>
          <p className="text-sm text-muted">
            {scrim.format} • {scrim.map} • {scrim.region}
          </p>
        </div>
      </div>
      <button
        onClick={onOpen}
        className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-600"
      >
        Open
      </button>
    </div>
  );
}
