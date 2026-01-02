import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import {
  deleteProfile,
  loadProfileForEdit,
  resetDraft,
} from "@/store/slices/profileSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profiles = useSelector((state: RootState) => state.profile.profiles);

  const handleAddProfile = () => {
    dispatch(resetDraft());
    navigate("/form/step-1");
  };

  const handleEditProfile = (id: string) => {
    dispatch(loadProfileForEdit(id));
    navigate("/form/step-1");
  };

  const handleDeleteProfile = (id: string) => {
    dispatch(deleteProfile(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Create, edit, and manage user profiles with multi-step forms
          </p>
        </div>

        {/* Add Profile Button */}
        <div className="mb-8">
          <Button
            onClick={handleAddProfile}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-lg shadow-lg text-lg font-semibold flex items-center gap-2"
          >
            <Plus size={24} />
            Add New Profile
          </Button>
        </div>

        {/* Profiles Grid */}
        {profiles.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="pt-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                No profiles yet. Create your first profile to get started!
              </p>
              <Button
                onClick={handleAddProfile}
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Create First Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card
                key={profile.id}
                className="hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <CardTitle className="text-lg">{profile.fullName}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm mb-6">
                    <div>
                      <span className="font-semibold text-gray-700">Email:</span>
                      <p className="text-gray-600">{profile.email}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Age:</span>
                      <p className="text-gray-600">{profile.age}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Location:
                      </span>
                      <p className="text-gray-600">
                        {profile.city}, {profile.state}, {profile.country}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleEditProfile(profile.id)}
                      variant="outline"
                      className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                      size="sm"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteProfile(profile.id)}
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {profiles.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {profiles.length}
                </div>
                <p className="text-gray-600">Total Profiles</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {Math.floor(
                    profiles.reduce((sum, p) => sum + (Number(p.age) || 0), 0) /
                      profiles.length || 0
                  )}
                </div>
                <p className="text-gray-600">Average Age</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {new Set(profiles.map((p) => p.country)).size}
                </div>
                <p className="text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
