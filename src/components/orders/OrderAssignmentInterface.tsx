import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Truck,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import OrdersList from "./OrdersList";
import OrderCard from "./OrderCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface TruckData {
  id: string;
  name: string;
  model: string;
  licensePlate: string;
  capacity: string;
  type: string;
  status: "available" | "maintenance" | "assigned";
  image: string;
}

interface Order {
  id: string;
  customer: string;
  location: string;
  date: string;
  time?: string;
  status: "pending" | "assigned" | "completed";
  priority: "low" | "medium" | "high";
  requirements: {
    capacity: string;
    type: string;
  };
}

interface OrderAssignmentInterfaceProps {
  truck?: TruckData;
  onAssignOrder?: (truckId: string, orderId: string) => void;
  onCancel?: () => void;
}

const OrderAssignmentInterface = ({
  truck = {
    id: "truck-1",
    name: "Freightliner Cascadia",
    model: "2022 Freightliner Cascadia",
    licensePlate: "TRK-4567",
    capacity: "25 tons",
    type: "Semi-Truck",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  },
  onAssignOrder = () => {},
  onCancel = () => {},
}: OrderAssignmentInterfaceProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Handle drag end event
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (
      result.draggableId.startsWith("truck-") &&
      result.destination.droppableId.startsWith("order-")
    ) {
      const orderId = result.destination.droppableId.replace("order-", "");
      // Find the order in the list
      const order = mockOrders.find((o) => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setShowConfirmation(true);
      }
    }
  };

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: "1",
      customer: "Acme Corporation",
      location: "123 Main St, San Francisco, CA",
      date: "2023-06-15",
      status: "pending",
      priority: "high",
      requirements: {
        capacity: "20 tons",
        type: "Refrigerated",
      },
    },
    {
      id: "2",
      customer: "Global Logistics Inc.",
      location: "456 Market St, Los Angeles, CA",
      date: "2023-06-16",
      status: "pending",
      priority: "medium",
      requirements: {
        capacity: "15 tons",
        type: "Flatbed",
      },
    },
    {
      id: "3",
      customer: "Pacific Shipping Co.",
      location: "789 Ocean Ave, Seattle, WA",
      date: "2023-06-17",
      status: "pending",
      priority: "low",
      requirements: {
        capacity: "10 tons",
        type: "Box truck",
      },
    },
  ];

  // Filter orders based on active tab
  const filteredOrders =
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((order) => {
          if (activeTab === "compatible") {
            return order.requirements.capacity <= truck.capacity;
          }
          return order.priority === activeTab;
        });

  const handleConfirmAssignment = () => {
    if (selectedOrder) {
      onAssignOrder(truck.id, selectedOrder.id);
      setShowConfirmation(false);
      setSelectedOrder(null);
    }
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Assignment</h1>
          <p className="text-gray-500">Assign orders to the selected truck</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          Back to Truck Details
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Truck Card - Left Side */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Selected Truck
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={`truck-${truck.id}`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="h-full"
                    >
                      <Draggable draggableId={`truck-${truck.id}`} index={0}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border rounded-lg p-4 bg-white cursor-move"
                          >
                            <div className="aspect-video mb-4 overflow-hidden rounded-md">
                              <img
                                src={truck.image}
                                alt={truck.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-semibold text-lg">
                              {truck.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {truck.model}
                            </p>

                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                  License:
                                </span>
                                <span className="text-sm font-medium">
                                  {truck.licensePlate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                  Capacity:
                                </span>
                                <span className="text-sm font-medium">
                                  {truck.capacity}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                  Type:
                                </span>
                                <span className="text-sm font-medium">
                                  {truck.type}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                  Status:
                                </span>
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700"
                                >
                                  {truck.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-center text-gray-500">
                                Drag this truck to an order to assign
                              </p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          {/* Orders List - Right Side */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>Available Orders</CardTitle>
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="compatible">Compatible</TabsTrigger>
                      <TabsTrigger value="high">High</TabsTrigger>
                      <TabsTrigger value="medium">Medium</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredOrders.map((order) => (
                    <Droppable key={order.id} droppableId={`order-${order.id}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`border-2 rounded-lg ${snapshot.isDraggingOver ? "border-primary bg-primary/10" : "border-transparent"}`}
                          onClick={() => handleSelectOrder(order)}
                        >
                          <OrderCard
                            id={order.id}
                            customer={order.customer}
                            location={order.location}
                            date={order.date}
                            status={order.status}
                            priority={order.priority}
                            requirements={[
                              order.requirements.capacity,
                              order.requirements.type,
                            ]}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>

                {filteredOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-4">
                    <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No matching orders found
                    </h3>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      Try changing your filter criteria or check back later
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DragDropContext>

      {/* Assignment Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Assignment</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{truck.name}</h3>
                    <p className="text-sm text-gray-500">
                      {truck.licensePlate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedOrder.customer}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.location}
                    </p>
                    <div className="flex items-center mt-2">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">
                        {selectedOrder.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>
                  This truck meets the requirements for this order (
                  {selectedOrder.requirements.capacity} capacity,{" "}
                  {selectedOrder.requirements.type} type)
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmAssignment}>
                  Confirm Assignment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderAssignmentInterface;
