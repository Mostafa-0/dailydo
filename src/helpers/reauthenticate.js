import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export async function reauthenticate(currentUser, password) {
  const credential = EmailAuthProvider.credential(currentUser.email, password);
  return reauthenticateWithCredential(currentUser, credential);
}
