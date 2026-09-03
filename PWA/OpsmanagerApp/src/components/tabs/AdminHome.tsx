import 'mdui/components/button.js';
import HomeUserBox from '../HomeUserBox';

interface Props {
  userName: string;
  role: string;
}

export default function AdminHome({ userName, role }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <HomeUserBox userName={userName} role={role} />
      <mdui-button variant="filled" icon="dashboard">
        Vista General
      </mdui-button>
      <p style={{ fontSize: '14px', color: 'gray' }}>
        Revisa métricas, clientes y operaciones del sistema.
      </p>
    </div>
  );
}
