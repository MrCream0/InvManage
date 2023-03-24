import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";

import Table from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Table />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
];

export default AppRoutes;
