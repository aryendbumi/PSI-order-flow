import React from "react";
import { Bell, Menu, Search, Settings, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DashboardHeaderProps {
  username?: string;
  userAvatar?: string;
  unreadNotifications?: number;
}

const DashboardHeader = ({
  username = "John Doe",
  userAvatar = "",
  unreadNotifications = 3,
}: DashboardHeaderProps) => {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">TruckFlow</h1>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <Button
                variant="ghost"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Trucks
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Orders
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Reports
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 rounded-md border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadNotifications > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadNotifications}
            </span>
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar>
                <AvatarImage src={userAvatar} alt={username} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline">
                {username}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
