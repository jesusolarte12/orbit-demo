import { Users, UserPlus, UserCheck, TrendingUp, Eye, MessageCircle, Phone, PhoneOff, Heart } from 'lucide-react';
import { dashboardStatsMock, chartDataMock } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  sublabel: string;
  valueColor?: string;
}

function StatCard({ icon, value, label, sublabel, valueColor = 'text-foreground' }: StatCardProps) {
  return (
    <div className="orbit-card p-4 animate-fade-in">
      <div className="text-muted-foreground mb-2">{icon}</div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  );
}

export default function Dashboard() {
  const stats = dashboardStatsMock;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm">
          Últimos 15 Días
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm">
          📅 30-14/01/26
        </button>
      </div>

      {/* Stats Grid - Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value={stats.usuariosTotales}
          label="Usuarios Totales"
          sublabel="Total de usuarios únicos"
        />
        <StatCard
          icon={<UserPlus className="h-5 w-5" />}
          value={stats.usuariosNuevos}
          label="Usuarios Nuevos"
          sublabel="Primera vez interactuando"
        />
        <StatCard
          icon={<UserCheck className="h-5 w-5" />}
          value={stats.usuariosRegistrados}
          label="Usuarios Registrados"
          sublabel="Completaron registro"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          value={`${stats.tasaConversion}%`}
          label="Tasa de Conversión"
          sublabel="Porcentaje de usuarios registrados"
          valueColor="text-primary"
        />
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          value={stats.sinRespuesta}
          label="Sin Respuesta"
          sublabel="Sin interacción"
        />
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          value={stats.noContesto}
          label="No Contestó"
          sublabel="Interacción baja"
        />
        <StatCard
          icon={<MessageCircle className="h-5 w-5" />}
          value={stats.noInteresados}
          label="No Interesados"
          sublabel="Interacción media"
        />
      </div>

      {/* Stats Grid - Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={<Heart className="h-5 w-5" />}
          value={stats.interesados}
          label="Interesados"
          sublabel="Alta interacción"
        />
        <StatCard
          icon={<PhoneOff className="h-5 w-5" />}
          value={stats.noContactados}
          label="No Contactados"
          sublabel="Llamadas no realizadas"
        />
        <StatCard
          icon={<Phone className="h-5 w-5" />}
          value={stats.contactados}
          label="Contactados"
          sublabel="Llamadas realizadas"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="orbit-card p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartDataMock.barChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="fecha" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="usuariosTotales" name="Usuarios Totales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="usuariosRegistrados" name="Usuarios Registrados" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="orbit-card p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartDataMock.pieChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ value }) => value}
                outerRadius={100}
                dataKey="value"
              >
                {chartDataMock.pieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
