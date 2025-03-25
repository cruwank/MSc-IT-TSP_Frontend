import AppRouter from "./AppRouter";
import { LoaderProvider } from "./lib/LoaderContext";
function App() {
    return  <LoaderProvider><AppRouter /></LoaderProvider>;
}

export default App;









