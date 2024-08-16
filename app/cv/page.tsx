'use client'

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PdfViewerComponent = dynamic(() => import("./CVReader"), { ssr: false, });

export default function CVPage() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <PdfViewerComponent />
        </Suspense>
    )
}