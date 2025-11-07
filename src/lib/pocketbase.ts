import PocketBase from "pocketbase";

export const pb = new PocketBase("http://10.56.2.17:8091"); // cambia según tu URL


// Guardar sesión en cookies
pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie();
});
