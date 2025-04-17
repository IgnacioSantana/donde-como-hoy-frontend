export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base: '/', // 🔁 ¡importante para rutas relativas!
});

