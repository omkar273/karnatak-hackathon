/* eslint-disable @typescript-eslint/no-unused-vars */
import HomeNavbar from '../home/components/home_navbar';
import { customFaker, main } from '@/data/data/dummy_data';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

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

import { doSignUp, saveUserData } from '../auth/utils/auth';
import { saveAllDocs } from './utils/save_docs';
import { serverTimestamp } from 'firebase/firestore';
import { getRandomElementFromArray } from '@/data/data/generate_user_data';
import loginData from './utils/loginData';

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
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
            const str = JSON.stringify(element.data, null, 2);
            const blob = new Blob(
                [str],
                { type: "application/json" }
            );
            toast.info(`Documents of type ${element.filename} ${element.data.length} `)
            saveAs(blob, `${element.filename}.json`);
            await sleep(1000); // Use await to ensure the loop waits for sleep to complete
        }

        toast.success(`Total documents created: ${doc_count}`);
        sleep(1000);
    };


    const registerUsers = async (): Promise<void> => {
        try {
            for (const user of loginData) {
                await doSignUp({
                    email: user.email,
                    password: '123456789',
                    username: user.username,
                    data: user.data,
                })
                toast.success(`user ${user.username} registered successfully`);
                sleep(1000);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const saveUsers = async () => {

        try {
            for (let index = 1; index < commisioner_data.length; index++) {
                const element = commisioner_data[index];
                await saveUserData(element.id, element.email, element.username, element)

                toast.success('commisioner data saved')
                sleep(1000);
            }

            for (let index = 1; index < assistant_commisioner_data.length; index++) {
                const element = assistant_commisioner_data[index];
                await saveUserData(element.id, element.email, element.username, element)

                toast.success(`assistant commisioner ${index} data saved`)
                sleep(1000);
            }
            for (let index = 1; index < inspector_data.length; index++) {
                const element = inspector_data[index];
                await saveUserData(element.id, element.email, element.username, element)

                toast.success('inspector_data data saved')
                sleep(1000);
            }
            for (let index = 1; index < head_constable_data.length; index++) {
                const element = head_constable_data[index];
                await saveUserData(element.id, element.email, element.username, element)

                toast.success('head_constable_data data saved')
                sleep(1000);
            }
            for (let index = 1; index < constable_data.length; index++) {
                const element = constable_data[index];
                await saveUserData(element.id, element.email, element.username, element)

                toast.success('constable_data data saved')
                sleep(1000);
            }

            const element = admin_data[0];
            await saveUserData(element.id, element.email, element.username, element)

            toast.success('constable_data data saved')
            sleep(1000);


        } catch (error) {
            toast.error(`${error}`);
            console.log(error);

        }
    }



    const saveStations = async () => {
        try {
            toast.success(`no of stations ${stations_data.length}`);
            for (let index = 0; index < stations_data.length; index++) {
                const element = stations_data[index];
                await saveAllDocs(`stations/${element.id}`, { ...element, timestamp: serverTimestamp() })
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
                toast.success('station data saved')
                sleep(1000);
            }

        } catch (error) {
            toast.error(`${error}`);
        }
    }

    const saveFir = async () => {
        try {
            toast.success(`no of stations ${fir_data.length}`);
            for (let index = 0; index < fir_data.length; index++) {
                const element = fir_data[index];
                await saveAllDocs(`fir_details/${customFaker.string.uuid().replace(/-/g, "")}`, {
                    ...element,
                    timestamp: serverTimestamp(),
                    fir_status: getRandomElementFromArray(['open', 'closed'])
                })
                toast.success(`zones data saved ${index + 1}`)
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
                toast.success(`zones data saved ${index + 1}`)
                sleep(1000);
            }

        } catch (error) {
            toast.error(`${error}`);
        }
    }


    return (
        <div className="pg max-h-screen overflow-hidden relative">
            <div className='sticky top-0 left-0'>
                <HomeNavbar />
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

                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
