export type TestContext = {
  message: string;
  setMessage: (msg: string) => void;
};

export const testContext: TestContext = {
  message: "Hello, context!",
  setMessage: (msg: string) => {
    testContext.message = msg;
  },
};
