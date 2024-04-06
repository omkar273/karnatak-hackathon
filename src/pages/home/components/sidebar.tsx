import { setLogout } from "@/common/redux/auth_slice";
import { doLogout } from "@/pages/auth/utils/auth";
import { Avatar, Menu, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { useDispatch } from "react-redux";


type Props = {
    sidebarItems?: MenuItemType[] | undefined
}

const Sidebar: React.FC<Props> = ({ sidebarItems }) => {
    const dispatch = useDispatch();
    const url =
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
    return (
        <Sider
            width="15%"
            // style={{ backgroundColor: "rgb(59 130 246 )" }}
            className="hidden md:flex md:flex-col h-full bg-yellow-400"
        >
            {/* user title */}
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0">
                Shailesh
                <Avatar src={url} />
            </p>

            {/* <div className="h-[calc(100vh-7.6rem)] overflow-y-scroll"> */}
            <div className="flex-grow bg-red-500">
                <Menu
                    defaultOpenKeys={["home"]}
                    defaultSelectedKeys={["dashboard"]}
                    mode="inline"
                    style={{ borderRight: 0 }}
                    items={sidebarItems}
                    onClick={(e) => { e.key }}
                    className="overflow-y-scroll flex-grow"
                />
            </div>

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
            {/* </div> */}
        </Sider>
    )
}

export default Sidebar