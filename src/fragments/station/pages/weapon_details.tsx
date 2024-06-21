import React, {useEffect} from 'react'
import {useSearchParams} from "react-router-dom";
import useGetDocument from "@/common/hooks/use_get_document.ts";
import { WeaponType } from '@/types/weapon_type';

const WeaponDetails = () => {
	
	const [queryParams] = useSearchParams()
	const id = queryParams.get('id');
	const {data, error, loading} = useGetDocument<WeaponType>({docId: id, path: ''});
	
	useEffect(() => {
	
	}, []);
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Weapon Details"}
			</p>
			<div className="p-4">
			</div>
		</div>
	)
}
export default WeaponDetails
