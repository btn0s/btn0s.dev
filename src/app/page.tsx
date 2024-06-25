import { getExperiments } from "@/app/api/experiments";
import { getNotes } from "@/app/api/notes";
import Home from "@/components/pages/home";

export default async function Page() {
  const notes = await getNotes();
  const experiments = await getExperiments();

  return <Home notes={notes} experiments={experiments} />;
}
