export default {
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
  },
   "predeploy": "npm run build",
};
