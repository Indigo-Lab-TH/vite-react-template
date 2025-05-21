import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "@/supabaseClient";
import { setServers } from "dns";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [ session, setSession ] = useState(undefined)
    const [ cons, setCons ] = useState(undefined)

    // SignUp
    const signUpNewUser = async ( email, password ) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        setCons(data);

        if (error){
            console.error( "There was a problem signing up", error );
            return {success: false, error: error.message };
        }
        return {success: true, data};
    };

    // SignIn
    const signInUser = async( email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.error( "sign in error occurred: ", error );
                return { success: false, error: error.message };
            }
            console.log( "sign in success", data );
            return { success: true, data };
        } catch ( error) {
            console.error( "An error occur", error );
        }
    };

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session ) => {
             setSession( session );
        });

    }, []);

    // SignOut
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.log("There was an error", error);
        }
    };

    return (
        <AuthContext.Provider value={{ session, cons, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}