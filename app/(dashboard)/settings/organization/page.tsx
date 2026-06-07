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
import { Zap, Link2, Link2Off } from "lucide-react";

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

  const isRodConnected = !!tenant.rod_api_key;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Ustawienia organizacji</h1>
        <p className="text-gray-400 mt-2">Zarządzaj swoją organizacją i integracjami.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Integracje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="text-accent w-6 h-6" />
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
              <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
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
