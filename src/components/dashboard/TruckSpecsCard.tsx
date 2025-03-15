import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Truck, Info, Fuel, Weight, Ruler } from "lucide-react";

interface TruckSpecsCardProps {
  model?: string;
  year?: number;
  licensePlate?: string;
  fuelType?: string;
  capacity?: string;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
  };
  features?: string[];
}

const TruckSpecsCard = ({
  model = "Volvo FH16",
  year = 2023,
  licensePlate = "TRK-4872",
  fuelType = "Diesel",
  capacity = "40 tons",
  dimensions = {
    length: "16.5m",
    width: "2.5m",
    height: "4.0m",
  },
  features = [
    "GPS Tracking",
    "Climate Control",
    "Sleeper Cabin",
    "Advanced Safety",
  ],
}: TruckSpecsCardProps) => {
  return (
    <Card className="w-full max-w-[350px] h-[300px] overflow-auto bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {model}
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50">
            {year}
          </Badge>
        </div>
        <CardDescription>License: {licensePlate}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Fuel Type:</span>
            <span className="text-sm">{fuelType}</span>
          </div>

          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Capacity:</span>
            <span className="text-sm">{capacity}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Dimensions:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pl-6 text-sm">
            <div>L: {dimensions.length}</div>
            <div>W: {dimensions.width}</div>
            <div>H: {dimensions.height}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Features:</span>
          </div>
          <div className="flex flex-wrap gap-1 pl-6">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TruckSpecsCard;
