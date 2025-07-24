import React from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from './components/ui/table';

import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation,
} from 'react-router-dom';

import Home from './pages/Home';
import Tickets from './pages/Tickets';
import Spoiled from './pages/Spoiled';
import Approval from './pages/Approval';
import Create from './pages/Create';

import {
  LayoutDashboardIcon,
  TicketIcon,
  MinusCircleIcon,
  HourglassIcon,
  PlusCircleIcon,
  UserIcon,
  LogOut,
  SearchIcon,
} from 'lucide-react';

/* 5 Sample Content/Data */
const tickets = [
  {
    ticketNo: '331250',
    subject: 'FOR CM - TICKET NUMBER 331250',
    dateApproved: '07/15/2025, 2:30 pm',
    status: 'Open',
    urgency: 'Normal',
    category: 'Issue DM/CM',
    from: 'Jhune Melchor Salavedra',
  },
    {
    ticketNo: '331250',
    subject: 'FOR CM - TICKET NUMBER 331250',
    dateApproved: '07/15/2025, 2:30 pm',
    status: 'Open',
    urgency: 'Normal',
    category: 'Issue DM/CM',
    from: 'Jhune Melchor Salavedra',
  },
    {
    ticketNo: '331250',
    subject: 'FOR CM - TICKET NUMBER 331250',
    dateApproved: '07/15/2025, 2:30 pm',
    status: 'Open',
    urgency: 'Urgent',
    category: 'Issue DM/CM',
    from: 'Jhune Melchor Salavedra',
  },
    {
    ticketNo: '331250',
    subject: 'FOR CM - TICKET NUMBER 331250',
    dateApproved: '07/15/2025, 2:30 pm',
    status: 'Open',
    urgency: 'Normal',
    category: 'Issue DM/CM',
    from: 'Jhune Melchor Salavedra',
  },
      {
    ticketNo: '331250',
    subject: 'FOR CM - TICKET NUMBER 331250',
    dateApproved: '07/15/2025, 2:30 pm',
    status: 'Open',
    urgency: 'Urgent',
    category: 'Issue DM/CM',
    from: 'Jhune Melchor Salavedra',
  },
  // Additional entries...
];

export default function TicketingSystem() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex text-sm text-gray-700 font-sans">
        {/* Sidebar */}
        <aside className="m-6 w-20 bg-black text-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-between h-[95vh]">
          {/* Top: Logo + Nav */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-.5 rounded-full m-2">
              <img src="/images/logo.png" alt="Logo" className="h-15 w-15" />
            </div>
            <nav className="flex flex-col items-center gap-4">
              <NavItem icon={LayoutDashboardIcon} label="Home" path="/" />
              <NavItem icon={TicketIcon} label="Tickets" path="/tickets" />
              <NavItem icon={MinusCircleIcon} label="Spoiled" path="/spoiled" />
              <NavItem icon={HourglassIcon} label="Approval" path="/approval" />
              <NavItem icon={PlusCircleIcon} label="Create" path="/create" />
            </nav>
          </div>

          {/* Bottom: Logout */}
          <NavItem icon={LogOut} label="Logout" />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6">

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/spoiled" element={<Spoiled />} />
            <Route path="/approval" element={<Approval />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Refined NavItem: icon above label
function NavItem({ icon: Icon, label, path }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`flex flex-col items-center gap-1 px-2 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-[#42A841] text-white font-semibold'
          : 'hover:bg-[#42A841]/80 hover:text-[#f5f5f5]'
      }`}
    >
      <Icon size={22} />
      <span>{label}</span>
    </div>
  );
}

