import {createIframeClient, remixApi} from "remix-plugin";

const remixClient = createIframeClient({
  customApi: remixApi,
  devMode: {port: 8080}
});

export default remixClient;
