import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ConfigProvider } from 'antd'; // Import ConfigProvider from Ant Design
import { Button, Layout, Menu, theme } from 'antd';
import { 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import Home from './pages/Home';
import { HeaderBar } from './components/headerBar';
import { AboutUs } from './pages/AboutUs';
import { SuccessPage } from './pages/SuccessfullySubmitted';
import carImage from './images/car.jpg'; 

import './App.css';
import { TransportForm } from './components/form';

const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'BC LOGISTICS',
      link: '/',
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'About Us',
      link: '/about',
    },
  ];

  return (
    // Wrap the entire application with ConfigProvider
    <ConfigProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          {/* Sidebar */}
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{
              color: 'white',
            }}>B & C LOGISTICS</div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: 'white',
              }}
            />
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {menuItems.map(item => (
                <Menu.Item key={item.key} icon={item.icon}>
                  {/* Use Link inside the Menu item */}
                  <Link to={item.link}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>

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
                position: 'relative',
                background: `url(${carImage}) no-repeat center center`,
                backgroundSize: 'cover',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.1)', // Lighter white overlay with 10% opacity
                  borderRadius: '8px',
                }}
              ></div>

              <div style={{ position: 'relative', zIndex: 1 }}></div>

              {/* Define Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/" element={<TransportForm />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/success" element={<SuccessPage />} />

              </Routes>
            </Content>

            {/* Footer */}
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              BC LOGISTICS UTAH ©{new Date().getFullYear()} Created by B&C Transportation
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
