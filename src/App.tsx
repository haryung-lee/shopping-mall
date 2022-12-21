import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import "./scss/index.scss";
import { routes } from "./routes";
import { getQueryClient } from "./queryClient";
import Gnb from "./components/gnb";

const App = () => {
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Gnb />
      {elem}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
