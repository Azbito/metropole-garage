import { useState } from 'react';

import { Star } from 'react-feather';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useTranslation } from '@/hooks/use-translation';

import './styles.css';

type Customizations = {
    rims: string;
    spoiler: string;
    neon: boolean;
    performance: string;
};

type CarData = {
    plate: string;
    model: string;
    color: string;
    customizations: Customizations;
    owner: string;
    damage: number;
    fuel: number;
    locked: boolean;
    position: [number, number, number];
    purchaseDate: string;
};

export function CreateCar() {
    const { t } = useTranslation();
    const [form, setForm] = useState<CarData>({
        plate: '',
        model: '',
        color: '',
        customizations: {
            rims: '',
            spoiler: '',
            neon: false,
            performance: '',
        },
        owner: '',
        damage: 0,
        fuel: 100,
        locked: false,
        position: [0, 0, 0],
        purchaseDate: new Date().toISOString().split('T')[0],
    });

    const updateField = <K extends keyof CarData>(
        key: K,
        value: CarData[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🚗 Car to create:', form);
    };

    return (
        <div className="flex items-center justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-brand-background hover:bg-brand-primary mt-4 w-60 cursor-pointer text-white max-[600px]:w-full">
                        <Star className="mr-2 h-4 w-4" />
                        {t('create-car')}
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>{t('create-car')}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid-mobile grid grid-cols-2 gap-4">
                            <div>
                                <Label>{t('plate')}</Label>
                                <Input
                                    value={form.plate}
                                    onChange={(e) =>
                                        updateField('plate', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label>{t('model')}</Label>
                                <Input
                                    value={form.model}
                                    onChange={(e) =>
                                        updateField('model', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label>{t('color')}</Label>
                                <Input
                                    value={form.color}
                                    onChange={(e) =>
                                        updateField('color', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label>{t('owner')}</Label>
                                <Input
                                    value={form.owner}
                                    onChange={(e) =>
                                        updateField('owner', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label>{t('damage-percentage')}</Label>
                                <Input
                                    type="number"
                                    value={form.damage}
                                    onChange={(e) =>
                                        updateField(
                                            'damage',
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Label>{t('fuel-percentage')}</Label>
                                <Input
                                    type="number"
                                    value={form.fuel}
                                    onChange={(e) =>
                                        updateField(
                                            'fuel',
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="mt-6 flex items-center gap-2">
                                    <Checkbox
                                        checked={form.locked}
                                        onCheckedChange={(value) =>
                                            updateField(
                                                'locked',
                                                Boolean(value)
                                            )
                                        }
                                    />
                                    <Label>{t('locked')}</Label>
                                </div>
                                <div>
                                    <Label>{t('purchase-date')}</Label>
                                    <Calendar
                                        mode="single"
                                        selected={
                                            form.purchaseDate
                                                ? new Date(form.purchaseDate)
                                                : undefined
                                        }
                                        onSelect={(date) =>
                                            updateField(
                                                'purchaseDate',
                                                date ? date.toISOString() : ''
                                            )
                                        }
                                        initialFocus
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="custom-position-container">
                            <div className="border-t pt-4">
                                <h3 className="mb-2 font-semibold">
                                    {t('customizations')}
                                </h3>
                                <div className="grid-mobile grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>{t('rims')}</Label>
                                        <Input
                                            value={form.customizations.rims}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    customizations: {
                                                        ...prev.customizations,
                                                        rims: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>{t('spoiler')}</Label>
                                        <Input
                                            value={form.customizations.spoiler}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    customizations: {
                                                        ...prev.customizations,
                                                        spoiler: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>{t('performance')}</Label>
                                        <Input
                                            value={
                                                form.customizations.performance
                                            }
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    customizations: {
                                                        ...prev.customizations,
                                                        performance:
                                                            e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="my-6 flex items-center gap-2">
                                        <Checkbox
                                            checked={form.customizations.neon}
                                            onCheckedChange={(value) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    customizations: {
                                                        ...prev.customizations,
                                                        neon: Boolean(value),
                                                    },
                                                }))
                                            }
                                        />
                                        <Label>{t('neon')}</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="mb-2 font-semibold">
                                    {t('initial-position')}
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {['X', 'Y', 'Z'].map((axis, i) => (
                                        <div key={axis}>
                                            <Label>{axis}</Label>
                                            <Input
                                                type="number"
                                                value={form.position[i]}
                                                onChange={(e) => {
                                                    const newPos = [
                                                        ...form.position,
                                                    ] as [
                                                        number,
                                                        number,
                                                        number,
                                                    ];
                                                    newPos[i] = Number(
                                                        e.target.value
                                                    );
                                                    updateField(
                                                        'position',
                                                        newPos
                                                    );
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="bg-brand-primary hover:bg-brand-secondary mt-4 w-full text-black"
                        >
                            {t('save-car')}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
