import { useState } from 'react';

import CarIcon from '@/assets/icons/car.svg?react';
import Color from '@/assets/icons/color.svg?react';
import type { Car } from '@/interfaces/car-interface';
import { Droplet, Frown, Key, MapPin, Shield, Tool, User } from 'react-feather';

import { Card } from '@/components/ui/card';

import { useTranslation } from '@/hooks/use-translation';

function CarCard({ car }: { car: Car }) {
    const { t } = useTranslation();

    const info = [
        {
            label: t('model'),
            value: car.model,
            icon: <CarIcon className="h-6 w-6" />,
        },
        {
            label: t('color'),
            value: car.color,
            icon: <Color className="h-6 w-6" />,
        },
        { label: t('plate'), value: car.plate, icon: <Tool /> },
        { label: t('owner'), value: car.owner, icon: <User /> },
        { label: t('damage'), value: `${car.damage}%`, icon: <Shield /> },
        { label: t('fuel'), value: `${car.fuel}%`, icon: <Droplet /> },
        {
            label: t('locked'),
            value: car.locked ? t('yes') : t('no'),
            icon: <Key />,
        },
        {
            label: t('position'),
            value: `X: ${car.position[0]}, Y: ${car.position[1]}, Z: ${car.position[2]}`,
            icon: <MapPin />,
        },
        {
            label: t('purchaseDate'),
            value: new Date(car.purchaseDate).toLocaleDateString(),
            icon: <Tool />,
        },
    ];

    return (
        <Card className="max-[600px]:max-w-auto max-w-[25rem] min-w-[25rem] px-6 transition-all hover:scale-105 max-[600px]:w-full max-[600px]:min-w-auto">
            {info.map((item, index) => (
                <p
                    key={index}
                    className="flex w-full items-center justify-between max-[600px]:flex-col max-[600px]:items-start max-[600px]:justify-start"
                >
                    <span className="flex items-center space-x-2">
                        {item.icon}
                        <b>{item.label}</b>
                    </span>
                    {item.value}
                </p>
            ))}
        </Card>
    );
}

export function CarList() {
    const [cars] = useState<Car[]>([]);
    const { t } = useTranslation();

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
