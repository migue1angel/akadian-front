import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export function getFirebaseUser(): Promise<User | null> {
  const auth = getAuth();

  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub(); // evitamos múltiples ejecuciones
      resolve(user);
    });
  });
}
