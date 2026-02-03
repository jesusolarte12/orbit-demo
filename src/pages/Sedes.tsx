import { useState } from 'react';
import { sedesMock, Sede } from '@/data/mockData';
import SedesCRUD from '@/components/settings/SedesCRUD';

export default function Sedes() {
    const [sedes, setSedes] = useState<Sede[]>(sedesMock);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Sedes</h1>
                <p className="text-muted-foreground mt-1">
                    Administre las sedes y ubicaciones de la organización
                </p>
            </div>

            {/* CRUD Component */}
            <SedesCRUD sedes={sedes} onUpdate={setSedes} />
        </div>
    );
}
