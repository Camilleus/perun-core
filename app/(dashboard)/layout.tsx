import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { EarlyBirdBanner } from "@/components/early-bird-banner";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let onboarded = true;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarded')
      .eq('id', user.id)
      .single();

    onboarded = profile?.onboarded ?? true;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EarlyBirdBanner className="z-50" />
      <div className="flex flex-1">
        {!onboarded && <OnboardingWizard />}
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
