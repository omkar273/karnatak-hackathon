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
import {GridLoader} from "react-spinners";
import TaskModel from "@/types/task_model";
import useGetTasks from "@/fragments/tasks/utils/use_get_all_tasks.ts";
import {Link} from "react-router-dom";

const taskColumns: ColumnDef<TaskModel>[] = [
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "task_type",
		header: "Task Type",
	},
	{
		accessorKey: "due_date",
		header: "Due Date",
		cell: ({row}) => {
			const date = new Date(row.getValue("due_date"));
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "alloted_date_time",
		header: "Alloted Date & Time",
		cell: ({row}) => {
			const date = new Date(row.getValue("alloted_date_time"));
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "assigned_by_name",
		header: "Assigned By",
	},
	{
		id: "actions",
		enableHiding: false,
		header: "Actions",
		cell: ({row}) => {
			const task = row.original;
			
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
							onClick={() => navigator.clipboard.writeText(task.id ?? "")}
						>
							Copy task ID
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						<DropdownMenuItem>
							<Link to={`/tasks/details?id=${task.id}`}>
								View details
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const TaskTable = ({userId, role}: { userId: string, role: "alloted_by_user" | "alloted_to_user" }) => {
	const {tasks, error, loading, fetchTasks} = useGetTasks({
		userId,
		role,
		initialLimit: 10,
	});
	
	useEffect(() => {
		fetchTasks();
	}, [userId, role]);
	
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	
	const table = useReactTable<TaskModel>({
		data: tasks,
		columns: taskColumns,
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
		return (
			<div className="h-screen w-full flex justify-center items-center">
				<GridLoader color="#0891B2" size={25}/>
			</div>
		);
	}
	
	if (error) {
		console.log(error)
		return (
			<div className="h-screen w-full flex justify-center items-center">
				{error.message}
			</div>
		);
	}
	
	return (
		<div className="w-full bg-white p-4 rounded-md">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter tasks..."
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
								<TableCell colSpan={taskColumns.length} className="h-24 text-center">
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

export default TaskTable;
