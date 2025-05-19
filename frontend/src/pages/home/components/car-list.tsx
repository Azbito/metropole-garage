import { useCallback, useEffect, useRef, useState } from 'react';

import CarIcon from '@/assets/icons/car.svg?react';
import Color from '@/assets/icons/color.svg?react';
import { vehicleModels } from '@/data/models';
import type { Car } from '@/interfaces/car-interface';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Droplet, Frown, Shield, ShoppingBag, Tool } from 'react-feather';

import { useCarStore } from '@/stores/use-cars-store';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';

import { useSteam } from '@/hooks/use-steam';
import { useTranslation } from '@/hooks/use-translation';

import { listCars } from '@/services/cars/list';
import { DataProps, spawnCar } from '@/services/cars/spawn';

function CarCard({ car }: { car: Car }) {
    const { t } = useTranslation();

    const info = [
        {
            label: t('model'),
            value: vehicleModels.find((val) => val.value === car.model)?.label,
            icon: <CarIcon className="h-6 w-6" />,
        },
        {
            label: t('colors'),
            value: [car.primaryColor, car.secondaryColor],
            icon: <Color className="h-6 w-6" />,
        },
        { label: t('plate'), value: car.plate, icon: <Tool /> },
        { label: t('damage'), value: `${car.damage}%`, icon: <Shield /> },
        { label: t('fuel'), value: `${car.fuel}%`, icon: <Droplet /> },

        {
            label: t('purchaseDate'),
            value: new Date(car.purchaseDate).toLocaleDateString(),
            icon: <ShoppingBag />,
        },
    ];

    return (
        <Card className="px-6 transition-all hover:scale-105 max-w-[25rem] min-w-[25rem] max-[600px]:w-full max-[600px]:min-w-auto max-[600px]:max-w-auto max-[506px]:w-full max-[506px]:min-w-auto max-[506px]:max-w-auto">
            {info.map((item, index) => (
                <div
                    key={index}
                    className="flex w-full items-center justify-between max-[506px]:justify-between max-[506px]:flex-row max-[600px]:flex-col max-[600px]:items-start max-[600px]:justify-start"
                >
                    <span className="flex items-center space-x-2">
                        {item.icon}
                        <b>{item.label}</b>
                    </span>
                    {Array.isArray(item.value) ? (
                        <div className="flex gap-4">
                            {item.value.map((v, i) => (
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{
                                        backgroundColor: v,
                                    }}
                                    key={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <>{item.value}</>
                    )}
                </div>
            ))}
        </Card>
    );
}

export function CarList({ isFiveM }: { isFiveM: boolean }) {
    const { cars, addCar } = useCarStore();
    const { t } = useTranslation();
    const { user } = useSteam(isFiveM);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [openDialogCar, setOpenDialogCar] = useState<Car | null>(null);

    const isTouchDevice =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches;

    const handleListCars = useCallback(async () => {
        const data = await listCars();
        for (const car of data) {
            addCar(car);
        }
    }, [user?.steam_id]);

    const handleSpawnCar = useCallback(async (car: Car) => {
        try {
            await spawnCar({ data: car as DataProps });
        } catch (e) {
            console.error('Error while spawning the car', e);
        }
    }, []);

    useEffect(() => {
        if (!user?.steam_id) return;
        handleListCars();
    }, [user?.steam_id]);

    return (
        <div className="mt-16">
            <h2 className="mb-4 text-2xl font-bold">{t('existingCars')}</h2>
            {cars.length ? (
                <div className="flex flex-wrap items-center justify-start gap-4 max-w-[506px]:w-full max-[1010px]:justify-center">
                    {cars.map((car) => (
                        <div key={car.plate} className="max-[506px]:w-full">
                            {isTouchDevice ? (
                                <>
                                    <div
                                        className="w-full"
                                        onTouchStart={() => {
                                            timerRef.current = setTimeout(
                                                () => {
                                                    setOpenDialogCar(car);
                                                },
                                                600
                                            );
                                        }}
                                        onTouchEnd={() => {
                                            if (timerRef.current) {
                                                clearTimeout(timerRef.current);
                                                timerRef.current = null;
                                            }
                                        }}
                                        onClick={() => setOpenDialogCar(car)}
                                    >
                                        <CarCard car={car} />
                                    </div>

                                    <Dialog
                                        open={
                                            openDialogCar?.plate === car.plate
                                        }
                                        onOpenChange={(open) =>
                                            !open && setOpenDialogCar(null)
                                        }
                                    >
                                        <DialogContent>
                                            <DialogTitle>
                                                {
                                                    vehicleModels.find(
                                                        (item) =>
                                                            item.value ===
                                                            car.model
                                                    )?.label
                                                }
                                            </DialogTitle>
                                            <div className="w-full flex items-center justify-center">
                                                <img
                                                    src={`https://docs.fivem.net/vehicles/${car.model}.webp`}
                                                    alt={car.model}
                                                    className="w-full max-h-48 object-contain"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    handleSpawnCar(car);
                                                    setOpenDialogCar(null);
                                                }}
                                            >
                                                {t('spawn')}
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            ) : (
                                <ContextMenu>
                                    <ContextMenuTrigger>
                                        <CarCard car={car} />
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ContextMenuItem>
                                                    {t('seeModel')}
                                                </ContextMenuItem>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="right"
                                                align="center"
                                                className="p-4"
                                            >
                                                <img
                                                    src={`https://docs.fivem.net/vehicles/${car.model}.webp`}
                                                    alt={car.model}
                                                    className="max-w-xs max-h-48 object-contain"
                                                />
                                            </TooltipContent>
                                        </Tooltip>

                                        <ContextMenuItem
                                            onSelect={() => handleSpawnCar(car)}
                                        >
                                            {t('spawn')}
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-brand-background rounded-full p-2">
                        <Frown />
                    </div>
                    <p>{t('noCarsCreated') || 'Não há carros criados'}</p>
                </div>
            )}
        </div>
    );
}
