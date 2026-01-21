import { useState } from 'react';
import { plantillasMock, Plantilla } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Link2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Plantillas() {
  const [selectedPlantilla, setSelectedPlantilla] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleSelect = (plantillaId: string) => {
    setSelectedPlantilla(plantillaId);
  };

  const handleContinue = () => {
    if (!selectedPlantilla) {
      toast.error('Por favor selecciona una plantilla');
      return;
    }
    
    if (step === 1) {
      setStep(2);
      toast.success('Plantilla seleccionada. Paso 2: Configurar envío');
    } else {
      toast.success('Mensajes enviados exitosamente');
      setSelectedPlantilla(null);
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
          <h1 className="text-xl font-semibold">Seleccionar plantilla</h1>
        </div>
        <span className="text-muted-foreground">Paso {step} de 2</span>
      </div>

      {step === 1 ? (
        /* Plantillas Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plantillasMock.map((plantilla, index) => (
            <button
              key={plantilla.id}
              onClick={() => handleSelect(plantilla.id)}
              className={cn(
                "orbit-card p-4 text-left transition-all duration-200 animate-fade-in hover:border-primary/50",
                selectedPlantilla === plantilla.id && "border-primary ring-1 ring-primary"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Header */}
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
              
              {/* Content preview */}
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {plantilla.contenido}
              </p>
              
              {/* Link button tag */}
              {plantilla.tieneBoton && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Link2 className="h-3 w-3" />
                  Botón
                </div>
              )}
              
              {/* Ver más link */}
              <button className="text-xs text-primary hover:underline mt-2">
                Ver más
              </button>
            </button>
          ))}
        </div>
      ) : (
        /* Step 2: Configure sending */
        <div className="orbit-card-glow p-6 max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Configurar envío</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plantilla seleccionada</label>
              <div className="orbit-input bg-muted/50">
                {plantillasMock.find(p => p.id === selectedPlantilla)?.nombre}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Destinatarios</label>
              <select className="orbit-input w-full">
                <option>Todos los clientes</option>
                <option>Clientes en seguimiento</option>
                <option>Clientes contactados</option>
                <option>Clientes no contactados</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Programar envío</label>
              <input type="datetime-local" className="orbit-input w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
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
