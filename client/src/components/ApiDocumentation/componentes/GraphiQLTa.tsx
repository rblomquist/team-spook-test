import React, { useState } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { GET_ALL_AGENTS } from '../../../apolloClient';
import { GET_ALL_CUSTOMERS } from '../../../apolloClient';
import { GET_ALL_GUIDES } from '../../../apolloClient';
import { GET_ALL_DESTINATIONS } from '../../../apolloClient';
import { print } from 'graphql';
import './assets/style.css'
const GraphiQLTab = () => {
  const [query, setQuery] = useState(print(GET_ALL_AGENTS));
  const [query, setQuery] = useState(print(GET_ALL_CUSTOMERS));
  const [query, setQuery] = useState(print(GET_ALL_GUIDES));
  const [query, setQuery] = useState(print(GET_ALL_DESTINATIONS));

  const [executeQuery, { loading, data, error }] = useLazyQuery(gql`
    ${query}
  `);

  const handleExecuteQuery = () => {
    executeQuery();
  };

  return (
    <div>
      <h2 className='title'>GraphQL Api Documentation</h2>
      <div className="query-editor">
        <div className="editor">
          <GraphiQL
            editorTheme="solarized light"
            fetcher={({ query: q }) =>
              fetch('http://localhost:4000/graphql  ', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: q }),
              }).then((response) => response.json())
            }
            query={query}
            onEditQuery={(newQuery) => setQuery(newQuery)}
          />
        </div>
        <div className="console">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
      <button onClick={handleExecuteQuery}>Display</button>
    </div>
  );
};

export default GraphiQLTab;
