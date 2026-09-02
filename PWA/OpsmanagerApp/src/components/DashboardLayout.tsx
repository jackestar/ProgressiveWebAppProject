import { ComponentChildren } from 'preact';
import "mdui/components/card.js";
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-bar-item.js';

interface NavItem {
  value: string;
  icon: string;
  label: string;
}

interface Props {
  userName: string;
  role: string;
  title: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  navItems: NavItem[];
  children: ComponentChildren;
}

export default function DashboardLayout({ userName, role, title, activeTab, onTabChange, navItems, children }: Props) {
  // Capitalize the first letter of the role
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <main class="contain-container">
      <h1 class="main-title">{import.meta.env.VITE_BUSINESS_NAME}</h1>
      
      <mdui-card variant="elevated" class="box" style={{ padding: '24px', marginBottom: '80px' }}>
        <h2 class="main-title">{title}</h2>
        
        {/* The active tab's component will be injected right here */}
        <div style={{ marginTop: '24px' }}>
          {children}
        </div>
      </mdui-card>

      {/* Bottom Navigation */}
      {/* Listens to the MDUI 'change' event to update the parent's state */}
      <mdui-navigation-bar value={activeTab} onChange={(e: any) => onTabChange(e.target.value)}>
        {navItems.map((item) => (
          <mdui-navigation-bar-item key={item.value} value={item.value} icon={item.icon}>
            {item.label}
          </mdui-navigation-bar-item>
        ))}
      </mdui-navigation-bar>
    </main>
  );
}