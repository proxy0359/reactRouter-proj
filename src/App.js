import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Comments from "./components/comments/Comments";
import Header from "./components/layout/Header";
import WelcomePage from "./components/pages/WelcomePage";
import NewCommentForm from "./components/comments/NewCommentForm";
import QuoteForm from "./components/quotes/QuoteForm";
import QuoteItem from "./components/quotes/QuoteItem";
import QuoteList from "./components/quotes/QuoteList";
import Layout from "./components/layout/Layout";
import HighlightedQuote from "./components/quotes/HighlightedQuote";
import NoQuotesFound from "./components/quotes/NoQuotesFound";
import QuotesPage from "./components/pages/QuotesPage";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />

          <Route path="/quotes/*" element={<QuotesPage />}>
            <Route index element={<QuoteList />} />

            <Route
              path=":id/*"
              element={<HighlightedQuote />}
              errorElement={<NoQuotesFound />}
            />
          </Route>

          <Route path="/add" element={<QuoteForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
