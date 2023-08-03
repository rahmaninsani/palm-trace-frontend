import React from "react";
import { Button } from "react-bootstrap";

const ButtonLoading = () => {
  return (
    <Button type="button" variant="btn btn-primary" disabled={true}>
      <span className="spinner-border spinner-border-sm"></span> Loading
    </Button>
  );
};

export default ButtonLoading;
