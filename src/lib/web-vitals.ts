import {
  CLSMetric,
  INPMetric,
  LCPMetric,
  onCLS,
  onINP,
  onLCP,
} from "web-vitals";

export function registerWebVitals() {
  onLCP((metric: LCPMetric) => {
    console.log("LCP:", metric.value, "ms", "Target: <2500ms");
    sendToAnalytics(metric);
  });

  onINP((metric: INPMetric) => {
    console.log("INP:", metric.value, "ms", "Target: <200ms");
    sendToAnalytics(metric);
  });

  onCLS((metric: CLSMetric) => {
    console.log("CLS:", metric.value, "Target: <0.1");
    sendToAnalytics(metric);
  });
}

function sendToAnalytics(metric: LCPMetric | INPMetric | CLSMetric) {
  const { id, name, value, rating } = metric;

  // Send to your analytics endpoint
  fetch("/api/analytics/vitals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      name,
      value,
      rating,
      url: window.location.pathname,
      timestamp: Date.now(),
    }),
  }).catch((error) => {
    console.error("Failed to send vitals:", error);
  });
}
