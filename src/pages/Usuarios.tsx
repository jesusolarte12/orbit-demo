import { useState } from 'react';
import { Search, Plus, User, MoreVertical } from 'lucide-react';
import { usuariosMock } from '@/data/mockData';
import { Pagination } from '@/components/ui/pagination-orbit';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState<{ nombre: string; email: string; tipo: 'Administrador' | 'Comercial' }>({ nombre: '', email: '', tipo: 'Comercial' });
  
  const itemsPerPage = 10;

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const paginatedUsuarios = filteredUsuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleEstado = (userId: string) => {
    setUsuarios(prev => prev.map(u => 
      u.id === userId ? { ...u, estado: !u.estado } : u
    ));
    toast.success('Estado actualizado');
  };

  const handleCreateUser = () => {
    if (!newUser.nombre || !newUser.email) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    const newId = String(usuarios.length + 1);
    setUsuarios(prev => [...prev, {
      id: newId,
      nombre: newUser.nombre,
      email: newUser.email,
      tipo: newUser.tipo,
      estado: true
    }]);
    
    setNewUser({ nombre: '', email: '', tipo: 'Comercial' });
    setShowCreateModal(false);
    toast.success('Usuario creado exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Usuarios</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="orbit-input pl-10 w-80"
            />
          </div>

          {/* Create User Button */}
          <button 
            onClick={() => setShowCreateModal(true)}
            className="orbit-btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Crear Usuario
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="orbit-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="orbit-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsuarios.map((usuario, index) => (
                <tr key={usuario.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-primary hover:underline cursor-pointer">{usuario.nombre}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      {usuario.email.split('@')[0].split('').map((char, i) => (
                        <span key={i} className="bg-muted px-1 py-0.5 rounded text-xs text-muted-foreground">■</span>
                      )).slice(0, 8)}
                    </div>
                  </td>
                  <td>{usuario.tipo}</td>
                  <td>
                    <button
                      onClick={() => toggleEstado(usuario.id)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        usuario.estado ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all",
                        usuario.estado ? "left-6" : "left-0.5"
                      )} />
                    </button>
                  </td>
                  <td>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredUsuarios.length}
            itemsPerPage={itemsPerPage}
            itemName="resultados"
          />
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="orbit-card-glow p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                  className="orbit-input w-full"
                  placeholder="Nombre del usuario"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="orbit-input w-full"
                  placeholder="email@ejemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <select
                  value={newUser.tipo}
                  onChange={(e) => setNewUser({ ...newUser, tipo: e.target.value as 'Administrador' | 'Comercial' })}
                  className="orbit-input w-full"
                >
                  <option value="Comercial">Comercial</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 orbit-btn-primary"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
