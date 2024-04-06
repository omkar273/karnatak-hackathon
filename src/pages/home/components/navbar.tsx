import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import karntankPoliceLogo from "@/assets/images/karnatak_police_logo.png";
import { HSpacer } from "@/common/components/spacer";
import { setLogout } from "@/common/redux/auth_slice";
import { doLogout } from "@/pages/auth/utils/auth";
import { SearchOutlined } from "@ant-design/icons";
import MenuIcon from "@ant-design/icons/MenuOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Badge, Dropdown, Input, MenuProps, Popconfirm } from "antd";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();

    const items: MenuProps['items'] = [
        {
            label: 'loading...',
            key: '1',
        },
    ];
    const profileOptions: MenuProps['items'] = [
        {
            label: 'Profile',
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
            <div className="flex justify-start items-center gap-2">
                {/* logo  */}
                <img
                    // className="bg-white p-2 rounded-full"
                    src={karntankPoliceLogo}
                    alt="karnatak police logo"
                    height={45}
                    width={45}
                    className="cursor-pointer"
                />
                <img
                    // className="bg-white p-2 rounded-full"
                    src={capital_tech_logo}
                    alt="capital tech logo"
                    height={45}
                    width={45}
                    className="cursor-pointer"

                />

                <HSpacer width={100} />
                {/* menu toggle button */}
                <MenuIcon className="cursor-pointer text-white text-xl " />

                <HSpacer width={15} />
                {/* searchbar */}
                <Input
                    className=" focus-within:w-96 "
                    placeholder="Search here"
                    onChange={(e) => console.log(e.currentTarget.value)}
                    suffix={<SearchOutlined className="cursor-pointer" />} />

            </div>

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
        </header>
    )
}

export default Navbar;