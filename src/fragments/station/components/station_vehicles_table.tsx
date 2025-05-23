import {useEffect, useState} from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import {ChevronDown, MoreHorizontal} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import useGetAllStationWeaponsVehiclesData from '../hooks/use_get_weapons_data';
import VehicleType from "@/types/vehicle_type";
import {GridLoader} from "react-spinners";
import {Link} from "react-router-dom";

const vehicleColumns: ColumnDef<VehicleType>[] = [
	{
		accessorKey: "name",
		header: "Vehicle Name",
	},
	// {
	// 	accessorKey: "color",
	// 	header: "Color",
	// },
	// {
	// 	accessorKey: "fuel_type",
	// 	header: "Fuel Type",
	// },
	// {
	// 	accessorKey: "manufacturer",
	// 	header: "Manufacturer",
	// },
	{
		accessorKey: "chasis_no",
		header: "Chasis No",
	},
	{
		accessorKey: "vehicle_model",
		header: "Model",
	},
	{
		accessorKey: "vehicle_type",
		header: "Type",
	},
	// {
	// 	accessorKey: "vin",
	// 	header: "VIN",
	// },
	{
		accessorKey: "vehicle_registration_no",
		header: "Registration No",
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({row}) => {
			const vehicle = row.original;
			
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4"/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(vehicle.id ?? "")}
						>
							Copy vehicle ID
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						<DropdownMenuItem>
							<Link to={`/station/vehicle/details?id=${vehicle.id}`}>
								View details
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const StationVehiclesTable = ({stationId}: { stationId: string | null }) => {
	const {documents, error, loading, fetchData} = useGetAllStationWeaponsVehiclesData<VehicleType>({
		initialLimit: 5,
		data: 'vehicles',
		stationId,
	});
	
	useEffect(() => {
		fetchData();
	}, [stationId]);
	
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	
	const table = useReactTable<VehicleType>({
		data: documents,
		columns: vehicleColumns,
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
	
	if (loading) {
		return (<div className="h-screen w-full flex justify-center items-center">
			<GridLoader
				color="#0891B2"
				size={25}
			/>
		</div>)
	}
	
	if (error) {
		return (<div className="h-screen w-full flex justify-center items-center">
			{error.message}
		</div>)
	}
	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter vehicle names..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4"/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
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
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={vehicleColumns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
					selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StationVehiclesTable;
