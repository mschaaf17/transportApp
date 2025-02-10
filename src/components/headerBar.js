import React from "react";
import { Layout } from "antd";
import "../../src/index.css"; // Assuming you have some global styles
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const { Header } = Layout;

export const HeaderBar = () => {
  return (
    <Layout>
      <Header className="header-bar">
        <div className="header-contents">
          {/* Phone number with tel: protocol */}

          <a href="tel:+13033567955">
            <CallIcon /> {""} (303)-356-7955
          </a>
        </div>
        <div className="header-contents">
          {/* Email with mailto: protocol */}

          <a href="mailto:BCLOGISTICSUTAH@GMAIL.COM">
            <EmailIcon /> BCLOGISTICSUTAH@GMAIL.COM
          </a>
        </div>
      </Header>
    </Layout>
  );
};
