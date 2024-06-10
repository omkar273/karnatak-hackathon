import React, { useEffect, useState } from 'react'
import useGetAllStaff from '../hooks/use_get_all_staff';
import { RanksEnum } from '@/common/post/ranks';
import { GridLoader } from 'react-spinners';
import { UserModel } from '@/fragments/user_management/models/user_model';


interface Props {
    stationId: string | null
}

const StationStaffList: React.FC<Props> = ({ stationId }) => {
    const { loading, error, staff } = useGetAllStaff({
        stationId,
        initialLimit: 1,
        posts: [RanksEnum.Inspector, RanksEnum.SubInpector]
    });



    const [staffList, setstaffList] = useState<UserModel[]>([])
    useEffect(() => {
        setstaffList(staff);
    }, [loading, staff])


    if (loading) {
        return (<div className="p-12 w-full flex justify-center items-center">
            <GridLoader
                color="#0891B2"
                size={25}
            />
        </div>)
    }


    if (error) {
        return (
            <div className="p-12 w-full flex justify-center items-center">
                {error}
            </div>
        )
    }
    console.log(staff);

    return (
        <div className='w-full p-4'>
            <h1 className='md:text-2xl font-bold font-open-sans'>
                Employees {` (${staffList.length}) `}
            </h1>
            <h2>
                All the police personnel in station are listed here
            </h2>
        </div>
    )
}

export default StationStaffList