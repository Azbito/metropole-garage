import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSteam } from '@/hooks/use-steam';

export function UserButton({ isFiveM }: { isFiveM: boolean }) {
    const { user } = useSteam(isFiveM);

    if (!user) return null;

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('steamId');
        window.location.reload();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="default"
                    className="flex items-center gap-2 px-3 fixed top-4 right-4"
                >
                    <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                        <AvatarImage src={user.avatar} />
                    </Avatar>
                    <span className="text-sm font-medium text-black">
                        {user.name}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            {!isFiveM && (
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Desconectar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
}
