/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from "@/common/redux/store";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCasesPieCharts from "../components/dashboard_cases_piecharts";
import CourtOrders from "../components/dashboard_court";
import DashboardUserDataCards from "../components/dashboard_data_cards";
import DashboardStationCards from "../components/dashboard_station_data_cards";
import StationRatesGraph from "../components/station_rates_graph";
import ZonalData from "../components/zone_data";

const DashboardPage = () => {
  const { stationList, userdata } = useSelector((s: RootState) => s.auth);

  const [stationId, setStationId] = useState<string | null>(null);

  useEffect(() => {
    setStationId(stationList?.at(0)?.id ?? "");
  }, [stationList]);

  const getStationNameById = (id: string | undefined) => {
    const station = stationList.find((station) => station.id === id);
    return station ? station.station_name : "Select a station";
  };

  return (
    <div className="h-screen xl:overflow-hidden bg-gray-100 flex flex-col">
      <div className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
        <p className="font-open-sans font-semibold ">{"Dashboard"}</p>

        {/* station dropdown */}
        {stationList.length > 1 && (
          <Select.Root
            value={stationId ?? ""}
            onValueChange={(s) => setStationId(s)}
          >
            <Select.Trigger
              className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
              aria-label="Station"
            >
              <Select.Value>{getStationNameById(stationId ?? "")}</Select.Value>
              <Select.Icon className="text-violet11">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="overflow-hidden bg-white rounded-md shadow-lg z-[110]"
                position="popper"
              >
                <Select.Viewport className="p-[5px]">
                  {stationList.map((station, index) => (
                    <div key={station.id}>
                      <Select.Item
                        value={station.id ?? ""}
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
                      {index < stationList.length - 1 && (
                        <div className="border-b border-gray-200 my-2" />
                      )}
                    </div>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        )}

        {/* station name  */}
        {stationList.length === 1 && (
          <h1>
            {stationList[0].station_name}
            {" station"}
          </h1>
        )}
      </div>

      {/*{*/}
      {/*	userdata && (*/}
      {/*		<button*/}
      {/*			onClick={async () => {*/}
      {/*				await sendNotification({*/}
      {/*					sender_name: "omkar sonawane",*/}
      {/*					notification_type: 'emergency',*/}
      {/*					recepient_id: userdata.id ?? '',*/}
      {/*					task_id: '54',*/}
      {/*					sender_id: userdata.id ?? '',*/}
      {/*				})*/}
      {/*			}}*/}
      {/*			className={'p-4 bg-cyan-500 my-4 rounded-md'}*/}
      {/*		>*/}
      {/*			send Emergency notification*/}
      {/*		</button>*/}
      {/*	)*/}
      {/*}*/}

      {/*{*/}
      {/*	userdata && (*/}
      {/*		<button*/}
      {/*			onClick={async () => {*/}
      {/*				await sendNotification({*/}
      {/*					sender_name: "omkar sonawane",*/}
      {/*					notification_type: 'fir',*/}
      {/*					recepient_id: userdata.id ?? '',*/}
      {/*					task_id: '54',*/}
      {/*					sender_id: userdata.id ?? '',*/}
      {/*				})*/}
      {/*			}}*/}
      {/*			className={'p-4 bg-cyan-500 my-4 rounded-md'}*/}
      {/*		>*/}
      {/*			send Normal notification*/}
      {/*		</button>*/}
      {/*	)*/}
      {/*}*/}

      {/* zonal data for commissioner */}
      <ZonalData />
      <DashboardUserDataCards />

      <div>
        <div className="p-5 grid grid-cols-2 md:gap-4 lg:grid-cols-2">
          <div className="w-[276px] h-[65px] bg-white flex items-center justify-between p-0 shadow-md rounded-lg">
            <div className="flex-1">
              <span className="text-lg font-semibold px-1">Recent Cases</span>
            </div>
            <div className="w-[80px] h-[65px] bg-[#3283FC] flex items-center justify-center rounded-lg">
              <span className="text-white">9</span>
            </div>
          </div>
          <div className="w-[276px] h-[65px] bg-white flex items-center justify-between p-0 shadow-md rounded-lg">
            <div className="flex-1">
              <span className="text-lg font-semibold px-1">Pending Cases</span>
            </div>
            <div className="w-[80px] h-[65px] bg-[#3283FC] flex items-center justify-center rounded-lg">
              <span className="text-white">8</span>
            </div>
          </div>
        </div>
      </div>
      {/* <DashboardUserDataCards /> */}
      <p className="font-bold text-3xl px-4 pb-4">Station Data</p>

      {/* main content */}
      <div className="lg:flex lg:flex-grow lg:flex-row lg:gap-4">
        {/* left container */}
        <div className="flex-grow md:flex-[85%] px-4 xl:overflow-y-auto xl:max-h-[calc(100vh-138px)]">
          {/* left container content */}
          <div>
            <DashboardStationCards stationId={stationId ?? ""} />
            <StationRatesGraph stationId={stationId ?? ""} />
            <DashboardCasesPieCharts stationId={stationId ?? ""} />
            <CourtOrders />

            <div className="min-h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
