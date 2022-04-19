import { presetAttributify, presetWind } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';
export default {
    presets: [
        presetAttributify(),
        presetWind(),
    ],
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    },
    theme: {
        colors: {
            primary: '#2483ff',
        },
    },
    transformers: [
        transformerDirective(),
    ],
    rules: [
        [/^scrollbar-([^-]+)(-(.+))?$/, ([, d,, value], { rawSelector }) => {
            let p = '';
            if (!value) {
                p = `width: ${d}; height: ${d}`;
            }
            if (d === 'w') {
                p = `width: ${value}`;
            } else if (p === 'h') {
                p = `height: ${value}`;
            }
            return `.${rawSelector}::-webkit-scrollbar {
                ${p}
            }`;
        }],
    ],
};
