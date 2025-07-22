import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
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
import { CalendarIcon, SearchIcon } from 'lucide-react';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('APPROVED');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  // 📦 Fetch tickets based on status (tab)
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/gibco_ticket/api/get-tickets.php?status=${activeTab}`);
        const data = await response.json();
        setTickets(data || []);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, [activeTab]);

  const filteredTickets = tickets; // disable filters for now


  /* 🔍 Apply filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesUrgency = selectedUrgency ? ticket.urgency === selectedUrgency : true;
    const matchesDate = selectedDate
      ? (ticket.date_approved || ticket.date_assigned || ticket.Log || '').startsWith(selectedDate)
      : true;
    const matchesSearch = searchTerm
      ? (ticket.subject?.toLowerCase().includes(searchTerm) ||
         ticket.ticket_no?.toLowerCase().includes(searchTerm) ||
         ticket.employee_name?.toLowerCase().includes(searchTerm))
      : true;
    return matchesUrgency && matchesDate && matchesSearch;
  });
*/
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  return (
    <main className="flex-1 p-6">
      {/* Tabs & Filters */}
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex gap-3 flex-wrap">
            <TabsTrigger value="APPROVED" className="tab-trigger">Approved</TabsTrigger>
            <TabsTrigger value="ASSIGNED" className="tab-trigger">Assigned</TabsTrigger>
            <TabsTrigger value="CLOSED" className="tab-trigger">Done</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search + Date */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search ticket, subject, or name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value.toLowerCase());
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 rounded-xl border border-gray-300 shadow-sm w-64"
            />
          </div>

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowDateDropdown(prev => !prev)}
              className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            >
              <CalendarIcon size={16} /> Date
            </Button>
            {showDateDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 z-10">
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

      {/* Table */}
      <div className="overflow-x-auto bg-white border shadow-sm rounded-xl p-4">
        <Table className="min-w-full text-sm text-center">
          <TableHeader>
            <TableRow className="bg-[#044610] text-white">
              <TableHead>Ticket No</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTickets.map((ticket, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>{ticket.ticket_no}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md">
                    {ticket.status}
                  </span>
                </TableCell>
                <TableCell>{ticket.employee_name}</TableCell>
                <TableCell>{ticket.assigned_to || '-'}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    ticket.urgency === 'Urgent' ? 'bg-red-600 text-white' : 'bg-yellow-300 text-black'
                  }`}>
                    {ticket.urgency || 'Normal'}
                  </span>
                </TableCell>
                <TableCell>{new Date(ticket.date_assigned || ticket.date_approved || ticket.Log || '').toLocaleString()}</TableCell>
                <TableCell>{ticket.attachment_count > 0 ? `📎 (${ticket.attachment_count})` : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t text-sm text-gray-700">
          <span>
            Showing {Math.min((currentPage - 1) * ticketsPerPage + 1, filteredTickets.length)}–
            {Math.min(currentPage * ticketsPerPage, filteredTickets.length)} of {filteredTickets.length} entries
          </span>
          <div className="flex gap-1 items-center">
            <button onClick={() => setCurrentPage(1)} className="px-2 py-1 border rounded hover:bg-gray-100">First</button>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="px-2 py-1 border rounded hover:bg-gray-100">Previous</button>
            <button className="px-2 py-1 border rounded bg-[#42A841] text-white font-medium">{currentPage}</button>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="px-2 py-1 border rounded hover:bg-gray-100">Next</button>
            <button onClick={() => setCurrentPage(totalPages)} className="px-2 py-1 rounded-md border hover:bg-gray-100">Last</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Tickets;
