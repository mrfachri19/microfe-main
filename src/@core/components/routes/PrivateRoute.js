// ** React Imports
import { Navigate, Route } from 'react-router-dom'
import { useContext, Suspense } from 'react'
import { isSessionActive, clearStorages } from "@src/utils/storage";

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  const user = isSessionActive();
  //  // console.log("private route", user);

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      clearStorages();
      window.location.href = "/login";
      // return <Navigate to='/login' replace={true} />
    }
    if (user && restrictedRoute) {
      return <Navigate to='/' />
    }
    // if (user && restrictedRoute && user.role === 'client') {
    //   return <Navigate to='/access-control' />
    // }
    // if (user && !ability.can(action || 'read', resource)) {
    //   return <Navigate to='/misc/not-authorized' replace />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
