// 数据配置

// 样式配置
export interface StyleField {
    left: number;
    top: number;
    width: number;
    height: number;
    minW: number;
    minH: number;
    bgColor: string;
    fontSize: number;
    z: number;
}

export type basicConfType = {
    [K in keyof StyleField]: {
        component?: string;
        name: K;
        label: string;
        value: StyleField[K];
    }
};

// 返回数据类型
export interface DataType {
    head: Array<{
        key: string;
        label: string;
    }>;
    content: Array<Record<string, any>>;
    [k: string]: any;
}

// 数据配置取值类型
export type DataOriginType = 'static' | 'remote';
// 数据配置取值映射类型
export interface DataKeyMapType {
    key: string;
    type?: DataOriginType;
    value: any;
    label?: string;
}
// 数据配置类型
export interface DataConfType {
    origin: DataOriginType;
    staticData?: string;
    remoteUrl?: string;
    keyMap: DataKeyMapType[];
    enableFilter: boolean;
    filter: string;
}

// 事件监听
export interface EventSubType {
    enable: boolean;
    id: string;
    name: string;
    originId: string;
    keyMap: EventKeyMapType[];
    action: string;
}
// 事件订阅
export interface EventKeyMapType {
    key: string;
    value: string;
    label?: string;
}
// 事件发布
export interface EventPubType {
    enable: boolean;
    name: string;
    keyMap: EventKeyMapType[];
}
// 事件配置类型
export interface EventConfType {
    pub: Record<string, EventPubType>;
    sub: EventSubType[];
}

// 组件配置
export interface ComponentConfig {
    id: string;
    name: string;
    label: string;
    basic: basicConfType;
    data: DataConfType;
    event: EventConfType;
    info?: Record<string | number | symbol, any>;
}

// 完整配置项
export interface PagePreset {
    width: number;
    height: number;
    pageBg?: string;
    components: ComponentConfig[];
}
