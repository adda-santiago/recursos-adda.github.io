/* Configuración global. Todo lo que cambia entre piloto y producción vive aquí. */
export const SITIO = {
  nombre: 'Recursos Bíblicos',        // nombre visible (DIRECTRICES §4)
  emoji: '📖',                        // favicon, y marca de la cabecera mientras no haya logo
  // Logo de la cabecera: archivo dentro de public/ (p. ej. 'logo.svg'). Vacío = se usa el emoji.
  // Formato cuadrado (símbolo), SVG o PNG de al menos 128 × 128 px; el nombre se escribe al lado.
  logo: '',
  descripcion: 'Mapas, modelos 3D y líneas de tiempo para profundizar en el estudio de la Biblia.',
  idioma: 'es-CL',

  // Buzón: formulario externo (Tally o Google Forms). Se le agregan ?recurso= y ?q=.
  buzonUrl: '',                       // PENDIENTE: pegar la URL del formulario

  anuncios: {
    habilitados: false,               // piloto: SIEMPRE false. Ver DIRECTRICES §10
    clienteAdsense: '',               // ca-pub-XXXXXXXXXXXXXXXX
  },

  analitica: {
    goatcounter: '',                  // p. ej. https://tusitio.goatcounter.com/count ; vacío = desactivada
  },
} as const;
