import { useState } from 'react';
import { Priority } from '@/data/mockData';
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

interface PrioridadesCRUDProps {
    priorities: Priority[];
    onUpdate: (priorities: Priority[]) => void;
}

export default function PrioridadesCRUD({ priorities, onUpdate }: PrioridadesCRUDProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingPriority, setEditingPriority] = useState<Priority | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nombre: '', color: '#3b82f6', descripcion: '' });

    const handleAdd = () => {
        setEditingPriority(null);
        setFormData({ nombre: '', color: '#3b82f6', descripcion: '' });
        setIsDialogOpen(true);
    };

    const handleEdit = (priority: Priority) => {
        setEditingPriority(priority);
        setFormData({ nombre: priority.nombre, color: priority.color, descripcion: priority.descripcion });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            const updated = priorities.filter(p => p.id !== deletingId);
            onUpdate(updated);
            toast.success('Prioridad eliminada exitosamente');
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

        if (editingPriority) {
            const updated = priorities.map(p =>
                p.id === editingPriority.id ? { ...p, ...formData } : p
            );
            onUpdate(updated);
            toast.success('Prioridad actualizada exitosamente');
        } else {
            const newPriority: Priority = {
                id: Date.now().toString(),
                ...formData,
            };
            onUpdate([...priorities, newPriority]);
            toast.success('Prioridad creada exitosamente');
        }

        setIsDialogOpen(false);
        setFormData({ nombre: '', color: '#3b82f6', descripcion: '' });
    };

    return (
        <div className="space-y-4">
            {/* Informational Message */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                    En esta sección podrá configurar los tags de prioridad asignados a cada cliente de forma clara y organizada.
                    También podrá agregar, editar o eliminar estos tags según sus necesidades.
                </p>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
                <button onClick={handleAdd} className="orbit-btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Prioridad
                </button>
            </div>

            {/* Table */}
            <div className="orbit-card overflow-hidden">
                <table className="orbit-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Color</th>
                            <th>Descripción</th>
                            <th className="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priorities.map((priority) => (
                            <tr key={priority.id}>
                                <td className="font-medium">{priority.nombre}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded border border-border"
                                            style={{ backgroundColor: priority.color }}
                                        />
                                        <span className="text-sm text-muted-foreground">{priority.color}</span>
                                    </div>
                                </td>
                                <td className="text-muted-foreground">{priority.descripcion}</td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(priority)}
                                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Pencil className="h-4 w-4 text-primary" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(priority.id)}
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
                        <DialogTitle>{editingPriority ? 'Editar Prioridad' : 'Agregar Prioridad'}</DialogTitle>
                        <DialogDescription>
                            Complete los campos para {editingPriority ? 'actualizar' : 'crear'} la prioridad.
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
                                    placeholder="Ej: Alta, Media, Baja"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="h-10 w-20 rounded border border-border cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="orbit-input flex-1"
                                        placeholder="#3b82f6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    className="orbit-input w-full min-h-[80px]"
                                    placeholder="Descripción de la prioridad"
                                />
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
                                {editingPriority ? 'Actualizar' : 'Crear'}
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
                            Esta acción no se puede deshacer. La prioridad será eliminada permanentemente.
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
