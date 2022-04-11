import type { Ref } from 'vue';
import type { ComponentConfig } from '@/types/preset';
import emitter from '@/plugins/emitter';
type HandlerType = (data: Record<string, any>) => void;
type EventSetType<T extends string> = {
    [K in T]: Ref<HandlerType>
}
type SubEventMap<T extends string> = {
    [K in T]: HandlerType
}

export const pubEvents = <T extends string>(config: ComponentConfig) => {
    const pub = computed(() => config.event.pub);
    // const eventSet = {} as EventSetType<T>;

    const eventSet = ref({} as EventSetType<T>);

    watchEffect(() => {
        Object.entries(pub.value).forEach(([name, item]) => {
            const eventName = name as unknown as T;
            const eventId = `${config.name}:${eventName}:${config.id}`;

            const fn: HandlerType = data => {
                if (item.enable === false) return;
                const params: Record<string, any> = {};
                item.keyMap.forEach(({ key, value }) => {
                    params[value] = data[key] || '';
                });
                emitter.publish(eventId, params);
            };
            eventSet.value[eventName] = ref(fn);

            const eventIndex = emitter.events.value.findIndex(e => e.name === eventId);
            if (item.enable) {
                if (eventIndex >= 0) {
                    emitter.events.value[eventIndex].fn = fn;
                    return;
                }
                emitter.events.value.push({
                    name: eventId,
                    desc: `[${config.label}]: ${item.name}`,
                    fn,
                    params: item.keyMap.map(v => v.value),
                });
            } else {
                eventIndex >= 0 && emitter.events.value.splice(eventIndex, 1);
            }
            // console.log(emitter.events);
        });
    });

    return eventSet;
};

export const subEvents = <T extends string>(config: ComponentConfig) => {
    const sub = computed(() => config.event.sub);
    const subMap = {} as SubEventMap<T>;
    const eventSet = ref({} as EventSetType<T>);

    sub.value.forEach(item => {
        const eventName = item.action as unknown as T;
        eventSet.value[eventName] = ref<HandlerType>();
    });

    watchEffect(() => {
        sub.value.forEach(item => {
            const eventName = item.action as unknown as T;
            // cbWarp: {[k in T]: HandlerType} = {};
            subMap[eventName] = data => {
                if (item.enable === false) return;
                const params: Record<string, any> = {};
                item.keyMap.forEach(({ key, value }) => {
                    params[key] = data[value] || '';
                });
                eventSet.value[eventName](params);
            };
            emitter.on(item.originId, subMap[eventName]);
        });
    });

    return eventSet;
};
