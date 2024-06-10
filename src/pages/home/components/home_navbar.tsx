import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import karntankPoliceLogo from "@/assets/images/karnatak_police_logo.png";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
  return (
    <header className="top-0 w-full flex items-center justify-between px-4 py-2 h-[60px] bg-cyan-600 transition-all duration-500 z-[1000] shadow-lg">
      <Link to={'/'} className="flex justify-start items-center gap-2">
        <img
          // className="bg-white p-2 rounded-full"
          src={karntankPoliceLogo}
          alt="karnatak police logo"
          height={45}
          width={45}
        />
        <img
          // className="bg-white p-2 rounded-full"
          src={capital_tech_logo}
          alt="capital tech logo"
          height={45}
          width={45}
        />
      </Link>
      <div>
        <Avatar src={url} />
      </div>
    </header>
  );
};

export default HomeNavbar;
