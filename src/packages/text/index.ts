import { cloneDeep } from 'lodash';
import FText from './FText.vue';
import event, { resAction } from './event';
import type { ComponentConfig } from '@/types/preset';

export const config: () => ComponentConfig = () => ({
    name: 'FText',
    label: '文本',
    id: '',
    basic: {
        width: {
            component: 'NInputNumber',
            name: 'width',
            label: '宽度',
            value: 400,
        },
        height: {
            component: 'NInputNumber',
            name: 'height',
            label: '高度',
            value: 200,
        },
        minH: {
            name: 'minH',
            label: '最小高度',
            value: 100,
        },
        minW: {
            name: 'minW',
            label: '最小宽度',
            value: 100,
        },
        left: {
            component: 'NInputNumber',
            name: 'left',
            label: '位置x',
            value: 400,
        },
        top: {
            component: 'NInputNumber',
            name: 'top',
            label: '位置y',
            value: 400,
        },
        bgColor: {
            component: 'NColorPicker',
            name: 'bgColor',
            label: '背景',
            value: 'rgba(0, 0, 0, 0)',
        },
        fontSize: {
            component: 'NInputNumber',
            name: 'fontSize',
            label: '字体大小',
            value: 14,
        },
        z: {
            name: 'z',
            label: '层级',
            value: 1,
        },
    },
    data: {
        origin: 'static',
        staticData: '[{"name": "test name", "content": "124 If an object is assigned as a ref\'s value, the object is made deeply reactive with reactive(). This also means if the object contains nested refs, they will be deeply unwrapped."}]',
        remoteUrl: '',
        enableFilter: false,
        filter: '',
        keyMap: [
            {
                key: 'x',
                label: '显示内容',
                value: 'content',
            },
        ],
    },
    event: cloneDeep(event),
});

export const info = () => ({
    resAction,
});

export default FText;
