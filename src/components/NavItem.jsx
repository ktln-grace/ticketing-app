import { FaHome, FaFileAlt, FaTable, FaEdit, FaCalculator, FaCreditCard, FaBan, FaSave } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <FaHome /> },
    { label: 'New Cash Voucher', icon: <FaFileAlt /> },
    { label: 'CV Table', icon: <FaTable /> },
    { label: 'CV with Entries', icon: <FaEdit /> },
    { label: 'Summary per GL Accounts', icon: <FaCalculator /> },
    { label: 'CV with Online Payment', icon: <FaCreditCard /> },
    { label: 'Spoiled Vouchers', icon: <FaBan /> },
    { label: 'Saved Reports', icon: <FaSave /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-6 font-bold text-xl border-b">GAS - CASH DISBURSEMENT</div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 p-2 hover:bg-blue-100 rounded cursor-pointer text-gray-700">
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
