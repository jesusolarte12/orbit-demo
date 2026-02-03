import { useState } from 'react';
import { Search, User, FileText, ToggleLeft } from 'lucide-react';
import { chatsMock, comercialesOptions } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Chats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(chatsMock[0]);
  const [iaActive, setIaActive] = useState(false);
  const [selectedComercial, setSelectedComercial] = useState('Juan Sebastian');

  const filteredChats = chatsMock.filter(chat =>
    chat.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 overflow-hidden orbit-card">
      {/* Chat List */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar chat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="orbit-input pl-10 w-full text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat, index) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full p-3 flex items-start gap-3 border-b border-border/50 hover:bg-muted/50 transition-colors animate-fade-in text-left",
                selectedChat.id === chat.id && "bg-muted"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                {chat.mensajesSinLeer > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {chat.mensajesSinLeer > 9 ? '9+' : chat.mensajesSinLeer}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    chat.estado === 'Desconocido' ? "bg-muted text-muted-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    ⏱ {chat.estado}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                    <User className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-sm truncate">{chat.clienteNombre}</span>
                </div>
                <div className={cn(
                  "text-xs mt-1",
                  chat.estadoContacto === 'contactado' ? "text-success" : "text-destructive"
                )}>
                  {chat.estadoContacto === 'contactado' ? 'Contactado' : 'No contactado'}
                </div>
              </div>

              {/* Time & Actions */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-muted-foreground">{chat.hora}</span>
                <button className="p-1 hover:bg-muted rounded">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">{selectedChat.clienteNombre}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Comercial:</span>
              <select
                value={selectedComercial}
                onChange={(e) => setSelectedComercial(e.target.value)}
                className="bg-transparent border border-border rounded px-2 py-1 text-sm"
              >
              {comercialesOptions
                .filter(c => c.value !== 'Todos')
                .map(c => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
              <FileText className="h-4 w-4" />
              Notas
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm">IA</span>
              <button
                onClick={() => setIaActive(!iaActive)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  iaActive ? "bg-primary" : "bg-muted"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all",
                  iaActive ? "left-6" : "left-0.5"
                )} />
              </button>
              <span className="text-sm text-muted-foreground">Admin</span>
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat.mensajes.map((mensaje) => (
            <div
              key={mensaje.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                mensaje.esUsuario ? "justify-start" : "justify-end"
              )}
            >
              {mensaje.esUsuario && (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              
              <div className={cn(
                "max-w-lg rounded-lg p-4",
                mensaje.esUsuario 
                  ? "bg-muted text-foreground" 
                  : "bg-card border border-border"
              )}>
                {mensaje.esIA && (
                  <div className="text-xs font-semibold text-foreground mb-2">IA</div>
                )}
                <p className="text-sm whitespace-pre-wrap">{mensaje.contenido}</p>
                <div className="text-xs text-muted-foreground mt-2 text-right">
                  {mensaje.fecha}
                </div>
              </div>

              {!mensaje.esUsuario && (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input - Disabled notice */}
        <div className="p-4 border-t border-border">
          <div className="text-center text-sm text-muted-foreground py-3">
            No puedes enviar mensajes cuando el agente está activo (IA).
          </div>
        </div>
      </div>
    </div>
  );
}
