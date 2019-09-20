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
              getEventById(id:"5d1ee4055b19282cfd2ea44c") {
                _id
                name
                institusi
                logo
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(Object.keys(data.getEventById));

            return (
              <div>
                <p>id: {data.getEventById._id}</p>
                <p>name: {data.getEventById.name}</p>
                <p>institusi: {data.getEventById.institusi}</p>
                <p>logo: <img src={data.getEventById.logo} alt="" style={{ width: '100px'}}/>  </p>
              </div>
            );
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
}

export default App;
