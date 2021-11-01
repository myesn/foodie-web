import { Suspense } from 'react';

const withSuspense = (WrappedComponent) => (
  <Suspense fallback={<>...</>}>
    <WrappedComponent />
  </Suspense>
);

export default withSuspense;
