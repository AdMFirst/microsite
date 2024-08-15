'use client'
import { Document } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CVReader() {

    return (
        <div>
            <Document file="https://pii.or.id/uploads/dummies.pdf"></Document>
        </div>
    )
}