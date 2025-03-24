import React from 'react';
import './faqs.css'; 
import userIcon from '../images/User.png';
import { useNavigate } from "react-router-dom";

const Faqs = () => {
  const navigate = useNavigate();
  
  return (
    <main className="mainFaqs">
     {/* Top section containing Back button, Title, and Right-side div */}
     <div className="headerFaqs">
      {/* Back Button */}
      <button className="navButtonFaqs" onClick={() => navigate(-1)}>{"<"}</button>
    
      {/* Dashboard Title */}
      <h1>FAQs</h1>
    
      {/* Placeholder div (identical to the back button in style) */}
      <button className="navButtonFaqs" onClick={() => navigate("/profile")}>
        <img src={userIcon} alt="User Icon" />
      </button>
     </div>

    <div className="faqsColumn">
     <div className='blockFaqs question'>
     <p className='centeredText'>Q- How can I install the Virtual Butler smart home system in my home?</p>
     </div>
     <div className='blockFaqs answer'>
     <p className='centeredText'>A- Simply purchase our product and we will send an engineer to perform the intial installation of the system for you. They will also give you a brief demonstration about how to use our system.</p>
     </div>
     <div className='blockFaqs question'>
     <p className='centeredText'>Q- What do i do if I need support?</p>
     </div>
     <div className='blockFaqs answer'>
     <p className='centeredText'>A- Simply contact us at virtualbulter@gmail.com and we will do our best to help with any issues.</p>
     </div>
     <div className='blockFaqs question'>
     <p className='centeredText'>Q- What devices can be used with the Virtual Butler smart home system?</p>
     </div>
     <div className='blockFaqs answer'>
     <p className='centeredText'>A- Various different devices can be used  with our system, such as lights, kitchen appliances, laundry appliances and many more.</p>
     </div>
     <div className='blockFaqs question'>
     <p className='centeredText'>Q- Can I have multiple users on the same system?</p>
     </div>
     <div className='blockFaqs answer'>
     <p className='centeredText'>A- Yes, you can add more than one user to control your smart home system.</p>
     </div>
    </div>

    </main>
  );
}

export default Faqs;