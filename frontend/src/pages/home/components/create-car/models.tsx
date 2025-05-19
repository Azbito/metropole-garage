import { useCallback, useEffect, useState } from 'react';

import { VehicleModels, vehicleModels } from '@/data/models';

import { useSteamStore } from '@/stores/use-steam-store';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useTranslation } from '@/hooks/use-translation';

import { getAvailableUserModels } from '@/services/available-models';

export function ModelsSelect({
    selectedModel,
    setSelectedModel,
}: {
    selectedModel: string;
    setSelectedModel: (value: string) => void;
}) {
    const { t } = useTranslation();
    const { user } = useSteamStore();
    const [models, setModels] = useState<VehicleModels[]>([]);

    const handleGetModels = useCallback(async () => {
        const res = await getAvailableUserModels();

        if (res.length === 0) return;

        const formattedRes = res.reduce(
            (acc: VehicleModels[], cur: { car_model: string }) => {
                const targetModel = vehicleModels.find(
                    (model) => model.value === cur.car_model
                );

                if (targetModel) {
                    acc.push({
                        label: targetModel.label,
                        value: targetModel.value,
                    });
                }

                return acc;
            },
            []
        );

        setModels(formattedRes);
    }, []);

    useEffect(() => {
        handleGetModels();
    }, [user?.steam_id]);

    return (
        <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={t('selectAModel')} />
            </SelectTrigger>
            <SelectContent>
                {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                        {model.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
