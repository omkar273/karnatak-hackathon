/* eslint-disable @typescript-eslint/no-unused-vars */
import HomeNavbar from '../home/components/home_navbar';
import { main } from '@/data/data/dummy_data';
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
import station_crime_data from '@/data/json/station_crime_data.json';
import station_dept_data from '@/data/json/station_dept_data.json';

import { doSignUp } from '../auth/utils/auth';
import { saveAllDocs } from './utils/save_docs';

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

        console.log(fir_data);
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
            console.log(`saving json of ${data_files[index].filename} and it is ${data_files[index].data.length !== 0} with index ${index}`);

            const element = data_files[index];
            doc_count += element.data.length;
            const str = JSON.stringify(element.data, null, 2);
            const blob = new Blob(
                [str],
                { type: "application/json" }
            );
            saveAs(blob, `${element.filename}.json`);
            await sleep(1000); // Use await to ensure the loop waits for sleep to complete
        }

        toast.success(`Total documents created: ${doc_count}`);
        sleep(1000);
    };


    const registerUsers = async (): Promise<void> => {
        try {
            await doSignUp({
                email: 'omkarsonawane622@gmail.com',
                password: '123456789',
                username: 'commissioner',
                data: commisioner_data[0]
            })
            toast.success('commissioner successfully registered');
            sleep(1000);


            await doSignUp({
                email: 'jiteshjawale123@gmail.com',
                password: '123456789',
                username: 'assistant-commissioner',
                data: assistant_commisioner_data[0]
            })
            toast.success('assistant commissioner successfully registered');
            sleep(1000);


            await doSignUp({
                email: 'omkarsonawane.comp@siem.org.in',
                password: '123456789',
                username: 'inspector',
                data: inspector_data[0]
            })
            toast.success('inspector successfully registered');
            sleep(1000);


            await doSignUp({
                email: 'omkarsonawane.dev@gmail.com',
                password: '123456789',
                username: 'sub-inspector',
                data: sub_inspector_data[0]
            })
            toast.success('sub inspector successfully registered');
            sleep(1000);


            await doSignUp({
                email: 'jeetjawale.99@gmail.com',
                password: '123456789',
                username: 'head-constable',
                data: head_constable_data[0]
            })
            toast.success('head constable successfully registered');
            sleep(1000);


            await doSignUp({
                email: 'desno.pvt.ltd@gmail.com',
                password: '123456789',
                username: 'constable',
                data: constable_data[0]
            })
            toast.success('constable successfully registered');
            sleep(1000);



        } catch (error) {
            toast.error(`${error}`);
            console.log(error);
        }
    };

    const saveUsers = async () => {
        try {
            for (let index = 1; index < commisioner_data.length; index++) {
                const element = commisioner_data[index];
                console.log('commissioner started uploading');
                await saveAllDocs(`users/${element.id}`, element)
                console.log('commissioner saved', element);

                toast.success('commisioner data saved')
                sleep(1000);
            }

            
        } catch (error) {
            toast.error(`${error}`);
            console.log(error);
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
                        onClick={saveUsers}
                        className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
                        type="button">
                        save stations
                    </button>
                    <button
                        onClick={saveUsers}
                        className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
                        type="button">
                        save stations
                    </button>
                    <button
                        onClick={saveUsers}
                        className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
                        type="button">
                        save stations
                    </button>
                    <button
                        onClick={saveUsers}
                        className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
                        type="button">
                        save stations
                    </button>
                    <button
                        onClick={saveUsers}
                        className='bg-blue-500 p-4 rounded-md shadow-lg text-lg text-white'
                        type="button">
                        save stations
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
