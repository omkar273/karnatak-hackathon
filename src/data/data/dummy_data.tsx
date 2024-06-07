import { saveAs } from "file-saver";


import { ZoneModel } from "@/fragments/station/models/zone_model";
import { benglaru_zones } from "./zones_data";
import { UserModel } from "@/fragments/user_management/models/user_model";
import { StationModel } from "@/fragments/station/models/station_model";
import React from "react";
import { base, de, de_CH, en, en_AU, en_IN, Faker } from "@faker-js/faker";
import { generateRandomUserData } from "./generate_user_data";
import { generate_station_data } from "./generate_station_data";
import VehicleType from "@/types/vehicle_type";

export const customFaker = new Faker({
  locale: [en_IN, en_AU, de_CH, de, en, base]
});



const main = () => {
  const zones_data: ZoneModel[] = benglaru_zones;

  //   users data
  const commisioner_data: UserModel[] = [];
  const assistant_commisioner_data: UserModel[] = [];
  const inspector_data: UserModel[] = [];
  const sub_inspector_data: UserModel[] = [];
  const head_constable_data: UserModel[] = [];
  const constable_data: UserModel[] = [];

  const vehicle_data: VehicleType[] = [];
  const weapons_data: WeaponType[] = [];


  //   station data
  const stations_data: StationModel[] = [];

  // generating commisioner data 
  for (let index = 0; index < zones_data.length; index++) {
    const commisioner = generateRandomUserData({ post: 'Commisioner' });


    // updating zones with commisioner data
    zones_data[index] = {
      ...zones_data[index],
      commisioner_id: commisioner.id,
      commisioner_name: commisioner.name,
      crime_clearance_rate: customFaker.number.int({ min: 50, max: 75 }),
      crime_rate: customFaker.number.int({ min: 10, max: 35 })
    }



    // updating commisioner with the zone data
    commisioner.zone_id = zones_data[index].id;
    commisioner.zone_name = zones_data[index].zoneName;
    commisioner_data.push(commisioner);

    // updating assitant commisioner with the zone data
    for (let i = 0; i < 5; i++) {
      const assistant_commisioner: UserModel = generateRandomUserData({
        post: 'Assistant Commisioner',
        reporting_officer_id: commisioner.id ?? '',
        reporting_officer_name: commisioner.name
      });

      assistant_commisioner.zone_id = zones_data[i].id;
      assistant_commisioner.zone_name = zones_data[i].zoneName;
      assistant_commisioner_data.push(assistant_commisioner);

      // creating stations 5 per assistant commisioner

      for (let j = 0; j < 5; j++) {

        const tempStationStafflist: UserModel[] = []

        const inspector: UserModel = generateRandomUserData({
          post: 'Inspector',
          reporting_officer_id: assistant_commisioner.id ?? '',
          reporting_officer_name: assistant_commisioner.name
        });

        const station: StationModel = generate_station_data({
          assistant_commissioner_id: assistant_commisioner.id,
          assistant_commissioner_name: assistant_commisioner.name,
          commissioner_id: commisioner.id,
          commissioner_name: commisioner.name,
          zone_name: zones_data[i].zoneName,
          zoneId: zones_data[i].id,
          zoneCode: zones_data[i].ZoneCode,
          station_incharge_id: inspector.id,
          station_incharge_name: inspector.name,
        });

        inspector.stationId = station.id;
        inspector_data.push(inspector);
        tempStationStafflist.push(inspector);
        stations_data.push(station);

        // generating 10 vehicles per station
        for (let k = 0; k < 10; k++) {
          const vehicle: VehicleType = {
            color: customFaker.vehicle.color(),
            chasis_no: customFaker.vehicle.vin(),
            fuel_type: customFaker.vehicle.fuel(),
            manufacturer: customFaker.vehicle.manufacturer(),
            name: customFaker.vehicle.vehicle(),
            station_id: station.id ?? '',
            vehicle_model: customFaker.vehicle.model(),
            vehicle_registration_no: customFaker.vehicle.vrm(),
            vehicle_type: customFaker.vehicle.type(),
            vin: customFaker.vehicle.vin(),
            vehicle_id: customFaker.string.uuid()
          }
          vehicle_data.push(vehicle);
        }

        // generate sub inspectors data 

        for (let l = 0; l < 5; l++) {
          const sub_inspector: UserModel = generateRandomUserData({
            post: 'Sub Inpector',
            reporting_officer_id: inspector.id ?? '',
            reporting_officer_name: inspector.name,
          })

          sub_inspector.stationId = inspector.stationId;
          sub_inspector_data.push(sub_inspector)
          tempStationStafflist.push(sub_inspector)

        }

      }

    }
  }


  return {
    commisioner_data,
    assistant_commisioner_data,
    zones_data,
    inspector_data,
    sub_inspector_data,
    head_constable_data,
    stations_data,
    constable_data,
    vehicle_data,
    weapons_data
  }

};

const SaveFile: React.FC = () => {

  const saveFile = () => {


    const data = main();


    const data_files = [
      {
        data: data.assistant_commisioner_data,
        filename: 'assistant_commisioner_data'
      },
      {
        data: data.commisioner_data,
        filename: 'commisioner_data'
      },
      {
        data: data.constable_data,
        filename: 'constable_data'
      },
      {
        data: data.head_constable_data,
        filename: 'head_constable_data'
      },
      {
        data: data.inspector_data,
        filename: 'inspector_data'
      },
      {
        data: data.stations_data,
        filename: 'stations_data'
      },
      {
        data: data.sub_inspector_data,
        filename: 'sub_inspector_data'
      },
      {
        data: data.vehicle_data,
        filename: 'vehicle_data'
      },
      {
        data: data.weapons_data,
        filename: 'weapons_data'
      },
      {
        data: data.zones_data,
        filename: 'zones_data'
      },
    ]


    for (let index = 0; index < data_files.length; index++) {
      const element = data_files[index];

      const str = JSON.stringify(element.data, null, 2)
      const blob = new Blob(
        [str],
        { type: "application/json" }
      );
      saveAs(blob, `${element.filename}.json`);
    }


  };

  return (
    <div>
      <button onClick={saveFile}>Save JSON to File</button>
    </div>
  );
};

export default SaveFile;
