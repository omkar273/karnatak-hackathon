import { setLogout } from '@/common/redux/auth_slice';
import { RootState } from '@/common/redux/store';
import { doLogout } from '@/pages/auth/utils/auth';
import { MoreVert } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { Avatar, Dropdown, MenuProps, Popconfirm } from "antd";
import { ChevronFirst, ChevronLast } from "lucide-react";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

type Props = {
    children?: ReactNode,
    expanded?: boolean
}

type sidebarItemProps = {
    icon?: ReactNode,
    label: string | ReactNode,
    active?: boolean,
    alert?: boolean
}

const SidebarContext = createContext(true)

const Sidebar: React.FC<Props> = ({ children }) => {

    const { userdata } = useSelector((s: RootState) => s.auth)
    const dispatch = useDispatch();

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [expanded, setexpanded] = useState<boolean>(true);
    const url =
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
    return (
        <aside id="sidebar" className="h-screen hidden md:block">
            <nav className="h-[calc(100%-60px)] flex flex-col bg-white border-r shadow-sm">
                <div className={`flex justify-between items-center p-2 pb-2`} >
                    <span>
                        <Avatar className={`overflow-hidden transition-all ${expanded ? 'visible' : 'w-0 '} bg-blue-500 `}>
                            {userdata?.name.substring(0, 1)}
                        </Avatar>
                        <span className={`ml-2 ${expanded ? 'visible' : 'hidden'}`}>
                            {userdata?.name}
                        </span>
                    </span>
                    <button
                        onClick={() => setexpanded((prev) => !prev)}
                        type="button"
                        className="p-1.5 rounded-lg bg-gray-50 size-8 hover:bg-gray-100">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>

                </div>

                <Divider />

                {/* list of menu items */}
                <SidebarContext.Provider value={expanded} >
                    <ul className={`flex-1 flex-grow overflow-y-scroll overflow-hidden transition-all ${expanded ? 'max-w-54 ' : 'w-0'}`}>
                        {children}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 items-center">
                    <Avatar src={url} className="size-8" />
                    {/* <HSpacer width={10} /> */}
                    <div className={`text-base ml-3 overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'} flex items-center justify-between`}>
                        <div>
                            <h6>{userdata?.name}</h6>
                            <span className="text-xs">
                                {userdata?.email}
                            </span>
                        </div>

                        <Dropdown menu={{ items: profileOptions }}
                            placement="bottomRight"
                            trigger={['click']}
                            arrow={true}>
                            <MoreVert className="cursor-pointer" />
                        </Dropdown>
                    </div>
                    {/* <HSpacer width={20} /> */}

                </div>
            </nav>

        </aside >
    )
}

export default Sidebar;


export const SidebarItem: React.FC<sidebarItemProps> = (
    {
        active,
        alert,
        label,
        icon
    }
) => {
    const listStyles = `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors  ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'} `
    const expanded = useContext(SidebarContext);

    return (
        <li className={listStyles} >
            {icon}
            {/* title */}
            <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}> {label} </span>

            {/* alert dot */}
            {alert &&
                (<div className="absolute right-2 size-2  rounded  bg-indigo-400" />)
            }
        </li >
    )
}

