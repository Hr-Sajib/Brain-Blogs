import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import  auth from '../../firebase/firebase.config'; // Import auth from your Firebase configuration file


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const Gprovider = new GoogleAuthProvider();



    //sign up with google
    const googleSignUp=()=>{
        return signInWithPopup(auth, Gprovider)
    }



    // sign up
    const createUser=(auth, email, password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
     }
 
 
     //login
     const loginUser=(auth, email, password)=>{
         setLoader(true);
         return signInWithEmailAndPassword(auth, email, password)
     }
 
 
     // retain user info
     useEffect(()=>{
         const unsubscribe = onAuthStateChanged(auth, currentUser=>{
             setUser(currentUser);
            //  console.log(currentUser);
             setLoader(false);
         })
         return()=>{
             unsubscribe();
         }
     },[])
 
     //log out
     const logOut =()=>{
         setLoader(true);
         return signOut(auth);
     }



     // wishlist id array
     const [wishListIdsArray, setWishListIdsArray] = useState([]);
     console.log('in auth: ', wishListIdsArray);




     //get wishlist
     const [WishlistIDs, setWishlistIDs] = useState([]);

     const userEmail = user?.email;

 
    useEffect(()=>{
  
        fetch(`http://localhost:5500/getWishlist/${userEmail}`)
        .then(r=>r.json())
        .then(d=>{
            console.log('fetched data :',d);
            const Ids = d[0].ids || [];
            setWishlistIDs(Ids);
        })
        .catch(error => {
            console.error('Error fetching wishlist data:', error);
        });

    },[userEmail])
 






    const userInfo = {
        user,
        googleSignUp,
        createUser,
        loginUser,
        logOut,
        wishListIdsArray,
        setWishListIdsArray,
        WishlistIDs,
        setWishlistIDs,
        loader,


    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;