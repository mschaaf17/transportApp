import React, { useState, useEffect } from "react";
import { TransportForm } from "../components/form";

function Home() {
  return (
    <div className="home-container">
      {/* Background Title & Slogan */}
      <div className="title-background">
        <h1 className="main-title">
          <span className="bc-only">B&C</span> <br />
          <span className="sub-title">LOGISTICS</span>
        </h1>
        <div className="slogan">Over 10 years in service</div>
      </div>

      {/* Foreground Form */}
      <div className="form-container">
        <TransportForm />
      </div>
    </div>
  );
}

export default Home;
