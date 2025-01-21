import React from 'react';
import { Link } from 'react-router-dom';

export const SuccessPage = () => {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '50px',
          backgroundColor: '#f4f4f4',
          borderRadius: '8px',
          position: 'relative', 
          borderRadius: '8%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',// Make sure it's a positioned container
        }}
      >
        <h1>Form Successfully Submitted!</h1>
        <p style={{fontStyle: 'italic'}}>Thank you for submitting your request. We will reach out to you soon!</p>
        <p>Would you like to submit another request?</p>
        <Link
          to="/"
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1890ff',
            position: 'relative',  
            zIndex: 9999,         
          }}
        >
          Click here to submit another request
        </Link>
      </div>
    );
  };
  

