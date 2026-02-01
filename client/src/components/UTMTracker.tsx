import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

/**
 * UTMTracker: Captura parámetros UTM de la URL y los guarda en sessionStorage
 * para persistencia durante la navegación por todo el sitio.
 */
export default function UTMTracker() {
    const pageContext = usePageContext();
    const currentPath = pageContext.urlPathname || '/';

    useEffect(() => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return;

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const utms: Record<string, string> = {};

            // Lista de parámetros que queremos rastrear
            const trackedParams = [
                'utm_source',
                'utm_medium',
                'utm_campaign',
                'utm_term',
                'utm_content',
                'gclid', // Google Click ID
                'fbclid' // Facebook Click ID
            ];

            let foundAny = false;
            trackedParams.forEach(param => {
                const value = urlParams.get(param);
                if (value) {
                    utms[param] = value;
                    foundAny = true;
                }
            });

            if (foundAny) {
                console.log("[UTMTracker] Capturados nuevos UTMs:", utms);
                // Guardar en sessionStorage para que persista aunque cambie de página
                sessionStorage.setItem('cancagua_tracking', JSON.stringify({
                    ...JSON.parse(sessionStorage.getItem('cancagua_tracking') || '{}'),
                    ...utms,
                    timestamp: new Date().toISOString()
                }));
            }
        } catch (e) {
            console.error("[UTMTracker] Error capturando UTMs", e);
        }
    }, [currentPath]);

    return null; // Componente invisible
}

/**
 * Helper para obtener los UTMs guardados
 */
export function getStoredUTMs() {
    try {
        const stored = sessionStorage.getItem('cancagua_tracking');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
}
