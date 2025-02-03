import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';

import Home from './pages/Home';
import { HeaderBar } from './components/headerBar';
import { AboutUs } from './pages/AboutUs';
import { SuccessPage } from './pages/SuccessfullySubmitted';
import { Navigation } from './components/navigation';
import carImage from './images/car.jpg';

import './App.css';
import { TransportForm } from './components/form';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Layout className="app-layout">
          {/* Sidebar */}
          <Navigation />
          {/* Main Layout */}
          <Layout>
            {/* Header */}
            <Header className="app-header">
              <HeaderBar />
            </Header>

            {/* Content Section */}
            <Content className="app-content">
              <div className="content-overlay"></div>

              {/* Define Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transport-form" element={<TransportForm />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/success" element={<SuccessPage />} />
              </Routes>
            </Content>

            {/* Footer */}
            <Footer className="app-footer">
              BC LOGISTICS UTAH ©{new Date().getFullYear()} Created by MSchaaf Web Development
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
