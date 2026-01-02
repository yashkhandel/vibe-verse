import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { setDraftData } from "@/store/slices/profileSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function FormPage1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draft = useSelector((state: RootState) => state.profile.draft);
  const editingId = useSelector((state: RootState) => state.profile.editingId);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    age: "",
  });

  const validateForm = () => {
    const newErrors = { fullName: "", email: "", age: "" };
    let isValid = true;

    if (!draft.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!draft.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!draft.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (Number(draft.age) < 1 || Number(draft.age) > 150) {
      newErrors.age = "Please enter a valid age";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/form/step-2");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    dispatch(setDraftData({ [field]: value } as any));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-700">
              Step 1 of 3
            </span>
            <span className="text-sm text-gray-500">Basic Information</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardTitle className="text-2xl">Step 1: Basic Information</CardTitle>
            <p className="text-blue-100 mt-2">
              {editingId ? "Edit your" : "Enter your"} basic details
            </p>
          </CardHeader>
          <CardContent className="pt-8">
            {/* Full Name Field */}
            <div className="mb-6">
              <Label htmlFor="fullName" className="text-gray-700 font-semibold">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={draft.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`mt-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={draft.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`mt-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Age Field */}
            <div className="mb-8">
              <Label htmlFor="age" className="text-gray-700 font-semibold">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={draft.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className={`mt-2 ${
                  errors.age
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft size={18} className="mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                Next
                <ChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
