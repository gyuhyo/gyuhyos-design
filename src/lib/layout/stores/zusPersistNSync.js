import { persistNSync } from "persist-and-sync";
import { persist, createJSONStorage } from "zustand/middleware";

export const zusPersistNSync = (child, { name, storage, include, version }) => {
  return persistNSync(
    persist(child, {
      name: name,
      partialize: (state) => {
        return Object.fromEntries(include.map((s) => [s, state[s]]));
      },
      storage: createJSONStorage(() => storage ?? "localStorage"),
      version: version,
      skipHydration: false,
    }),
    {
      name: name,
      storage: storage,
      include: include,
      initDelay: 0,
      version: version,
    }
  );
};
