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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {GridLoader} from "react-spinners";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import updateFirebaseDocument from "@/utils/update_doc.ts";
import {toast} from "react-toastify";
import LeaveApplicationModel from "@/types/leave_application_type.ts";


const LeaveApplicationTable = ({leaveApplications}: {
	leaveApplications: LeaveApplicationModel[]
}) => {
	const [leaveData, setLeaveData] = useState(leaveApplications);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const {userdata} = useSelector((s: RootState) => s.auth);
	
	useEffect(() => {
		setLeaveData(leaveApplications);
	}, [leaveApplications]);
	
	
	const canApprove = (userId: string, send_to_id: string[]): boolean => {
		for (const superiorId of send_to_id) {
			if (superiorId === userId) {
				return true;
			}
		}
		return false;
	}
	
	const leaveColumns: ColumnDef<LeaveApplicationModel>[] = [
		{
			accessorKey: "requested_by_name",
			header: "Requested By",
		},
		{
			accessorKey: "start_date",
			header: "Start Date",
		},
		{
			accessorKey: "end_date",
			header: "End Date",
		},
		{
			accessorKey: "reason",
			header: "Reason",
		},
		{
			accessorKey: "leave_type",
			header: "Leave Type",
		},
		{
			accessorKey: "leave_status",
			header: "Status",
			cell: ({row}) => {
				const leave = row.original;
				if (canApprove(userdata?.id || '', leave.send_to_id)) {
					return (
						<Select
							onValueChange={(newStatus) => {
								updateFirebaseDocument('leave_applications', leave.id || '', {
									leave_status: newStatus
								});
								// handleStatusChange(leave.id!, newStatus);
								toast.success(`Leave status updated to ${newStatus}`);
							}}
							defaultValue={leave.leave_status || ""}
						>
							<SelectTrigger className="w-full p-2 border rounded">
								<SelectValue placeholder="Select status"/>
							</SelectTrigger>
							<SelectContent className="overflow-hidden bg-white rounded-md shadow-lg z-[110]">
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="declined">Declined</SelectItem>
								<SelectItem value="request sent">Request Sent</SelectItem>
							</SelectContent>
						</Select>
					);
				} else {
					return <span>{leave.leave_status}</span>;
				}
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({row}) => {
				const leave = row.original;
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
								onClick={() => navigator.clipboard.writeText(leave.id ?? "")}
							>
								Copy leave ID
							</DropdownMenuItem>
							<DropdownMenuSeparator/>
							<DropdownMenuItem>View details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
	
	const table = useReactTable<LeaveApplicationModel>({
		data: leaveData,
		columns: leaveColumns,
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
	
	if (!leaveApplications.length) {
		return (
			<div className="h-screen w-full flex justify-center items-center">
				<GridLoader color="#0891B2" size={25}/>
			</div>
		);
	}
	
	return (
		<div className="w-full bg-white p-4 rounded-md card">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter leave reasons..."
					value={(table.getColumn("reason")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("reason")?.setFilterValue(event.target.value)
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
								<TableCell colSpan={leaveColumns.length} className="h-24 text-center">
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

export default LeaveApplicationTable;
