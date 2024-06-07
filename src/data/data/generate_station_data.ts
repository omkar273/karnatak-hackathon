import { StationModel } from "@/fragments/station/models/station_model";
import { customFaker } from "./dummy_data";

export const generate_station_data = ({
  zone_name,
  zoneCode,
  zoneId,
  station_incharge_name,
  station_incharge_id,
  assistant_commissioner_name,
  assistant_commissioner_id,
  commissioner_name,
  commissioner_id,
}: {
  zone_name?: string;
  zoneCode?: string;
  zoneId?: string;
  station_incharge_name?: string;
  station_incharge_id?: string;
  assistant_commissioner_name?: string;
  assistant_commissioner_id?: string;
  commissioner_name?: string;
  commissioner_id?: string;
}): StationModel => {
  const latLng = customFaker.location.nearbyGPSCoordinate({
    origin: [12.971599, 77.594566],
    radius: 300,
    isMetric: true,
  });

  const temp: StationModel = {
    id: customFaker.string.uuid(),
    station_name: customFaker.location.city(),
    email: customFaker.internet.email(),
    phone: customFaker.phone.number(),
    crime_rate: customFaker.number.int({ max: 35, min: 10 }),
    crime_clearance_rate: customFaker.number.int({ max: 70, min: 40 }),
    zone_name: zone_name ?? "",
    zone_code: zoneCode ?? "",
    zoneId: zoneId ?? "",
    district: customFaker.location.city(),
    address: customFaker.location.streetAddress(),
    station_incharge_name: station_incharge_name ?? "", // inspector
    station_incharge_id: station_incharge_id ?? "",
    assistant_commissioner_name: assistant_commissioner_name ?? "",
    assistant_commissioner_id: assistant_commissioner_id ?? "",
    commissioner_name: commissioner_name ?? "",
    commissioner_id: commissioner_id ?? "",

    lat: latLng[0],
    lng: latLng[1],
  };

  return temp;
};
