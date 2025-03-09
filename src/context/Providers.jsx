import { AuthProvider } from "./AuthContext";
import { TodosProvider } from "./TodosContext";
import { DailiesProvider } from "./DailiesContext";

function Providers({ children }) {
  return (
    <AuthProvider>
      <DailiesProvider>
        <TodosProvider>{children}</TodosProvider>
      </DailiesProvider>
    </AuthProvider>
  );
}

export default Providers;
