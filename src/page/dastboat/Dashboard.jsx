import React from 'react'
import DashboardComponents from './../../components/DashboardComponents';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5">
        <DashboardComponents />
      </div>

      {/* Main content */}
      <div className="w-3/4 p-4">
        
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}
