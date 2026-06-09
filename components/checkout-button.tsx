"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/lib/actions/billing.actions";
import { Button, useToast } from "@/components/ui";
import { Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckoutButton({
  priceId,
  className,
  children
}: {
  priceId: string;
  className?: string;
  children?: React.ReactNode
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const result = await createCheckoutSession(priceId);
      if (result.success) {
        window.location.href = result.data;
      } else {
        toast(result.error, "error");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout redirect failed", error);
      toast("Wystąpił nieoczekiwany błąd.", "error");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={cn("relative group", className)}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
      ) : (
        <>
          {children || (
             <span className="flex items-center gap-2">
               Zablokuj cenę Early Bird <Zap className="w-4 h-4 fill-current" />
             </span>
          )}
        </>
      )}
    </Button>
  );
}
