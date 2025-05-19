import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Wrapper({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('p-12 max-[600px]:p-5', className)}>{children}</div>
    );
}
