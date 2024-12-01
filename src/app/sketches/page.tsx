import PageTitle, { PageTitleHighlight } from "@/components/PageTitle";

const Page = () => {
  return (
    <div>
      <PageTitle>
        This is my{" "}
        <PageTitleHighlight block>digital sketchbook</PageTitleHighlight>.
      </PageTitle>
    </div>
  );
};

export default Page;
