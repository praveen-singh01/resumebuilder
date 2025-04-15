import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./config";
import { ResumeData } from "@/types/resume";

// Save a resume
export const saveResume = async (userId: string, resumeData: ResumeData, resumeId?: string) => {
  try {
    const id = resumeId || `resume_${Date.now()}`;
    const resumeRef = doc(db, "users", userId, "resumes", id);
    
    await setDoc(resumeRef, {
      ...resumeData,
      id,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    }, { merge: true });
    
    return { success: true, id };
  } catch (error) {
    console.error("Error saving resume:", error);
    return { success: false, error };
  }
};

// Get a resume
export const getResume = async (userId: string, resumeId: string) => {
  try {
    const resumeRef = doc(db, "users", userId, "resumes", resumeId);
    const resumeSnap = await getDoc(resumeRef);
    
    if (resumeSnap.exists()) {
      return { success: true, data: resumeSnap.data() as ResumeData };
    } else {
      return { success: false, error: "Resume not found" };
    }
  } catch (error) {
    console.error("Error getting resume:", error);
    return { success: false, error };
  }
};

// Get all resumes for a user
export const getUserResumes = async (userId: string) => {
  try {
    const resumesRef = collection(db, "users", userId, "resumes");
    const resumesSnap = await getDocs(resumesRef);
    
    const resumes: ResumeData[] = [];
    resumesSnap.forEach((doc) => {
      resumes.push(doc.data() as ResumeData);
    });
    
    return { success: true, data: resumes };
  } catch (error) {
    console.error("Error getting user resumes:", error);
    return { success: false, error };
  }
};

// Delete a resume
export const deleteResume = async (userId: string, resumeId: string) => {
  try {
    const resumeRef = doc(db, "users", userId, "resumes", resumeId);
    await deleteDoc(resumeRef);
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error };
  }
};
