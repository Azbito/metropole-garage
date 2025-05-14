import type { ReactNode } from 'react';

export function Wrapper({ children }: { children: ReactNode }) {
    return <div className="p-12 max-[600px]:p-5">{children}</div>;
}
