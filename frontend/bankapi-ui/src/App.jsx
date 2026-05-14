import { useState, useCallback } from "react";
import globalStyles from ".../theme/globalStyles";
import s from "../theme/styles";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import HomePage from "../pages/HomePage";
import AccountsPage from "../pages/AccountsPage";
import NewAccountPage from "../pages/NewAccountPage";
import SearchPage from "../pages/SearchPage";

export default function App() {
  const [page, setPage] = useState("Home");
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type, id: Date.now() });
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.app}>
        <Sidebar page={page} onNavigate={setPage} />

        <main style={s.main}>
          {page === "Home"        && <HomePage       onNavigate={setPage} />}
          {page === "Accounts"    && <AccountsPage   toast={showToast} />}
          {page === "New Account" && <NewAccountPage toast={showToast} />}
          {page === "Search"      && <SearchPage     toast={showToast} />}
        </main>

        {toast && (
          <Toast
            key={toast.id}
            msg={toast.msg}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}