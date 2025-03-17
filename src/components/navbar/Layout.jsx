import React from 'react'
import NavbarComponet from './Navbar'
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <NavbarComponet />
      </header>
      <main className=" ">
        <Outlet />
      </main>
    </div>
  );
}
