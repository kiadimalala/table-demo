"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  TableMeta,
  useReactTable,
  Column,
} from "@tanstack/react-table";
import { RowSelectionState } from "@tanstack/react-table";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
  FilterIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
//import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import PaginationComponents from "./PaginationComponents";
import { useTranslations } from "next-intl";

export interface Pagination {
  total: number;
  hasMore: boolean;
}

interface DataTableProps<TData, TValue, TMeta> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  meta?: TMeta;
  pagination?: Pagination;
  totalFilter?: number;
  //fetchManagers?: (query?: FetchQuery) => Promise<ActionResponse<UserModel[]>>;
}

function DataTable<TData, TValue, TMeta>({
  columns,
  data = [],
  meta,
  pagination,
  totalFilter,
}: //fetchManagers,
DataTableProps<TData, TValue, TMeta>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const t = useTranslations("Common.loading");

  const DEFAULT_PAGE_SIZE = 100;

  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");
  const sortParam = searchParams.get("sort");
  const orderParam = searchParams.get("order");

  const pageIndex = pageParam ? Math.max(0, parseInt(pageParam, 10) - 1) : 0;
  const pageSize = pageSizeParam
    ? parseInt(pageSizeParam, 10)
    : DEFAULT_PAGE_SIZE;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    if (sortParam && orderParam) {
      setSorting([{ id: sortParam, desc: orderParam === "desc" }]);
    }
  }, [sortParam, orderParam]);

  useEffect(() => {
    if (!pageParam || !pageSizeParam) {
      const params = new URLSearchParams(searchParams);

      if (!pageParam) {
        params.set("page", "1");
      }

      if (!pageSizeParam) {
        params.set("pageSize", String(DEFAULT_PAGE_SIZE));
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    } else {
      setIsInitialized(true);
    }
  }, [pageParam, pageSizeParam, router, searchParams]);

  const table = useReactTable({
    meta: { data: meta } as TableMeta<TData, TMeta>,
    data,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: (updaterOrValue) => {
      let newSorting: SortingState = [];
      if (typeof updaterOrValue === "function") {
        newSorting = updaterOrValue(sorting);
      } else {
        newSorting = updaterOrValue;
      }

      setSorting(newSorting);

      const params = new URLSearchParams(searchParams.toString());
      if (newSorting.length > 0) {
        params.set("sort", newSorting[0].id);
        params.set("order", newSorting[0].desc ? "desc" : "asc");
      } else {
        params.delete("sort");
        params.delete("order");
      }
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    },
  });

  const handlePaginationChange = useCallback(
    (newPageIndex: number, newPageSize: number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", String(newPageIndex + 1));
      params.set("pageSize", String(newPageSize));

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Handle pagination changes from the table controls
  useEffect(() => {
    if (!isInitialized) return;

    const currentPageIndex = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;

    // Only update URL if values are different from the URL parameters
    if (currentPageIndex !== pageIndex || currentPageSize !== pageSize) {
      handlePaginationChange(currentPageIndex, currentPageSize);
    }
  }, [isInitialized, handlePaginationChange, pageIndex, pageSize, table]);

  const getSortIcon = (column: Column<TData, unknown>) => {
    const sortDirection = column.getIsSorted();

    if (sortDirection === "desc") {
      return <ArrowDownIcon className="h-4 w-4" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUpIcon className="h-4 w-4" />;
    }

    return <ArrowUpDownIcon className="h-4 w-4 opacity-50" />;
  };

  // Calculate pagination values
  const totalRows = data.length;

  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key, value]) =>
      key !== "page" &&
      key !== "pageSize" &&
      key !== "sort" &&
      key !== "order" &&
      value.trim() !== ""
  );

  const hasNextPage = pagination?.hasMore ?? false;
  const hasPrevPage = pageIndex > 0;
  const currentPage = pageIndex + 1;

  if (!isInitialized) {
    return (
      <div className="rounded-md border">
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t("loading")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center text-xs font-semibold text-muted-foreground">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
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
                  key={(row.original as { id: string }).id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-xs" key={cell.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationComponents
        dataCount={totalRows}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        handlePaginationChange={handlePaginationChange}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
}

export default DataTable;
