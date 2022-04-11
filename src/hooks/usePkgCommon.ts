import type { StyleValue, Ref } from 'vue';
import { usePresetStore } from '@/store/preset';
import type { PagePreset, ComponentConfig, basicConfType, DataConfType } from '@/types/preset';

type ResDataType = any[];
type IdType = ComponentConfig['id'];

const getPreset = () => {
    const presetStore = usePresetStore();
    const preset: Ref<PagePreset> = storeToRefs(presetStore).preset;
    return preset;
};

const getConfig = (id: string) => computed(() => {
    return getPreset().value.components.find(c => c.id === id);
});

const genStyle = (basicConf: basicConfType) => computed<StyleValue>(() => {
    return {
        backgroundColor: basicConf.bgColor.value,
        fontSize: `${basicConf.fontSize.value}px`,
    };
});

const getData = (dataConf: DataConfType) => new Promise<ResDataType>((res, rej) => {
    if (dataConf.origin === 'static') {
        const result = JSON.parse(dataConf.staticData || '');
        return res(result);
    }
    if (!dataConf.remoteUrl) {
        return res([{}]);
    }
    axios.get(dataConf.remoteUrl)
        .then(({ data }) => {
            res(data);
        })
        .catch(rej);
});

const setDataKey = (data: ResDataType, dataConf: DataConfType) => {
    const result = data.map(item => {
        const obj: any = {};
        dataConf.keyMap.forEach(kItem => {
            if (kItem.value in item) {
                obj[kItem.key] = item[kItem.value];
            }
        });
        return obj;
    });
    return result;
};

const useData = (dataConf: DataConfType) => {
    const data = shallowRef<ResDataType>([{}]);

    const fn = () => getData(dataConf).then(res => {
        data.value = setDataKey(res, dataConf);
    });
    watch(dataConf, fn);
    onMounted(fn);
    return data;
};

export default (id: IdType) => {
    const config = getConfig(id);
    const style = genStyle(config.value!.basic);
    const data = useData(config.value!.data);
    return {
        config,
        style,
        data,
    };
};
