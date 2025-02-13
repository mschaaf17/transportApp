import React from "react";
import { Layout } from "antd";
import "../../src/index.css"; // Assuming you have some global styles

const { Footer } = Layout;

export const FooterSection = () => {
  return (
    <Layout>
     <Footer className="footer-container">
        <div className="footer-contents">
              BC LOGISTICS UTAH ©{new Date().getFullYear()} Created by MSchaaf
              Web Development
              </div>
            </Footer> 
    </Layout>
  );
};
