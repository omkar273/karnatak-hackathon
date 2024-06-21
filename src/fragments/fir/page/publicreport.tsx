import { VSpacer } from "@/common/components/spacer.tsx";
import TextArea from "@/common/components/text_area.tsx";
import scrollToSection from "@/common/utils/scroll_to_section.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import constable_data from "@/data/json/constable_data.json";
import head_constable_data from "@/data/json/head_constable_data.json";
import inspector_data from "@/data/json/inspector_data.json";
import station_data from "@/data/json/stations_data.json";
import sub_inspector_data from "@/data/json/sub_inspector_data.json";
import NearbyUserMap from "@/fragments/fir/components/nearby_user_map.tsx";
import { StationModel } from "@/fragments/station/models/station_model.ts";
import { UserModel } from "@/fragments/user_management/models/user_model.ts";
import IncidentType from "@/types/incident_type";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import InputField from "pages/auth/components/input_field.tsx";
import { useEffect, useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";

import { haversineDistance } from "@/common/utils/generate_random_latlng.ts";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";

const getStationById = (id: string | null | undefined): StationModel | null => {
  if (id) {
    for (const station of station_data) {
      if (station.id === id) {
        return station;
      }
    }
  }
  return null;
};

const PublicIncidentReporting = () => {
  const [stationsList, setStationsList] = useState<StationModel[]>([]);
  const [stationId, setStationId] = useState<string | null>(null);
  const [nearbyUserList, setNearbyUserList] = useState<UserModel[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<IncidentType>();

  const onSubmit: SubmitHandler<IncidentType> = (data) => {
    console.log(data);
    const nearbyUsers = [
      ...inspector_data.filter((user) => user.stationId === stationId),
      ...sub_inspector_data.filter((user) => user.stationId === stationId),
      ...head_constable_data.filter((user) => user.stationId === stationId),
      ...constable_data.filter((user) => user.stationId === stationId),
    ];
    console.log(nearbyUsers.length);
    scrollToSection("nearby-police-section");
  };

  const validationOptions: RegisterOptions = {
    required: "Required",
  };

  useEffect(() => {
    setStationsList(station_data);
  }, []);

  const nearbyUserColumns: ColumnDef<UserModel>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Officer name",
    },
    {
      accessorKey: "post",
      header: "Rank",
    },
    {
      id: "distance",
      header: "Distance",
      cell: ({ row }) => {
        const user = row.original;
        const location = haversineDistance(
          getStationById(stationId)?.lat || 0,
          getStationById(stationId)?.lng || 0,
          user.lat || 0,
          user.lng || 0
        );
        return `${location} km away`;
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<UserModel>({
    data: nearbyUserList,
    columns: nearbyUserColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const sendAlerts = () => {
    const users = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original);
    console.log(users);
    toast.success(
      `Alerts sent successfully to ${users.length} selected officers`
    );
  };

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100 pb-24">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Public Incident Reporting"}
      </p>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-16 bg-white rounded shadow-md"
        >
          <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"}>
            <div>
              <label
                htmlFor={"location-select"}
                className="w-full text-[1rem] text-gray-500"
              >
                {"Select the location"}
              </label>
              <VSpacer height={5} />
              <Select
                onValueChange={(id) => {
                  const station = getStationById(id);
                  setStationId(station?.id ?? "");
                  setValue("location", {
                    lat: station?.lat ?? 0,
                    lng: station?.lng ?? 0,
                  });
                }}
              >
                <SelectTrigger className="w-full p-6">
                  <SelectValue placeholder="Select the location" />
                </SelectTrigger>
                <SelectContent id={"location-select"}>
                  {stationsList?.map((station, index) => (
                    <SelectItem key={index} value={station.id ?? ""}>
                      {station.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mb-3 text-xs text-red-600">
                {errors.location?.message}
              </p>
            </div>
            <InputField
              register={register}
              name="incident_type"
              error={errors.incident_type?.message}
              validateOptions={validationOptions}
              label="Incident Type"
            />
            <InputField
              register={register}
              name="location"
              error={errors.location?.message}
              validateOptions={{
                ...validationOptions,
                min: { value: 1, message: "Must be at least 1" },
                max: { value: 10, message: "Cannot be more than 10" },
              }}
              label="Location"
              type="number"
            />
            <InputField
              register={register}
              name="incident_reported_by"
              error={errors.incident_reported_by?.message}
              validateOptions={validationOptions}
              label="Reported By"
            />
          </div>
          <TextArea
            register={register}
            name="description"
            error={errors.description?.message}
            validateOptions={validationOptions}
            label="Description"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 p-4 bg-blue-500 text-white font-semibold text-xl rounded-md hover:bg-blue-600"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div
          className={`w-full p-4 bg-white my-4 ${
            nearbyUserList.length > 0 ? "block" : "hidden"
          }`}
          id={"nearby-police-section"}
        >
          <h1 className={"text-3xl font-semibold mb-10"}>
            Nearby Police forces
          </h1>
          <div className={"w-full grid grid-cols-2 gap-4"}>
            <div>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={nearbyUserList.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <button
                onClick={sendAlerts}
                type="button"
                className={`bg-blue-600 text-white p-4 rounded-md my-4`}
              >
                Send alerts
              </button>
            </div>
            <div className={"border-2 h-[60vh] overflow-hidden"}>
              {nearbyUserList.length > 0 && (
                <NearbyUserMap
                  userList={nearbyUserList}
                  lat={getStationById(stationId)?.lat || 0}
                  lng={getStationById(stationId)?.lng || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicIncidentReporting;
