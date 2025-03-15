import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
} from "lucide-react";

interface TruckStatus {
  id: string;
  name: string;
  model: string;
  status: "ready" | "maintenance" | "pending";
  lastInspection: string;
  driver?: string;
}

interface NotificationPanelProps {
  trucks?: TruckStatus[];
  onSelectTruck?: (truck: TruckStatus) => void;
}

const NotificationPanel = ({
  trucks = [
    {
      id: "truck-001",
      name: "Freightliner Cascadia",
      model: "2023",
      status: "ready",
      lastInspection: "2023-10-15",
      driver: "John Doe",
    },
    {
      id: "truck-002",
      name: "Peterbilt 579",
      model: "2022",
      status: "maintenance",
      lastInspection: "2023-10-10",
    },
    {
      id: "truck-003",
      name: "Kenworth T680",
      model: "2023",
      status: "pending",
      lastInspection: "2023-10-14",
    },
    {
      id: "truck-004",
      name: "Volvo VNL 860",
      model: "2022",
      status: "ready",
      lastInspection: "2023-10-12",
      driver: "Jane Smith",
    },
    {
      id: "truck-005",
      name: "Mack Anthem",
      model: "2021",
      status: "ready",
      lastInspection: "2023-10-13",
      driver: "Mike Johnson",
    },
  ],
  onSelectTruck = () => {},
}: NotificationPanelProps) => {
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);

  const handleSelectTruck = (truck: TruckStatus) => {
    setSelectedTruckId(truck.id);
    onSelectTruck(truck);
  };

  const getStatusIcon = (status: TruckStatus["status"]) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "maintenance":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: TruckStatus["status"]) => {
    switch (status) {
      case "ready":
        return (
          <Badge variant="default" className="bg-green-500">
            Ready
          </Badge>
        );
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-black">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full w-full bg-gray-50 border-r border-gray-200">
      <CardHeader className="border-b border-gray-200 bg-white">
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          <span>Trucks Ready for Assignment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[850px]">
          <div className="flex flex-col gap-2 p-4">
            {trucks.map((truck) => (
              <div
                key={truck.id}
                className={`rounded-lg border p-4 cursor-pointer transition-colors ${selectedTruckId === truck.id ? "bg-blue-50 border-blue-300" : "bg-white hover:bg-gray-50"}`}
                onClick={() => handleSelectTruck(truck)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(truck.status)}
                      <h3 className="font-medium">{truck.name}</h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Model: {truck.model}</p>
                      <p>
                        Last inspection:{" "}
                        {new Date(truck.lastInspection).toLocaleDateString()}
                      </p>
                      {truck.driver && <p>Driver: {truck.driver}</p>}
                    </div>
                    <div className="mt-2">{getStatusBadge(truck.status)}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="mt-1">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
