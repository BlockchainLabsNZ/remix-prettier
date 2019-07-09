import React, {lazy, Suspense} from "react";
import remixClient from "./remixClient";
import PackageDetailView from "./PackageDetailView";

const Prettier = lazy(() => import("./Prettier"));

const App = () => (
  <div className="panels-item">
    <section className="section">
      <PackageDetailView />
    </section>
    <section className="section settings-panel p-2">
      <Suspense fallback={<div>Loading...</div>}>
        <Prettier client={remixClient} />
      </Suspense>
    </section>
  </div>
);

export default App;
