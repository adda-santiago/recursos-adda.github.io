/*
 * Capa de almacenamiento. HOY guarda en el navegador (localStorage).
 * MAÑANA, cuando existan cuentas, esta misma interfaz leerá y escribirá
 * en el backend (Supabase u otro) sin que la interfaz de usuario cambie.
 * Regla: ningún componente usa localStorage directamente; todo pasa por aquí.
 * Se guardan `uid` de recursos, nunca títulos ni rutas (pueden cambiar).
 */
const PREFIJO = 'fyp:v1:';

function leer<T>(clave: string, porDefecto: T): T {
  try {
    const v = localStorage.getItem(PREFIJO + clave);
    return v ? (JSON.parse(v) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

function escribir(clave: string, valor: unknown): void {
  try {
    localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora, la app sigue funcionando */
  }
}

export interface Almacen {
  favoritos(): Promise<string[]>;
  esFavorito(uid: string): Promise<boolean>;
  alternarFavorito(uid: string): Promise<boolean>;
  versionBiblia(): string | null;              // id de public/biblia/versiones.json; null = la versión por defecto
  cambiarVersionBiblia(id: string): void;     // la leen también las apps (citas.js) con la misma clave
  exportar(): Promise<Record<string, unknown>>; // para migrar a la cuenta en el primer login
}

export const almacenLocal: Almacen = {
  async favoritos() {
    return leer<string[]>('favoritos', []);
  },
  async esFavorito(uid) {
    return (await this.favoritos()).includes(uid);
  },
  async alternarFavorito(uid) {
    const lista = await this.favoritos();
    const i = lista.indexOf(uid);
    if (i >= 0) lista.splice(i, 1);
    else lista.unshift(uid);
    escribir('favoritos', lista);
    return i < 0;
  },
  versionBiblia() {
    return leer<string | null>('version-biblia', null);
  },
  cambiarVersionBiblia(id) {
    escribir('version-biblia', id);
  },
  async exportar() {
    return { favoritos: await this.favoritos(), versionBiblia: this.versionBiblia() };
  },
};

// Punto único de cambio: cuando haya cuentas, se elige aquí el almacén remoto.
export const almacen: Almacen = almacenLocal;
