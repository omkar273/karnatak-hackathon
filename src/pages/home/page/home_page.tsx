import FIRPage from "@/pages/fir/page/fir_page";
import { AppstoreFilled, HomeFilled, MessageFilled } from "@ant-design/icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import HomeNavbar from "../components/home_navbar";
import Sidebar from "../components/sidebar";

const HomePage = () => {
  // const [isLoading, setisLoading] = useState<boolean>(false);
  // const dispatch = useDispatch();
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
    <Layout className="pg bg-white">
      {/* navbar */}
      <Header className="w-full bg-[#002D71] sticky top-0 z-10">
        <HomeNavbar />
      </Header>

      {/* main content */}
      <Layout>
        {/* leftside pane */}
        <Sidebar sidebarItems={sidebarItems} />


        {/*  */}
        <Content className="h-[calc(100vh-5rem)] overflow-y-scroll">
          {page}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
