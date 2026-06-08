import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbkP3G4yCf9CffOQNyt4nfip-ltEwH-o4",
  authDomain: "pathakbrothers-d1249.firebaseapp.com",
  projectId: "pathakbrothers-d1249",
  storageBucket: "pathakbrothers-d1249.firebasestorage.app",
  messagingSenderId: "1001660087465",
  appId: "1:1001660087465:web:e378e21edd1366ecb93db8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;