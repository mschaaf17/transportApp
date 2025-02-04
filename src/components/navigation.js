import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, CarOutlined } from '@ant-design/icons';


const { Sider } = Layout;

export function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  // Set the initial state of the sidebar based on window width
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true); // Collapse sidebar on smaller screens
    } else {
      setCollapsed(false); // Expand sidebar on larger screens
    }
  };

  useEffect(() => {
    handleResize(); // Call on initial load
    window.addEventListener('resize', handleResize); // Attach the resize event

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, []);

  const menuItems = [
    { key: '1', icon: <CarOutlined />, label: 'Home', link: '/' },
    { key: '2', icon: <UserOutlined />, label: 'About Us', link: '/about' },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="sider">
      {/* Title / Logo */}
      <div className={`title ${collapsed ? 'collapsed' : 'expanded'}`}>
        {collapsed ? (
          <div className="logo">B&C</div>
        ) : (
          <div className="full-title">B&C LOGISTICS</div>
        )}
      </div>

      {/* Menu Items */}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
