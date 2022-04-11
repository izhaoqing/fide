// import type { Ref } from 'vue';
// import type { InfoType } from '@/types/info';

const event = {
    pub: {
        mounted: {
            enable: false,
            name: '当组件挂载时',
            keyMap: [
                {
                    key: 'x',
                    value: 'x',
                    label: '内容',
                },
            ],
        },
        fetchData: {
            enable: false,
            name: '当数据响应时',
            keyMap: [
                {
                    key: 'x',
                    value: 'x',
                    label: '内容',
                },
            ],
        },
        destroyed: {
            enable: false,
            name: '当组件卸载时',
            keyMap: [
                {
                    key: 'x',
                    value: 'x',
                    label: '内容',
                },
            ],
        },
        clickContent: {
            enable: false,
            name: '当点击内容时',
            keyMap: [
                {
                    key: 'x',
                    value: 'x',
                    label: '内容',
                },
            ],
        },
    },
    sub: [],
};

export const resAction = {
    mutateDate: {
        label: '刷新组件',
        keyMap: [
            {
                key: 'x',
                value: '',
                label: '内容',
            },
        ],
    },
};

export type EventPubKey = keyof typeof event.pub;
export type EventSubKey = keyof typeof resAction;
export default event;
