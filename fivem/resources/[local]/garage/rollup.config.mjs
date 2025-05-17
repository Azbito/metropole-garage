import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/server/index.ts',
    output: {
      file: 'dist/server/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs(),
      json(),
      typescript({ sourceMap: true }),
    ],
  },
  {
    input: 'src/client/index.ts',
    output: {
      file: 'dist/client/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs(),
      json(),
      typescript({ sourceMap: true }),
    ],
  },
];
