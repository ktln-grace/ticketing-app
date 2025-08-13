import React, { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import TicketViewer from './TicketViewer';
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
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketsPerPage = 10;

useEffect(() => {
  console.log('Fetching tickets for status:', activeTab); // 👈 Add this line

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        `http://10.10.20.59/gibco_ticket/api/get-tickets.php?status=${activeTab}`
      );
      const data = await response.json();
      setTickets(data || []);
      setCurrentPage(1);
      setSelectedTicket(null);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  fetchTickets();
}, [activeTab]);


  const filteredTickets = tickets.filter((ticket) => {
    const matchesUrgency = selectedUrgency
      ? ticket.urgency === selectedUrgency
      : true;
    const matchesDate = selectedDate
      ? (
          ticket.date_approved ||
          ticket.date_assigned ||
          ticket.datetime_closed ||
          ''
        ).startsWith(selectedDate)
      : true;
    const matchesSearch = searchTerm
      ? (
          ticket.subject?.toLowerCase().includes(searchTerm) ||
          ticket.ticket_no?.toLowerCase().includes(searchTerm) ||
          ticket.employee_name?.toLowerCase().includes(searchTerm)
        )
      : true;
    return matchesUrgency && matchesDate && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  return (
    <main className="flex-1 p-2">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Triggers and Filters */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Tabs.List className="flex gap-3">
            {['APPROVED', 'ASSIGNED', 'CLOSED'].map((tabKey) => (
              <Tabs.Trigger
                key={tabKey}
                value={tabKey}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  activeTab === tabKey
                    ? 'bg-[#42A841] text-white font-semibold'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tabKey.charAt(0) + tabKey.slice(1).toLowerCase()}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Filters */}
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

            <select
              value={selectedUrgency}
              onChange={(e) => {
                setSelectedUrgency(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border rounded-xl shadow-sm text-sm bg-white"
            >
              <option value="">All Urgencies</option>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
            </select>

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowDateDropdown((prev) => !prev)}
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

        {/* Tab Content */}
        {['APPROVED', 'ASSIGNED', 'CLOSED'].map((tabKey) => (
          <Tabs.Content key={tabKey} value={tabKey} className="mt-6">
            <div className="overflow-visible bg-white border shadow-sm rounded-xl p-4">
              {paginatedTickets.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No tickets found for this tab.</div>
              ) : (
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
                        <TableCell>
                          <button
                            onClick={() => {
                              console.log('Clicked:', ticket);
                              setSelectedTicket(ticket);
                            }}
                            className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                          >
                            {ticket.subject || 'No Subject'}
                          </button>
                        </TableCell>
                        <TableCell>
                          <span className="bg-blue-700 text-white text-9px px-2 py-1 rounded-md">
                            {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.employee_name}</TableCell>
                        <TableCell>
                          <span
                            className={`text-9px px-2 py-1 rounded-md ${
                              ticket.urgency === 'Urgent'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-300 text-black'
                            }`}
                          >
                            {ticket.urgency || 'Normal'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(
                            ticket.date_approved ||
                              ticket.date_assigned ||
                              ticket.datetime_closed ||
                              ''
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* Pagination */}
              <div className="flex justify-between items-center p-4 border-t text-sm text-gray-700">
                <span>
                  Showing {Math.min((currentPage - 1) * ticketsPerPage + 1, filteredTickets.length)}–
                  {Math.min(currentPage * ticketsPerPage, filteredTickets.length)} of {filteredTickets.length} entries
                </span>
                <div className="flex gap-1 items-center">
                  <button onClick={() => setCurrentPage(1)} className="px-2 py-1 border rounded hover:bg-gray-100">First</button>
                  <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-2 py-1 border rounded hover:bg-gray-100">Previous</button>
                  <button className="px-2 py-1 border rounded bg-[#42A841] text-white font-medium">{currentPage}</button>
                  <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-2 py-1 border rounded hover:bg-gray-100">Next</button>
                  <button onClick={() => setCurrentPage(totalPages)} className="px-2 py-1 border rounded hover:bg-gray-100">Last</button>
                </div>
              </div>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      {selectedTicket && (
        <TicketViewer
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </main>
  );
}
export default Tickets;
