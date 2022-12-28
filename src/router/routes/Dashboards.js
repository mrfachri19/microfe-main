import React, { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))
const Profile = lazy(() => import('../../views/pages/profile'))
const SearchAction = lazy(() => import('../../views/pages/search'))

const DashboardRoutes = [
  {
    path: '/dashboard',
    element: <DashboardEcommerce />
  },
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />
  },
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/:nik',
    element: <Profile />
  },
  {
    path: '/search',
    element: <SearchAction />
  },
  {
    path: '/search/:keywords',
    element: <SearchAction />
  },
]

export default DashboardRoutes
