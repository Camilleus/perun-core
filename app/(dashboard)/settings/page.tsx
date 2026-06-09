export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ustawienia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="/settings/organization" className="p-6 bg-card border border-border rounded-lg hover:border-brand-gold-dk transition-colors group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-brand-gold-dk transition-colors">Organizacja</h2>
          <p className="text-gray-400">Zarządzaj ustawieniami swojej organizacji i integracjami.</p>
        </a>
      </div>
    </div>
  );
}
