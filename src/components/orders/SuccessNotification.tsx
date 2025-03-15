import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Truck, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "../ui/toast";

interface SuccessNotificationProps {
  isOpen?: boolean;
  onClose?: () => void;
  truckId?: string;
  orderId?: string;
}

const SuccessNotification = ({
  isOpen = true,
  onClose = () => {},
  truckId = "TR-1234",
  orderId = "ORD-5678",
}: SuccessNotificationProps) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);

    if (isOpen) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md"
      >
        <div className="bg-green-50 p-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-green-800 mt-4"
          >
            Assignment Successful!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-green-700 text-center mt-2"
          >
            Truck has been successfully assigned to the order
          </motion.p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium">Truck ID:</span>
            </div>
            <span className="text-sm font-bold">{truckId}</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium">Order ID:</span>
            </div>
            <span className="text-sm font-bold">{orderId}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-between"
          >
            <Button variant="outline" onClick={onClose} className="w-full mr-2">
              Close
            </Button>
            <Button
              className="w-full ml-2"
              onClick={() => {
                onClose();
                // Navigate to e-timesheet workflow would go here
              }}
            >
              View E-Timesheet
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast notification that appears alongside the modal */}
      <ToastProvider>
        <Toast className="absolute bottom-4 right-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <ToastTitle>Assignment Complete</ToastTitle>
              <ToastDescription>
                Truck {truckId} has been assigned to order {orderId}
              </ToastDescription>
            </div>
          </div>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export default SuccessNotification;
