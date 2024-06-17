import {RanksEnum} from "@/common/post/ranks";
import DataCard from "./data_card";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store";
import {ZoneModel} from "@/fragments/station/models/zone_model";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config";
import {GridLoader} from "react-spinners";

const CityData = () => {
	const {userdata} = useSelector((s: RootState) => s.auth);
	const [, setZoneData] = useState<ZoneModel | null>(null);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		const fetchZoneData = async () => {
			try {
				if (!userdata || userdata.zone_id === null || userdata.zone_id === undefined) {
					return;
				}
				
				setLoading(true); // Set loading to true before making the call
				
				const docRef = doc(firestore, "zones", userdata.zone_id);
				const docSnap = await getDoc(docRef);
				
				if (docSnap.exists()) {
					const data = docSnap.data();
					if (data) {
						setZoneData(data as ZoneModel);
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
	}, [userdata]); // Include userdata in the dependency array
	
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
				{`City Data`}
			</h1>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-5 md:gap-y-3 p-4">
				<DataCard
					title="Crime rate"
					value={`24.3 %`}
					change_percentage={'-5%'}
				/>
				<DataCard
					title="Crime clearance rate"
					value={loading ? '--' : (`39.6 %` ?? '--')}
					change_percentage={'-12%'}
				/>
				
				<DataCard
					title="Cases registered this month"
					value={loading ? '--' : (`10256` ?? '--')}
					change_percentage={'-36%'}
				/>
				
				
			</div>
		</div>
	);
};

export default CityData;
