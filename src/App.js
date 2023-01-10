import React, { Fragment, Suspense } from "react";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";

import QuoteItem from "./components/quotes/QuoteItem";
import QuoteList, {
  loader as quotesLoader,
} from "./components/quotes/QuoteList";
import Layout from "./components/layout/Layout";
import { loader as quoteLoader } from "./components/quotes/HighlightedQuote";
import NoQuotesFound from "./components/quotes/NoQuotesFound";
import QuotesPage from "./components/pages/QuotesPage";
import PageNotFound from "./components/pages/PageNotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const QuoteForm = React.lazy(() => import("./components/quotes/QuoteForm"));
const HighlightedQuote = React.lazy(() =>
  import("./components/quotes/HighlightedQuote")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NoQuotesFound />}>
      <Route index element={<Navigate to="/quotes" />} />

      <Route path="/quotes/*" element={<QuotesPage />}>
        <Route index element={<QuoteList />} loader={quotesLoader} />

        <Route
          path=":id/*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HighlightedQuote />
            </Suspense>
          }
          loader={quoteLoader}
        />
      </Route>

      <Route
        path="/add"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <QuoteForm />
          </Suspense>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
