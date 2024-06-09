import { VSpacer } from "@/common/components/spacer";
import dummyUserData from "@/data/underlying_data";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import { ShieldEllipsis } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const getUserDetails = (userEmail) => {
  for (let index = 0; index < dummyUserData.length; index++) {
    const element = dummyUserData[index];
    if (userEmail === element.email) {
      return { ...element };
    }
  }
  return null;
};

const ProfilePage = () => {
  const [queryParams] = useSearchParams();
  let id = queryParams.get("id");

  if (!id) {
    id = "omkarsonawane622@gmail.com";
  }

  const userData = getUserDetails(id);

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
            <b>Name: {userData?.name}</b>
            <p className="font-medium text-base">Awarded with</p>
            <p className="text-wrap text-base font-semibold">
              {userData?.awards}{" "}
            </p>
          </div>
          <div className="p-4 space-y-4">
            {/* First Row - User Profile */}
            <div className="border-l-2 p-4">
              <p className="font-bold text-2xl flex gap-2 items-center">
                <ShieldEllipsis /> Name: {userData?.name} ({userData?.post})
              </p>
              <div className="flex gap-8">
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Gender: {userData?.gender}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Date of Birth: {userData?.dateOfBirth}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Phone No.: {userData?.phoneNo}
                </p>
              </div>
            </div>
            <hr className="my-2" />

            {/* Second Row - Health Information */}
            <div className="border-l-2 p-4">
              <p className="font-bold text-2xl">Health Information</p>
              <div className="flex gap-8">
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Blood Group: {userData?.bloodGroup}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Height: {userData?.height}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Weight: {userData?.weight}
                </p>
              </div>
            </div>
            <hr className="my-2" />

            {/* Third Row - Contact Information */}
            <div className="border-l-2 p-4">
              <p className="font-bold text-2xl">Contact Information</p>
              <div className="flex gap-8">
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Mobile No.: {userData?.mobileNo}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Email ID: {userData?.emailId}
                </p>
                <p className="font-semibold my-2 flex gap-2 items-center">
                  Telephone No.: {userData?.telephoneNo}
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
              className={`p-4 ${
                activeTab === "professionalDetails"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : ""
              }`}
              onClick={() => setActiveTab("professionalDetails")}
            >
              Professional Details
            </button>
            <button
              className={`p-4 ${
                activeTab === "healthInformation"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : ""
              }`}
              onClick={() => setActiveTab("healthInformation")}
            >
              Health Information
            </button>
            <button
              className={`p-4 ${
                activeTab === "contactInformation"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : ""
              }`}
              onClick={() => setActiveTab("contactInformation")}
            >
              Contact Information
            </button>
            <button
              className={`p-4 ${
                activeTab === "shiftschdule"
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
                    Date Of Joining:- {userData?.dateOfJoining}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Specializations:- {userData?.specializations}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Training Certifications:- {userData?.trainingCertifications}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Award And Commendations:- {userData?.awards}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Current Posting:- {userData?.currentPosting}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Previous Posting:- {userData?.previousPosting}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Skills:- {userData?.skills}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Qualification:- {userData?.qualification}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Solved Cases:- {userData?.solvedCases}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Work Experience:- {userData?.workExperience}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Batch:- {userData?.batch}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "healthInformation" && (
              <div className="border-l-2 p-4">
                <div className="grid grid-cols-3 gap-8">
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Blood Type:- {userData?.bloodGroup}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Height:- {userData?.height}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Weight:- {userData?.weight}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Physical Fitness:- {userData?.physicalFitness}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center"></p>
                </div>
              </div>
            )}
            {activeTab === "contactInformation" && (
              <div className="border-l-2 p-4">
                <div className="grid grid-cols-3 gap-8">
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Name:- {userData?.name}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Phone No:- {userData?.phoneNo}
                  </p>
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Telephone No:- {userData?.telephoneNo}
                  </p>
                  <hr className="col-span-3" />
                  <p className="font-semibold my-2 flex gap-2 items-center">
                    Address:- {userData?.address}
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
