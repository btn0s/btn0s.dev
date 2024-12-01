import Image from "next/image";

import personalSiteRedesignImage01 from "@/assets/images/shots/personal-site-redesign-01.png";
import personalSiteRedesignImage02 from "@/assets/images/shots/personal-site-redesign-02.png";
import personalSiteRedesignImage03 from "@/assets/images/shots/personal-site-redesign-03.png";
import personalSiteRedesignImage04 from "@/assets/images/shots/personal-site-redesign-04.png";
import PageTitle, { PageTitleHighlight } from "@/components/page-title";

const Page = () => {
  return (
    <div>
      <PageTitle>
        This is my{" "}
        <PageTitleHighlight block>digital sketchbook</PageTitleHighlight>.
      </PageTitle>
      <div className="grid grid-cols-3 gap-4">
        <Image src={personalSiteRedesignImage01} alt="Personal site redesign" />
        <Image src={personalSiteRedesignImage02} alt="Personal site redesign" />
        <Image src={personalSiteRedesignImage03} alt="Personal site redesign" />
        <Image src={personalSiteRedesignImage04} alt="Personal site redesign" />
      </div>
    </div>
  );
};

export default Page;
