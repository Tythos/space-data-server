let rimraf = require("rimraf");

module.exports = {
  // Supports all esbuild.build options
  esbuild: {
    minify: true,
    bundle: true,
    target: "esnext",
    platform: "node",
  },
  // Prebuild hook
  prebuild: async () => {
    console.log("prebuild");
    rimraf.sync("./dist"); // clean up dist folder
  },
  // Postbuild hook
  postbuild: async () => {
    console.log("postbuild");
    rimraf.sync("./dist/lib"); // clean up dist/lib folder
  },
};
