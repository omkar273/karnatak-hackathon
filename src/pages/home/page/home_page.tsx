import FIRPage from "@/fragments/fir/page/fir_page";
import { AppstoreFilled, HomeFilled, MessageFilled } from "@ant-design/icons";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from "antd";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const HomePage = () => {
  const [page, setpage] = useState(<FIRPage />);

  const getItem = (section: string) => (<div>{section}</div>)

  const sidebarItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeFilled />,

      children: [
        {
          key: "dashboard",
          label: "Dashboard",
          onClick: () => setpage(<FIRPage />),
        },
        {
          key: "CrimeInvestigationDepartment",
          label: "Crime Investigation Department",
          onClick: () => setpage(getItem('CrimeInvestigationDepartment')),
        },
        {
          key: "Station Management",
          label: "Station Management",
          onClick: () => setpage(getItem('Station Management')),

        },
        {
          key: "L&O",
          label: "L&O",
        },
      ],
    },
    {
      key: "inbox",
      label: "Inbox",
      icon: <MessageFilled />,
      onClick: () => setpage(getItem('inbox')),
    },
    {
      key: "docs",
      label: "Docs",
      icon: <AppstoreFilled />,
      onClick: () => setpage(getItem('docs')),

    },
    {
      key: "more",
      label: "More",
      icon: <MoreVertIcon className="text-xl" />,
      onClick: () => setpage(getItem('more')),

    },
  ];
  return (
    <div className="pg">
      <Navbar />

      <div className="flex max-h-screen mt-16">
        <Sidebar >

          <Menu
            defaultOpenKeys={["home"]}
            defaultSelectedKeys={["dashboard"]}
            mode="inline"
            items={sidebarItems}
            onClick={(e) => { e.key }}
            style={{ maxWidth: '18rem' }}
          />

        </Sidebar>

        {/* main content */}
        <main className="flex-grow overflow-y-scroll">
          {page}
        </main>
      </div>
    </div>
  )
}

export default HomePage
