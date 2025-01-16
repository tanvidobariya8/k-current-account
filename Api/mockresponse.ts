import { RenderPaths } from "./urlMapper";

export const AADHAAR_OTP_VERIFY_RESPONSE = {
  data: {
    renderPath: RenderPaths.ADD_BIOMETRIC,
    metadata: {
      isOTPVerified: "true",
    },
  },
};

export const BASIC_DETAILS_RESPONSE = {
  data: {
    renderPath: RenderPaths.BASIC_DETAILS,
    details: {
      entityName: "Tanvi",
    },
  },
};

export const BASIC_DETAILS_SUBMIT_RESPONSE = {
  data: {
    renderPath: RenderPaths.THANK_YOU,
  },
};
