export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Sales Pipeline</h1>
          <p className="text-gray-400 mt-1">Manage your active deals and convert them into projects.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          + New Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Lead', 'Negotiation', 'Won', 'Lost'].map((stage) => (
          <div key={stage} className="bg-white/5 rounded-xl p-4 border border-border min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500">{stage}</h3>
              <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">0</span>
            </div>
            <div className="flex flex-col gap-3">
              {/* Cards will go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
