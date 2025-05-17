import { HexColorPicker } from 'react-colorful';

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export function ColorPickerPopover({
    color,
    setColor,
}: {
    color: string;
    setColor: (newColor: string) => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full h-10"
                    style={{ backgroundColor: color }}
                ></Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <HexColorPicker color={color} onChange={setColor} />
            </PopoverContent>
        </Popover>
    );
}
