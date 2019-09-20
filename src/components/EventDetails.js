import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const EventDetails = () => (
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
);


export default EventDetails;
