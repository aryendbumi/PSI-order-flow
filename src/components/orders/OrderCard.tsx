import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Truck, Clock, User } from "lucide-react";

interface OrderCardProps {
  id?: string;
  customer?: string;
  location?: string;
  date?: string;
  time?: string;
  requirements?: string[];
  status?: "pending" | "assigned" | "completed";
  priority?: "low" | "medium" | "high";
  onClick?: () => void;
}

const OrderCard = ({
  id = "ORD-1234",
  customer = "Acme Construction",
  location = "123 Main St, San Francisco, CA",
  date = "2023-06-15",
  time = "09:00 AM",
  requirements = ["Heavy Load", "Crane", "Forklift"],
  status = "pending",
  priority = "medium",
  onClick,
}: OrderCardProps) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const priorityVariant = {
    low: "secondary",
    medium: "default",
    high: "destructive",
  } as const;

  return (
    <Card
      className="w-full max-w-[350px] h-[180px] bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{customer}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={priorityVariant[priority]}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </Badge>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[status]}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        <CardDescription className="text-xs text-gray-500">
          {id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 py-0">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm truncate">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{date}</span>
          <Clock className="h-4 w-4 text-gray-500 ml-2" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {requirements.map((req, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
            >
              {req}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex items-center text-sm text-gray-500">
          <User className="h-4 w-4 mr-1" />
          <span>Drag truck here to assign</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
