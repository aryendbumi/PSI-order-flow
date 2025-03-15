import React from "react";
import {
  Check,
  Truck,
  Calendar,
  MapPin,
  User,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface AssignmentConfirmationProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  truckDetails?: {
    id: string;
    name: string;
    model: string;
    licensePlate: string;
  };
  orderDetails?: {
    id: string;
    customer: string;
    location: string;
    date: string;
    requirements: string[];
  };
}

const AssignmentConfirmation = ({
  isOpen = true,
  onClose = () => {},
  onConfirm = () => {},
  truckDetails = {
    id: "T-1234",
    name: "Heavy Duty Truck",
    model: "Volvo FH16",
    licensePlate: "XYZ-789",
  },
  orderDetails = {
    id: "ORD-5678",
    customer: "Acme Construction Co.",
    location: "123 Building Site, Downtown",
    date: "2023-06-15",
    requirements: ["Heavy Load Capacity", "Crane Attachment", "Extended Range"],
  },
}: AssignmentConfirmationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Confirm Assignment
          </DialogTitle>
          <DialogDescription className="text-center">
            Please review the details before confirming the truck assignment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Truck Details Section */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold flex items-center gap-2 mb-3">
              <Truck className="h-5 w-5 text-blue-600" />
              Truck Details
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">ID:</span> {truckDetails.id}
              </p>
              <p>
                <span className="font-medium">Name:</span> {truckDetails.name}
              </p>
              <p>
                <span className="font-medium">Model:</span> {truckDetails.model}
              </p>
              <p>
                <span className="font-medium">License Plate:</span>{" "}
                {truckDetails.licensePlate}
              </p>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-green-600" />
              Order Details
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Order ID:</span> {orderDetails.id}
              </p>
              <p className="flex items-start gap-2">
                <User className="h-4 w-4 text-gray-600 mt-0.5" />
                <span>{orderDetails.customer}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                <span>{orderDetails.location}</span>
              </p>
              <p className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-gray-600 mt-0.5" />
                <span>{new Date(orderDetails.date).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Requirements
            </h3>
            <ul className="space-y-1 text-sm">
              {orderDetails.requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentConfirmation;
