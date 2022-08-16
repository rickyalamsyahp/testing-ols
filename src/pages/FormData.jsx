import React from "react";
import { useLocation } from "react-router-dom";
import SimpleDialog from "../component/modal-input";

const FormData = () => {
  const location = useLocation();
  return (
    <div>
      <SimpleDialog
        open={location.state.open}
        value={location.state.value}
        userid={location.state.userId}
      />
    </div>
  );
};

export default FormData;
