import ConnectedDeclarationTable from "@/app/components/connected/ConnectedDeclarationTable/ConnectedDeclarationTable";

import { Button } from "@/app/components/ui/button";

import React from "react";

const HomePage = async ({ searchParams }: RouteQuery) => {
  const { page, pageSize, filters, search } = await searchParams;

  return (
    <main className="h-screen w-full flex flex-col gap-6 p-6">
      <div className="">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Suivi des Déclarations
        </h1>
        <div className="flex gap-1 mb-6 border-b">
          <Button
            variant="ghost"
            className="text-gray-600 rounded-none hover:bg-gray-50"
          >
            TVA
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 rounded-none hover:bg-gray-50"
          >
            Acompte IS
          </Button>
          <Button
            variant="ghost"
            className="text-teal-700 border-b-2 border-teal-700 rounded-none hover:bg-gray-50 font-medium"
          >
            Suivi de clôture
          </Button>
        </div>
      </div>
      <section>
        <ConnectedDeclarationTable
          searchParams={{
            page,
            pageSize,
            filters,
            search,
          }}
        />
      </section>
    </main>
  );
};

export default HomePage;
