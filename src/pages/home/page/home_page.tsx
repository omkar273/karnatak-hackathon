import { setLogout } from "@/common/redux/auth_slice";
import { RootState } from "@/common/redux/store";
import { doLogout } from "@/pages/auth/utils/auth";
import FIRPage from "@/pages/fir/page/fir_page";
import { AppstoreFilled, HomeFilled, MessageFilled } from "@ant-design/icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Layout, Menu, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeNavbar from "../components/home_navbar";

const HomePage = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const user = useSelector((s: RootState) => s.auth.currentUser);
  const dispatch = useDispatch();

  const sidebarItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeFilled />,
      children: [
        {
          key: "dashboard",
          label: "Dashboard",
        },
        {
          key: "CrimeInvestigationDepartment",
          label: "Crime Investigation Department",
        },
        {
          key: "Station Management",
          label: "Station Management",
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
    },
    {
      key: "docs",
      label: "Docs",
      icon: <AppstoreFilled />,
    },
    {
      key: "more",
      label: "More",
      icon: <MoreVertIcon className="text-xl" />,
    },
  ];
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  return (
    <Layout className="pg bg-white">
      <Header className="w-full bg-[#002D71] sticky top-0 z-10">
        <HomeNavbar />
      </Header>
      <Layout>
        <Sider
          width="15%"
          style={{ backgroundColor: "rgb(59 130 246 )" }}
          className="hidden md:flex md:flex-col"
        >
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
        <Content className="h-[calc(100vh-5rem)] overflow-y-scroll">
          <FIRPage />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
