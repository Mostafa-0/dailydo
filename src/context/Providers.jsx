import { AuthProvider } from "./AuthContext";
import { TodosProvider } from "./TodosContext";
import { DailiesProvider } from "./DailiesContext";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";

function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <DailiesProvider>
            <TodosProvider>{children}</TodosProvider>
          </DailiesProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Providers;
