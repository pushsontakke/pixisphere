# Pixisphere

live: [link](https://pixisphere-sandy.vercel.app/)

A modern photography booking platform that connects customers with professional photographers and studios for maternity, newborn, birthday, and other special event photography sessions.

## Features

- **Photographer Discovery**: Browse and search through a curated list of professional photographers
- **Advanced Filtering**: Filter photographers by price range, rating, photography style, and location
- **Real-time Search**: Search photographers by name, location, or specialization tags
- **Detailed Profiles**: View comprehensive photographer profiles with portfolios, reviews, and pricing
- **Interactive Gallery**: Browse photographer portfolios with image carousel functionality
- **Review System**: Read authentic customer reviews and ratings
- **Inquiry System**: Send direct inquiries to photographers with event details
- **Responsive Design**: Fully responsive interface optimized for desktop and mobile devices
- **Load More Functionality**: Efficient pagination with load-more feature for better performance

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Custom React components
- **Font**: Poppins (Google Fonts)
- **Image Optimization**: Next.js Image component
- **State Management**: React hooks (useState, useMemo, useCallback)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pushsontakke/pixisphere.git
   cd pixisphere
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Poppins font configuration
│   ├── page.tsx                # Home page with photographer listings
│   ├── globals.css             # Global styles and Tailwind configuration
│   └── photographer/
│       └── [id]/
│           └── page.tsx        # Dynamic photographer profile page
├── components/
│   ├── PhotographerCard.tsx    # Individual photographer card component
│   ├── FilterSidebar.tsx       # Advanced filtering sidebar
│   ├── SearchBar.tsx           # Search functionality with debouncing
│   ├── ProfileHeader.tsx       # Photographer profile header
│   ├── Gallery.tsx             # Interactive image gallery
│   ├── Reviews.tsx             # Customer reviews display
│   └── InquiryModal.tsx        # Contact form modal
└── Data/
    └── mockData.ts             # Sample photographer data
```

## Components Documentation

### Core Components

#### `PhotographerCard.tsx`

- **Purpose**: Displays photographer information in a card format
- **Features**:
  - Profile image with fallback
  - Pricing display with Indian currency formatting
  - Star rating system
  - Location with map icon
  - Specialty tags
  - "View Profile" navigation link
- **Props**: `photographer` object with complete photographer data

#### `FilterSidebar.tsx`

- **Purpose**: Advanced filtering system for photographer search
- **Features**:
  - Price range slider (₹0 - ₹20,000)
  - Rating filter (2+ to 4+ stars)
  - Photography style checkboxes (Outdoor, Studio, Candid, etc.)
  - City/location filter
  - Mobile-responsive collapsible design
  - "Clear All" functionality
- **Props**: `filters`, `onFilterChange`, `photographers`

#### `SearchBar.tsx`

- **Purpose**: Real-time search functionality
- **Features**:
  - Debounced input (300ms delay)
  - Search by name, location, or tags
  - Search icon indicator
  - Responsive design
- **Props**: `searchQuery`, `onSearchChange`

### Profile Page Components

#### `ProfileHeader.tsx`

- **Purpose**: Comprehensive photographer profile display
- **Features**:
  - Large profile image
  - Photographer name and location
  - Star rating with review count
  - Photography style badges
  - Bio/description
  - Pricing information
  - "Send Inquiry" button
- **Props**: `photographer`, `onInquiry`

#### `Gallery.tsx`

- **Purpose**: Interactive portfolio image gallery
- **Features**:
  - Main image display (large view)
  - Thumbnail grid navigation
  - Active image highlighting
  - Click-to-change functionality
  - Responsive image sizing
- **Props**: `portfolio` (array of image URLs)

#### `Reviews.tsx`

- **Purpose**: Customer review and rating display
- **Features**:
  - Star rating visualization
  - Customer name and comment
  - Formatted date display
  - Empty state handling
  - Clean separation between reviews
- **Props**: `reviews` array

#### `InquiryModal.tsx`

- **Purpose**: Contact form for photographer inquiries
- **Features**:
  - Modal overlay with portal rendering
  - Form fields: name, email, phone, event date, message
  - Form validation
  - Responsive design
  - Close functionality
  - Submit handling with confirmation
- **Props**: `photographer`, `onClose`

## Key Features Implementation

### Advanced Filtering System

- **Price Range**: Slider-based price filtering up to ₹20,000
- **Rating Filter**: Minimum rating selection (2+, 3+, 4+ stars)
- **Style Filter**: Multiple photography style selection
- **Location Filter**: City-based filtering
- **Sorting**: Recent, price (low to high), price (high to low), rating

### Search Functionality

- **Real-time Search**: Debounced search with 300ms delay
- **Multi-field Search**: Searches across name, location, and tags
- **Case-insensitive**: Flexible search matching

### Performance Optimizations

- **Load More**: Pagination with initial load of 6 photographers
- **useMemo**: Optimized filtering and search calculations
- **useCallback**: Memoized event handlers
- **Next.js Image**: Optimized image loading and display
- **Debounced Search**: Reduced API calls and improved performance

### Responsive Design

- **Mobile-first**: Tailwind CSS responsive utilities
- **Collapsible Filters**: Mobile-friendly filter sidebar
- **Flexible Grid**: Responsive photographer card grid
- **Touch-friendly**: Optimized for mobile interactions

## Data Structure

### Photographer Interface

```typescript
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
  reviews: Review[];
}
```

### Review Interface

```typescript
interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}
```

## Routing

- `/` - Home page with photographer listings and filters
- `/photographer/[id]` - Dynamic photographer profile page

## Styling

The application uses Tailwind CSS with a custom configuration:

- **Primary Color**: Blue (#2563eb)
- **Font**: Poppins (all weights 100-900)
- **Design System**: Consistent spacing, colors, and typography
- **Components**: Card-based design with shadows and rounded corners

