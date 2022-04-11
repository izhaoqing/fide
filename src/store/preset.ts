import type { Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { PagePreset, StyleField } from '@/types/preset';
import { config as defaultConf, info as pkgsInfo } from '@/packages';

type DefaultConfKeys = keyof typeof defaultConf;
const importConf = (name: DefaultConfKeys) => {
    return defaultConf[name]();
};

type PkgInfoKeys = keyof typeof pkgsInfo;
const importInfo = (name: PkgInfoKeys) => {
    return pkgsInfo[name]();
};

export const usePresetStore = defineStore('preset', () => {
    const preset: Ref<PagePreset> = ref({
        width: 1920,
        height: 1080,
        components: [],
    });

    const updatePreset = (p: PagePreset) => {
        preset.value = p;
    };

    // 当前选中的组件的id，用于右侧显示组件配置
    const currentComId = ref('');
    const updateCurrentComId = (id?: string) => {
        currentComId.value = id || '';
    };
    const currentCom = computed(() => preset.value.components.find(c => c.id === currentComId.value));

    // 更新组件配置
    const updateBasicConf = <K extends keyof StyleField>(id: string, key: K, value: StyleField[K]) => {
        const com = preset.value.components.find(c => c.id === id);
        if (!com) return;
        com.basic[key].value = value;
    };

    // 已选的组件列表
    const componentsList = computed(() => preset.value.components);
    // 更新组件列表(增加/删除)
    const addComponent = (name: DefaultConfKeys) => {
        const conf = importConf(name);
        conf.id = uuidv4();
        preset.value.components.push(conf);
    };
    const removeComponent = (name: string | string[]) => {
        preset.value.components = preset.value.components.filter(c => {
            return Array.isArray(name) ? name.includes(c.name) : name !== c.name;
        });
    };

    // 当前组件的 info
    const infoData = computed(() => {
        if (!currentCom.value) return;
        const name = currentCom.value?.name as PkgInfoKeys;
        return importInfo(name);
    });

    // 事件配置
    // const event

    return {
        preset,
        updatePreset,
        currentComId,
        currentCom,
        updateCurrentComId,
        updateBasicConf,
        componentsList,
        addComponent,
        removeComponent,
        infoData,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePresetStore, import.meta.hot));
}
