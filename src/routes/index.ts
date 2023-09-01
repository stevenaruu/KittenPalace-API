import { Application, Router } from 'express'
import { HealthRouter } from './health'
import { KittenRouter } from './kitten'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/kitten', KittenRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
