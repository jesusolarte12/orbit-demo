import { useState } from 'react';
import { knowledgeDocumentsMock, KnowledgeDocument } from '@/data/mockData';
import ConocimientosCRUD from '@/components/settings/ConocimientosCRUD';

export default function Conocimientos() {
    const [documents, setDocuments] = useState<KnowledgeDocument[]>(knowledgeDocumentsMock);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Conocimientos</h1>
                <p className="text-muted-foreground mt-1">
                    Gestione los documentos de conocimiento y recursos del sistema
                </p>
            </div>

            {/* CRUD Component */}
            <ConocimientosCRUD documents={documents} onUpdate={setDocuments} />
        </div>
    );
}
