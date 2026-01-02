import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  age: number | string;
  city: string;
  state: string;
  country: string;
}

export interface DraftProfile {
  fullName: string;
  email: string;
  age: number | string;
  city: string;
  state: string;
  country: string;
}

interface ProfileState {
  profiles: UserProfile[];
  draft: DraftProfile;
  editingId: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  draft: {
    fullName: "",
    email: "",
    age: "",
    city: "",
    state: "",
    country: "",
  },
  editingId: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Set draft data (for multi-step form)
    setDraftData: (state, action: PayloadAction<Partial<DraftProfile>>) => {
      state.draft = { ...state.draft, ...action.payload };
    },

    // Reset draft to initial state
    resetDraft: (state) => {
      state.draft = {
        fullName: "",
        email: "",
        age: "",
        city: "",
        state: "",
        country: "",
      };
      state.editingId = null;
    },

    // Create a new profile from draft
    createProfile: (state) => {
      if (!state.draft.fullName || !state.draft.email) {
        return;
      }

      const newProfile: UserProfile = {
        id: Date.now().toString(),
        ...state.draft,
      };

      state.profiles.push(newProfile);
      state.draft = {
        fullName: "",
        email: "",
        age: "",
        city: "",
        state: "",
        country: "",
      };
      state.editingId = null;
    },

    // Load profile for editing
    loadProfileForEdit: (state, action: PayloadAction<string>) => {
      const profile = state.profiles.find((p) => p.id === action.payload);
      if (profile) {
        state.draft = {
          fullName: profile.fullName,
          email: profile.email,
          age: profile.age,
          city: profile.city,
          state: profile.state,
          country: profile.country,
        };
        state.editingId = profile.id;
      }
    },

    // Update existing profile
    updateProfile: (state) => {
      if (!state.editingId) {
        return;
      }

      const index = state.profiles.findIndex((p) => p.id === state.editingId);
      if (index !== -1) {
        state.profiles[index] = {
          ...state.profiles[index],
          ...state.draft,
        };
      }

      state.draft = {
        fullName: "",
        email: "",
        age: "",
        city: "",
        state: "",
        country: "",
      };
      state.editingId = null;
    },

    // Delete profile
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setDraftData,
  resetDraft,
  createProfile,
  loadProfileForEdit,
  updateProfile,
  deleteProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
