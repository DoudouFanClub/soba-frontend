import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: `192.168.0.100`,
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        worker: "src/worker/LoadConversationWorker.ts", // Adjust path as per your project structure
      },
    },
  },
});
