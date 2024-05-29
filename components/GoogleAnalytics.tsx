"use client";

import initializeGA from "@/lib/google-analytics";
import { useEffect } from "react";

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
