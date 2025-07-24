import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { 
  PaperclipIcon,
  UserIcon,
  SearchIcon,
 } from 'lucide-react';

function Create() {
  const [formData, setFormData] = useState({
    requestBy: '',
    urgency: '',
    category: '',
    subject: '',
    message: '',
    attachment: '',
  });

  const [createdTickets, setCreatedTickets] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      ...formData,
      id: Date.now(),
      dateCreated: new Date().toLocaleString(),
    };
    setCreatedTickets((prev) => [...prev, newTicket]); // Add to end for oldest on top
    setFormData({
      requestBy: '',
      urgency: '',
      category: '',
      subject: '',
      message: '',
      attachment: '',
    });
  };

  return (
    <main className="flex-1 p-2">
            {/* Header */}
          <div className="flex justify-between items-center flex-wrap gap-6 mb-4">
            <h1 className="text-4xl font-bold text-[#000000]">CREATE A TICKET</h1>
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

          {/* Divider */}
          <hr className="border border-gray-300 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Request By</label>
            <Input
              type="text"
              placeholder="Name"
              value={formData.requestBy}
              onChange={(e) => setFormData({ ...formData, requestBy: e.target.value })}
              className="w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Urgency</label>
              <Select onValueChange={(value) => setFormData({ ...formData, urgency: value })} value={formData.urgency}>
                <SelectTrigger className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })} value={formData.category}>
                <SelectTrigger className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Issue DM/CM">Issue DM/CM</SelectItem>
                  <SelectItem value="Access Request">Access Request</SelectItem>
                  <SelectItem value="System Error">System Error</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <Input
              type="text"
              placeholder="Ticket Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Write your description here"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border rounded-md px-3 text-sm text-gray-700 shadow-sm resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Attachment</label>
            <div className="relative flex items-center">
              <Input
                type="file"
                onChange={(e) => setFormData({ ...formData, attachment: e.target.value })}
                className="w-full pr-10 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:bg-gray-100"
              />
              <PaperclipIcon size={18} className="absolute right-3 text-gray-400" />
            </div>
          </div>

          <div className="pt-4 text-right">
            <Button type="submit" className="bg-[#42A841] hover:bg-[#368734] text-white font-semibold px-6 py-2 rounded-lg w-full">
              Create Ticket
            </Button>
          </div>
        </form>

        {/* Right Sidebar */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Created</h2>
          <div className="space-y-4">
            {createdTickets.map((ticket) => (
              <div key={ticket.id} className="border p-4 rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50">
                <p><span className="font-medium">Request By:</span> {ticket.requestBy}</p>
                <p><span className="font-medium">Subject:</span> {ticket.subject}</p>
                <p><span className="font-medium">Urgency:</span> {ticket.urgency}</p>
                <p><span className="font-medium">Category:</span> {ticket.category}</p>
                <p><span className="font-medium">Date Created:</span> {ticket.dateCreated}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Create;
