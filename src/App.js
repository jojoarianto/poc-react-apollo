import React from 'react';
import { ApolloClient, gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://api.sibiti.co.id/graphql"
})

const client = new ApolloClient({
  cache,
  link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Details Event!</h1>
        <Query
          query={gql`
            query {
              getEventById(id:"5cdbdaa35b19283c29540b9b") {
                _id
                name
                institusi
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.getEventById.map(({ _id, name, institusi }) => (
              <div key={_id}>
                <p>{name}: {institusi}</p>
              </div>
            ));
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
}

export default App;
