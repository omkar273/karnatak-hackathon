/* eslint-disable @typescript-eslint/no-unused-vars */
import HomeNavbar from '../home/components/home_navbar';
import {customFaker, main} from '@/data/data/dummy_data';
import {saveAs} from 'file-saver';
import {toast} from 'react-toastify';

import commisioner_data from '@/data/json/commisioner_data.json';
import assistant_commisioner_data from '@/data/json/assistant_commisioner_data.json';
import inspector_data from '@/data/json/inspector_data.json';
import sub_inspector_data from '@/data/json/sub_inspector_data.json';
import head_constable_data from '@/data/json/head_constable_data.json';
import constable_data from '@/data/json/constable_data.json';
import zones_data from '@/data/json/zones_data.json';
import vehicle_data from '@/data/json/vehicle_data.json';
import stations_data from '@/data/json/stations_data.json';
import fir_data from '@/data/json/fir_data.json';
import weapons_data from '@/data/json/weapons_data.json';
import admin_data from '@/data/json/admin.json';

// import station_dept_data from '@/data/json/station_dept_data.json';

// const commisioner_data: UserModel[] = []
// const assistant_commisioner_data: UserModel[] = []
// const inspector_data: UserModel[] = []
// const sub_inspector_data: UserModel[] = []
// const head_constable_data: UserModel[] = []
// const constable_data: UserModel[] = []
// const vehicle_data: VehicleType[] = []
// const stations_data: StationModel[] = []
// const fir_data: FIRRecord[] = []
// const zones_data: ZoneModel[] = []
// const weapons_data: WeaponType[] = []
// import { ZoneModel } from '@/fragments/station/models/zone_model';
// import VehicleType from '@/types/vehicle_type';
// import { StationModel } from '@/fragments/station/models/station_model';
// import { FIRRecord } from '@/fragments/fir/modals/fir_modal';
// import { WeaponType } from '@/types/weapon_type';

import {doSignUp, saveUserData} from '../auth/utils/auth';
import {saveAllDocs} from './utils/save_docs';
import {serverTimestamp} from 'firebase/firestore';
import {getRandomElementFromArray} from '@/data/data/generate_user_data';
import loginData from './utils/loginData';
import {doSaveFIR} from '@/fragments/fir/utils/do_save_fir';
import {generateRandomLatLngWithinRadius} from "@/common/utils/generate_random_latlng.ts";

function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const saveToJson = (data: unknown, file_name: string) => {
	const str = JSON.stringify(data, null, 2);
	const blob = new Blob(
		[str],
		{type: "application/json"}
	);
	saveAs(blob, `${file_name}.json`);
}


const AdminDashboardPage = () => {
	
	const saveFile = async () => {
		const {
			assistant_commisioner_data,
			commisioner_data,
			constable_data,
			head_constable_data,
			inspector_data,
			stations_data,
			sub_inspector_data,
			vehicle_data,
			weapons_data,
			zones_data,
			fir_data,
			station_crime_data,
			station_dept_data
		} = main();
		
		let doc_count = 0;
		const data_files = [
			{
				data: assistant_commisioner_data,
				filename: 'assistant_commisioner_data'
			},
			{
				data: commisioner_data,
				filename: 'commisioner_data'
			},
			{
				data: constable_data,
				filename: 'constable_data'
			},
			{
				data: head_constable_data,
				filename: 'head_constable_data'
			},
			{
				data: inspector_data,
				filename: 'inspector_data'
			},
			{
				data: weapons_data,
				filename: 'weapons_data'
			},
			{
				data: stations_data,
				filename: 'stations_data'
			},
			{
				data: station_crime_data,
				filename: 'station_crime_data'
			},
			{
				data: fir_data,
				filename: 'fir_data'
			},
			{
				data: sub_inspector_data,
				filename: 'sub_inspector_data'
			},
			{
				data: vehicle_data,
				filename: 'vehicle_data'
			},
			{
				data: zones_data,
				filename: 'zones_data'
			},
			{
				data: station_dept_data,
				filename: 'station_dept_data'
			}
		];
		
		for (let index = 0; index < data_files.length; index++) {
			
			const element = data_files[index];
			doc_count += element.data.length;
			
			saveToJson(element.data, element.filename);
			toast.info(`Documents of type ${element.filename} ${element.data.length} `)
			await sleep(1000); // Use await to ensure the loop waits for sleep to complete
		}
		
		toast.success(`Total documents created: ${doc_count}`);
		sleep(1000);
	};
	
	
	const registerUsers = async (): Promise<void> => {
		try {
			
			const replacement_id: { from: string, to: string }[] = []
			
			for (const user of loginData) {
				
				const uuid = await doSignUp({
					email: user.email,
					password: '123456789',
					username: user.username,
					data: user.data,
				})
				
				replacement_id.push({
					from: user.data.id ?? '',
					to: uuid
				})
				toast.success(`user ${user.username}  registered successfully`);
				sleep(1000);
			}
			
			
			saveToJson(replacement_id, 'replacement_id')
		} catch (error) {
			toast.error(`${error}`);
		}
	};
	
	const saveUsers = async () => {
		
		try {
			for (let index = 0; index < commisioner_data.length; index++) {
				const element = commisioner_data[index];
				await saveUserData(element.id, element.email, element.username, element)
				
				toast.success('commisioner data saved')
				sleep(1000);
			}
			
			for (let index = 0; index < assistant_commisioner_data.length; index++) {
				const element = assistant_commisioner_data[index];
				await saveUserData(element.id, element.email, element.username, element)
				
				toast.success(`assistant_commisioner_data ${element.username} with index ${index} data saved`)
				sleep(1000);
			}
			for (let index = 0; index < inspector_data.length; index++) {
				const element = inspector_data[index];
				await saveUserData(element.id, element.email, element.username, element)
				
				toast.success(`inspector_data ${element.username} with index ${index} data saved`)
				sleep(1000);
			}
			for (let index = 0; index < sub_inspector_data.length; index++) {
				const element = sub_inspector_data[index];
				await saveUserData(element.id, element.email, element.username, element)
				
				toast.success(`sub_inspector_data ${element.username} with index ${index} data saved`)
				sleep(1000);
			}
			for (let index = 0; index < head_constable_data.length; index++) {
				const element = head_constable_data[index];
				await saveUserData(element.id, element.email, element.username, element)
				
				toast.success(`head_constable_data ${element.username} with index ${index} data saved`)
				sleep(1000);
			}
			
			for (let index = 737; index < constable_data.length; index++) {
				const element = constable_data[index];
				await saveUserData(element.id, element.email, element.username, element)
				
				toast.success(`constable_data ${element.username} with index ${index} data saved`)
				sleep(1000);
			}
			
			const element = admin_data[0];
			await saveUserData(element.id, element.email, element.username, element)
			
			toast.success('admin_data data saved')
			sleep(1000);
			
		} catch (error) {
			toast.error(`${error}`);
			
		}
	}
	
	
	const saveStations = async () => {
		try {
			toast.success(`no of stations ${stations_data.length}`);
			for (let index = 0; index < stations_data.length; index++) {
				const element = stations_data[index];
				await saveAllDocs(`stations/${element.id}`, {...element, timestamp: serverTimestamp()})
				toast.success('station data saved')
				sleep(1000);
			}
			
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	
	const saveZones = async () => {
		try {
			toast.success(`no of stations ${zones_data.length}`);
			for (let index = 0; index < zones_data.length; index++) {
				const element = zones_data[index];
				await saveAllDocs(`zones/${element.id}`, element)
				toast.success(`zones data saved ${index + 1}`)
				sleep(1000);
			}
			
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	
	// const saveCounts = async () => {
	//     try {
	//         toast.success(`no of counts ${station_crime_data.length}`);
	//         for (let index = 0; index < station_crime_data.length; index++) {
	//             const element = station_crime_data[index];
	//             await saveAllDocs(`crime_count/${element.id}`, element)
	//             toast.success(`zones data saved ${index + 1}`)
	//             sleep(1000);
	//         }
	//         for (let index = 0; index < stations_data.length; index++) {
	//             const element = stations_data[index];
	//             const temp: StationDeptCountType = {
	//                 id: customFaker.string.uuid().replace(/-/g, ''),
	//                 TrafficPolice: customFaker.number.int({ min: 0, max: 10 }),
	//                 CrimeBranch: customFaker.number.int({ min: 0, max: 10 }),
	//                 CyberCrimeCell: customFaker.number.int({ min: 0, max: 10 }),
	//                 AntiTerrorismSquad: customFaker.number.int({ min: 0, max: 10 }),
	//                 SpecialBranch: customFaker.number.int({ min: 0, max: 10 }),
	//                 WomensPoliceStations: customFaker.number.int({ min: 0, max: 10 }),
	//                 AntiNarcoticsCell: customFaker.number.int({ min: 0, max: 10 }),
	//                 ForensicScienceLaboratory: customFaker.number.int({ min: 0, max: 10 }),
	//                 PoliceTrainingAcademies: customFaker.number.int({ min: 0, max: 10 }),
	//                 BombDisposalSquad: customFaker.number.int({ min: 0, max: 10 }),
	//                 HumanRightsCell: customFaker.number.int({ min: 0, max: 10 }),
	//                 PublicRelationsDepartment: customFaker.number.int({ min: 0, max: 10 }),
	//             }
	
	//             await saveAllDocs(`station_dept_count/${element.id}`, temp)
	//             toast.success(`zones data saved ${index + 1}`)
	//             sleep(1000);
	//         }
	
	//     } catch (error) {
	//         toast.error(`${error}`);
	//     }
	// }
	
	
	const saveWeapons = async () => {
		try {
			toast.success(`no of stations ${weapons_data.length}`);
			for (let index = 0; index < weapons_data.length; index++) {
				const element = weapons_data[index];
				await saveAllDocs(`weapons/${element.id}`, element)
				toast.success(`weapons data saved ${index}`)
				sleep(1000);
			}
			
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	
	const saveFir = async () => {
		try {
			toast.success(`no of stations ${50}`);
			for (let index = 0; index < fir_data.length; index++) {
				const element = fir_data[index];
				
				await doSaveFIR({
					...element,
					fir_status: getRandomElementFromArray(['open', 'closed']),
					fir_type: getRandomElementFromArray([
						'Theft',
						'Robbery',
						'Assault',
						'Burglary',
						'Fraud',
						'Murder',
						'SexualAssault',
						'DrugTrafficking',
						'Cybercrime',
						'Kidnapping',
						'Bribery',
						'Stalking',
						'DomesticViolence',
						'IdentityTheft',
						'Counterfeiting',
						'Harassment',
					]),
				})
				toast.success(`fir data saved ${index}`);
				sleep(1000);
			}
			
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	
	const saveVehicles = async () => {
		try {
			toast.success(`no of stations ${vehicle_data.length}`);
			for (let index = 0; index < vehicle_data.length; index++) {
				const element = vehicle_data[index];
				await saveAllDocs(`vehicle_details/${element.id}`, element)
				toast.success(`vehicles data saved ${index}`)
				sleep(1000);
			}
			
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	
	const saveCrimeRates = async () => {
		try {
			
			const monthsArray = [
				"2024-01",
				"2024-02",
				"2024-03",
				"2024-04",
				"2024-05",
				"2024-06"
			];
			
			for (const station of stations_data) {
				for (const date of monthsArray) {
					const crime_rate = {
						Theft: customFaker.number.int({min: 0, max: 10}),
						Assault: customFaker.number.int({min: 0, max: 10}),
						Robbery: customFaker.number.int({min: 0, max: 10}),
						Burglary: customFaker.number.int({min: 0, max: 10}),
						Fraud: customFaker.number.int({min: 0, max: 10}),
						Murder: customFaker.number.int({min: 0, max: 10}),
						SexualAssault: customFaker.number.int({min: 0, max: 10}),
						DrugTrafficking: customFaker.number.int({min: 0, max: 10}),
						Cybercrime: customFaker.number.int({min: 0, max: 10}),
						Kidnapping: customFaker.number.int({min: 0, max: 10}),
						MoneyLaundering: customFaker.number.int({min: 0, max: 10}),
						Bribery: customFaker.number.int({min: 0, max: 10}),
						Stalking: customFaker.number.int({min: 0, max: 10}),
						DomesticViolence: customFaker.number.int({min: 0, max: 10}),
						IdentityTheft: customFaker.number.int({min: 0, max: 10}),
						Counterfeiting: customFaker.number.int({min: 0, max: 10}),
						Harassment: customFaker.number.int({min: 0, max: 10}),
					}
					
					const total = crime_rate.Assault + crime_rate.Bribery + crime_rate.Burglary + crime_rate.Counterfeiting + crime_rate.Cybercrime + crime_rate.DomesticViolence + crime_rate.DrugTrafficking + crime_rate.Cybercrime + crime_rate.Kidnapping + crime_rate.MoneyLaundering + crime_rate.Bribery + crime_rate.Stalking + crime_rate.Counterfeiting + crime_rate.Harassment;
					
					await saveAllDocs(`stations/${station.id}/fir_type_count/${date}`, crime_rate)
					await saveAllDocs(`stations/${station.id}/fir_counts/${date}`, {
						cases_closed: customFaker.number.int({min: 0, max: total}),
						cases_open: total,
						cases_registered: total
					})
					toast.success(`added crime rate for ${station.station_name} for date ${date}`)
				}
			}
			
			
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	
	const saveUserLocations = () => {
		try {
			
			let temp = inspector_data.map(user => {
				
				const station = stations_data.filter(station => station.id === user.stationId)
				const latLng = generateRandomLatLngWithinRadius(
					{
						lat: station[0].lat,
						lng: station[0].lng
					}, 4)
				return {
					...user,
					lat: latLng.location.lat,
					lng: latLng.location.lng
					
				}
			});
			
			saveToJson(temp, 'inspector_data')
			
			temp = head_constable_data.map(user => {
				
				const station = stations_data.filter(station => station.id === user.stationId)
				const latLng = generateRandomLatLngWithinRadius(
					{
						lat: station[0].lat,
						lng: station[0].lng
					}, 4)
				return {
					...user,
					lat: latLng.location.lat,
					lng: latLng.location.lng
					
				}
			});
			
			saveToJson(temp, 'head_constable_data')
			
			temp = sub_inspector_data.map(user => {
				
				const station = stations_data.filter(station => station.id === user.stationId)
				const latLng = generateRandomLatLngWithinRadius(
					{
						lat: station[0].lat,
						lng: station[0].lng
					}, 4)
				return {
					...user,
					lat: latLng.location.lat,
					lng: latLng.location.lng
					
				}
			});
			
			saveToJson(temp, 'sub_inspector_data')
			
			temp = constable_data.map(user => {
				
				const station = stations_data.filter(station => station.id === user.stationId)
				const latLng = generateRandomLatLngWithinRadius(
					{
						lat: station[0].lat,
						lng: station[0].lng
					}, 4)
				return {
					...user,
					lat: latLng.location.lat,
					lng: latLng.location.lng
					
				}
			});
			
			saveToJson(temp, 'constable_data')
			
			
		} catch (error) {
			toast.error(`${error}`);
			
		}
	}
	
	
	return (
		<div className="pg max-h-screen overflow-hidden relative">
			<div className='sticky top-0 left-0'>
				<HomeNavbar/>
			</div>
			
			{/* main content */}
			<div className='p-4'>
				<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
					<button
						onClick={saveFile}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						Save Data to JSON
					</button>
					<button
						onClick={registerUsers}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						Register users
					</button>
					<button
						onClick={saveUsers}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						Save all users
					</button>
					<button
						onClick={saveStations}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save stations
					</button>
					<button
						onClick={saveWeapons}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save weapons
					</button>
					<button
						onClick={saveZones}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save zones
					</button>
					<button
						onClick={saveFir}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save fir
					</button>
					<button
						onClick={saveVehicles}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save vehicles
					</button>
					<button
						onClick={saveCrimeRates}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save crime rates
					</button>
					<button
						onClick={saveUserLocations}
						className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
						type="button">
						save user locations
					</button>
				
				</div>
			</div>
		</div>
	);
}

export default AdminDashboardPage;
