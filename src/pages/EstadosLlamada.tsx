import { useState } from 'react';
import { callStatesMock, CallState } from '@/data/mockData';
import EstadosLlamadaCRUD from '@/components/settings/EstadosLlamadaCRUD';

export default function EstadosLlamada() {
    const [callStates, setCallStates] = useState<CallState[]>(callStatesMock);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Estados de Llamada</h1>
                <p className="text-muted-foreground mt-1">
                    Configure los estados de llamadas del sistema
                </p>
            </div>

            {/* CRUD Component */}
            <EstadosLlamadaCRUD callStates={callStates} onUpdate={setCallStates} />
        </div>
    );
}
