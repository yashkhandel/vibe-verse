import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { createProfile, updateProfile, resetDraft } from "@/store/slices/profileSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Edit2, ChevronLeft } from "lucide-react";

export default function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draft = useSelector((state: RootState) => state.profile.draft);
  const editingId = useSelector((state: RootState) => state.profile.editingId);

  const handleSubmit = () => {
    if (editingId) {
      dispatch(updateProfile());
    } else {
      dispatch(createProfile());
    }
    navigate("/");
  };

  const handleEdit = () => {
    navigate("/form/step-1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-700">
              Step 3 of 3
            </span>
            <span className="text-sm text-gray-500">Summary & Review</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="shadow-xl mb-6">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-2xl">Step 3: Review Your Information</CardTitle>
            <p className="text-purple-100 mt-2">
              {editingId ? "Review your updated profile" : "Please review your details before submitting"}
            </p>
          </CardHeader>
          <CardContent className="pt-8">
            {/* Basic Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-900">{draft.fullName}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-lg text-gray-900">{draft.email}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Age
                  </label>
                  <p className="text-lg text-gray-900">{draft.age}</p>
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <p className="text-lg text-gray-900">{draft.city}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <p className="text-lg text-gray-900">{draft.state}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <p className="text-lg text-gray-900">{draft.country}</p>
                </div>
              </div>
            </div>

            {/* Complete Information Card */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-700">
                  All information is complete and ready to be saved!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-lg font-semibold text-lg"
              >
                <Check size={20} className="mr-2" />
                {editingId ? "Update Profile" : "Create Profile"}
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="flex-1"
                >
                  <Edit2 size={18} className="mr-2" />
                  Edit Information
                </Button>
                <Button
                  onClick={() => {
                    dispatch(resetDraft());
                    navigate("/");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <ChevronLeft size={18} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
