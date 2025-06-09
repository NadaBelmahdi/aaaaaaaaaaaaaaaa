import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  User,
  FolderOpen,
  Truck,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['Admin', 'Assistant', 'Cashier'] },
      { name: 'Products', href: '/products', icon: Package, roles: ['Admin', 'Assistant'] },
      { name: 'Categories', href: '/categories', icon: FolderOpen, roles: ['Admin', 'Assistant'] },
      { name: 'Suppliers', href: '/suppliers', icon: Truck, roles: ['Admin', 'Assistant'] },
      { name: 'Orders', href: '/orders', icon: ShoppingCart, roles: ['Admin', 'Assistant', 'Cashier'] },
      { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['Admin', 'Assistant'] },
    ];

    const adminItems = [
      { name: 'User Management', href: '/users', icon: Users, roles: ['Admin'] },
      { name: 'Settings', href: '/settings', icon: Settings, roles: ['Admin'] },
    ];

    const userItems = [
      { name: 'Profile', href: '/profile', icon: User, roles: ['Admin', 'Assistant', 'Cashier'] },
    ];

    const allItems = [...baseItems, ...adminItems, ...userItems];

    return allItems.filter((item) => user?.role && item.roles.includes(user.role));
  };

  const navigation = getNavigationItems();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="hidden lg:block lg:w-64 lg:flex-shrink-0"
      >
        <div className="flex flex-col h-full bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                StockMS
              </span>
            </motion.div>
          </div>

          {/* User Info */}
          {user && (
            <div className="px-6 pb-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-secondary-600 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 z-50"
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex items-center justify-between px-6 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      StockMS
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* User Info */}
                {user && (
                  <div className="px-6 pb-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-4 pb-4 space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                            isActive
                              ? 'bg-primary-500 text-white shadow-lg'
                              : 'text-secondary-600 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400'
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
