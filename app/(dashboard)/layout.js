"use client";

import React, { useState, useEffect } from "react";
import { doc, deleteDoc, getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { app } from "/firebaseConfig";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";
import PlanContext from "./_components/PlanContext"
function Layout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!isLoaded || !user) return;

      try {
        const userName = user.fullName;

        if (!userName) {
          console.error("User's full name is missing");
          setPlan("base");
          return;
        }

        const upgradeRef = collection(db, "upgrade");
        const q = query(upgradeRef, where("userName", "==", userName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0];
          const userData = docRef.data();

          const storedDate = new Date(userData.date);
          const currentDate = new Date();

          const monthDifference = currentDate.getMonth() - storedDate.getMonth() + 12 * (currentDate.getFullYear() - storedDate.getFullYear());

          if (monthDifference > 1) {
            await deleteDoc(doc(db, "upgrade", docRef.id));
            console.log("User data deleted due to expired plan");
            setPlan("base");
          } else {
            setPlan(userData.plan);
          }
          console.log(monthDifference);
        } else {
          setPlan("base");
        }
      } catch (error) {
        console.error("Error fetching user plan:", error);
        setPlan("base");
      }
    };

    fetchUserPlan();
  }, [user, isLoaded, db]);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  useEffect(() => {
    if (plan !== null) {
      setLoading(false);
    }
  }, [plan]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <PlanContext.Provider value={plan}>
      <div>
        <div className='h-full hidden md:selection:w-64 flex-col fixed md:flex inset-y-0 z-50'>
          <SideNav plan={plan}/>
        </div>
        {
          isSideNavOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={toggleSideNav}>
              <div className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
                <SideNav closeSideNav={toggleSideNav} plan={plan} />
              </div>
            </div>
          )}
        <div className='md:ml-64'>
          <TopHeader toggleSideNav={toggleSideNav} />
          {children}
        </div>
      </div>
    </PlanContext.Provider>
  )
}

export default Layout;
