import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import karntankPoliceLogo from "@/assets/images/karnatak_police_logo.png";
import { HSpacer } from "@/common/components/spacer";
import { setLogout } from "@/common/redux/auth_slice";
import { doLogout } from "@/pages/auth/utils/auth";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Badge, Drawer, Dropdown, Menu, MenuProps, Popconfirm } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { MenuIcon, X } from "lucide-react";
import { useDispatch } from "react-redux";
import Searchbar from "./nav_searchbar";
import { Link } from "react-router-dom";

type Props = {
    drawerOpen: boolean,
    setdrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    sidebarItems: MenuItemType[] | undefined
}

const Navbar: React.FC<Props> = ({ sidebarItems, drawerOpen, setdrawerOpen }) => {
    const dispatch = useDispatch();
    const items: MenuProps['items'] = [
        {
            label: 'loading...',
            key: '1',
        },
    ];
    const profileOptions: MenuProps['items'] = [
        {
            label: <Link to={'/user'}>Profile</Link>,
            key: 'profile'
        },
        {
            label: <div>
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
                    <div className="py-1">Logout</div>
                </Popconfirm>
            </div>,
            key: '1',
        },
    ];

    const url =
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
    return (
        <header className="fixed top-0 w-full flex items-center justify-between px-4 py-2 h-[60px] bg-cyan-600 transition-all duration-500 z-[1000] shadow-lg">
            <div className="hidden md:flex justify-start items-center gap-2">
                {/* logo  */}
                <a href="/">
                    <img
                        // className="bg-white p-2 rounded-full"
                        src={karntankPoliceLogo}
                        alt="karnatak police logo"
                        height={80}
                        width={80}
                        className="cursor-pointer"
                    />
                </a>
                <a href="/">
                    <img
                        // className="bg-white p-2 rounded-full"
                        src={capital_tech_logo}
                        alt="capital tech logo"
                        height={80}
                        width={80}
                        className="cursor-pointer"

                    />
                </a>

                <HSpacer width={100} />
                {/* menu toggle button */}
                <Searchbar />

                <HSpacer width={15} />
                {/* searchbar */}
                <Searchbar />

            </div>

            {/* mobile navigation */}
            <MenuIcon
                className="cursor-pointer text-white text-xl md:hidden"
                onClick={() => setdrawerOpen((prev) => !prev)} />

            {/* right hand side options */}
            <div className="flex justify-start items-center gap-8 cursor-pointer">
                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={['click']}
                    arrow={true}
                >
                    <Badge count={10} overflowCount={9} >
                        <NotificationsIcon className="text-white" />
                    </Badge>
                </Dropdown>

                <Dropdown menu={{ items: profileOptions }}
                    placement="bottomRight"
                    trigger={['click']}
                    arrow={true}>
                    <Avatar src={url} />
                </Dropdown>
            </div>

            {/* mobile navigation */}

            <Drawer
                // title="Basic Drawer"
                placement='left'
                closable={false}
                open={drawerOpen}
                className="w-fit"
            >
                <div className="w-full flex justify-between mb-2">
                    <p className="text-xl font-semibold">
                        Capital tech logo
                    </p>
                    <X onClick={() => setdrawerOpen((prev) => !prev)} />
                </div>
                <Menu
                    defaultOpenKeys={["home"]}
                    defaultSelectedKeys={["dashboard"]}
                    mode="inline"
                    items={sidebarItems}
                    onClick={(e) => {
                        e.key;
                    }}
                />
            </Drawer>
        </header>
    )
}

export default Navbar;