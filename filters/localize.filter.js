import store from '../src/store'
import ru from '../src/locales/ru.json'
import en from '../src/locales/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    const locale = store.getters.info.locale || 'ru-RU'
    return locales[locale][key] || `[Localize error]: key ${key} not found`
}