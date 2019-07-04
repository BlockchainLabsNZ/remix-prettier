import React, {lazy, Suspense} from "react";
import {createIframeClient, remixApi} from "remix-plugin";
// import Header from "./Header";
import PackageDetailView from "./PackageDetailView";

const Prettier = lazy(() => import("./Prettier"));

const client = createIframeClient({
  customApi: remixApi,
  devMode: {port: 8080}
});

const App = () => (
  <div className="panels-item">
    <section className="section">
      <PackageDetailView />
    </section>
    <section className="section settings-panel p-2">
      <Suspense fallback={<div>Loading...</div>}>
        <Prettier client={client} />
      </Suspense>
    </section>
  </div>
);
export default App;
