// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

import i18n from "../i18n";

export default function (app) {
  app.directive("iszh", {
    // eslint-disable-next-line no-unused-vars
    mounted(el, binding, vnode) {
      const language = i18n.global.locale;
      if (language != "zh_cn") el.style.display = "none";
    }
  });

  app.directive("isen", {
    // eslint-disable-next-line no-unused-vars
    mounted(el, binding, vnode) {
      const language = i18n.global.locale;
      if (language != "en_us") el.style.display = "none";
    }
  });

  app.directive("isru", {
    // eslint-disable-next-line no-unused-vars
    mounted(el, binding, vnode) {
      const language = i18n.global.locale;
      if (language != "ru_ru") el.style.display = "none";
    }
  });
}
