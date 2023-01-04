import React, { Fragment } from "react";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";

import QuoteForm from "./components/quotes/QuoteForm";
import QuoteItem from "./components/quotes/QuoteItem";
import QuoteList from "./components/quotes/QuoteList";
import Layout from "./components/layout/Layout";
import HighlightedQuote from "./components/quotes/HighlightedQuote";
import NoQuotesFound from "./components/quotes/NoQuotesFound";
import QuotesPage from "./components/pages/QuotesPage";
import PageNotFound from "./components/pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NoQuotesFound />}g>
      <Route index element={<Navigate to="/quotes" />} />

      <Route path="/quotes/*" element={<QuotesPage />}>
        <Route index element={<QuoteList />} />

        <Route path=":id/*" element={<HighlightedQuote />} />
      </Route>

      <Route path="/add" element={<QuoteForm />} />
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
