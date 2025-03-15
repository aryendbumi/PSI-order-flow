import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import NotificationPanel from "./dashboard/NotificationPanel";
import TruckDetailView from "./dashboard/TruckDetailView";
import OrderAssignmentInterface from "./orders/OrderAssignmentInterface";
import AssignmentConfirmation from "./orders/AssignmentConfirmation";
import SuccessNotification from "./orders/SuccessNotification";

interface TruckStatus {
  id: string;
  name: string;
  model: string;
  status: "ready" | "maintenance" | "pending";
  lastInspection: string;
  driver?: string;
}

interface TruckData {
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
  availabilityStatus: "available" | "scheduled" | "maintenance" | "unavailable";
  currentDriver: string;
  nextScheduledDate: string;
  nextScheduledTime: string;
  hoursAvailable: number;
  notes: string;
}

const Home = () => {
  // Workflow state management
  const [currentView, setCurrentView] = useState<
    "dashboard" | "truckDetail" | "orderAssignment" | "success"
  >("dashboard");
  const [selectedTruck, setSelectedTruck] = useState<TruckStatus | null>(null);
  const [selectedTruckData, setSelectedTruckData] = useState<TruckData | null>(
    null,
  );
  const [showAssignmentConfirmation, setShowAssignmentConfirmation] =
    useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [assignedOrderId, setAssignedOrderId] = useState<string | null>(null);

  // Handle truck selection from notification panel
  const handleSelectTruck = (truck: TruckStatus) => {
    setSelectedTruck(truck);
    // In a real app, we would fetch the detailed truck data here
    // For now, we'll use the default data from TruckDetailView
    setCurrentView("truckDetail");
  };

  // Handle assign to order button click
  const handleAssignToOrder = () => {
    setCurrentView("orderAssignment");
  };

  // Handle order assignment
  const handleAssignOrder = (truckId: string, orderId: string) => {
    setAssignedOrderId(orderId);
    setShowAssignmentConfirmation(true);
  };

  // Handle assignment confirmation
  const handleConfirmAssignment = () => {
    setShowAssignmentConfirmation(false);
    setShowSuccessNotification(true);
  };

  // Handle success notification close
  const handleSuccessClose = () => {
    setShowSuccessNotification(false);
    setCurrentView("dashboard");
    setSelectedTruck(null);
    setSelectedTruckData(null);
    setAssignedOrderId(null);
  };

  // Handle back button clicks
  const handleBackToTruckDetail = () => {
    setCurrentView("truckDetail");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedTruck(null);
    setSelectedTruckData(null);
  };

  // Handle maintenance flagging
  const handleFlagMaintenance = () => {
    // In a real app, we would update the truck status here
    // For now, we'll just go back to the dashboard
    handleBackToDashboard();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Always show the notification panel */}
        <div className="w-[350px] border-r border-gray-200">
          <NotificationPanel onSelectTruck={handleSelectTruck} />
        </div>

        {/* Main content area - changes based on current view */}
        <div className="flex-1 overflow-auto">
          {currentView === "dashboard" && (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center p-8 max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Truck Inspection Dashboard
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a truck from the notification panel to view details and
                  assign to orders.
                </p>
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-700 text-sm">
                    You have trucks ready for assignment. Check the notification
                    panel to get started.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentView === "truckDetail" && (
            <TruckDetailView
              onAssignToOrder={handleAssignToOrder}
              onFlagMaintenance={handleFlagMaintenance}
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === "orderAssignment" && (
            <OrderAssignmentInterface
              onAssignOrder={handleAssignOrder}
              onCancel={handleBackToTruckDetail}
            />
          )}
        </div>
      </div>

      {/* Modals and notifications */}
      {showAssignmentConfirmation && (
        <AssignmentConfirmation
          isOpen={showAssignmentConfirmation}
          onClose={() => setShowAssignmentConfirmation(false)}
          onConfirm={handleConfirmAssignment}
          orderDetails={{
            id: assignedOrderId || "ORD-5678",
            customer: "Acme Construction Co.",
            location: "123 Building Site, Downtown",
            date: "2023-06-15",
            requirements: [
              "Heavy Load Capacity",
              "Crane Attachment",
              "Extended Range",
            ],
          }}
        />
      )}

      {showSuccessNotification && (
        <SuccessNotification
          isOpen={showSuccessNotification}
          onClose={handleSuccessClose}
          truckId={selectedTruck?.id || "TR-1234"}
          orderId={assignedOrderId || "ORD-5678"}
        />
      )}
    </div>
  );
};

export default Home;
