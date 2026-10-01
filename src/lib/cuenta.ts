/*
 * Estado de la cuenta del visitante. En el piloto no hay login:
 * todos son anónimos y nadie tiene plan sin anuncios.
 * Cuando existan cuentas (solo profesores; los alumnos nunca necesitan cuenta),
 * esta función consultará el backend. Los componentes solo preguntan por
 * capacidades ("¿puede ver sin anuncios?"), nunca por planes concretos.
 */
export type Plan = 'anonimo' | 'gratis' | 'sin-anuncios';

export interface EstadoCuenta {
  plan: Plan;
  sinAnuncios: boolean;
}

export async function estadoCuenta(): Promise<EstadoCuenta> {
  return { plan: 'anonimo', sinAnuncios: false };
}
