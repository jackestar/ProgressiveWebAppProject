import { useState } from 'preact/hooks';
import DashboardLayout from './DashboardLayout';

// Import the tab components
import PromotorHome from './tabs/PromotorHome';
import PromotorSales from './tabs/PromotorSales';
import PromotorZones from './tabs/PromotorZones';

interface Props {
  userName: string;
}

export default function PromotorDashboard({ userName }: Props) {
  // State to track which tab is currently selected
  const [activeTab, setActiveTab] = useState('home');

  // Define the navigation items for this specific role
  const navItems = [
    { value: 'home', icon: 'home', label: 'Inicio' },
    { value: 'sales', icon: 'receipt_long', label: 'Mis Ventas' },
    { value: 'zones', icon: 'place', label: 'Zonas' }
  ];

  return (
    <DashboardLayout
      userName={userName}
      role="promotor"
      title="Promotor Panel"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      navItems={navItems}
    >
      {/* Conditional Rendering: Only show the component that matches activeTab */}
      {activeTab === 'home' && <PromotorHome userName={userName} role="promotor" />}
      {activeTab === 'sales' && <PromotorSales />}
      {activeTab === 'zones' && <PromotorZones />}
    </DashboardLayout>
  );
}