import { RenderPaths } from "./urlMapper";

export const AADHAAR_OTP_VERIFY_RESPONSE = {
  data: {
    renderPath: RenderPaths.BASIC_DETAILS,
    metadata: {
      isOTPVerified: "true",
    },
  },
};
