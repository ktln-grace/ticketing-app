import React from 'react';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from '../components/ui/table';

import {
  UsersIcon,
  CalendarDaysIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  XCircleIcon,
} from 'lucide-react';

const summaryCards = [
  {
    label: 'All Tickets',
    value: '33,076',
    icon: <UsersIcon size={24} className="text-indigo-600" />,
  },
  {
    label: 'Open Tickets',
    value: '24',
    icon: <CalendarDaysIcon size={24} className="text-green-600" />,
  },
  {
    label: 'In Progress',
    value: '17',
    icon: <BarChart3Icon size={24} className="text-yellow-600" />,
  },
  {
    label: 'Closed Tickets',
    value: '31,592',
    icon: <CheckCircle2Icon size={24} className="text-blue-600" />,
  },
  {
    label: 'Spoiled Tickets',
    value: '1,443',
    icon: <XCircleIcon size={24} className="text-red-600" />,
  },
];

function Home() {
  return (
    <main className="p-6 md:p-10 space-y-10">

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
              <p className="text-xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Grid */}
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
              {/* Replace with dynamic data */}
              <TableRow>
                <TableCell>IT</TableCell>
                <TableCell>1,230</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Operations</TableCell>
                <TableCell>974</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Closed Tickets – July 2025 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Closed Tickets – July 2025</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Ticket No</TableHead>
                <TableHead>Subject</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>330001</TableCell>
                <TableCell>Fixed login bug</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>330002</TableCell>
                <TableCell>Data sync issue resolved</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Open Tickets */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Open Tickets</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Handler</TableHead>
                <TableHead>Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jhune Melchor</TableCell>
                <TableCell>12</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Katelene Paloma</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Tickets Per Handler */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-[#044610] mb-4">Tickets per Handler</h2>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead>Handler</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Katelene Paloma</TableCell>
                <TableCell>875</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jhune Melchor</TableCell>
                <TableCell>1,124</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default Home;
