import React from 'react';
import './App.css';
import { Init } from './components/Init/Init';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiDocumentation } from './components/ApiDocumentation/ApiDocumentation';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<section className="App">
            <section className="App-header">
              <Init />
            </section>
          </section>}/>
          <Route path="/api-docs" element={<ApiDocumentation/>}/>
      </Routes>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

