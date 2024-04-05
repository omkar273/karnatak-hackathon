import { setLogout } from "@/common/redux/auth_slice";
import { doLogout } from "@/pages/auth/utils/auth";
import FIRPage from "@/pages/fir/page/fir_page";
import { AppstoreFilled, HomeFilled, MessageFilled } from "@ant-design/icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Layout, Menu, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import HomeNavbar from "../components/home_navbar";

const HomePage = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
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
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  return (
    <Layout className="pg bg-white">
      {/* navbar */}
      <Header className="w-full bg-[#002D71] sticky top-0 z-10">
        <HomeNavbar />
      </Header>

      {/* main content */}
      <Layout>
        {/* leftside pane */}
        <Sider
          width="15%"
          style={{ backgroundColor: "rgb(59 130 246 )" }}
          className="hidden md:flex md:flex-col"
        >
          {/* user title */}
          <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0">
            Shailesh
            <Avatar src={url} />
          </p>

          <div className="h-[calc(100vh-7.6rem)] overflow-y-scroll">
            <Menu
              defaultOpenKeys={["home"]}
              defaultSelectedKeys={["dashboard"]}
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              items={sidebarItems}
              onClick={(e) => { e.key }}
            />
            <Popconfirm
              title="Logout"
              description="Are you sure to Logout?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                danger: true,
              }}
              onConfirm={async () => {
                await doLogout();
                dispatch(setLogout());
              }}
            >
              <div className="p-2 bg-white">
                <div className="btn">Logout</div>
              </div>
            </Popconfirm>
          </div>
        </Sider>


        {/*  */}
        <Content className="h-[calc(100vh-5rem)] overflow-y-scroll">
          {page}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
