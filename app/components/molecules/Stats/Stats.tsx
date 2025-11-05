import React from "react";
import { Badge } from "@/app/components/ui/badge";
import { DeclarationModel } from "@/core/domain/models/declaration.model";

export type StatsProps = {
  data: DeclarationModel[];
};

const Stats = ({ data }: StatsProps) => {
  const stats = {
    toBeConfigured: (data || []).filter((d) => d.status === "ToDo").length,
    toDeclare: (data || []).filter((d) => d.status === "ToDeclare").length,
    inProgress: (data || []).filter((d) => d.reportStatus === "Open").length,
    acceptedAwaitingPayment: (data || []).filter(
      (d) => d.status === "Accepted" && d.taxPayment === "ToDo"
    ).length,
    acceptedAndPaid: (data || []).filter(
      (d) => d.status === "Accepted" && d.taxPayment === "Accepted"
    ).length,
    late: (data || []).filter(
      (d) =>
        new Date(d.internalDeadline) < new Date() && d.status !== "Accepted"
    ).length,
    declarationRefused: (data || []).filter((d) => d.status === "Rejected")
      .length,
    paymentRefused: (data || []).filter((d) => d.taxPayment === "Rejected")
      .length,
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        À configurer{" "}
        <span className="ml-2 bg-gray-400/70 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.toBeConfigured}
        </span>
      </Badge>
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        À déclarer{" "}
        <span className="ml-2 bg-blue-400/80 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.toDeclare}
        </span>
      </Badge>
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        En cours{" "}
        <span className="ml-2 bg-blue-400/80 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.inProgress}
        </span>
      </Badge>
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        Acceptée, en attente de paiement{" "}
        <span className="ml-2 bg-red-400/70 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.acceptedAwaitingPayment}
        </span>
      </Badge>
      <Badge
        variant="secondary"
        className="px-3 py-1.5 bg-green-50 text-green-700 border-green-200 font-normal"
      >
        ✓ Acceptée et payée{" "}
        <span className="ml-2 bg-green-400/70 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.acceptedAndPaid}
        </span>
      </Badge>
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        En retard{" "}
        <span className="ml-2 bg-red-400/70 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.late}
        </span>
      </Badge>
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        Déclaration refusée{" "}
        <span className="ml-2 bg-red-400/70 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.declarationRefused}
        </span>
      </Badge>
      <Badge variant="secondary" className="px-3 py-1.5 font-normal">
        Paiement refusé{" "}
        <span className="ml-2 bg-red-400/70 text-white rounded-full px-2 py-0.5 text-xs  w-5 h-5 flex items-center justify-center font-semibold">
          {stats.paymentRefused}
        </span>
      </Badge>
    </div>
  );
};

export default Stats;
