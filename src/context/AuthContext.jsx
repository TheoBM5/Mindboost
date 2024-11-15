import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";
import usePreferencesStore from "../constants/preferencesZus"


export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      
      // Configuramos el usuario y el estado de autenticación
      setUser(res.data.user);
      setIsAuth(true);

      const { preferences } = res.data;
      console.log("preferences",preferences)
      if (preferences) {
        // Cargamos las preferencias en el estado de preferencias
        usePreferencesStore.getState().loadPreferences({
          img_duck: preferences.img_duck,
          color_duck: preferences.color_duck,
          mode_color: preferences.mode_color,
        });
      }

      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data;
      setErrors(Array.isArray(errorMessage) ? errorMessage : [error.message || "Unknown error occurred"]);
    }
  };

  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }
  };

  const signout = async () => {
    try {
      
      const { color_duck, img_duck, mode_color, resetPreferences } = usePreferencesStore.getState();
      
      await axios.post('/save-preferences', {
        color_duck,
        img_duck,
        mode_color,
      });
      
      resetPreferences();
      await axios.post("/signout");
      
      setUser(null);
      setIsAuth(false);
  
    } catch (error) {
      console.error("Error al guardar las preferencias o cerrar sesión:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
  const fetchUserData = async () => {
    try {
      if (Cookie.get("token")) {
        const res = await axios.get("/profile");
        setUser(res.data);
        setIsAuth(true);
      }
    } catch (err) {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false); // Establecer el estado de carga después de que se completa la solicitud
    }
  };

  fetchUserData();
  }, []);

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null);      
    }, 5000);

    return () => clearTimeout(clean);
  }, [errors])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}