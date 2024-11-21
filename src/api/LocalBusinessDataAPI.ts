import axios from 'axios';

const apiKey = import.meta.env.VITE_RAPID_API_KEY;
const apiHost = import.meta.env.VITE_RAPID_API_HOST;

export type RestoDataProps = {
  business_id: string;
  name: string;
  phone_number: string;
  latitude: number;
  longitude: number;
  full_address: string;
  review_count: number;
  rating: number;
  opening_status: string;
  working_hours: {
    Monday: string[];
    Tuesday: string[];
    Wednesday: string[];
    Thursday: string[];
    Friday: string[];
    Saturday: string[];
    Sunday: string[];
  };
  website: string;
  owner_name: string;
  type: string;
  subtypes: string[];
  photos_sample: {
    photo_id: string;
    photo_url: string;
    photo_url_large: string;
    video_thumbnail_url: string | null;
    latitude: number;
    longitude: number;
    type: string;
    photo_datetime_utc: string;
    photo_timestamp: number;
  }[];
  price_level: string;
}

export const getListOfRestaurants = async (location: string='Jakarta', limit: number = 20, language: string = 'en', types: string='') => {
    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: 'Restaurants in ' + location + ', Indonesia',
          limit: limit,
          language: language,
          region: 'id',
          subtypes: types,
          extract_emails_and_contacts: 'false',
        },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost
        }
      };

    try {
        const response = await axios.request(options);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getReviewData = async (restaurantId: string, language: string = 'en', sortBy: string = 'most_relevant') => {
    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/business-reviews',
        params: {
          business_id: restaurantId,
          limit: '5',
          sort_by: sortBy,
          region: 'us',
          language: language
        },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost
        }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
