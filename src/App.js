import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Layout, theme } from "antd";

import Home from "./pages/Home";
import { HeaderBar } from "./components/headerBar";
import { AboutUs } from "./pages/AboutUs";
import { SuccessPage } from "./pages/SuccessfullySubmitted";
import { Navigation } from "./components/navigation";
import carImage from "./images/car-hauling.jpg";

import "./App.css";
import { TransportForm } from "./components/form";

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <Navigation />
          {/* Main Layout */}
          <Layout>
            {/* Header */}
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <HeaderBar />
            </Header>

            {/* Content Section */}
            <Content
              style={{
                padding: 24,
                minHeight: 280,
                position: "relative",
                background: `url(${carImage}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "8px",
                }}
              ></div>

              <div style={{ position: "relative", zIndex: 1 }}></div>

              {/* Define Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/" element={<TransportForm />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/success" element={<SuccessPage />} />
              </Routes>
            </Content>

            {/* Footer */}
            <Footer className="footer">
              BC LOGISTICS UTAH ©{new Date().getFullYear()} Created by MSchaaf
              Web Development
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
