import type { ReactNode } from 'react';

export function Main({ children }: { children: ReactNode }) {
    return (
        <div className="mt-32 rounded-md border p-12 max-[600px]:p-5">
            {children}
        </div>
    );
}
