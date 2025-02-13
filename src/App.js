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
import { FooterSection } from "./components/footer";

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider>
      <Router>
        <Layout>
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
            <Content className="content-section">
              <div className="content-overlay"></div>

              {/* Define Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/" element={<TransportForm />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/success" element={<SuccessPage />} />
              </Routes>
            </Content>

            {/* Footer */}
            <FooterSection />
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
