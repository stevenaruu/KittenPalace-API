import { Application, Router } from 'express'
import { HealthRouter } from './health.route'
import { KittenRouter } from './kitten.route'
import { AuthRouter } from './auth.route'
import { RouteRouter } from './route'

const _routes: Array<[string, Router]> = [
    ['/', RouteRouter],
    ['/health', HealthRouter],
    ['/kitten', KittenRouter],
    ['/auth', AuthRouter]
]

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, router] = route
        app.use(url, router)
    })
}
