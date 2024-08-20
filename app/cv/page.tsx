'use client'

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Agreement from "./CVAgreement";
import { useRouter } from "next/navigation";
import AgreementPaper from "./AgreementPaper";

const PdfViewerComponent = dynamic(() => import("./CVReader"), { ssr: false, });

export default function CVPage() {
    const router = useRouter();
    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            {isAgreed? 
            <PdfViewerComponent /> :
            <AgreementPaper setIsAgreed={setIsAgreed}  />
            }
        </Suspense>
    )
}