import React, { useState } from 'react';

export function Select({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {children[0]} {/* SelectTrigger */}
      </div>
      {open && (
        <div className="absolute z-10 mt-1 bg-white border rounded shadow w-full">
          {children.slice(1)} {/* SelectContent */}
        </div>
      )}
    </div>
  );
}

export function SelectTrigger({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ value, children }) {
  return (
    <div
      data-value={value}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }) {
  return <span className="text-gray-500">{placeholder}</span>;
}
