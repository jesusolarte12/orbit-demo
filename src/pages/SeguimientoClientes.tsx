import { useState } from 'react';
import { Search, Sparkles, Edit2, ChevronDown } from 'lucide-react';
import { clientesMock, comercialesOptions } from '@/data/mockData';
import { Pagination } from '@/components/ui/pagination-orbit';
import { cn } from '@/lib/utils';

export default function SeguimientoClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [estadoStates, setEstadoStates] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;

  // Filter only clients with seguimiento = true
  const clientesEnSeguimiento = clientesMock.filter(c => c.seguimiento);

  const filteredClientes = clientesEnSeguimiento.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEstadoChange = (clienteId: string, value: string) => {
    setEstadoStates(prev => ({ ...prev, [clienteId]: value }));
  };

  const getInteresConfig = (interes: string | null) => {
    const config: Record<string, { text: string; className: string }> = {
      interesado: { text: '♡ interesado', className: 'text-primary border-primary/30' },
      no_interesado: { text: '♡ no interes...', className: 'text-destructive border-destructive/30' },
      no_contesto: { text: '♡ no contest...', className: 'text-destructive border-destructive/30' },
    };
    return interes ? config[interes] : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Clientes en seguimiento</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="orbit-input pl-10 w-80"
          />
        </div>
      </div>

      {/* Table */}
      <div className="orbit-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="orbit-table">
            <thead>
              <tr>
                <th>Seguimient...</th>
                <th>Fecha ⌄</th>
                <th>Nombre ↕</th>
                <th>Teléfono ↕</th>
                <th>Edad ↕</th>
                <th>Notas</th>
                <th>Resultado Pr...</th>
                <th>Comercial</th>
                <th>Interes</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedClientes.map((cliente, index) => {
                const interesConfig = getInteresConfig(cliente.estadoInteres);
                const currentEstado = estadoStates[cliente.id] || 'Borrador';
                
                return (
                  <tr key={cliente.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <td>
                      <div className="w-4 h-4 rounded-full bg-primary" />
                    </td>
                    <td className="text-muted-foreground">{cliente.fechaRegistro}</td>
                    <td>
                      <span className="text-primary hover:underline cursor-pointer">
                        {cliente.nombre}
                        {cliente.id === '11' && ' 🔥👑'}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        {cliente.telefono.split(' ').slice(0, 2).map((part, i) => (
                          <span key={i} className="bg-muted px-1.5 py-0.5 rounded text-xs text-muted-foreground">{part}</span>
                        ))}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{cliente.edad}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">{cliente.notas || 'Sin comentarios'}</span>
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">Sin resultado</span>
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className="text-primary hover:underline cursor-pointer">{cliente.comercial}</span>
                    </td>
                    <td>
                      {interesConfig && (
                        <button className={cn(
                          "flex items-center gap-1 text-sm px-2 py-1 rounded border",
                          interesConfig.className
                        )}>
                          {interesConfig.text}
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      )}
                    </td>
                    <td>
                      <select
                        value={currentEstado}
                        onChange={(e) => handleEstadoChange(cliente.id, e.target.value)}
                        className="bg-muted border border-border rounded px-3 py-1.5 text-sm"
                      >
                        <option value="Borrador">Borrador</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completado">Completado</option>
                      </select>
                    </td>
                    <td>
                      <select className="bg-transparent text-muted-foreground text-sm">
                        <option>Selec...</option>
                        <option>Llamar</option>
                        <option>Mensaje</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-primary/30">
          <div className="h-full bg-primary" style={{ width: '30%' }} />
        </div>
        
        <div className="p-4 border-t border-border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredClientes.length}
            itemsPerPage={itemsPerPage}
            itemName="clientes"
          />
        </div>
      </div>
    </div>
  );
}
