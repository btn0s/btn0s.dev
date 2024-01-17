import { Experiment } from "@/app/api/experiments";
import { Card, CardHeader, CardImage } from "@/components/ui/card";

export const ExperimentCard = ({ experiment }: { experiment: Experiment }) => (
  <Card>
    <CardImage
      src={experiment.metadata.image}
      alt={experiment.metadata.title}
    />
    <CardHeader>
      <p>{experiment.metadata.title}</p>
      <p>{experiment.metadata.description}</p>
    </CardHeader>
  </Card>
);
