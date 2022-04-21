import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { AuthHandler } from "../handlers/AuthHandler";
import Product from "./Product/Product";

const { Header, Sider, Content } = Layout;

const Dashboard = function () {
  const [state, setState] = useState(false);
  const { setToken } = useContext(UserContext);

  const toggle = () => {
    setState(state ? false : true);
  };

  const handleLogout = () => {
    AuthHandler.removeToken();
    setToken(null);
  };

  const profileMenu = (
    <Menu className="profile-menu">
      <Menu.Item>
        <p>Profile</p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={handleLogout}>Logout</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="dashboard">
      <Sider trigger={null} collapsible collapsed={state}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to="/product">Products</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {state ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
          <Dropdown
            overlay={profileMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar className="header-profile" icon={<UserOutlined />} />
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route exact path="/product" element={<Product />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
