"use client";

import { Suspense } from "react";

import { pdf } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

import { ResumePDF } from "@/components/resume-pdf";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export default function PreviewPage() {
  const handleDownload = async () => {
    const blob = await pdf(<ResumePDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brendan-norris-resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative h-screen w-full">
      <button
        onClick={handleDownload}
        className="absolute right-4 top-4 rounded-md bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        Download PDF
      </button>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            Loading PDF viewer...
          </div>
        }
      >
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <ResumePDF />
        </PDFViewer>
      </Suspense>
    </div>
  );
}
