import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // // ✅ Production optimizations
  // build: {
  //   outDir: "dist",
  //   sourcemap: false, // Disable source maps in production
  //   minify: "terser",
  //   terserOptions: {
  //     compress: true,
  //     mangle: true,
  //     format: {
  //       comments: false, // Remove comments
  //     },
  //   },
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         // Split vendor chunks
  //         vendor: ["react", "react-dom", "react-router-dom"],
  //         redux: ["@reduxjs/toolkit", "react-redux"],
  //         ui: ["@heroui/react", "@hugeicons/react"],
  //       },
  //     },
  //   },
  //   chunkSizeWarningLimit: 1000,
  // },

  // // ✅ Server configuration
  // server: {
  //   port: 5173,
  //   host: true,
  // },

  // // ✅ Preview configuration
  // preview: {
  //   port: 4173,
  //   host: true,
  // },

  // // ✅ Define global constants
  // define: {
  //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  // },
});
