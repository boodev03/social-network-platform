import { Bell, Home, LogOut, PlusSquare, Search, User } from "lucide-react";
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import CreatePostDialog from "../createPost/CreatePost";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

// These imports will be needed when you install the packages
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 md:w-20 border-r border-gray-200 flex flex-col items-center py-6">
        <div className="mb-8">
          <svg className="h-8 w-8" viewBox="0 0 192 192" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M127.856 104.51C127.856 89.7384 115.882 77.7644 101.11 77.7644C86.3384 77.7644 74.3644 89.7384 74.3644 104.51C74.3644 119.282 86.3384 131.256 101.11 131.256C115.882 131.256 127.856 119.282 127.856 104.51ZM101.11 117.256C108.124 117.256 113.856 111.524 113.856 104.51C113.856 97.4964 108.124 91.7644 101.11 91.7644C94.0964 91.7644 88.3644 97.4964 88.3644 104.51C88.3644 111.524 94.0964 117.256 101.11 117.256Z"
              fill="currentColor"
            />
            <path
              d="M138.5 60.5C138.5 69.0604 131.56 76 123 76C114.44 76 107.5 69.0604 107.5 60.5C107.5 51.9396 114.44 45 123 45C131.56 45 138.5 51.9396 138.5 60.5Z"
              fill="currentColor"
            />
            <path
              d="M63.5 76C71.5081 76 78 69.5081 78 61.5C78 53.4919 71.5081 47 63.5 47C55.4919 47 49 53.4919 49 61.5C49 69.5081 55.4919 76 63.5 76Z"
              fill="currentColor"
            />
            <path
              d="M36 121C36 128.732 42.268 135 50 135C57.732 135 64 128.732 64 121C64 113.268 57.732 107 50 107C42.268 107 36 113.268 36 121Z"
              fill="currentColor"
            />
            <path
              d="M156 121C156 128.732 149.732 135 142 135C134.268 135 128 128.732 128 121C128 113.268 134.268 107 142 107C149.732 107 156 113.268 156 121Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <nav className="flex flex-col items-center space-y-8 flex-1">
          <Link
            to={ROUTES.HOME}
            className={`p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20 ${
              isActive(ROUTES.HOME) ? "bg-black/10" : ""
            }`}
          >
            <Home
              size={28}
              strokeWidth={2}
              className={isActive(ROUTES.HOME) ? "text-black" : "text-gray-500"}
            />
          </Link>

          {/* <button className="p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20">
            <Search size={28} strokeWidth={2} className="text-gray-500" />
          </button> */}
          <Link
            to={ROUTES.SEARCH}
            className={`p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20 ${
              isActive(ROUTES.SEARCH) ? "bg-black/10" : ""
            }`}
          >
            <Search
              size={28}
              strokeWidth={2}
              className={
                isActive(ROUTES.SEARCH) ? "text-black" : "text-gray-500"
              }
            />
          </Link>

          {/* <button className="p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20">
            <PlusSquare size={28} strokeWidth={2} className="text-gray-500" />
          </button> */}
          <button className="p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20">
            <Dialog>
              <DialogTrigger asChild>
                <PlusSquare
                  size={28}
                  strokeWidth={2}
                  className="text-gray-500"
                />
              </DialogTrigger>

              <DialogContent>
                <CreatePostDialog />
              </DialogContent>
            </Dialog>
          </button>

          <button className="p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20">
            <Bell size={28} strokeWidth={2} className="text-gray-500" />
          </button>
        </nav>

        <div className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black/10 active:bg-black/20 block ${
                  isActive(ROUTES.PROFILE) ? "bg-black/10" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="https://i.pravatar.cc/100?img=1"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <User size={12} className="text-gray-700" />
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="end"
              sideOffset={10}
              alignOffset={5}
              className="w-40 max-h-[300px] overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/40 hover:[&::-webkit-scrollbar-thumb]:bg-black/60"
            >
              <DropdownMenuItem asChild>
                <Link
                  to={ROUTES.PROFILE}
                  className="flex items-center w-full cursor-pointer"
                >
                  <User size={16} className="mr-2" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut size={16} className="mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16 md:ml-20">
        {/* Header for mobile - only shown on smaller screens */}
        <header className="md:hidden border-b border-gray-200 sticky top-0 bg-white z-10 px-4 py-3">
          <div className="flex justify-center">
            <svg className="h-8 w-8" viewBox="0 0 192 192" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M127.856 104.51C127.856 89.7384 115.882 77.7644 101.11 77.7644C86.3384 77.7644 74.3644 89.7384 74.3644 104.51C74.3644 119.282 86.3384 131.256 101.11 131.256C115.882 131.256 127.856 119.282 127.856 104.51ZM101.11 117.256C108.124 117.256 113.856 111.524 113.856 104.51C113.856 97.4964 108.124 91.7644 101.11 91.7644C94.0964 91.7644 88.3644 97.4964 88.3644 104.51C88.3644 111.524 94.0964 117.256 101.11 117.256Z"
                fill="currentColor"
              />
              <path
                d="M138.5 60.5C138.5 69.0604 131.56 76 123 76C114.44 76 107.5 69.0604 107.5 60.5C107.5 51.9396 114.44 45 123 45C131.56 45 138.5 51.9396 138.5 60.5Z"
                fill="currentColor"
              />
              <path
                d="M63.5 76C71.5081 76 78 69.5081 78 61.5C78 53.4919 71.5081 47 63.5 47C55.4919 47 49 53.4919 49 61.5C49 69.5081 55.4919 76 63.5 76Z"
                fill="currentColor"
              />
              <path
                d="M36 121C36 128.732 42.268 135 50 135C57.732 135 64 128.732 64 121C64 113.268 57.732 107 50 107C42.268 107 36 113.268 36 121Z"
                fill="currentColor"
              />
              <path
                d="M156 121C156 128.732 149.732 135 142 135C134.268 135 128 128.732 128 121C128 113.268 134.268 107 142 107C149.732 107 156 113.268 156 121Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </header>

        {/* Content Area */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
