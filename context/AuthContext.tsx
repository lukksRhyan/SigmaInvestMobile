import React, {createContext, useContext, useState} from "react";

interface User{
    name: string;
    email: string;
}

interface AuthContextType {
    user: User|null;
    isAuthenticated: boolean;
    login: (user:User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) =>{
    const [user,setUser] = useState<User|null>(null);

    const login = (userData:User)=> setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {

    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within the AuthProvider");
    return context;
};