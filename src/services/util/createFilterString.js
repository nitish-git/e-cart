export const createFilterString = (filters) => {
    return Object.keys(filters).filter((e) => !!filters[e]).map((e) => `${e}=${filters[e]}`).join('&')
}