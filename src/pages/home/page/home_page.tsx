import { Menu } from "antd";
import { BarChartBig, ClipboardList, FileStack, FileText, Home, Landmark, Mic, NotebookPen, NotepadText, Scale, ScrollText, University, User, UserCog, UserRoundPlus, Users } from "lucide-react";
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
      key: "Dashboard",
      label: "Dashboard",
      onClick: () => navigateAndCloseDrawer("/"),
      icon: <BarChartBig />
    },
    {
      key: "Station Management",
      label: "Station Management",
      icon: <Home />,
      children: [
        {
          key: "My Station",
          label: "My Station",
          onClick: () => navigateAndCloseDrawer("/station"),
          icon: <Home />,
        },
        {
          key: "Add Station",
          label: "Add Station",
          icon: <University />,
          onClick: () => navigateAndCloseDrawer("/station/add"),
        },
        {
          key: "Station Management2",
          label: "Station Management",
          icon: <Mic />,
          onClick: () => navigateAndCloseDrawer("/Record"),
        },
        {
          key: "Task Assignment",
          label: "Task Assignment",
          icon: <ClipboardList />,
          onClick: () => navigateAndCloseDrawer("/station/tasks"),
        },
        {
          key: "Manpower",
          label: "Manpower",
          icon: <User />,
          onClick: () => navigateAndCloseDrawer("/Manpower"),
        },
        {
          key: "Manpower2",
          label: "Manpower Mapping",
          icon: <User />,
          onClick: () => navigateAndCloseDrawer("/man"),
        },
        {
          key: "Law and order",
          label: "Law and order",
          icon: <Scale />,
          onClick: () => navigateAndCloseDrawer("/law"),
        },
      ],
    },
    {
      key: "Court Monitoring",
      label: "Court Monitoring",
      icon: <Landmark />,
      children: [
        {
          key: "Chargesheet",
          label: "Chargesheet",
          icon: <ScrollText />,
          onClick: () => navigateAndCloseDrawer("/chargesheet"),
        },
        {
          key: "Witness Management",
          label: "Witness Management",
          icon: <Mic />,
          onClick: () => navigateAndCloseDrawer("/witness"),
        },
        {
          key: "Case Preparation",
          label: "Case Preparation",
          icon: <NotepadText />,

          onClick: () => navigateAndCloseDrawer("/CourtTwo"),
        },
      ]
    },
    {
      key: "Fir Management",
      label: "Fir Management",
      icon: <FileText />,
      children: [
        {
          key: "Add Fir",
          label: "Add Fir",
          icon: <NotebookPen />,
          onClick: () => navigateAndCloseDrawer("/fir"),
        },
        {
          key: "All Fir",
          label: "All Fir",
          icon: <FileStack />,
          onClick: () => navigateAndCloseDrawer("/fir/all"),
        },
      ],
    },
    {
      key: "User Management",
      label: "User Management",
      icon: <UserCog />,
      children: [
        {
          key: "Add new user",
          label: "Add new user",
          icon: <UserRoundPlus />,
          onClick: () => navigateAndCloseDrawer("/user/register"),
        },
        {
          key: "Underlyings",
          label: "Underlyings",
          icon: <Users />,
          onClick: () => navigateAndCloseDrawer("/user/underlying"),
        },
        {
          key: "Profile",
          label: "Profile",
          icon: <User />,
          onClick: () => navigateAndCloseDrawer("/user"),
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
