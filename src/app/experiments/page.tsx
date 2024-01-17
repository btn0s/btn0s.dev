import { getExperiments } from "@/app/api/experiments";
import { ExperimentCard } from "@/components/ExperimentCard";

const Page = async () => {
  const experiments = await getExperiments();
  return (
    <div className="flex flex-col gap-12">
      <p>
        Consider this a peek into my lab. I&apos;m always experimenting and
        tinkering, and I usually dump the cool stuff here.
      </p>
      <div className="grid grid-cols-2">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.slug} experiment={experiment} />
        ))}
      </div>
    </div>
  );
};

export default Page;
