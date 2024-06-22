import {useSearchParams} from "react-router-dom";
import StationFirTable from "@/fragments/station/components/station_fir_table.tsx";

const RecentCasePages = () => {
	const [queryParams] = useSearchParams()
	const id = queryParams.get('id');
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Recent Cases"}
			</p>
			<div className="p-4">
				<StationFirTable stationId={id}/>
			</div>
		</div>
	)
}
export default RecentCasePages
