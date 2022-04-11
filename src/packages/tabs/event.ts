import type { EventKeyMapType } from '@/types/preset';

const event = {
    pub: {
        change: {
            enable: false,
            name: '当Tab切换时',
            keyMap: [
                {
                    key: 'name',
                    label: 'Tab名称',
                    value: 'name',
                },
                {
                    key: 'id',
                    label: 'Tab id',
                    value: 'id',
                },
            ],
        },
    },
    sub: [],
};

type ResFnType = (fn: () => void) => void;
interface EventResType {
    label: string;
    keyMap: EventKeyMapType[];
    fn: ResFnType;
}

export const resAction: Record<string, EventResType> = {
    mutateDate: {
        label: '刷新组件',
        keyMap: [
            {
                key: 'x',
                value: 'x',
                label: '内容',
            },
        ],
        fn: cb => {
            cb();
        },
    },
};

export type EventPubKey = keyof typeof event.pub;
export type EventSubKey = keyof typeof event.sub;
export default event;
