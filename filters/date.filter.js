import store from '../src/store'

export default function dateFilter(value, format='date') {
    const options = {}
    if (format.includes('date')) {
        options.day= '2-digit'
        options.year= 'numeric'
        options.month= 'long'
    }

    if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
    }

    const locale = store.getters.info.locale || 'ru-Ru'
    return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}