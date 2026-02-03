import { useState } from 'react';
import { CallState } from '@/data/mockData';
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

interface EstadosLlamadaCRUDProps {
    callStates: CallState[];
    onUpdate: (callStates: CallState[]) => void;
}

export default function EstadosLlamadaCRUD({ callStates, onUpdate }: EstadosLlamadaCRUDProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingState, setEditingState] = useState<CallState | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nombre: '', color: '#3b82f6', descripcion: '' });

    const handleAdd = () => {
        setEditingState(null);
        setFormData({ nombre: '', color: '#3b82f6', descripcion: '' });
        setIsDialogOpen(true);
    };

    const handleEdit = (state: CallState) => {
        setEditingState(state);
        setFormData({ nombre: state.nombre, color: state.color, descripcion: state.descripcion });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            const updated = callStates.filter(s => s.id !== deletingId);
            onUpdate(updated);
            toast.success('Estado de llamada eliminado exitosamente');
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

        if (editingState) {
            const updated = callStates.map(s =>
                s.id === editingState.id ? { ...s, ...formData } : s
            );
            onUpdate(updated);
            toast.success('Estado de llamada actualizado exitosamente');
        } else {
            const newState: CallState = {
                id: Date.now().toString(),
                ...formData,
            };
            onUpdate([...callStates, newState]);
            toast.success('Estado de llamada creado exitosamente');
        }

        setIsDialogOpen(false);
        setFormData({ nombre: '', color: '#3b82f6', descripcion: '' });
    };

    return (
        <div className="space-y-4">
            {/* Informational Message */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                    En esta sección podrá configurar los estados de llamadas de forma clara y organizada.
                    También podrá agregar, editar o eliminar estos estados según sus necesidades.
                </p>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
                <button onClick={handleAdd} className="orbit-btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Estado
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
                        {callStates.map((state) => (
                            <tr key={state.id}>
                                <td className="font-medium">{state.nombre}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded border border-border"
                                            style={{ backgroundColor: state.color }}
                                        />
                                        <span className="text-sm text-muted-foreground">{state.color}</span>
                                    </div>
                                </td>
                                <td className="text-muted-foreground">{state.descripcion}</td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(state)}
                                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Pencil className="h-4 w-4 text-primary" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(state.id)}
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
                        <DialogTitle>{editingState ? 'Editar Estado de Llamada' : 'Agregar Estado de Llamada'}</DialogTitle>
                        <DialogDescription>
                            Complete los campos para {editingState ? 'actualizar' : 'crear'} el estado de llamada.
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
                                    placeholder="Ej: Contactado, No Contesta"
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
                                    placeholder="Descripción del estado"
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
                                {editingState ? 'Actualizar' : 'Crear'}
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
                            Esta acción no se puede deshacer. El estado de llamada será eliminado permanentemente.
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
