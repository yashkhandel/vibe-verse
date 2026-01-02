import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { setDraftData } from "@/store/slices/profileSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function FormPage2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draft = useSelector((state: RootState) => state.profile.draft);

  const [errors, setErrors] = useState({
    city: "",
    state: "",
    country: "",
  });

  const validateForm = () => {
    const newErrors = { city: "", state: "", country: "" };
    let isValid = true;

    if (!draft.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!draft.state.trim()) {
      newErrors.state = "State is required";
      isValid = false;
    }

    if (!draft.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/form/step-3");
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
              Step 2 of 3
            </span>
            <span className="text-sm text-gray-500">Address Information</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardTitle className="text-2xl">Step 2: Address Information</CardTitle>
            <p className="text-indigo-100 mt-2">Tell us where you're located</p>
          </CardHeader>
          <CardContent className="pt-8">
            {/* City Field */}
            <div className="mb-6">
              <Label htmlFor="city" className="text-gray-700 font-semibold">
                City
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="New York"
                value={draft.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`mt-2 ${
                  errors.city
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* State Field */}
            <div className="mb-6">
              <Label htmlFor="state" className="text-gray-700 font-semibold">
                State / Province
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="NY"
                value={draft.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className={`mt-2 ${
                  errors.state
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>

            {/* Country Field */}
            <div className="mb-8">
              <Label htmlFor="country" className="text-gray-700 font-semibold">
                Country
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="United States"
                value={draft.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className={`mt-2 ${
                  errors.country
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigate("/form/step-1")}
                variant="outline"
                className="flex-1"
              >
                <ChevronLeft size={18} className="mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
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
