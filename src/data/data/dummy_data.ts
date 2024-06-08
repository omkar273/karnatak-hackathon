import { ZoneModel } from "@/fragments/station/models/zone_model";
import { benglaru_zones } from "./zones_data";
import { UserModel } from "@/fragments/user_management/models/user_model";
import { StationModel } from "@/fragments/station/models/station_model";
import { base, de, de_CH, en, en_AU, en_IN, Faker } from "@faker-js/faker";
import {
  generateRandomUserData,
  getRandomElementFromArray,
} from "./generate_user_data";
import { generate_station_data } from "./generate_station_data";
import VehicleType from "@/types/vehicle_type";
import { weaponData } from "./weapon_data";
import { FIRRecord } from "@/fragments/fir/modals/fir_modal";
import { fir_dataset } from "../fir_data";
import { StationCrimeCountType } from "@/types/station_crime_count_type";

export const customFaker = new Faker({
  locale: [en_IN, en_AU, de_CH, de, en, base],
});

export const main = () => {
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

  const fir_data: FIRRecord[] = [];
  const station_dept_data: StationCrimeCountType[] = [];
  const station_crime_data: StationCrimeCountType[] = [];

  //   station data
  const stations_data: StationModel[] = [];

  // generating commisioner data
  for (let index = 0; index < 1; index++) {
    const commisioner = generateRandomUserData({ post: "Commisioner" });

    // updating zones with commisioner data
    zones_data[index] = {
      ...zones_data[index],
      commisioner_id: commisioner.id,
      commisioner_name: commisioner.name,
      crime_clearance_rate: customFaker.number.int({ min: 0, max: 10 }),
      crime_rate: customFaker.number.int({ min: 0, max: 10 }),
    };

    // updating commisioner with the zone data
    commisioner.zone_id = zones_data[index].id;
    commisioner.zone_name = zones_data[index].zoneName;
    commisioner_data.push(commisioner);

    // updating assitant commisioner with the zone data
    for (let i = 0; i < 5; i++) {
      const assistant_commisioner: UserModel = generateRandomUserData({
        post: "Assistant Commisioner",
        reporting_officer_id: commisioner.id ?? "",
        reporting_officer_name: commisioner.name,
        superiors_list: [commisioner.id ?? ""],
      });

      assistant_commisioner.zone_id = zones_data[index].id;
      assistant_commisioner.zone_name = zones_data[index].zoneName;
      assistant_commisioner_data.push(assistant_commisioner);

      // creating stations 5 per assistant commisioner

      for (let j = 0; j < 5; j++) {
        const tempStationStafflist: UserModel[] = [];

        const inspector: UserModel = generateRandomUserData({
          post: "Inspector",
          reporting_officer_id: assistant_commisioner.id ?? "",
          reporting_officer_name: assistant_commisioner.name,
          superiors_list: [
            ...assistant_commisioner.superiors_list!,
            assistant_commisioner.id!,
          ],
        });

        const station: StationModel = generate_station_data({
          assistant_commissioner_id: assistant_commisioner.id,
          assistant_commissioner_name: assistant_commisioner.name,
          commissioner_id: commisioner.id,
          commissioner_name: commisioner.name,
          zone_name: zones_data[index].zoneName,
          zoneId: zones_data[index].id,
          zoneCode: zones_data[index].ZoneCode,
          station_incharge_id: inspector.id,
          station_incharge_name: inspector.name,
        });

        const crime_count: StationCrimeCountType = {
          stationId: station.id ?? "",
          id: customFaker.string.uuid().replace(/-/g, ""),
          Theft: customFaker.number.int({ min: 0, max: 10 }),
          Robbery: customFaker.number.int({ min: 0, max: 10 }),
          Assault: customFaker.number.int({ min: 0, max: 10 }),
          Burglary: customFaker.number.int({ min: 0, max: 10 }),
          Fraud: customFaker.number.int({ min: 0, max: 10 }),
          Murder: customFaker.number.int({ min: 0, max: 10 }),
          SexualAssault: customFaker.number.int({ min: 0, max: 10 }),
          DrugTrafficking: customFaker.number.int({ min: 0, max: 10 }),
          Cybercrime: customFaker.number.int({ min: 0, max: 10 }),
          Kidnapping: customFaker.number.int({ min: 0, max: 10 }),
          MoneyLaundering: customFaker.number.int({ min: 0, max: 10 }),
          Bribery: customFaker.number.int({ min: 0, max: 10 }),
          Stalking: customFaker.number.int({ min: 0, max: 10 }),
          DomesticViolence: customFaker.number.int({ min: 0, max: 10 }),
          IdentityTheft: customFaker.number.int({ min: 0, max: 10 }),
          Counterfeiting: customFaker.number.int({ min: 0, max: 10 }),
          Harassment: customFaker.number.int({ min: 0, max: 10 }),
        };

        station_crime_data.push(crime_count);

        inspector.stationId = station.id;
        inspector_data.push(inspector);
        tempStationStafflist.push(inspector);
        stations_data.push(station);

        // generating 10 vehicles per station
        for (let k = 0; k < 20; k++) {
          const vehicle: VehicleType = {
            color: customFaker.vehicle.color(),
            chasis_no: customFaker.vehicle.vin(),
            fuel_type: customFaker.vehicle.fuel(),
            manufacturer: customFaker.vehicle.manufacturer(),
            name: customFaker.vehicle.vehicle(),
            station_id: station.id ?? "",
            vehicle_model: customFaker.vehicle.model(),
            vehicle_registration_no: customFaker.vehicle.vrm(),
            vehicle_type: customFaker.vehicle.type(),
            vin: customFaker.vehicle.vin(),
            id: customFaker.string.uuid().replace(/-/g, ""),
          };
          vehicle_data.push(vehicle);
        }

        // generate sub inspectors data
        for (let l = 0; l < 5; l++) {
          const sub_inspector: UserModel = generateRandomUserData({
            post: "Sub Inpector",
            reporting_officer_id: inspector.id ?? "",
            reporting_officer_name: inspector.name,
            stationId: inspector.stationId,
            superiors_list: [...inspector.superiors_list!, inspector.id!],
          });

          sub_inspector_data.push(sub_inspector);
          tempStationStafflist.push(sub_inspector);

          for (let m = 0; m < 5; m++) {
            const head_constable = generateRandomUserData({
              post: "Head Constable",
              reporting_officer_id: sub_inspector.id,
              reporting_officer_name: sub_inspector.name,
              stationId: station.id,
              superiors_list: [
                ...sub_inspector.superiors_list!,
                sub_inspector.id!,
              ],
            });

            head_constable_data.push(head_constable);
            tempStationStafflist.push(head_constable);

            for (let n = 0; n < 5; n++) {
              const constable = generateRandomUserData({
                post: "Constable",
                reporting_officer_id: head_constable.id,
                reporting_officer_name: head_constable.name,
                stationId: head_constable.stationId,
                superiors_list: [
                  ...head_constable.superiors_list!,
                  head_constable.id!,
                ],
              });
              constable_data.push(constable);
              tempStationStafflist.push(constable);
            }
          }
        }

        // generating weapons data
        for (let o = 0; o < 20; o++) {
          const temp = getRandomElementFromArray(weaponData);
          const user = getRandomElementFromArray(tempStationStafflist);

          const weapon: WeaponType = {
            name: temp.name,
            weapon_type: temp.weapon_type,
            id: customFaker.string.uuid().replace(/-/g, ""),
            last_used_date: customFaker.date
              .between({ from: "2023-01-01", to: "2024-01-01" })
              .toLocaleDateString(),
            owner_id: user.id,
            owner_name: user.name,
            owner_post: user.post,
            station_id: user.stationId ?? "",
          };
          weapons_data.push(weapon);
        }

        // fir data
        for (let p = 0; p < 30; p++) {
          const user1 = getRandomElementFromArray(tempStationStafflist);
          const user2 = getRandomElementFromArray(tempStationStafflist);
          const user3 = getRandomElementFromArray(tempStationStafflist);
          const user4 = getRandomElementFromArray(tempStationStafflist);
          const temp = getRandomElementFromArray(fir_dataset);

          const fir: FIRRecord = {
            ...temp,
            id: customFaker.string.uuid().replace(/-/g, ""),
            stationId: station.id,
            allotedTo: [
              {
                name: user1.name,
                id: user1.id ?? "",
                post: user1.post,
              },
              {
                name: user2.name,
                id: user2.id ?? "",
                post: user2.post,
              },
              {
                name: user3.name,
                id: user3.id ?? "",
                post: user3.post,
              },
              {
                name: user4.name,
                id: user4.id ?? "",
                post: user4.post,
              },
            ],
          };

          fir_data.push(fir);
        }
      }
    }
  }

  return {
    station_crime_data,
    station_dept_data,
    fir_data,
    commisioner_data,
    assistant_commisioner_data,
    zones_data,
    inspector_data,
    sub_inspector_data,
    head_constable_data,
    stations_data,
    constable_data,
    vehicle_data,
    weapons_data,
  };
};
