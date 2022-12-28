// ** React Imports
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// ** GA app
// import PageViewGa from "@src/config/pageViewGa.js";

const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Request = lazy(() => import('../../views/apps/request'))
const DetailFwa = lazy(() => import('../../views/apps/request/fwa/detail'))
const DetailCuti = lazy(() => import('../../views/apps/request/cuti/detail'))
const CreateFwa = lazy(() => import('../../views/apps/request/fwa/create'))
const CreateCuti = lazy(() => import('../../views/apps/request/cuti/create'))
const Email = lazy(() => import('../../views/apps/email'))
const Calendar = lazy(() => import('../../views/apps/calendar'))
const CreateSppd = lazy(() => import('../../views/apps/request/sppd/create'))
const DetailSppd = lazy(() => import('../../views/apps/request/sppd/detail'))

const Feedback = lazy(() => import ('../../views/apps/feedback'))
const Penilaian = lazy(() => import ('../../views/apps/penilaian/modals'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))

const Search = lazy(() => import('../../views/apps/search-result'))

const BriefSearch = lazy(() => import('../../views/apps/search-result/brief'))

const Embed = lazy(() => import('../../views/pages/embed'))

const AppRoutes = [
  {
    element: <Email />,
    path: '/app/email',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/app/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/app/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/app/email/:filter'
  },
  {
    path: '/app/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    element: <Todo />,
    path: '/app/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/app/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/app/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/app/calendar'
  },
  {
    element: <Request />,
    path: '/app/request',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <DetailFwa />,
    path: '/app/request/fwa/:id',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <DetailCuti />,
    path: '/app/request/cuti/:id',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <CreateFwa />,
    // element: PageViewGa(CreateFwa),
    path: '/app/request/fwa/create',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <CreateSppd />,
    path: '/app/request/sppd/create',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <DetailSppd />,
    path: '/app/request/sppd/:id',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <CreateCuti />,
    path: '/app/request/cuti/create',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Request />,
    path: '/app/request/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Request />,
    path: '/app/request/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <InvoiceList />,
    path: '/app/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/app/invoice/preview/:id'
  },
  {
    path: '/app/invoice/preview',
    element: <Navigate to='/app/invoice/preview/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/app/invoice/edit/:id'
  },
  {
    path: '/app/invoice/edit',
    element: <Navigate to='/app/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/app/invoice/add'
  },
  {
    path: '/app/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/app/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/app/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/app/ecommerce/product-detail',
    element: <Navigate to='/app/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/app/ecommerce/product-detail/:product',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/app/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <UserList />,
    path: '/app/user/list'
  },
  {
    path: '/app/user/view',
    element: <Navigate to='/app/user/view/1' />
  },
  {
    element: <UserView />,
    path: '/app/user/view/:id'
  },
  {
    element: <Roles />,
    path: '/app/roles'
  },
  {
    element: <Permissions />,
    path: '/app/permissions'
  },
  {
    element: <Feedback />,
    path: '/feedback'
  },
  {
    element: <Penilaian />,
    path:'/penilaian'
  },
  // {
  //   element: <Search />,
  //   path: '/app/search'
  // },
  // {
  //   element: <BriefSearch />,
  //   path: '/app/search-result'
  // },
  //kalau mau nambah diatas ini biar ga nabrak nama apps nya - reka
  {
    path: '/app/:module',
    element: <Embed />
  }
]

export default AppRoutes
