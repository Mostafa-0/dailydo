import { AuthProvider } from "./AuthContext";
import { TodosProvider } from "./TodosContext";
import { DailiesProvider } from "./DailiesContext";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";
import { TaskListProvider } from "./TaskListContext";

function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <TaskListProvider>
            <DailiesProvider>
              <TodosProvider>{children}</TodosProvider>
            </DailiesProvider>
          </TaskListProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Providers;
