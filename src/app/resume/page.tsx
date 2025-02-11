"use client";

import { Suspense } from "react";

import dynamic from "next/dynamic";

import { ResumePDF } from "@/components/resume-pdf";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export default function PreviewPage() {
  return (
    <div className="h-screen w-full">
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
