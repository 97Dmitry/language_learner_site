export default {
  install: (app) => {
    app.config.globalProperties.$message = function (text) {
      // eslint-disable-next-line no-undef
      M.toast({ html: text });
    };

    app.config.globalProperties.$error = function (text) {
      // eslint-disable-next-line no-undef
      M.toast({ html: `[Error]: ${text}` });
    };
  },
};
