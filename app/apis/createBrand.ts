// createBrand.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const storage = getStorage();
import { db } from "../firebase";

export type BrandData = {
    "Brand Name": string;
    "Brand Description": string;
    "UAdd Company Documents": File; // Adjust type as needed
    "Add Logo": File; // Adjust type as needed
    "What are you most passionate about?": string;
    "What are your hobbies?": string;
    "What brings you the most joy in life?": string;
    "What role in life makes you feel most fulfilled?": string;
    "What are your top 3 core values?": string;
    "Describe your lowest moment — how did it feel, what were you going through, and how old were you?": string;
    "Describe your happiest moment — how did it feel, and what helped you reach it?": string;
    "How can you help others move from their lowest to their happiest?": string;
    "What inspired you to start this brand?": string;
    "Was there a specific moment when you knew this is what you wanted to do?": string;
    "What makes your story different from others in your industry?": string;
    "What were some key struggles on your journey so far?": string;
    "How have you changed or grown since you started this journey?": string;
    "What’s the biggest lesson you've learned through this process?": string;
    "What is the mission of your brand?": string;
    "What is the bigger vision you're working toward?": string;
    "What kind of change do you want your brand to bring in people’s lives?": string;
    "What legacy do you want to leave behind through this brand?": string;
    "What is your main Industry?": string;
    "What is your main Sub-Industry?": string;
    "Is your offering a product or a service?": string;
    "Is your brand targeting businesses or consumers?": string;
    "If your brand was a person, how would you describe it?": string;
    "What kind of language and tone should your brand speak in?": string;
  };
  

  export const createBrand = async (brandData: BrandData) => {
    try {
      // Upload files first
      const companyDocFile = brandData["UAdd Company Documents"];
      const logoFile = brandData["Add Logo"];
  
      const uploadAndGetURL = async (file: File, path: string) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };
  
      const companyDocUrl = await uploadAndGetURL(
        companyDocFile,
        `brands/${Date.now()}_companyDoc`
      );
      const logoUrl = await uploadAndGetURL(
        logoFile,
        `brands/${Date.now()}_logo`
      );
  
      // Replace files with their URLs
      const brandDataWithUrls = {
        ...brandData,
        "UAdd Company Documents": companyDocUrl,
        "Add Logo": logoUrl,
      };
  
      // Save to Firestore
      await addDoc(collection(db, "brands"), brandDataWithUrls);
    } catch (error) {
      console.error("Error adding brand: ", error);
      throw error;
    }
  };