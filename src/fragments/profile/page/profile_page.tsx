import { VSpacer } from "@/common/components/spacer";
import { RootState } from "@/common/redux/store";
import dummyuserdata from "@/data/underlying_data";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import {
    BriefcaseBusiness,
    CalendarCheck2,
    Dumbbell,
    GraduationCap,
    MapPinned,
    NotebookTabs,
    NotepadText,
    ShieldEllipsis,
    Weight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const getUserDetails = (userEmail: string) => {
    for (let index = 0; index < dummyuserdata.length; index++) {
        const element = dummyuserdata[index];
        if (userEmail === element.email) {
            return {
                ...element,
            };
        }
    }
    return null;
};

const ProfilePage = () => {

    const { userdata } = useSelector((s: RootState) => s.auth)


    const [queryParams] = useSearchParams();
    let id = queryParams.get("id");

    if (!id) {
        id = "omkarsonawane622@gmail.com";
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         toast.success('New task alloted to you', {
    //             toastId: 'update'
    //         })
    //     }, 5000);
    // }, [])

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
                        <p className="font-medium text-base">Awarded with</p>
                        <p className="text-wrap text-base font-semibold">
                            {userdata?.awards?.at(0)}{" "}
                        </p>
                    </div>
                    <div className="border-l-2 p-4">
                        <p className="font-bold text-2xl flex gap-2 items-center">
                            <ShieldEllipsis /> Name : {userdata?.name} ({userdata?.post})
                        </p>
                        <VSpacer height={25} />

                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <CalendarCheck2 />
                            Batch : {userdata?.batch}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <MapPinned /> Current posting : {userdata?.currentPosting}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <NotepadText /> Skills : {userdata?.skills?.at(0)}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <GraduationCap /> Qualification : {userdata?.qualification}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <NotebookTabs /> Solved cases : {userdata?.solvedCases}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <BriefcaseBusiness /> Work Experience : {userdata?.workExperience}
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
                            <CalendarCheck2 />
                            Date of joining : {userdata?.dateOfJoining}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <Dumbbell />
                            Height : {userdata?.height}
                        </p>
                        <p className="font-semibold my-2 flex gap-2 items-center">
                            <Weight />
                            Weight : {userdata?.weight}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
