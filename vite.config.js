import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@styles": path.resolve(__dirname, "./src/assets/styles/"),
      "@hooks": path.resolve(__dirname, "./src/hook/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@data": path.resolve(__dirname, "./src/data/"),
      "@context": path.resolve(__dirname, "./src/context/"),
      "@constants": path.resolve(__dirname, "./src/constants/"),
      "@sections": path.resolve(__dirname, "./src/sections/"),
      "@fonts": path.resolve(__dirname, "./src/assets/fonts/")
    }
  },
})
