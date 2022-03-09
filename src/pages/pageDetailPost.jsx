import React from "react";
import SimpleDialog from "../component/modal";

const pageDetail = ({ open, value = null, onClose }) => {
  return (
    <div>
      <SimpleDialog open={open} onClose={onClose} value={value} />
    </div>
  );
};

export default pageDetail;
