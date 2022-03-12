import path from 'path';
import { defineConfig } from 'vite';
import type { ConfigEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
// import WindiCSS from 'vite-plugin-windicss';
import Unocss from 'unocss/vite';
import { presetAttributify, presetWind } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';
import strip from '@rollup/plugin-strip';

export default (env: ConfigEnv) => {
    return defineConfig({
        server: {
            // https://cn.vitejs.dev/config/#server-proxy
            proxy: {
                '/mock': 'https://trsyapi.trscd.com.cn',
            },
            port: 4000,
        },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
        plugins: [
            Vue(),
            // 生产环境删除 debugger 和 console
            env.mode === 'production' && strip({
                include: ['**/*.js', '**/*.ts', '**/*.vue'],
            }),
            // https://github.com/antfu/unplugin-vue-components
            Components({
                // todo
                dirs: ['src/components', 'src/directives'],
                deep: false,
                extensions: ['vue', 'js'],
                include: [/\.vue$/, /\.vue\?vue/],
                // 生成全局类型声明文件，以便 volar 类型提示
                dts: 'src/types/components.d.ts',
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver({
                        prefix: 'i',
                        customCollections: ['my-icons'],
                    }),
                ],
            }),
            AutoImport({
                include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/core',
                ],
                dts: 'src/types/auto-imports.d.ts',
                eslintrc: {
                    enabled: true, // Default `false`
                    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
                },
            }),
            Icons({
                autoInstall: true,
                customCollections: {
                    'my-icons': FileSystemIconLoader('./src/assets/icons'),
                },
            }),
            // WindiCSS(),
            Unocss({
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
            }),
        ],
    });
};
