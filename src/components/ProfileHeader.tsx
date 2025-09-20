import Image from "next/image";

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface ProfileHeaderProps {
  photographer: Photographer;
  onInquiry: () => void;
}

export default function ProfileHeader({
  photographer,
  onInquiry,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative h-40 w-40 flex-shrink-0">
          <Image
            src={photographer.profilePic}
            alt={photographer.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {photographer.name}
          </h1>
          <p className="text-gray-600 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-1 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {photographer.location}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(photographer.rating)
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {photographer.rating} • {photographer.reviews.length} reviews
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {photographer.styles.map((style, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded"
              >
                {style}
              </span>
            ))}
          </div>

          <p className="text-gray-700">{photographer.bio}</p>
        </div>

        <div className="md:w-48 flex-shrink-0">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Starting at</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              ₹{photographer.price.toLocaleString()}
            </p>
            <button
              onClick={onInquiry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
