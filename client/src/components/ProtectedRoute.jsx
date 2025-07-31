import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { LogoutOutlined } from "@ant-design/icons";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Favourite Movies/TV Shows
          </h4>
          <h5
            style={{ cursor: "pointer"}}
            className="text-white m-1"
            onClick={logout}
          >
            <LogoutOutlined />
          </h5>
        </Header>
        <div style={{ padding: 24, minHeight: "100vh", background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </div>
  );
};

export default ProtectedRoute;
