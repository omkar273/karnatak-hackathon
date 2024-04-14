import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const HomePage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setdrawerOpen] = useState<boolean>(false)

  const navigateAndCloseDrawer = (path: string) => {
    setdrawerOpen(false);
    navigate(path);
  }

  const sidebarItems = [
    {
      key: "Station Management",
      label: "Station Management",
      icon: <HomeFilled />,
      children: [
        {
          key: "My Station",
          label: "My Station",
          onClick: () => navigateAndCloseDrawer("/station"),
        },
        {
          key: "Add Station",
          label: "Add Station",
          onClick: () => navigateAndCloseDrawer("/station/add"),
        },

        {
          key: "Chargesheet",
          label: "Chargesheet",
          onClick: () => navigateAndCloseDrawer("/chargesheet"),
        },
        {
          key: "Witness Management",
          label: "Witness Management",
          onClick: () => navigateAndCloseDrawer("/witness"),
        },
        {
          key: "Case Preparation",
          label: "Case Preparation",
          onClick: () => navigateAndCloseDrawer("/CourtTwo"),
        },
        {
          key: "Station Management",
          label: "Station Management",
          onClick: () => navigateAndCloseDrawer("/Record"),
        },
        {
          key: "Manpower",
          label: "Manpower",
          onClick: () => navigateAndCloseDrawer("/Manpower"),
        },
        {
          key: "Law and order",
          label: "Law and order",
          onClick: () => navigateAndCloseDrawer("/law"),
        },
      ],
    },
    {
      key: "Fir Management",
      label: "Fir Management",
      children: [
        {
          key: "Add Fir",
          label: "Add Fir",
          onClick: () => navigateAndCloseDrawer("/"),
        },
        {
          key: "All Fir",
          label: "All Fir",
          onClick: () => navigateAndCloseDrawer("/fir"),
        },
      ],
    },
    {
      key: "User Management",
      label: "User Management",
      // icon: <MessageFilled />,
      children: [
        {
          key: "Add new user",
          label: "Add new user",
          onClick: () => navigateAndCloseDrawer("/register"),
        },
      ],
    },
  ];

  return (
    <div className="pg max-h-screen overflow-hidden">

      <Navbar
        sidebarItems={sidebarItems}
        drawerOpen={drawerOpen}
        setdrawerOpen={setdrawerOpen} />


      <div className="flex max-h-screen mt-16 overflow-hidden">
        <Sidebar>
          <Menu
            defaultOpenKeys={["home"]}
            defaultSelectedKeys={["dashboard"]}
            mode="inline"
            items={sidebarItems}
            onClick={(e) => {
              e.key;
            }}
            style={{ maxWidth: "18rem" }}
          />
        </Sidebar>

        <main className="flex-grow overflow-hidden">
          <div className="max-h-screen overflow-y-auto">
            {/* {page} */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
