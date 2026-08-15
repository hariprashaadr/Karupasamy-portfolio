import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    const saved = sessionStorage.getItem('portfolio_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('portfolio_admin_auth', isAuthenticated ? 'true' : 'false');
    if (adminUser) {
      sessionStorage.setItem('portfolio_admin_user', JSON.stringify(adminUser));
    } else {
      sessionStorage.removeItem('portfolio_admin_user');
    }
  }, [isAuthenticated, adminUser]);

  const login = async (usernameOrEmail, password) => {
    // Simulated demo auth with clean extensibility for future backend (Django/Flask/Supabase/Firebase)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validIdentifier = usernameOrEmail.trim().toLowerCase();
        // Demo credentials: admin / admin123 or karuppasamy / dev2026
        if (
          (validIdentifier === 'admin' || validIdentifier === 'admin@karuppasamy.dev' || validIdentifier === 'karuppasamy') &&
          (password === 'admin123' || password === 'karuppasamy2026' || password === 'admin')
        ) {
          setIsAuthenticated(true);
          setAdminUser({
            name: 'Karuppasamy A',
            email: 'admin@karuppasamy.dev',
            role: 'Super Admin'
          });
          resolve({ success: true });
        } else {
          reject(new Error('Invalid username/email or password. For demo access use admin / admin123'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('portfolio_admin_auth');
    sessionStorage.removeItem('portfolio_admin_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
