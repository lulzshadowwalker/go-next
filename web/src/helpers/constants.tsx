export interface Route {
  path: string
  name: string
}

export interface Routes {
  home: Route
  blog: Route
  collections: Route
  showroom: Route
  celebrations: Route
}

export const routes: Routes = {
  home: {
    path: '/',
    name: 'Home',
  },
  blog: {
    path: '/blog',
    name: 'Blog',
  },
  collections: {
    path: '/collections',
    name: 'Collections',
  },
  showroom: {
    path: '/showroom',
    name: 'Showroome',
  },
  celebrations: {
    path: '/celebrations',
    name: 'Celebrations',
  },
}
