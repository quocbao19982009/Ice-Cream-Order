import React from "react";
import { Alert } from "react-bootstrap";

interface AlertBannerPropsType {
  message?: string;
  variant?: string;
}

const AlertBanner = ({ message, variant }: AlertBannerPropsType) => {
  const alertMessage = message || "An unexpected error!";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
