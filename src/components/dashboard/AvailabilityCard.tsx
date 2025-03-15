import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface AvailabilityCardProps {
  status?: "available" | "scheduled" | "maintenance" | "unavailable";
  currentDriver?: string;
  nextScheduledDate?: string;
  nextScheduledTime?: string;
  hoursAvailable?: number;
  notes?: string;
}

const AvailabilityCard = ({
  status = "available",
  currentDriver = "Not assigned",
  nextScheduledDate = "No upcoming schedule",
  nextScheduledTime = "--:--",
  hoursAvailable = 8,
  notes = "Truck is ready for assignment",
}: AvailabilityCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "available":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" /> Available
          </Badge>
        );
      case "scheduled":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Calendar className="w-3 h-3 mr-1" /> Scheduled
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" /> Maintenance
          </Badge>
        );
      case "unavailable":
        return (
          <Badge variant="outline" className="bg-gray-200 hover:bg-gray-300">
            Unavailable
          </Badge>
        );
      default:
        return (
          <Badge variant="default">
            <CheckCircle className="w-3 h-3 mr-1" /> Available
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            Availability Status
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Current Driver</span>
              <span className="font-medium">{currentDriver}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Hours Available</span>
              <span className="font-medium">{hoursAvailable} hrs</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-sm text-gray-500 block mb-1">
              Next Scheduled
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                <span>{nextScheduledDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                <span>{nextScheduledTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-sm text-gray-500 italic">{notes}</p>
      </CardFooter>
    </Card>
  );
};

export default AvailabilityCard;
