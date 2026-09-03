import 'mdui/components/button.js';
import HomeUserBox from '../HomeUserBox';

interface Props {
  userName: string;
  role: string;
}

export default function PromotorHome({ userName, role }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <HomeUserBox userName={userName} role={role} />
      <mdui-button variant="filled" icon="point_of_sale">
        Nuevo Reporte de Ventas
      </mdui-button>
      <p style={{ fontSize: '14px', color: 'gray' }}>Registra inventario inicial y final.</p>
    </div>
  );
}