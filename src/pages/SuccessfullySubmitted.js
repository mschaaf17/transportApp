import React from "react";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="success-page-container">
      <h1 className="success-form-title">Form Successfully Submitted!</h1>
      <p className="success-message">
        Thank you for submitting your request. We will reach out to you soon!
      </p>
      <p className="submit-another-request">
        Would you like to submit another request?
      </p>
      <Link to="/" className="click-submit-another-request">
        Click here to submit another request
      </Link>
    </div>
  );
};
