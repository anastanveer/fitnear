"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<(message: string, type?: ToastType) => void>(
  () => {},
);

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
};

const accent: Record<ToastType, string> = {
  success: "text-lime-400",
  error: "text-rose-400",
  info: "text-sky-400",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => dismiss(id), 3600);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-[5rem] z-[100] flex flex-col items-center gap-2 px-4 lg:bottom-6">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/95 px-4 py-3 text-sm font-medium text-fg-invert shadow-2xl backdrop-blur"
              >
                <Icon className={cn("h-4.5 w-4.5 shrink-0", accent[t.type])} />
                <span className="flex-1">{t.message}</span>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss"
                  className="shrink-0 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
