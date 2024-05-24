import { writable } from "svelte/store";

interface Toast {
  id: number;
  message: string;
  type: string;
  dismissible: boolean;
  timeout: number;
}

export const toasts = writable<Toast[]>([]);

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};

export const addToast = (message: string) => {
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults: Toast = {
    id,
    message,
    type: "info",
    dismissible: true,
    timeout: 3000,
  };
  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
};
