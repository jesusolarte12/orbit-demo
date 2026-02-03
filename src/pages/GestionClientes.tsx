import { useState } from 'react';
import { Search, Calendar, FileSpreadsheet, Phone, PhoneOff, ChevronDown, Users } from 'lucide-react';
import { clientesMock, sedesOptions, comercialesOptions, prioridadOptions } from '@/data/mockData';
import { Pagination } from '@/components/ui/pagination-orbit';
import { SelectOrbit } from '@/components/ui/select-orbit';
import { cn } from '@/lib/utils';

export default function GestionClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sedeFilter, setSedeFilter] = useState('Sedes');
  const [comercialFilter, setComercialFilter] = useState('Comercial');
  const [prioridadFilter, setPrioridadFilter] = useState('Prioridad');
  const [interesStates, setInteresStates] = useState<Record<string, string>>({});

  const itemsPerPage = 10;

  const filteredClientes = clientesMock.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm) ||
      cliente.cedula.includes(searchTerm);
    const matchesSede = sedeFilter === 'Sedes' || sedeFilter === 'Todas' || cliente.ciudad === sedeFilter;
    const matchesComercial = comercialFilter === 'Comercial' || comercialFilter === 'Todos' || cliente.comercial === comercialFilter;
    const matchesPrioridad = prioridadFilter === 'Prioridad' || prioridadFilter === 'Todas' || cliente.prioridad === prioridadFilter;
    return matchesSearch && matchesSede && matchesComercial && matchesPrioridad;
  });

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInteresChange = (clienteId: string, value: string) => {
    setInteresStates(prev => ({ ...prev, [clienteId]: value }));
  };

  const getInteresDisplay = (cliente: typeof clientesMock[0]) => {
    const currentInteres = interesStates[cliente.id] || cliente.estadoInteres;

    if (!currentInteres) return null;

    const config: Record<string, { text: string; className: string }> = {
      interesado: { text: '♡ interesado', className: 'text-primary' },
      no_interesado: { text: '♡ no interes...', className: 'text-destructive' },
      no_contesto: { text: '♡ no contest...', className: 'text-destructive' },
    };

    return config[currentInteres];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Gestión Clientes</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, tel o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="orbit-input pl-10 w-64"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm">
            <Calendar className="h-4 w-4" />
            30-14/01/26
          </button>

          <button className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <FileSpreadsheet className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-end">
        <SelectOrbit
          value={sedeFilter}
          onChange={setSedeFilter}
          options={sedesOptions}
          className="w-40"
        />
        <SelectOrbit
          value={comercialFilter}
          onChange={setComercialFilter}
          options={comercialesOptions}
          className="w-40"
        />
        <SelectOrbit
          value={prioridadFilter}
          onChange={setPrioridadFilter}
          options={prioridadOptions}
          className="w-40"
        />
      </div>

   <div className="orbit-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="orbit-table">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Usuario</th>
                <th>Teléfono</th>
                <th>Sede</th>
                <th>Seguimiento</th>
                <th>Últ. interacción</th>
                <th>Estado llamada</th> 
                <th>N° de llamadas</th>
                <th>Fecha llamada</th>
                <th>Interés</th> 
                <th>Comercial</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClientes.map((cliente, index) => {
                const interesDisplay = getInteresDisplay(cliente);

                return (
                  <tr
                    key={cliente.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="text-center">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          cliente.estado === 'registrado'
                            ? "bg-success/20 text-success border border-success/20"
                            : "bg-muted text-muted-foreground border border-border"
                        )}
                      >
                        {cliente.estado === 'registrado'
                          ? 'Registrado'
                          : 'No registrado'}
                      </span>
                    </td>

                    <td>
                      <span className="text-primary hover:underline cursor-pointer">
                        {cliente.nombre}
                      </span>
                    </td>
                    <td className="text-muted-foreground whitespace-nowrap">
                      {cliente.telefono}
                    </td>

                    <td className="text-muted-foreground">
                      {cliente.sede ?? cliente.ciudad}
                    </td>

                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-primary"
                        checked={cliente.seguimiento ?? false}
                        onChange={() => {
                        }}
                      />
                    </td>

                    <td className="text-muted-foreground whitespace-nowrap">
                      {cliente.ultimaInteraccion}
                    </td>

                    <td>
                      <select
                        className="bg-transparent border border-border rounded px-2 py-1 text-sm"
                        value={cliente.estadoLlamada}
                        onChange={(e) => {
                          cliente.estadoLlamada = e.target.value as any;
                        }}
                      >
                        <option value="contactado">Contactado</option>
                        <option value="no_contactado">No contactado</option>
                      </select>
                    </td>



                    <td className="text-muted-foreground text-center">
                      {cliente.numLlamadas ?? 0}
                    </td>

                    {/* Fecha llamada */}
                    <td className="text-muted-foreground whitespace-nowrap">
                      {cliente.fechaLlamada ?? '-'}
                    </td>

                    {/* Interés (selector / botón como ya tenías) */}
                    <td>
                      {interesDisplay ? (
                        <button
                          className={cn(
                            "flex items-center gap-1 text-sm",
                            interesDisplay.className
                          )}
                          onClick={() =>
                            handleInteresChange(
                              cliente.id,
                              cliente.estadoInteres === 'interesado'
                                ? 'no_interesado'
                                : 'interesado'
                            )
                          }
                        >
                          {interesDisplay.text}
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      ) : (
                        <select
                          className="bg-transparent border border-border rounded px-2 py-1 text-sm text-muted-foreground"
                          onChange={(e) =>
                            handleInteresChange(cliente.id, e.target.value)
                          }
                          defaultValue=""
                        >
                          <option value="">Seleccionar</option>
                          <option value="interesado">Interesado</option>
                          <option value="no_interesado">No interesado</option>
                          <option value="no_contesto">No contestó</option>
                        </select>
                      )}
                    </td>

                    <td>
                      <select
                        className="bg-transparent border border-border rounded px-2 py-1 text-sm"
                        value={cliente.comercial}
                        onChange={(e) => {
                          cliente.comercial = e.target.value;
                        }}
                      >
                        {comercialesOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>


                    {/* Prioridad */}
                    <td>
                      <select
                        className={cn(
                          "border rounded px-2 py-1 text-sm font-medium",
                          cliente.prioridad === 'Alta'
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : cliente.prioridad === 'Media'
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-success/10 text-success border-success/20"
                        )}
                        value={cliente.prioridad}
                        onChange={(e) => {
                          cliente.prioridad = e.target.value as any;
                        }}
                      >
                        {prioridadOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
