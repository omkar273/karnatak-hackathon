import { VSpacer } from "@/common/components/spacer";
import dummyUserData from "@/fragments/user_management/data/underlying_data";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import { BriefcaseBusiness, CalendarCheck2, Dumbbell, GraduationCap, MapPinned, NotebookTabs, NotepadText, ShieldEllipsis, Weight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const getUserDetails = (userEmail: string) => {
    for (let index = 0; index < dummyUserData.length; index++) {
        const element = dummyUserData[index];
        if (userEmail === element.email) {
            return {
                ...element,
            };
        }
    }
    return null;
}

const ProfilePage = () => {
    const [queryParams] = useSearchParams()
    let id = queryParams.get('id');

    if (!id) {
        id = 'omkarsonawane622@gmail.com'
    }
    const userData = getUserDetails(id);

    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                Profile
            </p>
            <div className="p-4">

                {/* basic data */}
                <div className="flex gap-4 items-center card bg-white border-2">
                    <div className="p-4 flex shadow-md bg-cyan-100 justify-center flex-col items-center border-2 rounded-md">
                        {/* <ShieldPlus className="text-center  size-28 mb-2" /> */}
                        <Avatar size={100} icon={<UserOutlined />} />
                        <VSpacer height={30} />
                        <Rate disabled
                            allowHalf
                            defaultValue={4.5}
                            tooltips={['Bad', 'betterment needed', 'good', 'Excellent', 'Ideal station']} />
                        <p className="font-medium text-base">
                            Awarded with
                        </p>
                        <p className="text-wrap text-base font-semibold">{userData?.awards} </p>
                    </div>
                    <div className="border-l-2 p-4">
                        <p className="font-bold text-2xl flex gap-2 items-center">
                            <ShieldEllipsis />   Name : {userData?.name} ({userData?.post})
                        </p>
                        <VSpacer height={25} />

                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <CalendarCheck2 />Batch : {userData?.batch}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <MapPinned /> Current posting : {userData?.currentPosting}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <NotepadText />  Skills : {userData?.skills}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <GraduationCap />   Qualification : {userData?.qualification}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <NotebookTabs /> Solved cases : {userData?.solvedCases}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <BriefcaseBusiness />   Work Experience : {userData?.workExperience}
                        </p>
                    </div>


                </div>

                {/* personal detail */}
                <VSpacer height={30} />
                <div className="card bg-white">
                    <p className="text-2xl font-semibold ">Personal details</p>
                    <VSpacer height={30} />

                    <div className="grid md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-4">
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <CalendarCheck2 />Date of joining : {userData?.dateOfJoining}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <Dumbbell />Height : {userData?.height}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <Weight />Weight : {userData?.weight}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage