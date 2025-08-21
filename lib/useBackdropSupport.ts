import { useEffect, useState } from "react";

export function useBackdropSupport() {
  const [hasBackdropSupport, setHasBackdropSupport] = useState(true);

  useEffect(() => {
    // Check for backdrop-filter support
    const testElement = document.createElement("div");
    testElement.style.cssText = "backdrop-filter: blur(1px);";

    const supportsBackdrop =
      testElement.style.backdropFilter !== "" ||
      CSS.supports("backdrop-filter", "blur(1px)") ||
      CSS.supports("-webkit-backdrop-filter", "blur(1px)");

    setHasBackdropSupport(supportsBackdrop);
  }, []);

  return hasBackdropSupport;
}
