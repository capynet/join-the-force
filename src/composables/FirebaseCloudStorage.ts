import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import type {StorageReference} from "firebase/storage";
import {initializeApp} from "firebase/app";
import firebaseCredentials from "../firebase-credentials.json";

// Initialize Firebase
const app = initializeApp(firebaseCredentials);

export async function upload(file: Blob | File, fileName: string, path: string | null = null) {
    const storage = getStorage(app);
    path !== null && (fileName = `${path}/${fileName}`);
    const fileRef = ref(storage, fileName);

    return uploadBytes(fileRef, file).then((snapshot) => snapshot.ref);
}

export async function publicURL(ref: StorageReference) {
    return getDownloadURL(ref);
}