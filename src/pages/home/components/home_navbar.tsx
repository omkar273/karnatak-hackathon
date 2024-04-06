import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import karntankPoliceLogo from "@/assets/images/karnatak_police_logo.png";
import { Avatar } from "antd";

const HomeNavbar = () => {
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
  return (
    <div className=" w-full bg-[#002D71] flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
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
      </div>
      <div>
        <Avatar src={url} />
      </div>
    </div>
  );
};

export default HomeNavbar;
