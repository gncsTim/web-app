import moment from 'moment'

export const sortEventList = (options = { order:'asc'}) => (a, b) => {
    const aDate = a.date ? moment(a.date) : 1
    const bDate = b.date ? moment(b.date) : 1
    return options.order === 'asc' ? aDate - bDate : bDate - aDate
}