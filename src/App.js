// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import Home from "./components/Home";
// function App  ()  {
//   // <BrowserRouter>
//   //   <Switch>
//   //     <Route exact path="/login" component={LoginForm} />
//   //     <Route exat path="/" component={Home} />
//   //     {/* <ProtectedRoute exact path="/" component={Home} />
//   //     <ProtectedRoute exact path="/products" component={Products} />
//   //     <ProtectedRoute exact path="/cart" component={Cart} />
//   //     <Route path="/not-found" component={NotFound} />
//   //     <Redirect to="not-found" /> */}
//   //   </Switch>
//   // </BrowserRouter>
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />
//     },
//     {
//       path: "/login",
//       element: <LoginForm />
//     },

//   ])
// };

// export default App;

// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import Home from "./components/Home";
// import Jobs from "./components/Jobs";
// import JobItemDetails from "./components/JobItemDetails";
// import NotFound from "./components/NotFound";
// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/login",
//       element: <LoginForm />,
//     },
//     {
//       path: "/jobs",
//       element: <Jobs />,
//     },
//     {
//       path: "/jobs/:id",
//       element: <JobItemDetails />,
//     },
//     {
//       path: "*",
//       element: <NotFound />,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobItemDetails from "./components/JobItemDetails";
import NotFound from "./components/NotFound";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/jobs/:id",
      element: <JobItemDetails />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
