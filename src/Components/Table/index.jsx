import React from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

const Table = ({ data }) => {
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Candidate Public Repositories"
        columns={[
          { title: "Language", field: "language" },
          { title: "Default Branch", field: "default_branch" },
          { title: "Url", field: "url" },
          { title: "Name", field: "name" },
          { title: "Description", field: "description" }
        ]}
        data={JSON.parse(JSON.stringify(data))}
      />
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array
};

export default Table;
