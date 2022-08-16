import React from "react";
import { useLocation } from "react-router-dom";
import SimpleDialog from "../component/modal";

const PageDetail = () => {
const location = useLocation()
  return (
    <div>
      <SimpleDialog
        open={location.state.open}
        value={location.state.value}
      />
    </div>
  );
};

export default PageDetail;
