"use client"
import { db } from '@/app/firebase';
import React, { useEffect, useState } from 'react'
import {collection, getDocs, onSnapshot } from "firebase/firestore";

const page = () => {
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        
        const brandsCollection = collection(db, "brands");
        const unsubscribe = onSnapshot(brandsCollection, (querySnapshot: any) => {
            const brandsData = querySnapshot.docs.map((doc: any) => {
              const data = doc.data();

              console.log("raw data is:", data);
              return {
                id: doc.id,
                brandName: data["Brand Name"] || "N/A",
                brandDescription: data["Brand Description"] || "No Description",
                brandLogo: data["Add Logo"] || "", // Extract Brand Logo
                happiestMoment: data["Describe your happiest moment — how did it feel, and what helped you reach it?"] || "",
                lowestMoment: data["Describe your lowest moment — how did it feel, what were you going through, and how old were you?"] || "",
                helpOthers: data["How can you help others move from their lowest to their happiest?"] || "",
                growth: data["How have you changed or grown since you started this journey?"] || "",
                brandAsPerson: data["If your brand was a person, how would you describe it?"] || "",
                targetAudience: data["Is your brand targeting businesses or consumers?"] || "",
                offeringType: data["Is your offering a product or a service?"] || "",
                companyDocuments: data["UAdd Company Documents"] || "",
                definingMoment: data["Was there a specific moment when you knew this is what you wanted to do?"] || "",
                passion: data["What are you most passionate about?"] || "",
                hobbies: data["What are your hobbies?"] || "",
                coreValues: data["What are your top 3 core values?"] || "",
                joy: data["What brings you the most joy in life?"] || "",
                brandInspiration: data["What inspired you to start this brand?"] || "",
                biggerVision: data["What is the bigger vision you're working toward?"] || "",
                mission: data["What is the mission of your brand?"] || "No mission defined",
                mainIndustry: data["What is your main Industry?"] || "",
                mainSubIndustry: data["What is your main Sub-Industry?"] || "",
                brandChange: data["What kind of change do you want your brand to bring in people’s lives?"] || "",
                languageTone: data["What kind of language and tone should your brand speak in?"] || "",
                legacy: data["What legacy do you want to leave behind through this brand?"] || "",
                uniqueStory: data["What makes your story different from others in your industry?"] || "",
                fulfillmentRole: data["What role in life makes you feel most fulfilled?"] || "",
                keyStruggles: data["What were some key struggles on your journey so far?"] || "",
                biggestLesson: data["What’s the biggest lesson you've learned through this process?"] || "",
              };
            });
            setBrands(brandsData);
            setLoading(false);
          });
          return () => unsubscribe();

      }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }

    console.log("brands data:",brands.map((brand) => brand.brandName));
  
    return (
      <div>
        <h1>Brand List</h1>
        <ul>
          {brands.map((brand) => (
            <li key={brand.id}>{brand.brandName}</li> // Replace 'name' with the field in your data
          ))}
        </ul>
      </div>
    );
  };


export default page