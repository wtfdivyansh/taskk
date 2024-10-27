"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

   return (
     <div className="rounded-md p-3 ">
       <Table>
         <TableHeader className="bg-neutral-950 rounded-md border-neutral-700/[0.2]">
           {table.getHeaderGroups().map((headerGroup) => (
             <TableRow key={headerGroup.id}>
               {headerGroup.headers.map((header) => {
                 return (
                   <TableHead key={header.id} >
                     {header.isPlaceholder
                       ? null
                       : flexRender(
                           header.column.columnDef.header,
                           header.getContext()
                         )}
                   </TableHead>
                 );
               })}
             </TableRow>
           ))}
         </TableHeader>
         <TableBody className="bg-neutral-900/50 rounded-b-lg">
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
               <TableCell colSpan={columns.length} className="h-24 text-center">
                 No results.
               </TableCell>
             </TableRow>
           )}
         </TableBody>
       </Table>
     </div>
   );
}
