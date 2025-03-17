import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashboardComponents() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="bg-opacity-80 bg-coffee">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
              <Sidebar.Item as={Link} to="productDashBoard">
                Products
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="productDashBordCafe">prodcutCafe</Sidebar.Item>
              <Sidebar.Item as={Link} to="categoryDashBord">categoryCafe</Sidebar.Item>
              <Sidebar.Item href="#">Shipping</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item as={Link} to="/inbox" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/products" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/signin" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/signup" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
