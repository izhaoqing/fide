import type { Ref } from 'vue';

export type CallbackType = (...args: any[]) => void;

export interface EventItemType {
    name: string;
    desc: string;
    fn: (params: Record<string, any>) => void;
    params: string[];
}
interface EmitterType {
    on: (eventName: string, cb: CallbackType) => void;
    publish: (eventName: string, ...args: any[]) => void;
    events: Ref<EventItemType[]>;
}

const handlers: Record<string, CallbackType[]> = {};

const emitter: EmitterType = {
    on(eventName, cb) {
        handlers[eventName] = handlers[eventName] || [];
        handlers[eventName].push(cb);
    },
    publish(eventName, ...args) {
        if (handlers[eventName]) {
            handlers[eventName].forEach(fn => {
                fn(...args);
            });
        }
    },
    events: ref([]),
};

export default emitter;
