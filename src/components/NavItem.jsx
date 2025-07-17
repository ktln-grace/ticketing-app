import { useNavigate, useLocation } from 'react-router-dom';

export default function NavItem({ icon: Icon, label, path }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`flex flex-col items-center gap-1 px-2 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-[#42A841] text-white font-semibold'
          : 'hover:bg-[#42A841]/80 hover:text-[#ffffff]'
      }`}
    >
      <Icon size={22} />
      <span>{label}</span>
    </div>
  );
}
