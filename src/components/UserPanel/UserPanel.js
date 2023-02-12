import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import UserRanking from "./UserRanking"

const { Header, Sider, Content } = Layout;

export const WorkerPanel = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/user-panel">User Panel</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="game">GameQuiz</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer, width: "100%" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Button
            className="logout"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "30px",
              top: "-50px",
            }}
            type="primary"
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <h1>User Panel zasady gry:</h1>
          <p>Gra polega na tym że są pytania i użytkownik na nie odpowiada</p>
          <p>Za poprawna odpowiedz punkt jest dodawany a za ujemna odejmowany</p>

         <br></br>
         <br></br>
          <h1>Ranking</h1>
          <UserRanking></UserRanking>
 
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WorkerPanel;
