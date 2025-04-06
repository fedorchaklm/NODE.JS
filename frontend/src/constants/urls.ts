const auth = '/auth'
const pizzas = '/pizzas'

export const urls = {
    auth: {
        login: `${auth}/sign-in`,
        register: `${auth}/sign-up`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`
    },
    pizzas
}