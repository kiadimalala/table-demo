import ConnectedDeclarationTable from "@/app/components/connected/ConnectedDeclarationTable/ConnectedDeclarationTable";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import React, { useMemo } from "react";

const HomePage = () => {
  const stats = useMemo(
    () => ({
      toBeConfigured: 5,
      toDeclare: 2,
      inProgress: 14,
      acceptedAwaitingPayment: 8,
      acceptedAndPaid: 32,
      late: 1,
      declarationRefused: 0,
      paymentRefused: 0,
    }),
    []
  );
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
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            À configurer{" "}
            <span className="ml-2 bg-gray-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.toBeConfigured}
            </span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            À déclarer{" "}
            <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.toDeclare}
            </span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            En cours{" "}
            <span className="ml-2 bg-orange-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.inProgress}
            </span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            Acceptée, en attente de paiement{" "}
            <span className="ml-2 bg-yellow-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.acceptedAwaitingPayment}
            </span>
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 py-1.5 bg-green-50 text-green-700 border-green-200 font-normal"
          >
            ✓ Acceptée et payée{" "}
            <span className="ml-2 bg-green-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.acceptedAndPaid}
            </span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            En retard{" "}
            <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.late}
            </span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            Déclaration refusée{" "}
            <span className="ml-2 bg-gray-400 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.declarationRefused}
            </span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 font-normal">
            Paiement refusé{" "}
            <span className="ml-2 bg-gray-400 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              {stats.paymentRefused}
            </span>
          </Badge>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Trouver un client" className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <span>☰</span> Forme <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            Comptable <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            Fréquence <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            Échéance <ChevronDown className="w-4 h-4" />
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-600">Mode analytique</span>
            <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform shadow"></div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ConnectedDeclarationTable />
      </section>
    </main>
  );
};

export default HomePage;
