import React, { Suspense } from "react";

export default function lazyLoading(Component) {
  const lazyComponents = (
    <React.Suspense fallback="Loading...">
      <Component />
    </React.Suspense>
  );
  return lazyComponents;
}
