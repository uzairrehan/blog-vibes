"use client"
import Loading from "@/components/loading";
import { auth } from "@/firebase/firebaseauthentication";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminProtectedRoute({ children }:{children:React.ReactNode}) {
  const [
    // user
    , setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const fetchUser = async () => {
          try {
            const q = query(
              collection(db, "users"),
              where("uid", "==", currentUser.uid)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUser(doc.data() && null);
            });
            setLoading(false);
          } catch (error) {
            console.error("Error in fetch user data : ", error);
            setLoading(false); 
          }
        };

        fetchUser();
      } else {
        toast.error("You are not an admin !")
        route.push("/");
        setLoading(false);
      }
    });

    return () => unsubscribe(); 
  }, [route]);

  if (loading) {
    return <Loading/>;
  }

  return <>{children}</>;
}

export default AdminProtectedRoute;
