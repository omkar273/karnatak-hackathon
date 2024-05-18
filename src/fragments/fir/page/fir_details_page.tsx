import { VSpacer } from "@/common/components/spacer";
import { Calendar, CircleUserRound, Clock9, MapPinned, Phone, ReceiptText, UserRound } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import EvidencesCard from "../components/fir_evidence_card";
import ProgressCard from "../components/fir_progress_card";
import useGetFirDetails from "../hooks/use_get_fir_details";


const FirDetailsPage = () => {
    const [queryParams] = useSearchParams()
    const id = queryParams.get('id');
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
                            <p className="font-semibold  text-xl flex gap-2"><CircleUserRound /> {data?.name}</p>
                            <VSpacer height={5} />
                            <p className="font-medium  text-base">{`Registered on:  ${data?.timestamp?.toDate().toLocaleDateString()}`}</p>
                            <p>status : {data?.status}</p>

                            <VSpacer height={75} />
                            {/* basic details */}
                            <div className="w-full md:grid md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4">
                                <span className="flex gap-2"><Calendar /> Date : {data?.dateOfIncident}</span>
                                <span className="flex gap-2"><MapPinned />Place : {data?.placeOfIncident}</span>
                                <span className="flex gap-2"><UserRound />Father name : {data?.fatherName}</span>
                                <span className="flex gap-2"><Phone />Phone : {data?.mobileNo}</span>
                                <span className="flex gap-2"><Clock9 />Time of incident : {data?.timeOfIncident}</span>
                            </div>

                            <VSpacer height={15} />
                            <p className="flex gap-2"><ReceiptText /> Details : {data?.detailsOfIncident}</p>
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
                        <div className="md:grid gap-4 md:grid-cols-1">
                            <EvidencesCard />

                            <ProgressCard />

                        </div>
                    </div>
                )}
            </div>
            <VSpacer height={100} />
        </div>
    );
};

export default FirDetailsPage