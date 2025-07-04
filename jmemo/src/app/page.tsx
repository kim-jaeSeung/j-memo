// import { Input } from "@/componet/Input";
// import { Provider } from "react-redux";
// import { store } from "@/store/store";
import Counter from "@/features/counter/Counter";
export default function Home() {
  return (
    // <Provider store={store}>
    <div>
      <h1>시작</h1>
      <Counter />
      {/* <Input /> */}
    </div>
    // </Provider>
  );
}
