import React from 'react';
import check from "../assets/check.svg";
import adminIcon from "../assets/adminIcon.svg";
import userIcon from "../assets/userIcon.svg";

const Header = ({ user, onLogout }) => {
  return (
    <header className="task-header">
      <div className="logo">
        <div className="logo-icon">
          <img src={check} alt="" />
        </div>
        <span>Taski</span>
      </div>
      {user && (
        <div className="admin-container">
          <span>{user.firstName || user.lastName || user.username}</span>
          <div className="admin-avatar" onClick={onLogout}>
            <img src={user.role === 'admin' ? adminIcon : userIcon} alt="" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;