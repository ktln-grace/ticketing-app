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
  BrowserRouter as Router, 
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
  FilterIcon,
  CalendarIcon,
  LogOut,
  SearchIcon,
  ChevronsUpDownIcon,
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
          <img src="/images/gibco_logo.png" alt="Logo" className="h-15 w-15" />
        </div>
        <nav className="flex flex-col items-center gap-4">
          <NavItem icon={LayoutDashboardIcon} label="Home" path="/"/>
          <NavItem icon={TicketIcon} label="Tickets" path="/tickets" />
          <NavItem icon={MinusCircleIcon} label="Spoiled" path="/spoiled" />
          <NavItem icon={HourglassIcon} label="Approval" path="/approval" />
          <NavItem icon={PlusCircleIcon} label="Create" path="/create" />
        </nav>
      </div>

      {/* Bottom: Logout */}
      <NavItem icon={LogOut} label="Logout" />
    </aside>

      <main className="flex-1 p-6 md:p-10">
                  {/* Main content */}
                <div className="flex justify-between items-center flex-wrap gap-6 mb-4">
                  {/* Title */}
                  <h1 className="text-4xl font-bold text-[#000000]">GIBCO TICKETING SYSTEM</h1>
        
                  {/* Search + User */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative w-72 gap-1">
                      <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                      <Input
                        placeholder="Search Ticket No. or Subject"
                        className="pl-10 pr-3 py-2 rounded-xl border border-gray-300 shadow-sm w-full "
                      />
                    </div>
                    <div className="flex items-center gap-1 font-medium text-gray-800 bg-white rounded-xl border w-70 px-3 py-2 border-gray-300 shadow-sm">
                      <UserIcon size={18} />
                      <span>Katelene Grace S. Paloma</span>
                    </div>
                  </div>
                </div>
        
              {/* Subtitle + Create Button 
              <div className="flex justify-between items-center mt-12 mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-[#000000]">Tickets</h2>
                <Button className="bg-[#044610] hover:bg-[#123812] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-1">
                  <PlusCircleIcon size={18} /> Create a New Ticket
                </Button>
              </div>*/}
        
              {/* Divider line */}
                <hr className="border border-gray-300 mb-6" />
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

