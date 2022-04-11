import type { EventKeyMapType } from '@/types/preset';

// type ResFnType = (fn: () => void) => void;
interface ResActionType {
    label: string;
    keyMap: EventKeyMapType[];
    // fn: ResFnType;
}

export interface InfoType {
    resAction?: Record<string, ResActionType>;
}
