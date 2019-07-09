const remixClient = jest.genMockFromModule("../remixClient");

remixClient.onload = callback => {
  /* TODO: callback */
};

remixClient.fileManager = {
  files: {},
  on: (event, callback) => {
    /* TODO: callback */
  },
  getFile: fileName => {
    return files[fileName];
  },
  setFile: (fileName, value) => {
    files[fileName] = value;
  }
};

export default remixClient;
