import {Dropdown, Avatar, Menu, Drawer, Popconfirm} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {RootState} from '@/common/redux/store';
import {doLogout} from '@/pages/auth/utils/auth';
import {setLogout} from '@/common/redux/auth_slice';
import {MenuIcon, X} from 'lucide-react';
import Searchbar from './nav_searchbar';
import React from 'react';
import {MenuItemType} from 'antd/es/menu/interface';
import NotificationsModal from "@/common/components/notification_icon.tsx";
import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import karntankPoliceLogo from "@/assets/images/karnatak_police_logo.png";
import {HSpacer} from "@/common/components/spacer.tsx";

type Props = {
	drawerOpen: boolean;
	setdrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	sidebarItems: MenuItemType[] | undefined;
};

const Navbar: React.FC<Props> = ({sidebarItems, drawerOpen, setdrawerOpen}) => {
	const dispatch = useDispatch();
	const {userdata} = useSelector((s: RootState) => s.auth);
	
	const profileOptions = [
		{
			label: <Link to={'/user'}>Profile</Link>,
			key: 'profile',
		},
		{
			label: (
				<div>
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
				</div>
			),
			key: 'logout',
		},
	];
	
	return (
		<header
			className="fixed top-0 w-full flex items-center justify-between px-4 py-2 h-[60px] bg-cyan-600 transition-all duration-500 z-[1000] shadow-lg">
			<div className="hidden md:flex justify-start items-center gap-2">
				{/* logos */}
				<a href="/">
					<img
						src={karntankPoliceLogo}
						alt="Karnatak Police Logo"
						height={80}
						width={80}
						className="cursor-pointer"
					/>
				</a>
				<a href="/">
					<img
						src={capital_tech_logo}
						alt="Capital Tech Logo"
						height={80}
						width={80}
						className="cursor-pointer"
					/>
				</a>
				
				{/* Horizontal Spacer */}
				<HSpacer width={100}/>
				
				{/* Search Bar */}
				<Searchbar/>
			</div>
			
			{/* Mobile Navigation Menu Icon */}
			<MenuIcon
				className="cursor-pointer text-white text-xl md:hidden"
				onClick={() => setdrawerOpen((prev) => !prev)}
			/>
			
			{/* Right-hand Side Options */}
			<div className="flex justify-start items-center gap-8 cursor-pointer">
				{/* Notifications */}
				<NotificationsModal/>
				
				{/* User Profile Dropdown */}
				<Dropdown
					overlay={<Menu>{profileOptions.map(item => <Menu.Item
						key={item.key}>{item.label}</Menu.Item>)}</Menu>}
					placement="bottomRight"
					trigger={['click']}
					arrow={true}
				>
					<Avatar className={`overflow-hidden font-normal border text-xl p-4 transition-all bg-blue-500`}>
						{userdata?.name.substring(0, 1)}
					</Avatar>
				</Dropdown>
			</div>
			
			{/* Mobile Navigation Drawer */}
			<Drawer
				placement="left"
				closable={false}
				open={drawerOpen}
				className="w-fit"
				onClose={() => setdrawerOpen(false)}
			>
				<div className="w-full flex justify-between mb-2">
					<p className="text-xl font-semibold">Capital Tech Logo</p>
					<X className="text-xl cursor-pointer" onClick={() => setdrawerOpen(false)}/>
				</div>
				<Menu
					defaultOpenKeys={['home']}
					defaultSelectedKeys={['dashboard']}
					mode="inline"
					items={sidebarItems}
					onClick={(e) => {
						console.log(e.key);
					}}
				/>
			</Drawer>
		</header>
	);
};

export default Navbar;
