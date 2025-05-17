import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useTranslation } from '@/hooks/use-translation';

import { vehicleModels } from '../../../../data/models';

export function ModelsSelect({
    selectedModel,
    setSelectedModel,
}: {
    selectedModel: string;
    setSelectedModel: (value: string) => void;
}) {
    const { t } = useTranslation();

    return (
        <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={t('selectAModel')} />
            </SelectTrigger>
            <SelectContent>
                {vehicleModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                        {model.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
