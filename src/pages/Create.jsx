import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { PaperclipIcon } from 'lucide-react';

function Create() {
  return (
          <main className="flex-1 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">
        {/* Request By */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Request By</label>
          <Input type="text" placeholder="Name" className="w-full" />
        </div>

        {/* Grid for Urgency & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Urgency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Urgency</label>
            <Select>
              <SelectTrigger className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select>
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

        {/* Subject & Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <Input type="text" placeholder="Ticket Subject" className="w-full" />
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Write your description here"
            rows={5}
            className="w-full border rounded-md px-3 text-sm text-gray-700 shadow-sm resize-none"
          />
        </div>

        {/* Attachment */}
        <div>
          <label className="text-sm font-medium text-gray-700">Attachment</label>
          <div className="relative flex items-center">
            <Input type="file" className="w-full pr-10 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:bg-gray-100" />
            <PaperclipIcon size={18} className="absolute right-3 text-gray-400" />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 text-right">
          <Button className="bg-[#42A841] hover:bg-[#368734] text-white font-semibold px-6 py-2 rounded-lg w-full">
            Create Ticket
          </Button>
        </div>
      </div>
    </main>

  );
}

export default Create;