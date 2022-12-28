// ** React Imports
import ReactDOM from "react-dom";
import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";

// ** Redux Imports
import { store } from "./redux/store";
import { Provider } from "react-redux";

// ** Intl, CASL & ThemeColors Context
import ability from "./configs/acl/ability";
import { AbilityContext } from "./utility/context/Can";
import { ThemeContext } from "./utility/context/ThemeColors";

// ** ThemeConfig
import themeConfig from "./configs/themeConfig";

// ** Toast
import { Toaster } from "react-hot-toast";

// ** i18n
import "./configs/i18n";

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** Fake Database
// import "./@fake-db";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
import "./@core/scss/react/apps/app-todo.scss";
import "./index.css";

// ** Sentry
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// ** Firebase
import FirebaseMessaging from "@src/config/initFirebase.js";

// ** GA app
import PageViewGa from "@src/config/pageViewGa.js";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

Sentry.init({
  dsn: "https://39a3c27e52494941930163ad2f8e8b3f@o1090174.ingest.sentry.io/6668611",
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <FirebaseMessaging />
            <PageViewGa />
            {/* {PageViewGa(LazyApp)} */}
            <LazyApp />
            <Toaster
              position={themeConfig.layout.toastPosition}
              toastOptions={{ className: "react-hot-toast" }}
            />
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
