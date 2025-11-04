import React from "react";

import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";

export type PaginationComponentsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  pageIndex: number;
  pageSize: number;
  handlePaginationChange: (pageIndex: number, pageSize: number) => void;
  dataCount: number;
};

export const PaginationComponents = ({
  pageIndex,
  pageSize,
  handlePaginationChange,
  hasNextPage,
  hasPrevPage,
  currentPage,
  dataCount,
}: PaginationComponentsProps) => {
  const startRow = dataCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = startRow + dataCount - 1;

  return (
    <div className="flex items-center justify-end space-x-3 py-4">
      {dataCount > 0 && (
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Lignes {startRow} - {endRow}
          </div>
          <Separator className="h-5" orientation="vertical" />
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
          </div>
          <Separator className="h-5" orientation="vertical" />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handlePaginationChange(pageIndex - 1, pageSize);
              }}
              disabled={!hasPrevPage}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handlePaginationChange(pageIndex + 1, pageSize);
              }}
              disabled={!hasNextPage}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationComponents;
