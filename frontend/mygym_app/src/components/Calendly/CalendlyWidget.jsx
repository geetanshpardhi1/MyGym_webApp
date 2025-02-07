import { useEffect } from "react";

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/darkwolfcreation7552/gym-tour"
      style={{ minWidth: "320px", height: "500px" }}
    ></div>
  );
};

export default CalendlyWidget;
