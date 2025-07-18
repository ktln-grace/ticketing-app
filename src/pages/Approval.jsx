import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from '../components/ui/table';
import { FilterIcon, CalendarIcon } from 'lucide-react';

/* ✅ Sample Ticket Data */
const tickets = Array.from({ length: 25 }).map((_, i) => ({
  ticketNo: `33125${i}`,
  subject: `Subject #${i + 1}`,
  dateCreated: `2025-07-${(15 + i) % 30 + 1}`.padStart(10, '0'),
  status: 'For Approval',
  category: i % 2 === 0 ? 'Issue DM/CM' : 'Access Request',
  urgency: i % 2 === 0 ? 'Urgent' : 'Normal',
  from: i % 2 === 0 ? 'Jhune Melchor Salavedra' : 'Katelene Paloma',
}));

function Approval() {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  // ✅ Filtering logic
  const filteredTickets = tickets.filter((ticket) => {
    const matchesUrgency = selectedUrgency ? ticket.urgency === selectedUrgency : true;
    const matchesStatus = selectedStatus ? ticket.status === selectedStatus : true;
    const matchesDate = selectedDate
      ? ticket.dateCreated.startsWith(selectedDate)
      : true;

    return matchesUrgency && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  return (
    <main className="flex-1 p-6">
      {/* Header with Tabs and Filter/Calendar */}
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        <Tabs defaultValue="open" className="flex-grow">
          <TabsList className="flex gap-3 bg-transparent p-0">
            <TabsTrigger
              value="open"
              className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-100 
                data-[state=active]:bg-[#42A841] data-[state=active]:text-white"
            >
              For Approval ({filteredTickets.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filter and Calendar */}
        <div className="flex gap-2">


          {/* Date */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => {
                setShowDateDropdown((prev) => !prev);
                setShowFilterDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-white text-[#555] border border-gray-300 hover:bg-gray-100 hover:text-[#044610] transition"
            >
              <CalendarIcon size={16} /> Date
            </Button>

            {showDateDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-lg shadow-lg p-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setCurrentPage(1);
                    setShowDateDropdown(false);
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table + Pagination */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-300 p-4">
        <Table className="min-w-full text-sm text-center">
          <TableHeader>
            <TableRow className="bg-[#044610] text-white">
              <TableHead>Ticket No.</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>From</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTickets.map((ticket, index) => (
              <TableRow key={index} className="bg-white hover:bg-gray-100">
                <TableCell>{ticket.ticketNo}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.dateCreated}</TableCell>
                <TableCell>
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                    {ticket.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    ticket.urgency === 'Urgent' ? 'bg-red-700 text-white' : 'bg-yellow-300 text-black'
                  }`}>
                    {ticket.urgency}
                  </span>
                </TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>{ticket.from}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Embedded Pagination */}
        <div className="flex justify-between items-center p-4 border-t text-sm text-gray-700">
          <span>
            Showing {Math.min((currentPage - 1) * ticketsPerPage + 1, filteredTickets.length)}–
            {Math.min(currentPage * ticketsPerPage, filteredTickets.length)} of {filteredTickets.length} entries
          </span>
          <div className="flex gap-1 items-center">
            <button onClick={() => setCurrentPage(1)} className="px-2 py-1 rounded-md border hover:bg-gray-100">First</button>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-2 py-1 rounded-md border hover:bg-gray-100">Previous</button>
            <button className="px-2 py-1 rounded-md border bg-[#42A841] text-white font-semibold">{currentPage}</button>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-2 py-1 rounded-md border hover:bg-gray-100">Next</button>
            <button onClick={() => setCurrentPage(totalPages)} className="px-2 py-1 rounded-md border hover:bg-gray-100">Last</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Approval;
