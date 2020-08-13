import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';

export default {
    input: './src/core/index.js',
    output: {
        format: 'umd',
        name: 'Vue',
        file: 'dist/umd/vue.js',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            port: 3000,
            contentBase: '',
            openPage: '/index.html'
        }),
        replace({
            '__VERSION__': '0.0.1'
        })
    ]
}