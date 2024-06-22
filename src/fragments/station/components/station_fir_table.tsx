import {useEffect, useState} from 'react';
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
import useGetAllFIRs from "@/fragments/fir/hooks/use_getall_fir";
import {FirModel} from "@/fragments/fir/modals/fir_modal";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
	DropdownMenu, DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ChevronDown, MoreHorizontal} from "lucide-react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const firColumns: ColumnDef<FirModel>[] = [
	{
		id: "actions",
		header: "Actions",
		enableHiding: false,
		cell: ({row}) => {
			const fir = row.original;
			
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
							onClick={() => {
								navigator.clipboard.writeText(fir.id ?? "")
								toast.success('Fir Id copied to clipboard')
							}}
						>
							Copy FIR ID
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						<DropdownMenuItem>
							<Link to={`/fir/details?id=${fir.id}`}>
								View details
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		accessorKey: "FIRNo",
		header: "FIR No",
	},
	{
		accessorKey: "District_Name",
		header: "District",
	},
	{
		accessorKey: "UnitName",
		header: "Unit",
	},
	{
		accessorKey: "RI",
		header: "RI",
	},
	// {
	// 	accessorKey: "Year",
	// 	header: "Year",
	// },
	// {
	// 	accessorKey: "Month",
	// 	header: "Month",
	// },
	// {
	// 	accessorKey: "Offence_From_Date",
	// 	header: "Offence From",
	// },
	// {
	// 	accessorKey: "Offence_To_Date",
	// 	header: "Offence To",
	// },
	{
		accessorKey: "FIR_Reg_DateTime",
		header: "Registration DateTime",
	},
	{
		accessorKey: "FIR_Date",
		header: "FIR Date",
	},
	{
		accessorKey: "FIR_Type",
		header: "Type",
	},
	{
		accessorKey: "FIR_Stage",
		header: "Stage",
	},
	// {
	// 	accessorKey: "Complaint_Mode",
	// 	header: "Complaint Mode",
	// },
	{
		accessorKey: "CrimeGroup_Name",
		header: "Crime Group",
	},
	{
		accessorKey: "CrimeHead_Name",
		header: "Crime Head",
	},
	// {
	// 	accessorKey: "Place_of_Offence",
	// 	header: "Place of Offence",
	// },
	// {
	// 	accessorKey: "Distance_from_PS",
	// 	header: "Distance from PS",
	// },
	{
		accessorKey: "Beat_Name",
		header: "Beat Name",
	},
	// {
	// 	accessorKey: "Village_Area_Name",
	// 	header: "Village/Area Name",
	// },
	// {
	// 	accessorKey: "Male",
	// 	header: "Male Victims",
	// },
	// {
	// 	accessorKey: "Female",
	// 	header: "Female Victims",
	// },
	// {
	// 	accessorKey: "Boy",
	// 	header: "Boy Victims",
	// },
	// {
	// 	accessorKey: "Girl",
	// 	header: "Girl Victims",
	// },
	// {
	// 	accessorKey: "Age",
	// 	header: "Age",
	// },
	// {
	// 	accessorKey: "VICTIM_COUNT",
	// 	header: "Victim Count",
	// },
	// {
	// 	accessorKey: "Accused_Count",
	// 	header: "Accused Count",
	// },
	// {
	// 	accessorKey: "Arrested_Male",
	// 	header: "Arrested Male",
	// },
	// {
	// 	accessorKey: "Arrested_Female",
	// 	header: "Arrested Female",
	// },
	// {
	// 	accessorKey: "Arrested_Count_No",
	// 	header: "Arrested Count",
	// },
	// {
	// 	accessorKey: "Accused_ChargeSheeted_Count",
	// 	header: "ChargeSheeted Count",
	// },
	// {
	// 	accessorKey: "Conviction_Count",
	// 	header: "Conviction Count",
	// },
	{
		accessorKey: "fir_status",
		header: "FIR Status",
	},

];

const StationFirTable = ({stationId}: { stationId: string | null }) => {
	const {documents, fetchFIRs, loading, error, hasMore} = useGetAllFIRs({stationId});
	
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	
	const table = useReactTable<FirModel>({
		data: documents,
		columns: firColumns,
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
	
	useEffect(() => {
		fetchFIRs();
	}, [stationId]);
	
	useEffect(() => {
		console.log(documents);
	}, [documents]);
	
	
	const handleFilterByStatus = (status: string | null) => {
		if (status) {
			setColumnFilters([
				...columnFilters.filter(filter => filter.id !== "fir_status"),
				{id: "fir_status", value: status},
			]);
		} else {
			setColumnFilters(columnFilters.filter(filter => filter.id !== "fir_status"));
		}
	};
	
	return (
		<div className="p-4 rounded-md my-2">
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			
			<div className="w-full">
				<div className="flex items-center py-4 gap-4">
					<Input
						placeholder="Filter FIR No..."
						value={(table.getColumn("FIRNo")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("FIRNo")?.setFilterValue(event.target.value)
						}
						className="w-full"
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
					
					<DropdownMenu>
						
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Status <ChevronDown className="ml-2 h-4 w-4"/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => handleFilterByStatus(null)}>
								All
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleFilterByStatus("open")}>
								Open
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleFilterByStatus("closed")}>
								Closed
							</DropdownMenuItem>
						
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
									<TableCell colSpan={firColumns.length} className="h-24 text-center">
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
						
						{hasMore && !loading && (<Button
							variant="outline"
							size="sm"
							onClick={() => fetchFIRs(true)}
						>
							Load more
						</Button>)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StationFirTable;
