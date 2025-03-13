import { AuthProvider } from "./AuthContext";
import { TodosProvider } from "./TodosContext";
import { DailiesProvider } from "./DailiesContext";
import { ThemeProvider } from "./ThemeContext";

function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DailiesProvider>
          <TodosProvider>{children}</TodosProvider>
        </DailiesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Providers;
