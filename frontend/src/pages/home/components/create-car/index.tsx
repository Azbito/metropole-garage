import { FormEvent, useCallback, useState } from 'react';

import { Star } from 'react-feather';

import { Button } from '@/components/ui/button';
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

import { useCarStore } from '@/stores/use-cars-store';
import { useLoaderStore } from '@/stores/use-preloader';

import { ColorPickerPopover } from '@/components/color-picker';

import { spawnCar } from '@/services/cars/spawn';

import { ModelsSelect } from './models';

type CarData = {
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    userId: string;
    damage: number;
    fuel: number;
    purchaseDate: string;
};

export function CreateCar() {
    const { t } = useTranslation();
    const { addCar, cars } = useCarStore();
    const { setLoader } = useLoaderStore();

    const [form, setForm] = useState<CarData>({
        plate: '',
        model: '',
        primaryColor: '',
        secondaryColor: '',
        userId: '110000134934047',
        damage: 0,
        fuel: 100,
        purchaseDate: new Date().toISOString().split('T')[0],
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof CarData, boolean>>
    >({});
    const [doesCarExist, setDoesCarExist] = useState<boolean>(false);

    const updateField = <K extends keyof CarData>(
        key: K,
        value: CarData[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: false }));
    };

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            setDoesCarExist(false);

            const newErrors: Partial<Record<keyof CarData, boolean>> = {};

            if (!form.plate.trim()) newErrors.plate = true;
            if (!form.model.trim()) newErrors.model = true;
            if (!form.primaryColor.trim()) newErrors.primaryColor = true;
            if (!form.secondaryColor.trim()) newErrors.secondaryColor = true;

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            try {
                setLoader(true);

                const res = await spawnCar({ data: form });

                if (!res) return;

                if (cars.find((item) => item.plate === res.plate)) {
                    setDoesCarExist(true);
                    return;
                }

                addCar(res);
            } catch (e) {
                console.error(e);
            } finally {
                setLoader(false);
            }
        },
        [form, setLoader]
    );

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
                                <Label className="mb-2">{t('plate')}</Label>
                                <Input
                                    value={form.plate}
                                    onChange={(e) =>
                                        updateField('plate', e.target.value)
                                    }
                                />
                                {errors.plate && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {t('invalidData')}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col w-full">
                                    <Label className="mb-2">
                                        {t('primaryColor')}
                                    </Label>
                                    <ColorPickerPopover
                                        color={form.primaryColor}
                                        setColor={(color) =>
                                            updateField('primaryColor', color)
                                        }
                                    />
                                    {errors.primaryColor && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {t('invalidData')}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col w-full">
                                    <Label className="mb-2">
                                        {t('secondaryColor')}
                                    </Label>
                                    <ColorPickerPopover
                                        color={form.secondaryColor}
                                        setColor={(color) =>
                                            updateField('secondaryColor', color)
                                        }
                                    />
                                    {errors.secondaryColor && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {t('invalidData')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label className="mb-2">
                                    {t('damage-percentage')}
                                </Label>
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
                                <Label className="mb-2">
                                    {t('fuel-percentage')}
                                </Label>
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
                        </div>

                        <div className="flex flex-col">
                            <Label className="mb-2">{t('model')}</Label>
                            <ModelsSelect
                                selectedModel={form.model}
                                setSelectedModel={(value) =>
                                    updateField('model', value)
                                }
                            />
                            {errors.model && (
                                <p className="text-sm text-red-500 mt-1">
                                    {t('invalidData')}
                                </p>
                            )}
                        </div>

                        {doesCarExist && (
                            <b className="bg-red-800 text-white px-2 py-1 rounded-md text-sm">
                                {t('existingCarWarn')}
                            </b>
                        )}

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
