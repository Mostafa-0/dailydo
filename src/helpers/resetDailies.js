import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export const resetDailiesIfNeeded = async (userId) => {
  if (!userId) return;

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data();
    const lastReset = userData.lastReset ? new Date(userData.lastReset) : null;
    const now = new Date();
    const todayMidnight = new Date(now).setHours(0, 0, 0, 0);

    if (!lastReset || lastReset < todayMidnight) {
      const dailiesRef = collection(db, `users/${userId}/dailies`);
      const dailiesSnap = await getDocs(dailiesRef);

      if (!dailiesSnap.empty) {
        const updatePromises = dailiesSnap.docs.map((dailyDoc) =>
          updateDoc(dailyDoc.ref, { status: "pending" })
        );
        await Promise.all(updatePromises);
      }

      await updateDoc(userRef, { lastReset: now.toISOString() });
    }
  } catch (error) {
    console.error("❌ Error resetting dailies:", error);
  }
};
