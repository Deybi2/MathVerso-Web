import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase("http://192.168.0.7:8090");

// Guardar sesión en cookies
pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie();
});

export function usePocketBase() {
    const [usuario, setUsuario] = useState(pb.authStore.model);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, model) => { // Usar _token para indicar que no se usa
    setUsuario(model);
    setCargando(false);
    });

        if (pb.authStore.isValid) {
        pb.collection('users').authRefresh();
        } else {
            setCargando(false);
        }

        return unsubscribe;
    }, []);

    return { usuario, cargando, pb };
}

export { pb };