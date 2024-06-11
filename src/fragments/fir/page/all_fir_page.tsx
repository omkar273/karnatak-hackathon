import FirDetailsTable from "../components/fir_table";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { useEffect, useState } from "react";
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';

const AllFirPage = () => {

    const { stationList } = useSelector((s: RootState) => s.auth)

    const [stationId, setStationId] = useState<string | null>(null);

    useEffect(() => {
        setStationId(stationList?.at(0)?.id ?? '')
    }, [stationList])



    const getStationNameById = (id: string | undefined) => {
        const station = stationList.find((station) => station.id === id);
        return station ? station.station_name : "Select a station";
    };
    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden">
            <div className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
                <p className="font-open-sans font-bold ">
                    {"FIR details"}
                </p>

                {/* station dropdown */}
                {
                    stationList.length > 1 && (
                        <Select.Root value={stationId ?? ''} onValueChange={(s) => setStationId(s)}>
                            <Select.Trigger
                                className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                                aria-label="Station"
                            >
                                <Select.Value>
                                    {getStationNameById(stationId ?? '')}
                                </Select.Value>
                                <Select.Icon className="text-violet11">
                                    <ChevronDownIcon />
                                </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal >
                                <Select.Content
                                    className="overflow-hidden bg-white rounded-md shadow-lg z-[110]"
                                    position="popper"
                                >
                                    <Select.Viewport className="p-[5px]">
                                        {stationList.map((station, index) => (
                                            <div key={station.id}>
                                                <Select.Item
                                                    value={station.id ?? ''}
                                                    className="text-[13px] py-3 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                                >
                                                    <Select.ItemText>
                                                        <p className="text-base py-4 xl:text-lg">
                                                            {station.station_name}
                                                        </p>
                                                    </Select.ItemText>
                                                    <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                        <CheckIcon />
                                                    </Select.ItemIndicator>
                                                </Select.Item>
                                                {index < stationList.length - 1 && <div className="border-b border-gray-200 my-2" />}
                                            </div>
                                        ))}
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    )
                }

                {/* station name  */}
                {
                    stationList.length === 1 && (
                        <h1>
                            {stationList[0].station_name}{' station'}
                        </h1>
                    )
                }


            </div>
            <div className="p-4">
                <FirDetailsTable stationId={stationId} />
            </div>
        </div>
    );
};


export default AllFirPage