import { VSpacer } from "@/common/components/spacer";
import { RootState } from "@/common/redux/store";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import { ShieldEllipsis } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";


const ProfilePage = () => {


  const { userdata } = useSelector((s: RootState) => s.auth)

  const [activeTab, setActiveTab] = useState("professionalDetails");

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        Profile
      </p>
      <div className="p-4">
        {/* basic data */}
        <div className="flex gap-4 items-center card bg-white border-2">
          <div className="p-4 flex justify-center flex-col items-center">
            {/* <ShieldPlus className="text-center  size-28 mb-2" /> */}
            <Avatar size={100} icon={<UserOutlined />} />
            <VSpacer height={30} />
            <Rate
              disabled
              allowHalf
              defaultValue={4.5}
              tooltips={[
                "Bad",
                "betterment needed",
                "good",
                "Excellent",
                "Ideal station",
              ]}
            />
            <b>Name: {userdata?.name}</b>
            <p className="font-medium text-base">Awarded with</p>
            <p className="text-wrap text-base font-semibold">
              {userdata?.awards}{" "}
            </p>
          </div>
          <div className="p-4 space-y-4">
            {/* First Row - User Profile */}
            <div className="border-l-2 p-4">
              <p className="font-bold text-2xl flex gap-2 items-center">
                <ShieldEllipsis /> Name: {userdata?.name} ({userdata?.post})
              </p>
              <div className="flex gap-8">
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Gender: {userdata?.gender}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Date of Birth: {userdata?.dateOfBirth}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Phone No.: {userdata?.phoneNo}
                </p>
              </div>
            </div>
            <hr className="my-2" />

            {/* Second Row - Health Information */}
            <div className="border-l-2 p-4">
              <p className="font-bold text-2xl">Health Information</p>
              <div className="flex gap-8">
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Blood Group: {userdata?.blood_group}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Height: {userdata?.height}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Weight: {userdata?.weight}
                </p>
              </div>
            </div>
            <hr className="my-2" />

            {/* Third Row - Contact Information */}
            <div className="border-l-2 p-4">
              <p className="font-bold text-2xl">Contact Information</p>
              <div className="flex gap-8">
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Mobile No.: {userdata?.mobileNo}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Email ID: {userdata?.email}
                </p>

              </div>
            </div>
          </div>
        </div>

        <VSpacer height={30} />

        {/* Tab Navigation */}
        <div className="card bg-white">
          <div className="flex border-b">
            <button
              className={`p-4 ${activeTab === "professionalDetails"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
                }`}
              onClick={() => setActiveTab("professionalDetails")}
            >
              Professional Details
            </button>
            <button
              className={`p-4 ${activeTab === "healthInformation"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
                }`}
              onClick={() => setActiveTab("healthInformation")}
            >
              Health Information
            </button>
            <button
              className={`p-4 ${activeTab === "contactInformation"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
                }`}
              onClick={() => setActiveTab("contactInformation")}
            >
              Contact Information
            </button>
            <button
              className={`p-4 ${activeTab === "shiftschdule"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
                }`}
              onClick={() => setActiveTab("shiftschdule")}
            >
              Shift Schdule
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "professionalDetails" && (
              <div className="border-l-2 p-4">
                <div className="grid grid-cols-3 gap-8">
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Date Of Joining:- {userdata?.dateOfBirth}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Specializations:- {userdata?.specialization?.at(0)}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Training Certifications:- {userdata?.training?.at(0)}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Award And Commendations:- {userdata?.awards}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Current Posting:- {userdata?.currentPosting}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Previous Posting:- {userdata?.previousPosting}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Skills:- {userdata?.skills}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Qualification:- {userdata?.qualification}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Solved Cases:- {userdata?.solvedCases}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Work Experience:- {userdata?.workExperience}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Batch:- {userdata?.batch}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "healthInformation" && (
              <div className="border-l-2 p-4">
                <div className="grid grid-cols-3 gap-8">
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Blood Type:- {userdata?.blood_group}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Height:- {userdata?.height}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Weight:- {userdata?.weight}
                  </p>
                  <hr className="col-span-3" />
                  {/* <p className="font-semibold my-2 flex gap-2 items-center">
                    Physical Fitness:- {userdata?.physicalFitness}
                  </p> */}
                  <p className="font-semibold my-2 flex gap-2 items-center"></p>
                </div>
              </div>
            )}
            {activeTab === "contactInformation" && (
              <div className="border-l-2 p-4">
                <div className="grid grid-cols-3 gap-8">
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Name:- {userdata?.name}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Phone No:- {userdata?.phoneNo}
                  </p>
                  {/* <p className="font-semibold my-2 flex gap-2 items-center">
                    Telephone No:- {userdata?.telephoneNo}
                  </p> */}
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Address:- {userdata?.address}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "shiftschdule" && (
              <div className="border-l-2 p-4">
                <div className="grid grid-cols-3 gap-8"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default ProfilePage;
