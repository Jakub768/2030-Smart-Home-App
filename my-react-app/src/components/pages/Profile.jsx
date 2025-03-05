import React from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Profile = () => {
  const navigate = useNavigate();

  return (
      <main className="mainProfile">
        {/* Top section with Back button, Title, and Profile button */}
        <div className="profileHeader">
          <button className="navButtonProfile" onClick={() => navigate(-1)}>{"<"}</button>
          <h1>My Profile</h1>
          <button className="navButtonProfile" onClick={() => navigate("/profile")}>
            <img src={userIcon} alt="User Icon" />
          </button>
        </div>
        <div className="profileColumns">
            <div className="blockPro topBlockProfile">Block 1</div>
            <div className="blockPro">Block 2</div>
            <div className="blockPro">Block 3</div>
            <div className="blockPro">Block 4</div>
            <div className="blockPro bottomBlockProfile">Block 5</div>
        </div>

        <div className="profileColumns">
            <h2 className="headingsProfile">Residence</h2>
            <div className="blockPro topBlockProfile">Block 1</div>
            <div className="blockPro">Block 2</div>
            <div className="blockPro bottomBlockProfile">Block 3</div>
        </div>

        {/* Bottom Section with Two Buttons */}
        <div className="bottomSectionProfile">
          <button className="actionButtonProfile">
            Sign Out
          </button>
          <button className="actionButtonProfile">
            Change User
          </button>
        </div>
      </main>
  );
};

export default Profile;
