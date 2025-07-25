import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from '../components/ui/table';
import CountUp from 'react-countup';
import {
  UsersIcon,
  CalendarDaysIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  XCircleIcon,
  UserIcon,
  SearchIcon,
} from 'lucide-react';

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
    spoiled: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [handlers, setHandlers] = useState([]);
  const [closedJuly, setClosedJuly] = useState([]);
  const [closedYTD, setClosedYTD] = useState([]);

  const allowedHandlers = ['FJ', 'Kate', 'Trish', 'Mia', 'Amadeo', 'Luigie', 'Earl', 'Junrel'];

  useEffect(() => {
    fetch('/gibco_ticket/api/summary-stats.php')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Stats error:', err));

    fetch('/gibco_ticket/api/department-summary.php')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error('Department error:', err));

    fetch('http://10.10.20.59/gibco_ticket/api/handler-summary.php')
      .then(res => res.json())
      .then(data => {
        console.log('Handler data:', data); // Confirm shape
        setHandlers(data);
      })
      .catch(err => console.error('Handler error:', err));

    fetch('/gibco_ticket/api/closed-july.php')
      .then(res => res.json())
      .then(data => setClosedJuly(data))
      .catch(err => console.error('Closed July error:', err));

    fetch('/gibco_ticket/api/closed-ytd.php')
      .then(res => res.json())
      .then(data => setClosedYTD(data))
      .catch(err => console.error('Closed YTD error:', err));
  }, []);

  useEffect(() => {
  const fetchHandlerStats = async () => {
    try {
      const response = await fetch('/gibco_ticket/api/it-handlers.php');
      const data = await response.json();
      setHandlers(data);
    } catch (error) {
      console.error('Error loading handler stats:', error);
    }
  };

  fetchHandlerStats();
}, []);

  const summaryCards = [
    {
      label: 'All Tickets',
      value: stats.total,
      icon: <UsersIcon size={24} className="text-indigo-600" />,
    },
    {
      label: 'Open Tickets',
      value: stats.open,
      icon: <CalendarDaysIcon size={24} className="text-green-600" />,
    },
    {
      label: 'In Progress',
      value: stats.in_progress,
      icon: <BarChart3Icon size={24} className="text-yellow-600" />,
    },
    {
      label: 'Closed Tickets',
      value: stats.closed,
      icon: <CheckCircle2Icon size={24} className="text-blue-600" />,
    },
    {
      label: 'Spoiled Tickets',
      value: stats.spoiled,
      icon: <XCircleIcon size={24} className="text-red-600" />,
    },
  ];

  const filteredHandlers = handlers
    .filter(h => allowedHandlers.includes(h.handler))
    .slice(0, 5);

  
  return (
    <main className="p-2 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-6 mb-4">
        <h1 className="text-4xl font-bold text-[#000000]">GIBCO TICKETING SYSTEM</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-72 gap-1">
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <Input
              placeholder="Search Ticket No. or Subject"
              className="pl-10 pr-3 py-2 rounded-xl border border-gray-300 shadow-sm w-full"
            />
          </div>
          <div className="flex items-center gap-1 font-medium text-gray-800 bg-white rounded-xl border w-70 px-3 py-2 border-gray-300 shadow-sm">
            <UserIcon size={18} />
            <span>Katelene Grace S. Paloma</span>
          </div>
        </div>
      </div>

      <hr className="border border-gray-300 mb-6" />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-3"
          >
            <div className="p-2 rounded-full bg-gray-100 shadow-inner">{card.icon}</div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              <p className="text-xl font-bold text-gray-800">
                <CountUp end={card.value || 0} duration={1.5} separator="," />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tickets by Department */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Tickets by Department</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Department</TableHead>
                <TableHead>Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.slice(0, 5).map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{d.department}</TableCell>
                  <TableCell>{Number(d.count).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Tickets per Handler */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Tickets per Handler</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Handler</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Closed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {handlers
                .filter(h => h.assigned_to) // or h.handler if you renamed
                .slice(0, 8) // Show top 8 if preferred
                .map((h, i) => (
                  <TableRow key={i}>
                    <TableCell>{h.assigned_to}</TableCell>
                    <TableCell className="text-yellow-600 font-medium text-center">{Number(h.pending_tickets).toLocaleString()}</TableCell>
                    <TableCell className="text-green-700 font-medium text-center">{Number(h.closed_tickets).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Closed Tickets – July 2025 (Daily Summary) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Closed Tickets – July 2025</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Date</TableHead>
                <TableHead>Closed Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closedJuly.slice(0, 5).map((entry, i) => (
                <TableRow key={i}>
                  <TableCell>{new Date(entry.day).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Closed Tickets – YTD 2025 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Closed Tickets – YTD 2025</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Ticket No</TableHead>
                <TableHead>Subject</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closedYTD.slice(0, 5).map((t, i) => (
                <TableRow key={i}>
                  <TableCell>{t.ticket_no}</TableCell>
                  <TableCell>{t.subject}</TableCell>
                </TableRow>
                              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default Home;
