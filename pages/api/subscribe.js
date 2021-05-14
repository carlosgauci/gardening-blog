import axios from "axios";

export default async (req, res) => {
  const { email } = req.body;

  if (!email || !email.length) {
    return res.status(400).json({
      error: "Forgot to add your email?",
    });
  }

  try {
    const { url, data, headers } = getRequestParams(email);
    const response = await axios.post(url, data, { headers });

    // success
    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(400).json({
      error: `Oops, something went wrong... :(`,
    });
  }
};

function getRequestParams(email) {
  // Mailchimp URL
  const url = `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

  //   Parameters to send
  const data = {
    email_address: email,
    status: "subscribed",
  };

  // Encode API key in base64
  const base64ApiKey = Buffer.from(
    `anystring:${process.env.MAILCHIMP_API_KEY}`
  ).toString("base64");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64ApiKey}`,
  };

  return {
    url,
    data,
    headers,
  };
}
