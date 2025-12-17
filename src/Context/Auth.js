import { createContext, useEffect, useState } from "react"

export const Auth = createContext(null);

export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        setUsers(JSON.parse(localStorage.getItem("users")) || []);
        setUser(JSON.parse(localStorage.getItem("currentUser")));

    }, []);

    const register = (newUser) => {
        
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    
    const login = (email, password) => {

        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!foundUser) return false;

        setUser(foundUser);
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        return true
    };

    const updateUser = (updatedUser) => {

        const updatedUsers = users.map((u) => u.email === updatedUser.email? updatedUser : u );
        
        setUsers(updatedUsers);
        setUser(updatedUser);
        
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    };

    const logout = (email, password) => {
        
        setUser(null);
        localStorage.removeItem("currentUser");
    };

    return ( 
        <Auth.Provider value={{ user, users, register, login, updateUser, logout}}>
            {children}
        </Auth.Provider>
    );
};