import React from "react"
// ** Icons Import
import {
  Box,
  Mail,
  User,
  Circle,
  Shield,
  Calendar,
  FileText,
  CheckSquare,
  ShoppingCart,
  MessageSquare
} from 'react-feather'

export default [
  {
    id: 'apps',
    title: 'Apps',
    icon: <Box />,
    children: [
      {
        id: 'email',
        title: 'Email',
        icon: <Mail />,
        navLink: '/app/email'
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: <MessageSquare />,
        navLink: '/app/chat'
      },
      {
        id: 'todo',
        title: 'Todo',
        icon: <CheckSquare />,
        navLink: '/app/todo'
      },
      {
        id: 'calendar',
        title: 'Calendar',
        icon: <Calendar />,
        navLink: '/app/calendar'
      },
      {
        id: 'invoiceApp',
        title: 'Invoice',
        icon: <FileText />,
        children: [
          {
            id: 'invoiceList',
            title: 'List',
            icon: <Circle />,
            navLink: '/app/invoice/list'
          },
          {
            id: 'invoicePreview',
            title: 'Preview',
            icon: <Circle />,
            navLink: '/app/invoice/preview'
          },
          {
            id: 'invoiceEdit',
            title: 'Edit',
            icon: <Circle />,
            navLink: '/app/invoice/edit'
          },
          {
            id: 'invoiceAdd',
            title: 'Add',
            icon: <Circle />,
            navLink: '/app/invoice/add'
          }
        ]
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        icon: <Shield size={20} />,
        children: [
          {
            id: 'roles',
            title: 'Roles',
            icon: <Circle size={12} />,
            navLink: '/app/roles'
          },
          {
            id: 'permissions',
            title: 'Permissions',
            icon: <Circle size={12} />,
            navLink: '/app/permissions'
          }
        ]
      },
      {
        id: 'eCommerce',
        title: 'eCommerce',
        icon: <ShoppingCart />,
        children: [
          {
            id: 'shop',
            title: 'Shop',
            icon: <Circle />,
            navLink: '/app/ecommerce/shop'
          },
          {
            id: 'detail',
            title: 'Details',
            icon: <Circle />,
            navLink: '/app/ecommerce/product-detail'
          },
          {
            id: 'wishList',
            title: 'Wish List',
            icon: <Circle />,
            navLink: '/app/ecommerce/wishlist'
          },
          {
            id: 'checkout',
            title: 'Checkout',
            icon: <Circle />,
            navLink: '/app/ecommerce/checkout'
          }
        ]
      },
      {
        id: 'users',
        title: 'User',
        icon: <User />,
        children: [
          {
            id: 'list',
            title: 'List',
            icon: <Circle />,
            navLink: '/app/user/list'
          },
          {
            id: 'view',
            title: 'View',
            icon: <Circle />,
            navLink: '/app/user/view'
          }
        ]
      }
    ]
  }
]
