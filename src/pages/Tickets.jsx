import React from 'react';
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


import {
  FilterIcon,
  CalendarIcon,
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

function Tickets() {
  return (

      <main className="flex-1 p-6 ">


      {/* Tabs + Filters */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
          {/* Tabs */}
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="flex gap-3 bg-transparent p-0">
                <TabsTrigger
                  value="open"
                  className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-100 
                    data-[state=active]:bg-[#42A841] data-[state=active]:text-white"
                >
                  Open (24)
                </TabsTrigger>
                <TabsTrigger
                  value="in-progress"
                  className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-100 
                    data-[state=active]:bg-[#42A841] data-[state=active]:text-white"
                >
                  In Progress (17)
                </TabsTrigger>
                <TabsTrigger
                  value="closed"
                  className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-100 
                    data-[state=active]:bg-[#42A841] data-[state=active]:text-white"
                >
                  Closed (31592)
                </TabsTrigger>
              </TabsList>
            </Tabs>



          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-[#898686] border border-gray-300"
            >
              <FilterIcon size={16} /> Filter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-[#898686] border border-gray-300"
            >
              <CalendarIcon size={16} /> Date
            </Button>
          </div>
        </div>


          {/* Ticket Table */}
          <div className="overflow-auto rounded-xl shadow-sm p-4 bg-white border-gray-300">
          <div className="overflow-auto rounded-xl shadow-sm border-gray-300">
            <Table className="w-full">
              {/* Header */}
              <TableHeader>
                <TableRow className="bg-[#044610] text-white text-sm">
                  <TableHead>Ticket No.</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date Approved</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>From</TableHead>
                </TableRow>
              </TableHeader>

              {/* Body */}
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow
                      key={index}
                      className="bg-white hover:bg-gray-100 text-sm rounded-lg text-center"
                    >
                      <TableCell className="py-4">{ticket.ticketNo}</TableCell>
                      <TableCell className="py-4">{ticket.subject}</TableCell>
                      <TableCell className="py-4">{ticket.dateApproved}</TableCell>
                      <TableCell className="py-4">
                        <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md">
                          {ticket.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-md ${
                            ticket.urgency === 'Urgent'
                              ? 'bg-red-700 text-white'
                              : 'bg-yellow-300 text-black'
                          }`}
                        >
                          {ticket.urgency}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">{ticket.category}</TableCell>
                      <TableCell className="py-4">{ticket.from}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Table Footer */}
            <div className="flex justify-end items-center gap-2 mt-6 text-sm text-gray-700">
              <span>Showing 1 to 5 of 24 entries</span>
              <div className="flex gap-1 items-center">
                <button className="px-2 py-1 rounded-md border text-gray-600 hover:bg-gray-100">First</button>
                <button className="px-2 py-1 rounded-md border text-gray-600 hover:bg-gray-100">Previous</button>
                <button className="px-2 py-1 rounded-md border bg-[#42A841] text-white font-semibold">1</button>
                <button className="px-2 py-1 rounded-md border text-gray-600 hover:bg-gray-100">2</button>
                <button className="px-2 py-1 rounded-md border text-gray-600 hover:bg-gray-100">Next</button>
                <button className="px-2 py-1 rounded-md border text-gray-600 hover:bg-gray-100">Last</button>
              </div>
            </div>
</div>

      </main>
  );
}

export default Tickets;
