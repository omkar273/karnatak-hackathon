/* eslint-disable @typescript-eslint/no-unused-vars */

import commisioner_data from "@/data/json/commisioner_data.json";
import assistant_commisioner_data from "@/data/json/assistant_commisioner_data.json";
import inspector_data from "@/data/json/inspector_data.json";
import sub_inspector_data from "@/data/json/sub_inspector_data.json";
import head_constable_data from "@/data/json/head_constable_data.json";
import constable_data from "@/data/json/constable_data.json";
import admin_data from "@/data/json/constable_data.json";

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

import { UserModel } from "@/fragments/user_management/models/user_model";

const loginData: {
  email: string;
  data: UserModel;
  username: string;
}[] = [
  {
    email: "nikyalokhande@gmail.com",
    data: admin_data[0],
    username: "admin",
  },
  {
    email: "jiteshjawale123@gmail.com",
    data: commisioner_data[0],
    username: "commisioner",
  },
  // {
  //   email: "jiteshjawale1234@gmail.com",
  //   data: commisioner_data[1],
  //   username: "commisioner1",
  // },
  {
    email: "itzsramlok@gmail.com",
    data: assistant_commisioner_data[0],
    username: "assistant_commisioner",
  },
  {
    email: "nisargalokhande09@gmail.com",
    data: assistant_commisioner_data[1],
    username: "assistant_commisioner2",
  },

  {
    email: "jeetjawale.99@gmail.com",
    data: inspector_data[0],
    username: "inspector1",
  },
  {
    email: "omkarsonawane.dev@gmail.com",
    data: inspector_data[1],
    username: "inspector2",
  },
  {
    email: "nisargalokhande@gmail.com",
    data: sub_inspector_data[0],
    username: "sub_inspector1",
  },
  {
    email: "desno.pvt.ltd@gmail.com",
    data: sub_inspector_data[1],
    username: "sub_inspector2",
  },
  {
    email: "omkarsonawane.comp@siem.org.in",
    data: head_constable_data[0],
    username: "head_constable1",
  },
  {
    email: "jiteshjawale1235@gmail.com",
    data: head_constable_data[1],
    username: "head_constable2",
  },
  {
    email: "omkarsonawane6221@gmail.com",
    data: constable_data[0],
    username: "constable1",
  },
  {
    email: "omkarsonawane622@gmail.com",
    data: constable_data[1],
    username: "constable2",
  },
];

export default loginData;
