import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔹 Replace with your Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDB6zVp5bJtqrNVMDX-wS7plX2RDDS80y4",
  authDomain: "orion-flights.firebaseapp.com",
  projectId: "orion-flights",
  storageBucket: "orion-flights.appspot.com",
  messagingSenderId: "679154147535",
  appId: "1:679154147535:web:5771584a3cc7cf143517ba"
};

// 🔥 Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📌 Function to store a flight booking in Firestore
export async function bookFlight(departure, destination, travelDate, passengers, paymentMethod, referenceCode) {
    await addDoc(collection(db, "bookings"), {
        departure,
        destination,
        travelDate,
        passengers,
        paymentMethod,
        referenceCode
    });
    console.log("✅ Flight booked successfully!");
}

// 🚀 Export Firestore database so other files can use it
export { db };
