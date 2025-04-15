"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Trash2 } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Resume {
  id: string;
  name: string;
  createdAt: any;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const resumesCollection = collection(db, `users/${user.uid}/resumes`);
        const resumesSnapshot = await getDocs(resumesCollection);
        
        const resumesList = resumesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Resume[];
        
        setResumes(resumesList.sort((a, b) => b.createdAt - a.createdAt));
      } catch (error) {
        console.error("Error fetching resumes:", error);
        toast.error("Failed to load your resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user]);

  const handleDeleteResume = async (id: string) => {
    if (!user) return;
    
    try {
      await deleteDoc(doc(db, `users/${user.uid}/resumes/${id}`));
      setResumes(resumes.filter(resume => resume.id !== id));
      toast.success("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              My Resumes
            </h1>
            
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : resumes.length === 0 ? (
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resumes Yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't created any resumes yet. Start by creating your first resume.
                  </p>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card 
                  key={resume.id} 
                  className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{resume.name}</h3>
                        <p className="text-sm text-gray-500">
                          Created: {resume.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-500" />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button
                        onClick={() => router.push(`/edit/${resume.id}`)}
                        variant="outline"
                        className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteResume(resume.id)}
                        variant="outline"
                        className="px-4 py-2 rounded-lg font-medium border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
