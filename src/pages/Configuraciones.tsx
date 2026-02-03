import { useState } from 'react';
import { prioritiesMock, sedesMock, callStatesMock, knowledgeDocumentsMock, Priority, Sede, CallState, KnowledgeDocument } from '@/data/mockData';
import PrioridadesCRUD from '@/components/settings/PrioridadesCRUD';
import SedesCRUD from '@/components/settings/SedesCRUD';
import EstadosLlamadaCRUD from '@/components/settings/EstadosLlamadaCRUD';
import ConocimientosCRUD from '@/components/settings/ConocimientosCRUD';
import { ChevronDown, Tag, MapPin, Phone, BookOpen, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type AccordionSection = 'prioridades' | 'sedes' | 'estados' | 'conocimientos' | 'plantillas' | null;

export default function Configuraciones() {
    const [openSection, setOpenSection] = useState<AccordionSection>('prioridades');
    const [priorities, setPriorities] = useState<Priority[]>(prioritiesMock);
    const [sedes, setSedes] = useState<Sede[]>(sedesMock);
    const [callStates, setCallStates] = useState<CallState[]>(callStatesMock);
    const [documents, setDocuments] = useState<KnowledgeDocument[]>(knowledgeDocumentsMock);

    const toggleSection = (section: AccordionSection) => {
        setOpenSection(openSection === section ? null : section);
    };

    const sections = [
        {
            id: 'prioridades' as const,
            title: 'Prioridades',
            icon: Tag,
            description: 'Gestionar tags de prioridad para clientes',
            component: <PrioridadesCRUD priorities={priorities} onUpdate={setPriorities} />,
        },
        {
            id: 'sedes' as const,
            title: 'Sedes',
            icon: MapPin,
            description: 'Administrar sedes y ubicaciones',
            component: <SedesCRUD sedes={sedes} onUpdate={setSedes} />,
        },
        {
            id: 'estados' as const,
            title: 'Estados de Llamada',
            icon: Phone,
            description: 'Configurar estados de llamadas',
            component: <EstadosLlamadaCRUD callStates={callStates} onUpdate={setCallStates} />,
        },
        {
            id: 'conocimientos' as const,
            title: 'Conocimientos',
            icon: BookOpen,
            description: 'Gestionar documentos de conocimiento',
            component: <ConocimientosCRUD documents={documents} onUpdate={setDocuments} />,
        },
        {
            id: 'plantillas' as const,
            title: 'Plantillas',
            icon: FileText,
            description: 'Ver y gestionar plantillas de mensajes',
            component: (
                <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                            Las plantillas de mensajes masivos se gestionan en una sección dedicada.
                        </p>
                    </div>
                    <Link to="/plantillas" className="orbit-btn-primary inline-flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Ir a Mensajes Masivos
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Configuraciones</h1>
                <p className="text-muted-foreground mt-1">
                    Gestione las configuraciones del sistema de forma organizada
                </p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const isOpen = openSection === section.id;

                    return (
                        <div
                            key={section.id}
                            className="orbit-card overflow-hidden transition-all duration-200"
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="font-semibold text-lg">{section.title}</h2>
                                        <p className="text-sm text-muted-foreground">{section.description}</p>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={cn(
                                        "h-5 w-5 text-muted-foreground transition-transform duration-200",
                                        isOpen && "transform rotate-180"
                                    )}
                                />
                            </button>

                            {/* Accordion Content */}
                            <div
                                className={cn(
                                    "grid transition-all duration-200 ease-in-out",
                                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-4 pt-0 border-t border-border">
                                        {section.component}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
