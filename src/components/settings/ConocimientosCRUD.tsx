import { useState } from 'react';
import { KnowledgeDocument } from '@/data/mockData';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConocimientosCRUDProps {
    documents: KnowledgeDocument[];
    onUpdate: (documents: KnowledgeDocument[]) => void;
}

export default function ConocimientosCRUD({ documents, onUpdate }: ConocimientosCRUDProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState<KnowledgeDocument | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(documents[0]?.id || null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '', pdfUrl: '', estado: 'activo' as 'activo' | 'inactivo' });
    const [fileName, setFileName] = useState('');

    const itemsPerPage = 3;
    const totalPages = Math.ceil(documents.length / itemsPerPage);
    const visibleDocs = documents.slice(carouselIndex * itemsPerPage, (carouselIndex + 1) * itemsPerPage);

    const handleAdd = () => {
        setEditingDoc(null);
        setFormData({ nombre: '', descripcion: '', pdfUrl: '', estado: 'activo' });
        setFileName('');
        setIsDialogOpen(true);
    };

    const handleEdit = (doc: KnowledgeDocument) => {
        setEditingDoc(doc);
        setFormData({ nombre: doc.nombre, descripcion: doc.descripcion, pdfUrl: doc.pdfUrl, estado: doc.estado });
        setFileName(doc.pdfUrl.split('/').pop() || '');
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            const updated = documents.filter(d => d.id !== deletingId);
            onUpdate(updated);
            if (selectedDocId === deletingId) {
                setSelectedDocId(updated[0]?.id || null);
            }
            toast.success('Documento eliminado exitosamente');
            setIsDeleteDialogOpen(false);
            setDeletingId(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                toast.error('Solo se permiten archivos PDF');
                return;
            }
            setFileName(file.name);
            setFormData({ ...formData, pdfUrl: `/docs/${file.name}` });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nombre.trim()) {
            toast.error('El nombre es requerido');
            return;
        }

        if (!formData.pdfUrl) {
            toast.error('Debe seleccionar un archivo PDF');
            return;
        }

        if (editingDoc) {
            const updated = documents.map(d =>
                d.id === editingDoc.id ? { ...d, ...formData } : d
            );
            onUpdate(updated);
            toast.success('Documento actualizado exitosamente');
        } else {
            const newDoc: KnowledgeDocument = {
                id: Date.now().toString(),
                ...formData,
                fechaCreacion: new Date().toISOString().split('T')[0],
            };
            onUpdate([...documents, newDoc]);
            setSelectedDocId(newDoc.id);
            toast.success('Documento creado exitosamente');
        }

        setIsDialogOpen(false);
        setFormData({ nombre: '', descripcion: '', pdfUrl: '', estado: 'activo' });
        setFileName('');
    };

    const selectedDoc = documents.find(d => d.id === selectedDocId);

    const nextPage = () => {
        if (carouselIndex < totalPages - 1) {
            setCarouselIndex(carouselIndex + 1);
        }
    };

    const prevPage = () => {
        if (carouselIndex > 0) {
            setCarouselIndex(carouselIndex - 1);
        }
    };

    const toggleEstado = (id: string) => {
        const updated = documents.map(d =>
            d.id === id ? { ...d, estado: d.estado === 'activo' ? 'inactivo' as const : 'activo' as const } : d
        );
        onUpdate(updated);
        toast.success('Estado actualizado');
    };

    return (
        <div className="space-y-6">
            {/* Carousel Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Documentos de Conocimiento</h3>
                    <button onClick={handleAdd} className="orbit-btn-primary flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Agregar Documento
                    </button>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {visibleDocs.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => setSelectedDocId(doc.id)}
                                className={cn(
                                    "orbit-card p-4 text-left transition-all hover:border-primary/50",
                                    selectedDocId === doc.id && "border-primary ring-1 ring-primary"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm truncate">{doc.nombre}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{doc.descripcion}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-xs font-medium",
                                                doc.estado === 'activo' ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                                            )}>
                                                {doc.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{doc.fechaCreacion}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Carousel Navigation */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <button
                                onClick={prevPage}
                                disabled={carouselIndex === 0}
                                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm text-muted-foreground">
                                {carouselIndex + 1} / {totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={carouselIndex === totalPages - 1}
                                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Section */}
            {selectedDoc && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Detalles del Documento</h3>
                    <div className="orbit-card overflow-hidden">
                        <table className="orbit-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Fecha Creación</th>
                                    <th>Estado</th>
                                    <th className="text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">{selectedDoc.nombre}</td>
                                    <td className="text-muted-foreground">{selectedDoc.descripcion}</td>
                                    <td className="text-muted-foreground">{selectedDoc.fechaCreacion}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleEstado(selectedDoc.id)}
                                            className={cn(
                                                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                                                selectedDoc.estado === 'activo'
                                                    ? 'bg-success/20 text-success hover:bg-success/30'
                                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            )}
                                        >
                                            {selectedDoc.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(selectedDoc)}
                                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(selectedDoc.id)}
                                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingDoc ? 'Editar Documento' : 'Agregar Documento'}</DialogTitle>
                        <DialogDescription>
                            Complete los campos para {editingDoc ? 'actualizar' : 'crear'} el documento de conocimiento.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Nombre del Documento</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="orbit-input w-full"
                                    placeholder="Ej: Manual de Ventas 2026"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    className="orbit-input w-full min-h-[80px]"
                                    placeholder="Descripción del documento"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Archivo PDF</label>
                                <div className="flex items-center gap-2">
                                    <label className="orbit-btn-primary cursor-pointer flex items-center gap-2">
                                        <Upload className="h-4 w-4" />
                                        Seleccionar PDF
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {fileName && (
                                        <span className="text-sm text-muted-foreground truncate">{fileName}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="estado-doc"
                                    checked={formData.estado === 'activo'}
                                    onChange={(e) => setFormData({ ...formData, estado: e.target.checked ? 'activo' : 'inactivo' })}
                                    className="w-4 h-4 rounded border-border"
                                />
                                <label htmlFor="estado-doc" className="text-sm font-medium">Documento activo</label>
                            </div>
                        </div>
                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="orbit-btn-primary">
                                {editingDoc ? 'Actualizar' : 'Crear'}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. El documento será eliminado permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
