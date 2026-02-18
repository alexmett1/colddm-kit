export type MessageType = "opener" | "followUp" | "objection";

export interface SavedMessage {
  id: string;
  type: MessageType;
  text: string;
  savedAt: number;
}

const STORAGE_KEY = "colddm-saved-messages";

function getAll(): SavedMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(type: MessageType, text: string): SavedMessage {
  const items = getAll();
  const msg: SavedMessage = {
    id: crypto.randomUUID(),
    type,
    text,
    savedAt: Date.now(),
  };
  items.push(msg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return msg;
}

function remove(id: string): void {
  const items = getAll().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export const storage = { getAll, save, remove, clearAll };
