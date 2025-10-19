import React from "react";
import { Layout, Typography, Input } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  return (
    <Header
      className="bg-white shadow-sm px-6 flex items-center justify-between"
      style={{ backgroundColor: "white" }}
    >
      <div className="flex items-center gap-4">
        <Title level={4} className="m-0 text-gray-900">
          Logo
        </Title>
      </div>
      <div className="flex-1 max-w-md mx-auto mt-8">
        <Search placeholder="Search..." allowClear className="w-full" />
      </div>
      <div className="flex items-center gap-4">
        <BellOutlined className="text-gray-500 text-lg cursor-pointer" />
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <UserOutlined className="text-white text-sm" />
        </div>
      </div>
    </Header>
  );
};

export default NavBar;
