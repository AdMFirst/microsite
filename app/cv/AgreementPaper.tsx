import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import CVAgreement from './CVAgreement';

function AgreementPaper(setIsAgreed: any ) {
  const router = useRouter();
  const [hcaptchaToken, setHcaptchaToken] = useState(null);

  const handleAgree = (token:any) => {
    setHcaptchaToken(token);
    setIsAgreed(true);
    // Handle agreement logic here, e.g., send data to server
  };

  const handleCancel = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md max-w-md mx-auto">
      <CVAgreement />

      <div className="flex justify-center mt-4">
        <HCaptcha
          sitekey="eb04bb6e-bd26-4588-88ba-84c2ebf211d8" // Replace with your hCaptcha site key
          onVerify={handleAgree}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-4"
          disabled={!hcaptchaToken}
          onClick={() => console.log('Agreed')} // Replace with your agreement logic
        >
          Agree
        </button>
      </div>
    </div>
  );
}

export default AgreementPaper;