import { SafeHTML } from "@/components/safe-html";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Smile } from "react-feather";

export function About() {
  const { t } = useTranslation();

  return (
    <Card className="relative px-8 fade-in">
      <div className="bg-brand-background absolute -top-4 -left-4 rounded-full p-2">
        <Smile />
      </div>
      <p>
        <SafeHTML content={t("about")} />
      </p>
    </Card>
  );
}
