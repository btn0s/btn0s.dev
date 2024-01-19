import { Experiment } from "@/app/api/experiments";
import { Card, CardHeader, CardImage } from "@/components/ui/card";

export const ExperimentCard = ({ experiment }: { experiment: Experiment }) => (
  <Card>
    <CardImage src={experiment.meta.image} alt={experiment.meta.title} />
    <CardHeader>
      <p>{experiment.meta.title}</p>
      <p>{experiment.meta.description}</p>
    </CardHeader>
  </Card>
);
