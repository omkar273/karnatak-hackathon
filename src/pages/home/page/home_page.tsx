import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const HomePage = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    {
      key: "Station Management",
      label: "Station Management",
      icon: <HomeFilled />,
      children: [
        {
          key: "My Station",
          label: "My Station",
          onClick: () => navigate("/station"),
        },
        {
          key: "Add Station",
          label: "Add Station",
          onClick: () => navigate("/station/add"),
        },

        {
          key: "Court Monitoring",
          label: "Court Monitoring",
          onClick: () => navigate("/FirPage"),
          // onClick: () => setPage(<FirPage />),
        },
        {
          key: "Witness Management",
          label: "Witness Management",
          onClick: () => navigate("/CourtT"),
          // onClick: () => setPage(<CourtT />),
        },
        {
          key: "Case Preparation",
          label: "Case Preparation",
          onClick: () => navigate("/CourtTwo"),
          // onClick: () => setPage(<CourtTwo />),
        },
        {
          key: "Station Management",
          label: "Station Management",
          onClick: () => navigate("/Record"),
          // onClick: () => setPage(<Record />),
        },
        {
          key: "Manpower",
          label: "Manpower",
          onClick: () => navigate("/Manpower"),
          // onClick: () => setPage(<Record />),
        },
        {
          key: "Law and order",
          label: "Law and order",
          onClick: () => navigate("/Lawnoder"),
          // onClick: () => setPage(<Record />),
        },
      ],
    },
    {
      key: "Fir Management",
      label: "Fir Management",
      // icon: <MessageFilled />,
      children: [
        {
          key: "Add Fir",
          label: "Add Fir",
          onClick: () => navigate("/"),
        },
        {
          key: "All Fir",
          label: "All Fir",
          onClick: () => navigate("/fir"),
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
          onClick: () => navigate("/register"),
        },
      ],
    },
  ];

  return (
    <div className="pg max-h-screen overflow-hidden">
      <Navbar />
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
