import React, { useState, useEffect, Suspense } from 'react'
import { useDispatch } from "react-redux";


// ** Router Import
import Router from "./router/Router";

// ** Routes & Default Routes
import { getRoutes } from "./router/routes";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";

import { ToastContainer } from "react-toastify";

// import { checkDeployVersion } from '@store/authentication'

const App = () => {
  const dispatch = useDispatch();
  const [allRoutes, setAllRoutes] = useState([]);

  // ** Hooks
  const { layout } = useLayout();

  useEffect(() => {
    // dispatch(checkDeployVersion());
    setAllRoutes(getRoutes(layout))
  }, [layout])

  return (
    <>
      <Suspense fallback={null}>
        <Router allRoutes={allRoutes} />
        {/* <Router allRoutes={PageViewGa(allRoutes)} /> */}
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme={"colored"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
