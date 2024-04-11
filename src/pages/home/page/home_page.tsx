import CourtTwo from "@/fragments/court/cout_two";
import CourtT from "@/fragments/court/third_page";
import FIRPage from "@/fragments/fir/page/fir_page";
import RegisterPage from "@/fragments/user-registartion/pages/register_page";
import { AppstoreFilled, HomeFilled, MessageFilled } from "@ant-design/icons";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from "antd";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FirPage from "@/fragments/court/fir_page";
import Record from "@/fragments/station/record";

const HomePage = () => {
  const [page, setPage] = useState(<FIRPage />);

  const sidebarItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeFilled />,
      children: [
        {
          key: "Add Fir",
          label: "Add Fir",
          onClick: () => setPage(<FIRPage />),
        },
        {
          key: "CrimeInvestigationDepartment",
          label: "Crime Investigation Department",
          onClick: () => setPage(<CourtT />),
        },
        {
          key: "Court Monitoring",
          label: "Court Monitoring",
          onClick: () => setPage(<FirPage />),
        },
        {
          key: "Witness Management",
          label: "Witness Management",
          onClick: () => setPage(<CourtT />),
        },
        {
          key: "Case Preparation",
          label: "Case Preparation",
          onClick: () => setPage(<CourtTwo />),
        },
        {
          key: "Station Management",
          label: "Station Management",
          onClick: () => setPage(<Record/>),
        },
        {
          key: "L&O",
          label: "L&O",
        },
      ],
    },
    {
      key: "Add new user",
      label: "Add new user",
      icon: <MessageFilled />,
      onClick: () => setPage(<RegisterPage />),
    },
    {
      key: "docs",
      label: "Docs",
      icon: <AppstoreFilled />,
      onClick: () => setPage(<div>Docs</div>),
    },
    {
      key: "more",
      label: "More",
      icon: <MoreVertIcon className="text-xl" />,
      onClick: () => setPage(<div>More</div>),
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
            onClick={(e) => { e.key }}
            style={{ maxWidth: '18rem' }}
          />
        </Sidebar>

        <main className="flex-grow overflow-hidden">
          <div className="max-h-screen overflow-y-auto">
            {page}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
