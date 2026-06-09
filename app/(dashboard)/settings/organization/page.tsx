import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Button
} from "@/components/ui";
import { updateRodIntegration } from "@/lib/actions/tenant";
import { Zap, Link2, Link2Off, CreditCard, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default async function OrganizationSettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Not authenticated</div>;

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!profile) return <div>Profile not found</div>;

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', profile.tenant_id)
    .single();

  if (!tenant) return <div>Tenant not found</div>;

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .maybeSingle();

  const isRodConnected = !!tenant.rod_api_key;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Ustawienia organizacji</h1>
        <p className="text-gray-400 mt-2">Zarządzaj swoją organizacją i integracjami.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Subskrypcja</h2>
        <Card className="mb-8 border-brand-navy/20">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-10 h-10 bg-brand-navy/20 rounded-lg flex items-center justify-center">
              <CreditCard className="text-brand-gold w-6 h-6" />
            </div>
            <div>
              <CardTitle>Twój plan: <span className="text-brand-gold uppercase tracking-widest text-sm">{subscription?.status === 'active' ? 'Premium' : 'Trial'}</span></CardTitle>
              <CardDescription>Zarządzaj swoim abonamentem i płatnościami.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${subscription?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className="font-bold text-white uppercase text-xs">
                    {subscription?.status === 'active' ? 'Aktywny' : 'Okres próbny'}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Następna płatność</p>
                <span className="font-bold text-white text-xs">
                  {subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString('pl-PL') : 'N/A'}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Cena Early Bird</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-gold text-xs">79 PLN / os.</span>
                  {tenant.early_bird_until && new Date(tenant.early_bird_until) > new Date() && (
                    <span className="bg-brand-gold/20 text-brand-gold text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">Dostępna</span>
                  )}
                </div>
              </div>
            </div>

            {subscription?.status !== 'active' && (
              <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                   <div className="flex items-center gap-2 text-brand-gold">
                      <Zap className="w-4 h-4 fill-brand-gold" />
                      <p className="text-sm font-black uppercase tracking-widest">Odblokuj pełną moc Perun Core</p>
                   </div>
                   <p className="text-xs text-gray-400 font-medium">Zajmij jedno z ostatnich miejsc Early Bird i zablokuj cenę na zawsze.</p>
                </div>
                <Link href="/pricing" className="w-full md:w-auto px-8 py-4 bg-brand-gold text-black rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all text-center">
                   Przejdź do planów
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold text-white mb-4">Integracje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 bg-brand-navy/20 rounded-lg flex items-center justify-center">
                <Zap className="text-brand-gold w-6 h-6" />
              </div>
              <div>
                <CardTitle>ROD System</CardTitle>
                <CardDescription>System zarządzania produkcją</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">
                Połącz Perun Core z ROD System, aby synchronizować dane o kosztach produkcji i marży w czasie rzeczywistym.
              </p>

              {isRodConnected ? (
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-500 font-medium">Połączono</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {tenant.rod_connected_at ? new Date(tenant.rod_connected_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <form action={updateRodIntegration}>
                    <input type="hidden" name="disconnect" value="true" />
                    <Button variant="outline" className="w-full gap-2 border-red-500/50 hover:bg-red-500/10 text-red-500">
                      <Link2Off className="w-4 h-4" />
                      Odłącz ROD System
                    </Button>
                  </form>
                </div>
              ) : (
                <form action={updateRodIntegration} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="rodApiKey" className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      API Key
                    </label>
                    <Input
                      id="rodApiKey"
                      name="rodApiKey"
                      type="password"
                      placeholder="Wprowadź klucz API ROD..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Link2 className="w-4 h-4" />
                    Połącz z ROD System
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Placeholders for future integrations */}
          <Card className="opacity-50 grayscale">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 bg-brand-navy-lt/20 rounded-lg flex items-center justify-center">
                <Link2 className="text-gray-500 w-6 h-6" />
              </div>
              <div>
                <CardTitle>Inne Systemy</CardTitle>
                <CardDescription>Wkrótce...</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 italic">
                Więcej integracji pojawi się wkrótce.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
