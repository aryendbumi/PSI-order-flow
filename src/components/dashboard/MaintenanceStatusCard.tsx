import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Calendar,
} from "lucide-react";

interface MaintenanceItem {
  id: string;
  date: string;
  type: string;
  description: string;
  status: "completed" | "scheduled" | "overdue";
}

interface MaintenanceStatusCardProps {
  status?: "good" | "warning" | "critical";
  lastMaintenance?: string;
  nextScheduled?: string;
  maintenanceHistory?: MaintenanceItem[];
  onFlagIssue?: () => void;
}

const MaintenanceStatusCard = ({
  status = "good",
  lastMaintenance = "2023-10-15",
  nextScheduled = "2023-11-15",
  maintenanceHistory = [
    {
      id: "m1",
      date: "2023-10-15",
      type: "Regular",
      description: "Oil change and filter replacement",
      status: "completed",
    },
    {
      id: "m2",
      date: "2023-08-22",
      type: "Inspection",
      description: "Brake system inspection",
      status: "completed",
    },
    {
      id: "m3",
      date: "2023-11-15",
      type: "Regular",
      description: "Scheduled maintenance check",
      status: "scheduled",
    },
  ],
  onFlagIssue = () => console.log("Issue flagged"),
}: MaintenanceStatusCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusBadge = (status: "completed" | "scheduled" | "overdue") => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            Maintenance Status
          </CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span
              className={`text-sm font-medium ${status === "good" ? "text-green-500" : status === "warning" ? "text-amber-500" : "text-red-500"}`}
            >
              {status === "good"
                ? "Good Condition"
                : status === "warning"
                  ? "Needs Attention"
                  : "Critical Issues"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Last Maintenance</p>
              <p className="text-sm text-gray-500">{lastMaintenance}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Next Scheduled</p>
              <p className="text-sm text-gray-500">{nextScheduled}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Maintenance History</h4>
            <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
              {maintenanceHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                >
                  <div>
                    <p className="text-xs font-medium">{item.type}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={onFlagIssue}
        >
          <Wrench className="h-4 w-4" />
          Flag Maintenance Issue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceStatusCard;
