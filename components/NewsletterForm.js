import { useState } from "react";
import axios from "axios";

export default function NewsletterForm({ index }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/subscribe", { email });
      setState("SUCCESS");
      setEmail("");
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("ERROR");
    }
  };

  return (
    <form onSubmit={subscribe}>
      {/* If subscription successful hide the input and show success message */}
      {state === "SUCCESS" ? (
        <p
          className={`mt-2 font-bold mb-0 ${
            index ? "text-gray-900" : "text-white"
          }`}
        >
          Success!
        </p>
      ) : (
        <div className="flex flex-col">
          {/* Email input */}
          <input
            type="email"
            placeholder="your email"
            className={`mb-3 rounded-sm px-2 text-gray-900 font-body  ${
              index ? "h-10 w-72" : "h-8"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Submit / subscribe button */}
          <button
            type="submit"
            className={`bg-gray-900 text-white rounded-sm font-semibold tracking-wider ${
              index ? "bg-gray-900 h-10" : "bg-green-600 h-8"
            }`}
            disabled={state === "LOADING"}
            onClick={subscribe}
          >
            {state === "LOADING" ? "Submitting.." : "Subscribe"}
          </button>
        </div>
      )}

      {/* Error message */}
      {state === "ERROR" && (
        <p className={`mt-2 mb-0 ${index ? "text-gray-900" : "text-white"}`}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
