import { useState } from 'react';
import { Sede } from '@/data/mockData';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
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

interface SedesCRUDProps {
    sedes: Sede[];
    onUpdate: (sedes: Sede[]) => void;
}

export default function SedesCRUD({ sedes, onUpdate }: SedesCRUDProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingSede, setEditingSede] = useState<Sede | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nombre: '', direccion: '', telefono: '', estado: true });

    const handleAdd = () => {
        setEditingSede(null);
        setFormData({ nombre: '', direccion: '', telefono: '', estado: true });
        setIsDialogOpen(true);
    };

    const handleEdit = (sede: Sede) => {
        setEditingSede(sede);
        setFormData({ nombre: sede.nombre, direccion: sede.direccion, telefono: sede.telefono, estado: sede.estado });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            const updated = sedes.filter(s => s.id !== deletingId);
            onUpdate(updated);
            toast.success('Sede eliminada exitosamente');
            setIsDeleteDialogOpen(false);
            setDeletingId(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nombre.trim()) {
            toast.error('El nombre es requerido');
            return;
        }

        if (editingSede) {
            const updated = sedes.map(s =>
                s.id === editingSede.id ? { ...s, ...formData } : s
            );
            onUpdate(updated);
            toast.success('Sede actualizada exitosamente');
        } else {
            const newSede: Sede = {
                id: Date.now().toString(),
                ...formData,
            };
            onUpdate([...sedes, newSede]);
            toast.success('Sede creada exitosamente');
        }

        setIsDialogOpen(false);
        setFormData({ nombre: '', direccion: '', telefono: '', estado: true });
    };

    const toggleEstado = (id: string) => {
        const updated = sedes.map(s =>
            s.id === id ? { ...s, estado: !s.estado } : s
        );
        onUpdate(updated);
        toast.success('Estado actualizado');
    };

    return (
        <div className="space-y-4">
            {/* Informational Message */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                    En esta sección podrá configurar las sedes de forma clara y organizada.
                    También podrá agregar, editar o eliminar estas sedes según sus necesidades.
                </p>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
                <button onClick={handleAdd} className="orbit-btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Sede
                </button>
            </div>

            {/* Table */}
            <div className="orbit-card overflow-hidden">
                <table className="orbit-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th className="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sedes.map((sede) => (
                            <tr key={sede.id}>
                                <td className="font-medium">{sede.nombre}</td>
                                <td className="text-muted-foreground">{sede.direccion}</td>
                                <td className="text-muted-foreground">{sede.telefono}</td>
                                <td>
                                    <button
                                        onClick={() => toggleEstado(sede.id)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${sede.estado
                                                ? 'bg-success/20 text-success hover:bg-success/30'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            }`}
                                    >
                                        {sede.estado ? 'Activo' : 'Inactivo'}
                                    </button>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(sede)}
                                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Pencil className="h-4 w-4 text-primary" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sede.id)}
                                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingSede ? 'Editar Sede' : 'Agregar Sede'}</DialogTitle>
                        <DialogDescription>
                            Complete los campos para {editingSede ? 'actualizar' : 'crear'} la sede.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="orbit-input w-full"
                                    placeholder="Ej: Bucaramanga, Bogotá"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Dirección</label>
                                <input
                                    type="text"
                                    value={formData.direccion}
                                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                    className="orbit-input w-full"
                                    placeholder="Dirección completa"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Teléfono</label>
                                <input
                                    type="text"
                                    value={formData.telefono}
                                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                    className="orbit-input w-full"
                                    placeholder="Ej: 607 123 4567"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="estado"
                                    checked={formData.estado}
                                    onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
                                    className="w-4 h-4 rounded border-border"
                                />
                                <label htmlFor="estado" className="text-sm font-medium">Sede activa</label>
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
                                {editingSede ? 'Actualizar' : 'Crear'}
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
                            Esta acción no se puede deshacer. La sede será eliminada permanentemente.
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
