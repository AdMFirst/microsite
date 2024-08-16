'use client';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/cjs/Page/AnnotationLayer.css'; 
import 'react-pdf/dist/cjs/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface OnDocumentLoadSuccessParams {
    numPages: number;
}

export default function CVReader() {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numPages, setNumPages] = useState<number | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: OnDocumentLoadSuccessParams) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < (numPages ?? 0)) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prevPageNumber => prevPageNumber - 1);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
            <Document 
                file="/api/cv" 
                className="shadow-lg rounded-lg overflow-hidden"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            {numPages && numPages > 1 && (
                <>
                    <button 
                        onClick={prevPage} 
                        disabled={pageNumber === 1}
                        className={`fixed bottom-4 left-4 w-12 h-12 ${pageNumber === 1 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-full flex justify-center items-center shadow-lg`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button 
                        onClick={nextPage} 
                        disabled={pageNumber === numPages}
                        className={`fixed bottom-4 right-4 w-12 h-12 ${pageNumber === numPages ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-full flex justify-center items-center shadow-lg`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
}
