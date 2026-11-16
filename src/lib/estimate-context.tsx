"use client";

import { createContext, useContext, useMemo, useState } from "react";

/** Carries what a visitor picked in the services list or material configurator
 *  down to the estimate form, so the form opens already filled in. */
interface EstimateState {
  service?: string;
  scope?: string;
  setService: (s: string) => void;
  setScope: (s: string) => void;
}

const Ctx = createContext<EstimateState | null>(null);

export function EstimateProvider({ children }: { children: React.ReactNode }) {
  const [service, setService] = useState<string>();
  const [scope, setScope] = useState<string>();
  const value = useMemo(
    () => ({ service, scope, setService, setScope }),
    [service, scope]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEstimate() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEstimate must be used inside EstimateProvider");
  return v;
}
