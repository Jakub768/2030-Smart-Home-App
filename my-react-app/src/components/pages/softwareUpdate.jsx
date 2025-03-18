import React from "react";
import { useNavigate } from "react-router-dom";
import './softwareUpdate.css'; // Import the CSS file
import userIcon from '../images/User.png';

export const softwareUpdate = () => {
    const navigate = useNavigate();
  
  return (
    <main className="mainSoftware">
      <div className="softwareHeader">
        <button className="navButtonSoftware" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>Software Updates</h1>
        <button className="navButtonSoftware" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>
      
    <div className="softwareColumn">
     <div className='blockSoftware question'>
     <p className='centeredText'>Q- How can I install the Virtual Butler smart home system in my home?</p>
     </div>
     </div>
      
    </main>
  );
};

export default softwareUpdate;


