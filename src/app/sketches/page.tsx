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
        a peek at the pages{" "}
        <PageTitleHighlight block>of my sketchbook</PageTitleHighlight>
      </PageTitle>
      <div className="-mx-24 grid grid-cols-3 gap-4">
        <Image
          src={personalSiteRedesignImage01}
          alt="Personal site redesign"
          className="rounded-lg"
        />
        <Image
          src={personalSiteRedesignImage02}
          alt="Personal site redesign"
          className="rounded-lg"
        />
        <Image
          src={personalSiteRedesignImage03}
          alt="Personal site redesign"
          className="rounded-lg"
        />
        <Image
          src={personalSiteRedesignImage04}
          alt="Personal site redesign"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Page;
