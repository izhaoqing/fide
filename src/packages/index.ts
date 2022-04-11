// import type { App } from 'vue';
// import FButton from './button';
import FText, { config as FTextConfig, info as FTextInfo } from './text';
import FTabs, { config as FTabsConfig, info as FTabsInfo } from './tabs';

export const component = {
    FText,
    FTabs,
};
export const config = {
    FText: FTextConfig,
    FTabs: FTabsConfig,
};
export const info = {
    FText: FTextInfo,
    FTabs: FTabsInfo,
};

// export {
//     FText,
//     FTabs,
//     // FButton,
// };

// interface ComponentType {
//     type: string;
//     id: string,
//     name:
//     icon?: any;
//     children?:
// };

// const componentTree = [
//     type: '信息',
// ]

// export default (app: App) => {
//     app.component('FButton', FButton);
//     app.component('FText', FText);
// };

// const confMap = {
//     FText: FTextConfig,
// };

// type ComNameType = keyof typeof confMap;

// export const getConf = (name: ComNameType) => {
//     return confMap[name];
// };
