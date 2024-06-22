import {VSpacer} from "@/common/components/spacer";
import {Calendar, CircleUserRound, Clock9, FileDown, MapPinned, ReceiptText, UserRound, Volume2} from "lucide-react";
import {useSearchParams} from "react-router-dom";
import {FadeLoader} from "react-spinners";
import EvidencesCard from "../components/fir_evidence_card";
import ProgressCard from "../components/fir_progress_card";
import useGetFirDetails from "../hooks/use_get_fir_details";
import {usePDF} from "react-to-pdf";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import {useEffect, useState} from "react";
import {RanksEnum} from "@/common/post/ranks.ts";
import {FirModel} from "@/fragments/fir/modals/fir_modal.ts";
import {useSpeech} from "react-text-to-speech";

const FirDetailsPage = () => {
	const [queryParams] = useSearchParams()
	const id = queryParams.get('id');
	const {data, error, loading} = useGetFirDetails(id);
	const {toPDF, targetRef} = usePDF({filename: 'fir_details.pdf'});
	const [speechText, setSpeechText] = useState('');
	
	const {
		// Text,
		// speechStatus,
		// isInQueue,
		start,
		// pause,
		// stop,
	} = useSpeech({text: speechText});
	
	const {userdata} = useSelector((s: RootState) => s.auth);
	const [userAcces, setuserAcces] = useState(false);
	
	const acess = (id: string, arr: undefined | Array<{ name: string; id: string; post: string }>) => {
		for (const acessorId of arr) {
			if (acessorId.id === id) {
				return true;
			}
		}
		return false;
	}
	
	useEffect(() => {
		if (userdata && !loading && data) {
			if (userdata?.id === data?.registered_by_id || acess(userdata?.id || '', data?.allotedTo) || userdata.post === RanksEnum.Commisioner) {
				setuserAcces(true)
			}
		}
	}, [userdata, data, loading]);
	
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
	
	if (!userAcces) {
		return (
			<div className={'min-h-screen bg-white flex justify-center items-center'}>
				<p>You dont have authority to acess this page</p>
			</div>
		)
	}
	
	const createFIRSummary = (data: FirModel): string => {
		return `
The FIR, numbered ${data.FIRNo}, was registered at the ${data.UnitName} in the ${data.District_Name} district. The offence took place on ${new Date(data.Offence_From_Date).toLocaleString()} and was reported on the same day at ${new Date(data.FIR_Reg_DateTime).toLocaleString()}. This case, categorized as a ${data.FIR_Type} offence, falls under the section ${data.ActSection} of the Karnataka Police Act, 1963.

The incident occurred at ${data.Place_of_Offence}, approximately ${data.Distance_from_PS} from the police station. The investigation was led by ${data.IOName}, identified by KGID ${data.KGID}. The case was initiated suo-moto by the police and involves the crime of ${data.CrimeHead_Name} under the ${data.CrimeGroup_Name}.

No victims were recorded in this case. However, there were two accused, both male, who were arrested and charged. One of them has been convicted. The crime scene is part of the Aminagad Town beat in the Aminagad village area.

The officers assigned to this case were:
${data?.allotedTo?.map(officer => `- ${officer.name}, ${officer.post}`).join('\n')}.
    `.trim();
	};
	
	
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
				
				<div className={'flex gap-2 items-center'}>
					
					<button
						disabled={!data}
						className="bg-blue-600 text-white px-3 py-2 rounded-md flex gap-2 items-center transition-transform transform active:scale-95"
						type="submit"
						onClick={() => {
							const sumamry = createFIRSummary(data!);
							console.log(sumamry)
							setSpeechText(sumamry)
							start()
						}}
					>
						<Volume2/>
					</button>
					
					
					
					
					<button
						className="bg-blue-600 text-white px-3 py-2 rounded-md flex gap-2 items-center transition-transform transform active:scale-95"
						type="submit"
						onClick={() => toPDF()}
					>
						<FileDown/>
						<p>Download Pdf</p>
					</button>
				</div>
			
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
