import { cloneDeep } from 'lodash';
import FText from './FTabs.vue';
import event, { resAction } from './event';
import type { ComponentConfig } from '@/types/preset';

export const config: () => ComponentConfig = () => ({
    name: 'FTabs',
    label: 'Tab切换',
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
            value: 80,
        },
        minH: {
            name: 'minH',
            label: '最小高度',
            value: 60,
        },
        minW: {
            name: 'minW',
            label: '最小宽度',
            value: 200,
        },
        left: {
            component: 'NInputNumber',
            name: 'left',
            label: '位置x',
            value: 200,
        },
        top: {
            component: 'NInputNumber',
            name: 'top',
            label: '位置y',
            value: 200,
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
            value: 2,
        },
    },
    data: {
        origin: 'static',
        staticData: '[{"name": "寂寞围绕着电视", "id": "1"},{"name": "垂死坚持", "id": "2"},{"name": "在两点半消失", "id": "3"}]',
        remoteUrl: '',
        enableFilter: false,
        filter: '',
        keyMap: [
            {
                key: 'name',
                label: 'tab 名称',
                value: 'name',
            },
            {
                key: 'id',
                label: 'tab id',
                value: 'id',
            },
        ],
    },
    event: cloneDeep(event),
});

export const info = () => ({
    resAction,
});

export default FText;
