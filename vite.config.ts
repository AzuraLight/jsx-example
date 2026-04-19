// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // math-field 에러 해결
          isCustomElement: (tag) => tag === 'math-field'
        }
      }
    })
  ],
  optimizeDeps: {
    // MathLive가 폰트를 제대로 로드하지 못하는 문제 해결
    exclude: ['mathlive']
  }
})