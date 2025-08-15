import React, { useState, useEffect } from 'react';
import { XIcon, CheckIcon } from 'lucide-react';
import { Button } from '../components/ui/button';

function TicketViewer({ ticket, onClose }) {
  const [assignee, setAssignee] = useState('');
  const [kpiSelection, setKpiSelection] = useState('');
  const [kpiOptions, setKpiOptions] = useState([]);

  const assigneeOptions = [
    'AMADEO LUCERO',
    'ASMIA ALI',
    'EARL GRANT PESEBRE',
    'FJ ROQUE',
    'JUNREL PEPITO',
    'KATELENE GRACE PALOMA',
    'LUIGIE SALDO ABAYA',
    'TRICIAN CAMILLE BANDE'
  ];

  useEffect(() => {
    fetch('/get-kpis.php')
      .then(res => res.json())
      .then(data => setKpiOptions(data))
      .catch(err => console.error('Error fetching KPIs:', err));
  }, []);

  const handleAssign = () => {
    console.log('Assigning to:', assignee);
    console.log('Selected KPI:', kpiSelection);
    // TODO: Send to backend via fetch or axios
    onClose();
  };

  const handleReject = () => {
    console.log('Rejecting ticket:', ticket.ticket_no);
    onClose();
  };

  const status = ticket.status?.toLowerCase();
  const isApproved = status === 'approved';
  const isAssigned = status === 'assigned';

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 relative border border-gray-200 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <XIcon size={20} />
        </button>

        {/* Header */}
        <div className="flex justify-between mb-4 mt-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Ticket #{ticket.ticket_no}
            </h1>
            {ticket.priority && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Priority:</span> {ticket.priority}
              </p>
            )}
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H4z" />
              </svg>
              Urgency {ticket.Urgency}
            </span>
          </div>
        </div>

        {/* Ticket Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg mb-6">
          <table className="w-full text-sm text-gray-800">
            <tbody className="divide-y divide-gray-200">
              {[
                ['User', ticket.employee_name],
                ['Department', ticket.department || 'N/A'],
                ['Create Date', ticket.date_created || 'N/A'],
                ['Approved Date', ticket.date_approved || 'N/A'],
                ['Subject', ticket.subject],
                ['Category', ticket.category || 'Request a Service'],
              ].map(([label, value], idx) => (
                <tr key={idx}>
                  <td className="font-semibold bg-gray-100 px-4 py-2 w-1/3">{label}</td>
                  <td className="px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Note:</label>
        <div className="bg-green-50 border border-green-200 rounded-lg mb-6">
          <table className="w-full text-sm text-gray-800">
            <tbody>
              <tr>
                <td className="px-4 py-2">{ticket.message || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assignment Section — Only show if ticket is Approved */}
        {isApproved && (
          <>
            {/* Assignee Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To:</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full border mb-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Please Select Name</option>
                {assigneeOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* KPI Dropdown */}
            <div>
              <select
                value={kpiSelection}
                onChange={(e) => setKpiSelection(e.target.value)}
                className="w-full border mb-10 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Please Select KPI</option>
                {kpiOptions.map((item) => (
                  <option key={item.id} value={item.kpi}>
                    {item.kpi}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Action Buttons — Hidden if ticket is already Assigned */}
        {!isAssigned && (
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleAssign}
              disabled={!isApproved || !assignee || !kpiSelection}
              className={`flex items-center gap-2 transition ${
                !isApproved || !assignee || !kpiSelection
                  ? 'bg-green-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              <CheckIcon size={16} /> Assign
            </Button>
            <Button
              variant="outline"
              onClick={handleReject}
              className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 transition"
            >
              <XIcon size={16} /> Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketViewer;
