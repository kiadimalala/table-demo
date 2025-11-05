import React from "react";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PaginationComponentsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  pageIndex: number;
  pageSize: number;
  handlePaginationChange: (pageIndex: number, pageSize: number) => void;
  dataCount: number;
  totalCount: number;
};

export const PaginationComponents = ({
  pageIndex,
  pageSize,
  handlePaginationChange,
  hasNextPage,
  hasPrevPage,
  currentPage,
  dataCount,
  totalCount,
}: PaginationComponentsProps) => {
  const startRow = dataCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = startRow + dataCount - 1;

  const estimatedTotalPages = totalCount
    ? Math.ceil(totalCount / pageSize)
    : hasNextPage
    ? currentPage + 5 // Estimate at least 5 more pages if hasNextPage
    : currentPage;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (estimatedTotalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= estimatedTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push("ellipsis-end");
      } else if (currentPage >= estimatedTotalPages - 2) {
        // Near the end
        pages.push("ellipsis-start");
        for (
          let i = estimatedTotalPages - maxVisiblePages + 1;
          i <= estimatedTotalPages;
          i++
        ) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("ellipsis-start");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis-end");
      }
    }

    return pages;
  };

  const handleEllipsisClick = (direction: "start" | "end") => {
    if (direction === "start") {
      // Go back 5 pages
      const targetPage = Math.max(1, currentPage - 5);
      handlePaginationChange(targetPage - 1, pageSize);
    } else {
      // Go forward 5 pages
      const targetPage = currentPage + 5;
      handlePaginationChange(targetPage - 1, pageSize);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="p-4 border-t flex items-center justify-between bg-gray-50">
      <div className="text-sm text-gray-600">{pageSize} éléments par page</div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {startRow}-{endRow} {dataCount ? `sur ${dataCount}` : ""}
        </span>

        <div className="flex gap-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={() => handlePaginationChange(pageIndex - 1, pageSize)}
            disabled={!hasPrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {pageNumbers.map((page, idx) => {
            if (page === "ellipsis-start") {
              return (
                <Button
                  key={`ellipsis-start-${idx}`}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => handleEllipsisClick("start")}
                >
                  ...
                </Button>
              );
            }

            if (page === "ellipsis-end") {
              return (
                <Button
                  key={`ellipsis-end-${idx}`}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => handleEllipsisClick("end")}
                >
                  ...
                </Button>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`w-8 h-8 p-0 ${
                  isActive ? "bg-teal-700 hover:bg-teal-800" : ""
                }`}
                onClick={() => handlePaginationChange(pageNumber - 1, pageSize)}
              >
                {pageNumber}
              </Button>
            );
          })}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={() => handlePaginationChange(pageIndex + 1, pageSize)}
            disabled={!hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponents;
