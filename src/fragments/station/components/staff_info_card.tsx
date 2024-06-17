import { UserModel } from "@/fragments/user_management/models/user_model";
import { Avatar } from "antd";
import React from "react";

interface Props {
  user: UserModel;
}

const StaffInfoCard: React.FC<Props> = ({ user }) => {
  const avtarUrl = "https://xsgames.co/randomusers/avatar.php?g=male";
  return (
    <div className="p-4 col-span-2 shadow-md bg-[#f8f8fa] min-w-fit">
      <div className="flex gap-2">
        <Avatar src={avtarUrl} size={64} />
        <div className="ml-4">
          <p className="font-bold md:text-base font-ubuntu text-gray-700 whitespace-nowrap">
            {user.name}
          </p>
          <p className="font-normal md:text-base font-ubuntu  whitespace-nowrap">
            {user.post}
          </p>
        </div>
      </div>

      <div className="my-3 text-gray-700">
        <p>
          <strong>Joining date :</strong>
          {` ${user.date_of_joining}`}
        </p>
        <p>
          <strong>Experience :</strong>
          {` ${user.workExperience} yrs`}
        </p>
      </div>
    </div>
  );
};

export default StaffInfoCard;
