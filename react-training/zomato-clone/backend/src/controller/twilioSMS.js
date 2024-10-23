import Twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;

const client = new Twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,

  {
    lazyLoading: true,
  }
);

export const sendOTP = async (req, res, next) => {
  const { phone } = req.body;
  console.log("phone : ", phone);
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${phone}`,
        channel: "sms",
      });
    res
      .status(200)
      .send(`OTP send successfully!, ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
};

export const verifyOTP = async (req, res, next) => {
  const { phone, otp } = req.body;
  try {
    const verificationResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${phone}`,
        code: otp,
      });
    if (verificationResponse.valid) {
      res
        .status(200)
        .send(
          `OTP verified successfully!, ${JSON.stringify(verificationResponse)}`
        );
    } else {
      res.status(401).json({
        error: "Wrong otp!",
      });
    }
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
};
