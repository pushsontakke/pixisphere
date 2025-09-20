"use client";

import { useState } from "react";
import { photographers } from "../../../Data/mockData";
import InquiryModal from "../../../components/InquiryModal";
import ProfileHeader from "../../../components/ProfileHeader";
import Gallery from "../../../components/Gallery";
import Reviews from "../../../components/Reviews";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PhotographerProfile({ params }: PageProps) {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const photographer = photographers.find((p) => p.id === parseInt(params.id));

  if (!photographer) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Photographer not found</p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader
          photographer={photographer}
          onInquiry={() => setShowInquiryModal(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <Gallery portfolio={photographer.portfolio} />
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <Reviews reviews={photographer.reviews} />
          </div>
        </div>
      </main>

      {showInquiryModal && (
        <InquiryModal
          photographer={photographer}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}
