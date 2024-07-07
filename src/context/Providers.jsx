import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./TodosContext";
import { HabitsProvider } from "./HabitsContext";

function Providers({ children }) {
  return (
    <AuthProvider>
      <DataProvider>
        <HabitsProvider>{children}</HabitsProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default Providers;
