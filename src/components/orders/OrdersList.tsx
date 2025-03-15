import React, { useState } from "react";
import {
  Search,
  Filter,
  SortDesc,
  SortAsc,
  MapPin,
  Calendar,
  Truck,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Define the Order interface to use throughout the component
interface Order {
  id: string;
  customer: string;
  location: string;
  date: string;
  status: "pending" | "assigned" | "completed";
  priority: "low" | "medium" | "high";
  requirements: {
    capacity: string;
    type: string;
  };
}

// Create a simple OrderCard component instead of importing it
const OrderCard = ({ order }: { order: Order }) => {
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  return (
    <Card className="p-4 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{order.customer}</h3>
          <Badge className={priorityColors[order.priority]}>
            {order.priority}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{order.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-xs">
          <div>
            <span className="font-medium">Capacity:</span>{" "}
            {order.requirements.capacity}
          </div>
          <div>
            <span className="font-medium">Type:</span> {order.requirements.type}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface OrdersListProps {
  orders?: Order[];
  onOrderSelect?: (order: Order) => void;
  selectedOrderId?: string;
}

const OrdersList = ({
  orders: propOrders,
  onOrderSelect = () => {},
  selectedOrderId = "",
}: OrdersListProps) => {
  const defaultOrders: Order[] = [
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
    {
      id: "4",
      customer: "Mountain Distributors",
      location: "321 Highland Dr, Denver, CO",
      date: "2023-06-18",
      status: "pending",
      priority: "high",
      requirements: {
        capacity: "25 tons",
        type: "Tanker",
      },
    },
    {
      id: "5",
      customer: "Eastcoast Deliveries",
      location: "555 Broadway, New York, NY",
      date: "2023-06-19",
      status: "pending",
      priority: "medium",
      requirements: {
        capacity: "18 tons",
        type: "Flatbed",
      },
    },
  ];

  const orders = propOrders || defaultOrders;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        filterPriority === "all" || order.priority === filterPriority;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Open Orders</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1">
              {filteredOrders.length} Orders
            </Badge>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by customer or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter Priority" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2"
            >
              {sortOrder === "asc" ? (
                <>
                  <SortAsc className="h-4 w-4" />
                  <span>Date (Oldest)</span>
                </>
              ) : (
                <>
                  <SortDesc className="h-4 w-4" />
                  <span>Date (Newest)</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Orders list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-y-auto max-h-[500px] p-1">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`cursor-pointer transition-all ${selectedOrderId === order.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => onOrderSelect(order)}
              >
                <OrderCard order={order} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Truck className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">
                No orders found
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Order summary */}
        <Card className="p-4 mt-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">
                Upcoming deliveries this week: {orders.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">
                Most common destination: California
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrdersList;
