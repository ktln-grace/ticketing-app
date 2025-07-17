import React from 'react';
import { useState } from 'react';

export function Table({ children }) {
  return <table className="min-w-full border">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead>{children}</thead>;
}

export function TableRow({ children, className = '' }) {
  return <tr className={className}>{children}</tr>;
}

export function TableHead({ children }) {
  return <th className="px-4 py-2 border">{children}</th>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 border">{children}</td>;
}
export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return <div>{React.Children.map(children, child => React.cloneElement(child, { activeTab, setActiveTab }))}</div>;
}

export function TabsList({ children, className = '' }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded ${isActive ? 'bg-green-700 text-white' : 'bg-gray-200 text-black'}`}
    >
      {children}
    </button>
  );
}
