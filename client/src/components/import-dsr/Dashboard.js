import React from "react";
import JobsOverview from "./JobsOverView";

function Dashboard() {
  return (
    <div>
      <JobsOverview />
    </div>
  );
}

export default React.memo(Dashboard);
