import {VSpacer} from "@/common/components/spacer";
import {Calendar, CircleUserRound, Clock9, FileDown, MapPinned, ReceiptText, UserRound} from "lucide-react";
import {useSearchParams} from "react-router-dom";
import {FadeLoader} from "react-spinners";
import EvidencesCard from "../components/fir_evidence_card";
import ProgressCard from "../components/fir_progress_card";
import useGetFirDetails from "../hooks/use_get_fir_details";
import {usePDF} from "react-to-pdf";
import {useSpeech} from "react-text-to-speech";
import capital_tech_logo from "@/assets/images/capital_tech_logo.png";


const FirDetailsPage = () => {
	const [queryParams] = useSearchParams()
	const id = queryParams.get('id');
	const {data, error, loading} = useGetFirDetails(id);
	const {toPDF, targetRef} = usePDF({filename: 'fir_details.pdf'});
	
	
	if (loading) {
		return (
			<div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4">
				<FadeLoader
					color="#00edff"
					loading
				/>
				<p className="font-semibold">Loading the fir details</p>
			</div>
		)
	}
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden relative">
			
			{/* ai chat bot */}
			{/*<div className={'size-14 flex justify-center items-center bg-blue-400 border-2 border-blue-700 cursor-pointer active:scale-95 fixed rounded-full p-2 bottom-10 right-10 z-50'}>*/}
			{/*	<img src={capital_tech_logo} className={'size-10 object-cover'} alt="chatbot"/>*/}
			{/*</div>*/}
			
			
			
			<div
				className="bg-white p-3 border-b-2 border font-open-sans  flex justify-between items-center text-base sticky top-0 z-[100]">
				<h1 className={'font-semibold'}>
					{"FIR Details"}
				</h1>
				
				<button
					className="bg-blue-600 text-white px-3 py-2 rounded-md flex gap-2 items-center transition-transform transform active:scale-95"
					type="submit"
					onClick={() => toPDF()}
				>
					<FileDown/>
					<p>Download Pdf</p>
				</button>
			
			</div>
			<div className="p-4">
				{loading &&
                    <div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4">
                        <FadeLoader
                            color="#00edff"
                            loading
                        />
                        <p className="font-semibold">Loading the fir details</p>
                    </div>
				}
				{
					error && (
						<div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4">
							<p className="font-semibold">{error}</p>
						</div>
					)
				}
				
				{/* main fir details */}
				{!error && !loading && (
					<div ref={targetRef}>
						<div className="card">
							<p className="font-semibold  text-xl flex gap-2">
								<CircleUserRound/>
								{data?.FIRNo} {'  '}
								
								{data?.CrimeGroup_Name}
							</p>
							<VSpacer height={5}/>
							<p className="font-semibold  text-[0.95rem] flex gap-2">
								{'Crime no : '} {data?.Crime_No} {'  '}
							</p>
							
							<VSpacer height={5}/>
							
							
							<p className="font-medium  text-base">{`Registered on:  ${data?.timestamp?.toDate().toLocaleDateString()}`}</p>
							<p>Fir stage : {data?.FIR_Stage}</p>
							
							<VSpacer height={75}/>
							{/* basic details */}
							<div className="w-full md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-y-5 gap-y-2 gap-x-4">
								<span
									className="flex items-center gap-2"><Calendar/> Date of offence: {data?.Offence_To_Date}</span>
								
								<span
									className="flex items-center gap-2"><Calendar/> Fir registration time: {data?.FIR_Reg_DateTime}</span>
								
								<span className="flex items-center gap-2"><Calendar/> Fir Type: {data?.FIR_Type}</span>
								
								
								<span
									className="flex items-center gap-2"><MapPinned/>Place : {data?.District_Name}</span>
								
								<span className="flex items-center gap-2"><UserRound/>Incharge Officer : {data?.IOName}</span>
								
								<span
									className="flex items-center gap-2"><UserRound/>Compaint mode : {data?.Complaint_Mode}</span>
								
								
								{/* <span className="flex gap-2"><Phone />Phone : {data?.mobileNo}</span> */}
								
								<span className="flex gap-2"><Clock9/>Time of incident : {data?.FIR_Reg_DateTime}</span>
							
							</div>
							
							<VSpacer height={15}/>
							<p className="flex gap-2"><ReceiptText/> Details : {data?.ActSection}</p>
						</div>
						
						<VSpacer height={25}/>
						{/* allotment details */}
						<div className="card">
							<p className="font-semibold text-xl">Allotment Details</p>
							<VSpacer height={15}/>
							<ul>
								{data?.allotedTo?.map((person, index) => (
									<li key={index}>{person.name}</li>
								))}
							</ul>
						</div>
						
						<VSpacer height={25}/>
						{/* evidence details */}
						<div className="md:grid gap-4 md:grid-cols-1">
							<EvidencesCard/>
							
							<ProgressCard/>
						
						</div>
					</div>
				)}
			</div>
			<VSpacer height={100}/>
		</div>
	);
};

export default FirDetailsPage
