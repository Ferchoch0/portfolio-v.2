import React from 'react';
import { Link } from 'react-router-dom';
import './BtnSpace.css';

const BtnSpace = ({ text, onClick, href, to, target, rel }) => {
  const content = (
    <>
      <span className="backdrop" />
      <span className="galaxy" />
      <label className="text">{text}</label>
    </>
  );

  if (href) {
    return (
      <div className="galaxy-button">
        <a href={href} target={target} rel={rel} className="space-button">
          {content}
        </a>
        <div className="bodydrop" />
      </div>
    );
  }

  if (to) {
    return (
      <div className="galaxy-button">
        <Link to={to} className="space-button">
          {content}
        </Link>
        <div className="bodydrop" />
      </div>
    );
  }

  return (
    <div className="galaxy-button">
        <button className="space-button" onClick={onClick}>
          {content}
        </button>
        <div className="bodydrop" />
      </div>
  );
}

export default BtnSpace;