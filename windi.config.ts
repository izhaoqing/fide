import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';
// import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
    attributify: true,
    theme: {
        // extend: {
        //     colors: {
        //         // 增加颜色
        //         primary: '#2483ff',
        //     },
        // },
    },
    plugins: [
        require('windicss/plugin/line-clamp'),
        require('@windicss/plugin-scrollbar'),
        plugin(({ addUtilities }) => {
            addUtilities({
                '.scrollbar-0': {
                    '&::-webkit-scrollbar': {
                        width: '0',
                        height: '0',
                    },
                },
            });
        }),
        // scrollbar size
        // background-image-url

        // plugin(({ addDynamic, theme }) => {
        //     addDynamic('line-clamp', ({ Utility, Property, Style }) => {
        //         if (Utility.amount === 'none') return Style(Utility.class, Property('-webkit-line-clamp', 'unset'));
        //         const value = Utility.handler.handleStatic(theme('lineClamp')).handleNumber(1, undefined, 'int').value;
        //         if (value) {
        //             return Style.generate(`${Utility.class}::-webkit-scrollbar`, {
        //                 width: value,
        //                 height: value,
        //             });
        //         }
        //     }, {
        //         group: 'lineClamp',
        //         completions: [
        //             'line-clamp-none',
        //             'line-clamp-{int}',
        //         ],
        //     });
        // }),
        // addDynamic('filter', ({ Utility, Style }) => {
        //     return Utility.handler
        //       .handleStatic(Style('filter'))
        //       .createProperty(['-webkit-filter', 'filter'])
        //   })
        // plugin((style, prop) {
        //     return function({ Utility, Style }) {
        //       return Utility.handler
        //         .handleStatic(Style(style))
        //         .handleSize()
        //         .handleNumber(1, undefined, 'int', (number) => `${number}rpx`)
        //         .handleNegative()
        //         .createProperty(prop)
        //     }
        //   })
    ],
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    },
});
