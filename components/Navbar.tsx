"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, LogOut, User } from "lucide-react";
import { login, logout } from "@/lib/auth-actions";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logoPlaner.png"
              alt="Travel Planner Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <p className="text-xl font-bold text-gray-900 hidden sm:block">
              Travel Planner
            </p>
          </Link>

          {/* Navigation Links - Solo cuando está autenticado */}
          {session && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/trips"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Globe
              </Link>
            </div>
          )}

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-3">
                  <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-gray-200"
                  />
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => login()}
                className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Solo cuando está autenticado */}
        {session && (
          <div className="md:hidden pb-3 px-4">
            <div className="flex space-x-4">
              <Link
                href="/mytrips"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Globe
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
