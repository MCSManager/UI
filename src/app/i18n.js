import { createI18n } from 'vue-i18n'
import zh_cn from "../language/zh_cn"
import en_us from "../language/en_us"

const i18n = createI18n({
    locale: 'en_us',
    fallbackLocale: 'en_us',
    messages: {
        zh_cn,
        en_us
    },
})

export default i18n