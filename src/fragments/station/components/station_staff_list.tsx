import React, { useEffect, useState } from 'react';
import useGetAllStaff from '../hooks/use_get_all_staff';
import { RanksEnum } from '@/common/post/ranks';
import { GridLoader } from 'react-spinners';
import { UserModel } from '@/fragments/user_management/models/user_model';
import { Input } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StaffInfoCard from './staff_info_card';


interface Props {
    stationId: string | null;
}

const StationStaffList: React.FC<Props> = ({ stationId }) => {
    const { loading, error, staff } = useGetAllStaff({
        stationId,
        initialLimit: 4,
        posts: [RanksEnum.Inspector, RanksEnum.SubInpector, RanksEnum.HeadConstable, RanksEnum.Inspector]
    });

    const [staffList, setStaffList] = useState<UserModel[]>([]);
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!loading) {
            let filteredStaff = staff;


            if (filter !== 'all') {

                filteredStaff = filteredStaff.filter((s) => {

                    if (s.post === filter) {
                        return true;
                    }
                    return false;
                });
            }

            if (query) {
                filteredStaff = filteredStaff.filter((s) =>
                    s.name.toLowerCase().includes(query.toLowerCase())
                );
            }

            setStaffList(filteredStaff);
        }
    }, [loading, staff, filter, query]);

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement> | undefined
    ): void => {
        if (!e) {
            return;
        }
        setQuery(e.target.value);
    };

    const handleClearSearch = () => {
        setQuery('');
    };

    if (loading) {
        return (
            <div className="p-12 w-full flex justify-center items-center">
                <GridLoader color="#0891B2" size={25} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-12 w-full flex justify-center items-center">
                {error}
            </div>
        );
    }

    
    return (
        <div className='w-full p-4 bg-white'>
            <h1 className='md:text-2xl font-bold font-open-sans'>
                Employees {` (${staff.length}) `}
            </h1>
            <h2>
                All the police personnel in station are listed here
            </h2>

            <div className='w-full flex gap-3 items-center'>
                <Input
                    className="my-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search here"
                    value={query}
                    onChange={handleSearch}
                    suffix={query === '' ? (
                        <SearchOutlined className="cursor-pointer text-xl" />
                    ) : (
                        <CloseOutlined
                            onClick={handleClearSearch}
                            className="cursor-pointer text-xl" />
                    )}
                />
                <Select onValueChange={(s) => setFilter(s)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            All
                        </SelectItem>
                        <SelectItem value={RanksEnum.Inspector}>
                            Inspector
                        </SelectItem>
                        <SelectItem value={RanksEnum.SubInpector}>
                            Sub Inspector
                        </SelectItem>
                        <SelectItem value={RanksEnum.HeadConstable}>
                            Head Constable
                        </SelectItem>
                        <SelectItem value={RanksEnum.Constable}>
                            Constable
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-8'>
                {staffList.map((staff, index) => (
                    <StaffInfoCard
                        key={index}
                        user={staff} />
                ))}
            </div>
            {/* user data cards */}
            <div>


            </div>
        </div>
    );
}

export default StationStaffList;
