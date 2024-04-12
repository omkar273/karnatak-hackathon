import { VSpacer } from "@/common/components/spacer";
import { DatePicker } from "antd";
import { FilePlus2 } from "lucide-react";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import useGetFirDetails from "../hooks/use_get_fir_details";


const FirDetailsPage = () => {
    const { id } = useParams()
    const { data, error, loading } = useGetFirDetails(id);


    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"FIR Details"}
            </p>
            <div className="p-4">
                {loading &&
                    <div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4" >
                        <FadeLoader
                            color="#00edff"
                            loading
                        />
                        <p className="font-semibold">Loading the fir details</p>
                    </div>
                }
                {
                    error && (
                        <div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4" >
                            <p className="font-semibold">{error}</p>
                        </div>
                    )
                }

                {/* main fir details */}
                {!error && !loading && (
                    <div className="">
                        <div className="card">
                            <p className="font-semibold  text-xl">{data?.name}</p>
                            <VSpacer height={5} />
                            <p className="font-medium  text-base">{`Registered on:  ${data?.timestamp.toDate().toLocaleDateString()}`}</p>
                            <p>status : {data?.status}</p>

                            <VSpacer height={75} />
                            {/* basic details */}
                            <div className="w-full md:grid md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4">
                                <span>Date : {data?.dateOfIncident}</span>
                                <span>Place : {data?.placeOfIncident}</span>
                                <span>Father name : {data?.fatherName}</span>
                                <span>Phone : {data?.mobileNo}</span>
                                <span>Time of incident : {data?.timeOfIncident}</span>
                            </div>

                            <VSpacer height={15} />
                            <p>Details : {data?.detailsOfIncident}</p>
                        </div>

                        <VSpacer height={25} />
                        {/* allotment details */}
                        <div className="card">
                            <p className="font-semibold text-xl">Allotment Details</p>
                            <VSpacer height={15} />
                            <ul>
                                {data?.allotedTo.map((person, index) => (<li key={index}>{person}</li>))}
                            </ul>
                        </div>


                        <VSpacer height={25} />
                        {/* evidence details */}
                        <div className="md:grid gap-4 md:grid-cols-2">
                            <div className="card">

                                {/* titlebar */}
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-xl">Case Progress</p>
                                    <span className="tap">
                                        <FilePlus2 />
                                    </span>
                                </div>

                                <VSpacer height={15} />
                                <div className="p-4 border">
                                    <DatePicker />

                                </div>


                                <VSpacer height={15} />

                            </div> <div className="card">
                                <p className="font-semibold text-xl">Evidences Details</p>
                                <VSpacer height={15} />

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <VSpacer height={100} />
        </div>
    );
};

export default FirDetailsPage