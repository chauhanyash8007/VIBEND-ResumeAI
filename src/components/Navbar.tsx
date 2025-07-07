import { Link, useLocation } from "react-router-dom";
import { SignOutButton } from "../SignOutButton";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FileText, Layout, User } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const user = useQuery(api.auth.loggedInUser);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FileText },
    { name: "Templates", href: "/templates", icon: Layout },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VIBEND</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ResumeAI</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700">{user?.email}</span>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
