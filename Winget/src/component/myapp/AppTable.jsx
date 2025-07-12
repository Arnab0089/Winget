import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function AppTable({ data }) {
  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Version',
        accessorKey: 'version',
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white dark:bg-[#0e0e1c] rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-600 dark:text-gray-200 uppercase text-xs">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 border-b border-gray-300 dark:border-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className={`transition-colors ${
                i % 2 === 0
                  ? 'bg-white dark:bg-[#121221]'
                  : 'bg-gray-50 dark:bg-[#19192a]'
              } hover:bg-gray-100 dark:hover:bg-[#252538]`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
