import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Truck, Clipboard, AlertTriangle } from "lucide-react";
import TruckSpecsCard from "./TruckSpecsCard";
import MaintenanceStatusCard from "./MaintenanceStatusCard";
import AvailabilityCard from "./AvailabilityCard";

interface TruckDetailViewProps {
  truckId?: string;
  truckData?: {
    id: string;
    model: string;
    year: number;
    licensePlate: string;
    fuelType: string;
    capacity: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    features: string[];
    maintenanceStatus: "good" | "warning" | "critical";
    lastMaintenance: string;
    nextScheduled: string;
    maintenanceHistory: Array<{
      id: string;
      date: string;
      type: string;
      description: string;
      status: "completed" | "scheduled" | "overdue";
    }>;
    availabilityStatus:
      | "available"
      | "scheduled"
      | "maintenance"
      | "unavailable";
    currentDriver: string;
    nextScheduledDate: string;
    nextScheduledTime: string;
    hoursAvailable: number;
    notes: string;
  };
  onAssignToOrder?: () => void;
  onFlagMaintenance?: () => void;
  onBack?: () => void;
}

const defaultTruckData = {
  id: "truck-001",
  model: "Volvo FH16",
  year: 2023,
  licensePlate: "TRK-4872",
  fuelType: "Diesel",
  capacity: "40 tons",
  dimensions: {
    length: "16.5m",
    width: "2.5m",
    height: "4.0m",
  },
  features: [
    "GPS Tracking",
    "Climate Control",
    "Sleeper Cabin",
    "Advanced Safety",
  ],
  maintenanceStatus: "good" as const,
  lastMaintenance: "2023-10-15",
  nextScheduled: "2023-11-15",
  maintenanceHistory: [
    {
      id: "m1",
      date: "2023-10-15",
      type: "Regular",
      description: "Oil change and filter replacement",
      status: "completed" as const,
    },
    {
      id: "m2",
      date: "2023-08-22",
      type: "Inspection",
      description: "Brake system inspection",
      status: "completed" as const,
    },
    {
      id: "m3",
      date: "2023-11-15",
      type: "Regular",
      description: "Scheduled maintenance check",
      status: "scheduled" as const,
    },
  ],
  availabilityStatus: "available" as const,
  currentDriver: "Not assigned",
  nextScheduledDate: "No upcoming schedule",
  nextScheduledTime: "--:--",
  hoursAvailable: 8,
  notes: "Truck is ready for assignment",
};

const TruckDetailView = ({
  truckId = "truck-001",
  truckData = defaultTruckData,
  onAssignToOrder = () => console.log("Assign to order clicked"),
  onFlagMaintenance = () => console.log("Flag maintenance clicked"),
  onBack = () => console.log("Back clicked"),
}: TruckDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("specs");

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            Back
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Truck className="h-6 w-6" />
            Truck Details: {truckData.licensePlate}
          </h1>
        </div>

        <div className="flex gap-3">
          {truckData.maintenanceStatus !== "good" && (
            <Button
              variant="outline"
              className="flex items-center gap-2 text-amber-600 border-amber-600"
              onClick={onFlagMaintenance}
            >
              <AlertTriangle className="h-4 w-4" />
              Flag Maintenance Issue
            </Button>
          )}
          <Button
            className="flex items-center gap-2"
            onClick={onAssignToOrder}
            disabled={truckData.availabilityStatus !== "available"}
          >
            <Clipboard className="h-4 w-4" />
            Assign to Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 bg-white shadow-sm">
          <TruckSpecsCard
            model={truckData.model}
            year={truckData.year}
            licensePlate={truckData.licensePlate}
            fuelType={truckData.fuelType}
            capacity={truckData.capacity}
            dimensions={truckData.dimensions}
            features={truckData.features}
          />
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <MaintenanceStatusCard
            status={truckData.maintenanceStatus}
            lastMaintenance={truckData.lastMaintenance}
            nextScheduled={truckData.nextScheduled}
            maintenanceHistory={truckData.maintenanceHistory}
            onFlagIssue={onFlagMaintenance}
          />
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <AvailabilityCard
            status={truckData.availabilityStatus}
            currentDriver={truckData.currentDriver}
            nextScheduledDate={truckData.nextScheduledDate}
            nextScheduledTime={truckData.nextScheduledTime}
            hoursAvailable={truckData.hoursAvailable}
            notes={truckData.notes}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent
            value="specs"
            className="mt-4 bg-white p-4 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">
              Detailed Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Engine</h4>
                <p className="text-sm text-gray-600">
                  Volvo D16K Euro 6 - 750 HP
                </p>
                <p className="text-sm text-gray-600">Torque: 3550 Nm</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Transmission</h4>
                <p className="text-sm text-gray-600">I-Shift Dual Clutch</p>
                <p className="text-sm text-gray-600">12-speed</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">
                  Axle Configuration
                </h4>
                <p className="text-sm text-gray-600">6x4</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Fuel Capacity</h4>
                <p className="text-sm text-gray-600">1400 liters</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="maintenance"
            className="mt-4 bg-white p-4 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Oil Change</span>
                <span>Every 30,000 km</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Brake Inspection</span>
                <span>Every 20,000 km</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Tire Rotation</span>
                <span>Every 25,000 km</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Full Service</span>
                <span>Every 100,000 km</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="history"
            className="mt-4 bg-white p-4 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Truck History</h3>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Order #12458</span>
                  <span className="text-sm text-gray-500">2023-10-10</span>
                </div>
                <p className="text-sm">Delivery from Chicago to New York</p>
                <p className="text-sm text-gray-500">Driver: John Smith</p>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Order #12399</span>
                  <span className="text-sm text-gray-500">2023-09-28</span>
                </div>
                <p className="text-sm">Delivery from Dallas to Miami</p>
                <p className="text-sm text-gray-500">Driver: Sarah Johnson</p>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Order #12356</span>
                  <span className="text-sm text-gray-500">2023-09-15</span>
                </div>
                <p className="text-sm">Delivery from Seattle to Portland</p>
                <p className="text-sm text-gray-500">Driver: Mike Davis</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TruckDetailView;
