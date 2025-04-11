import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex flex-1 flex-col bg-background h-[100vh] w-full overflow-hidden">
      {children}
    </main>
  );
}
