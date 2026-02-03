import { useState } from 'react';
import { prioritiesMock, Priority } from '@/data/mockData';
import PrioridadesCRUD from '@/components/settings/PrioridadesCRUD';

export default function Prioridades() {
    const [priorities, setPriorities] = useState<Priority[]>(prioritiesMock);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Prioridades</h1>
                <p className="text-muted-foreground mt-1">
                    Gestione los tags de prioridad asignados a cada cliente
                </p>
            </div>

            {/* CRUD Component */}
            <PrioridadesCRUD priorities={priorities} onUpdate={setPriorities} />
        </div>
    );
}
