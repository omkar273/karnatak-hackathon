import {RanksEnum} from "@/common/post/ranks";
import DataCard from "./data_card";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store";
import {ZoneModel} from "@/fragments/station/models/zone_model";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config";
import {GridLoader} from "react-spinners";

const ZonalData = ({zoneId}: { zoneId: string }) => {
	const {userdata} = useSelector((s: RootState) => s.auth);
	const [zoneData, setZoneData] = useState<ZoneModel | null>(null);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		const fetchZoneData = async () => {
			try {
				if (!userdata || userdata.zone_id === null || userdata.zone_id === undefined) {
					return;
				}
				
				setLoading(true); // Set loading to true before making the call
				
				const docRef = doc(firestore, "zones", zoneId);
				const docSnap = await getDoc(docRef);
				
				if (docSnap.exists()) {
					const data = docSnap.data();
					if (data) {
						setZoneData(data as ZoneModel);
						console.log(data)
					}
				} else {
					setZoneData(null);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
				setZoneData(null);
			} finally {
				setLoading(false);
			}
		};
		
		fetchZoneData();
	}, [userdata, zoneId]); // Include userdata in the dependency array
	
	if (!userdata || userdata.post !== RanksEnum.Commisioner) {
		return null;
	}
	
	
	if (loading) {
		return (
			<div className="p-12 w-full flex justify-center items-center">
				<GridLoader
					color="#0891B2"
					size={25}
				/>
			</div>
		)
	}
	return (
		<div>
			<h1 className="font-bold text-3xl px-4 py-1">
				{`${zoneData?.zoneName} zone (${zoneData?.ZoneCode})`}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-5 md:gap-y-3  p-4">
				<DataCard
					title="Crime rate"
					value={`${zoneData?.crime_rate ?? '--'} %`}
					change_percentage={'-36%'}
				/>
				<DataCard
					title="Crime clearance rate"
					value={loading ? '--' : (`${zoneData?.crime_clearance_rate} %` ?? '--')}
					change_percentage={'-12%'}
				/>
				
				<DataCard
					title="Cases registered this month"
					value={loading ? '--' : (`${zoneData?.open_cases}` ?? '--')}
					change_percentage={'-36%'}
				/>
			
			</div>
		</div>
	);
};

export default ZonalData;
