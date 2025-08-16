"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, LogOut, User } from "lucide-react";
import { login, logout } from "@/lib/auth-actions";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";

function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

          {/* Navegación y avatar */}
          {session ? (
            <div className="flex items-center space-x-6">
              {/* Enlaces */}
              <Link
                href="/trips"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Mis Viajes
              </Link>
              <Link
                href="/globe"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Globo
              </Link>
              {/* Avatar y dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="focus:outline-none"
                >
                  <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-200"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                    <Button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-100 bg-white"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar sesión</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Button
              onClick={() => login()}
              className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Iniciar sesión</span>
            </Button>
          )}
        </div>

        {/* Mobile Navigation - Solo cuando está autenticado */}
        {session && (
          <div className="md:hidden pb-3 px-4">
            <div className="flex space-x-4">
              <Link
                href="/trips"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Mis Viajes
              </Link>
              <Link
                href="/globe"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Globo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
