import { useCallback, useEffect } from 'react';

import CarIcon from '@/assets/icons/car.svg?react';
import Color from '@/assets/icons/color.svg?react';
import { vehicleModels } from '@/data/models';
import type { Car } from '@/interfaces/car-interface';
import { Droplet, Frown, Shield, ShoppingBag, Tool } from 'react-feather';

import { useCarStore } from '@/stores/use-cars-store';

import { Card } from '@/components/ui/card';

import { useSteam } from '@/hooks/use-steam';
import { useTranslation } from '@/hooks/use-translation';

import { listCars } from '@/services/cars/list';

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
        <Card className="max-[600px]:max-w-auto max-w-[25rem] min-w-[25rem] px-6 transition-all hover:scale-105 max-[600px]:w-full max-[600px]:min-w-auto">
            {info.map((item, index) => (
                <div
                    key={index}
                    className="flex w-full items-center justify-between max-[600px]:flex-col max-[600px]:items-start max-[600px]:justify-start"
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

export function CarList() {
    const { cars, addCar } = useCarStore();
    const { t } = useTranslation();
    const { user } = useSteam();

    const handleListCars = useCallback(async () => {
        if (!user?.steam_id) return;

        const data = await listCars();

        for (const car of data) {
            addCar(car);
        }
    }, [user?.steam_id]);

    useEffect(() => {
        if (!user?.steam_id) return;

        handleListCars();
    }, [user]);

    return (
        <div className="mt-16">
            <h2 className="mb-4 text-2xl font-bold">{t('existingCars')}</h2>
            {(!!cars.length as boolean) ? (
                <div className="flex flex-wrap items-center justify-start gap-4 max-[1010px]:justify-center">
                    {cars.map((car: Car) => (
                        <CarCard key={car.plate} car={car} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-brand-background rounded-full p-2">
                        <Frown />
                    </div>
                    <p>Não há carros criados</p>
                </div>
            )}
        </div>
    );
}
