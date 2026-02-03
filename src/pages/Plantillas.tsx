import { useState } from 'react';
import { plantillasMock, clientesMock } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Link2, Search, CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';

export default function Plantillas() {
  const [selectedPlantilla, setSelectedPlantilla] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const filteredClients = clientesMock.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.includes(searchTerm)
  );

  const handleSelectPlantilla = (plantillaId: string) => {
    setSelectedPlantilla(plantillaId);
  };

  const toggleClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const toggleAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(c => c.id));
    }
  };

  const handleContinue = () => {
    if (!selectedPlantilla) {
      toast.error('Por favor selecciona una plantilla');
      return;
    }

    if (step === 1) {
      setStep(2);
      toast.success('Paso 2: Selecciona los destinatarios');
    } else {
      if (selectedClients.length === 0) {
        toast.error('Selecciona al menos un destinatario');
        return;
      }
      toast.success(`Mensajes enviados exitosamente a ${selectedClients.length} destinatarios`);
      setSelectedPlantilla(null);
      setSelectedClients([]);
      setStep(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            {step}
          </div>
          <h1 className="text-xl font-semibold">
            {step === 1 ? 'Seleccionar plantilla' : 'Seleccionar destinatarios'}
          </h1>
        </div>
        <span className="text-muted-foreground">Paso {step} de 2</span>
      </div>

      {step === 1 ? (
        /* Plantillas Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plantillasMock.map((plantilla, index) => (
            <button
              key={plantilla.id}
              onClick={() => handleSelectPlantilla(plantilla.id)}
              className={cn(
                "orbit-card p-4 text-left transition-all duration-200 animate-fade-in hover:border-primary/50",
                selectedPlantilla === plantilla.id && "border-primary ring-1 ring-primary"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-primary font-medium text-sm truncate pr-2">
                  {plantilla.nombre}
                </h3>
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors",
                  selectedPlantilla === plantilla.id
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                )} />
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {plantilla.contenido}
              </p>

              {plantilla.tieneBoton && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Link2 className="h-3 w-3" />
                  Botón
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        /* Step 2: Select Recipients */
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="orbit-input pl-10 w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {selectedClients.length} seleccionados
              </span>
              <button
                onClick={toggleAll}
                className="text-sm text-primary hover:underline font-medium"
              >
                {selectedClients.length === filteredClients.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </button>
            </div>
          </div>

          <div className="orbit-card overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="orbit-table">
                <thead className="sticky top-0 bg-card z-10">
                  <tr>
                    <th className="w-10">
                      <button onClick={toggleAll}>
                        {selectedClients.length === filteredClients.length ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Ciudad</th>
                    <th>Prioridad</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className={cn(
                        "cursor-pointer hover:bg-muted/50 transition-colors",
                        selectedClients.includes(cliente.id) && "bg-primary/5"
                      )}
                      onClick={() => toggleClient(cliente.id)}
                    >
                      <td>
                        {selectedClients.includes(cliente.id) ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </td>
                      <td className="font-medium">{cliente.nombre}</td>
                      <td className="text-muted-foreground">{cliente.telefono}</td>
                      <td className="text-muted-foreground">{cliente.ciudad}</td>
                      <td>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          cliente.prioridad === 'Alta' ? "bg-destructive/20 text-destructive" :
                            cliente.prioridad === 'Media' ? "bg-warning/20 text-warning" :
                              "bg-success/20 text-success"
                        )}>
                          {cliente.prioridad}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border">
        <button
          onClick={() => step === 2 ? setStep(1) : setSelectedPlantilla(null)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {step === 2 ? 'Volver' : 'Limpiar selección'}
        </button>
        <button
          onClick={handleContinue}
          className="orbit-btn-primary px-8"
        >
          {step === 1 ? 'Continuar' : 'Enviar Mensajes'}
        </button>
      </div>
    </div>
  );
}

