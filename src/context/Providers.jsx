import { AuthProvider } from "./AuthContext";
import { TodosProvider } from "./TodosContext";
import { HabitsProvider } from "./HabitsContext";

function Providers({ children }) {
  return (
    <AuthProvider>
      <TodosProvider>
        <HabitsProvider>{children}</HabitsProvider>
      </TodosProvider>
    </AuthProvider>
  );
}

export default Providers;
