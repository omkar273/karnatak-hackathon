import {useEffect, useState} from "react";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select"; // Ensure you have these components
import {GridLoader} from "react-spinners";

import station_data from '@/data/json/stations_data.json';
import {EventModel} from "@/types/event_type.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import {RanksEnum} from "@/common/post/ranks.ts";
import updateFirebaseDocument from "@/utils/update_doc.ts";
import {toast} from "react-toastify";


const EventDataTable = ({events}: { events: EventModel[] }) => {
	const [eventData, setEventData] = useState(events);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	
	useEffect(() => {
		setEventData(events);
	}, [events]);
	
	const {userdata} = useSelector((s: RootState) => s.auth)
	
	
	const handleStationChange = (eventId: string, newStationId: string) => {
		setEventData(prevData =>
			prevData.map(event =>
				event.id === eventId ? {...event, stationId: newStationId} : event
			)
		);
	};
	
	const eventColumns: ColumnDef<EventModel>[] = [
		// {
		// 	accessorKey: "description",
		// 	header: "Description",
		// },
		{
			accessorKey: "start_date",
			header: "Start Date",
		},
		{
			accessorKey: "end_date",
			header: "End Date",
		},
		{
			accessorKey: "start_timing",
			header: "Start Timing",
		},
		{
			accessorKey: "end_timing",
			header: "End Timing",
		},
		{
			accessorKey: "no_people_gathering",
			header: "No. of People Gathering",
		},
		{
			accessorKey: "venue",
			header: "Venue",
		},
		{
			accessorKey: "event_head_name",
			header: "Event Head Name",
		},
		{
			accessorKey: "event_head_phone",
			header: "Event Head Phone",
		},
		{
			accessorKey: "event_head_email",
			header: "Event Head Email",
		},
		{
			accessorKey: "stationId",
			header: "Assign Station",
			cell: ({row}) => {
				const event = row.original;
				console.log(userdata?.post)
				if (userdata?.post === RanksEnum.Admin) {
					return (
						<Select
							onValueChange={(newStationId) => {
								updateFirebaseDocument('events', event.id || '', {
									stationId: newStationId
								})
								handleStationChange(event.id!, newStationId)
								toast.success('Station Assigned successfully')
							}}
							defaultValue={event.stationId || ""}
						>
							<SelectTrigger className="w-full p-2 border rounded">
								<SelectValue placeholder="Select a station"/>
							</SelectTrigger>
							<SelectContent className="overflow-hidden bg-white rounded-md shadow-lg z-[110]">
								{station_data.map((station) => (
									<SelectItem key={station.id} value={station.id}>
										{station.address}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)
				} else {
					return (
						<span>
							{event.id}
						</span>);
				}
				
				
			}
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({row}) => {
				const event = row.original;
				
				if (userdata?.post === RanksEnum.Inspector || userdata?.post === RanksEnum.Commisioner || userdata?.post === RanksEnum.Admin || userdata?.post === RanksEnum.AssistantCommisioner) {
					return (
						<Select
							onValueChange={(status) => {
								updateFirebaseDocument('events', event.id || '', {
									status
								})
								toast.success(`Even permission ${status} `)
							}}
							defaultValue={event.status || ""}
						>
							<SelectTrigger className="w-full p-2 border rounded">
								<SelectValue placeholder="Approve/Decline"/>
							</SelectTrigger>
							<SelectContent className="overflow-hidden bg-white rounded-md shadow-lg z-[110]">
								
								<SelectItem value={'Approve'}>
									Approve
								</SelectItem>
								
								<SelectItem value={'Decline'}>
									Decline
								</SelectItem>
								
							</SelectContent>
						</Select>
					)
				} else {
					return (
						<span>
							{event.id}
						</span>);
				}
			}
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({row}) => {
				const event = row.original;
				
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
								onClick={() => navigator.clipboard.writeText(event.id ?? "")}
							>
								Copy event ID
							</DropdownMenuItem>
							<DropdownMenuSeparator/>
							<DropdownMenuItem>View details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
	
	const table = useReactTable<EventModel>({
		data: eventData,
		columns: eventColumns,
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
	
	if (!events.length) {
		return (
			<div className="h-screen w-full flex justify-center items-center">
				<GridLoader color="#0891B2" size={25}/>
			</div>
		);
	}
	
	return (
		<div className="w-full bg-white p-4 rounded-md card ">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter event descriptions..."
					value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("description")?.setFilterValue(event.target.value)
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
								<TableCell colSpan={eventColumns.length} className="h-24 text-center">
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

export default EventDataTable;
