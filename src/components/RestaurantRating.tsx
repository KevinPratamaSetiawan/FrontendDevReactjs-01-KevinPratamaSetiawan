import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function RestaurantRating({rating, size}: {rating: number, size: number}) {
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 >= 0.3 ? 1 : 0;
    const emptyStar = 5 - fullStar - halfStar;

  return (
    <div className='d-flex align-item-center gap-1 text-warning m-0'>
        {[...Array(fullStar)].map((_, index) => (
            <FaStar key={index} size={size}/>
        ))}
        {halfStar === 1 && <FaStarHalfAlt size={size}/>}
        {[...Array(emptyStar)].map((_, index) => (
            <FaRegStar key={index} size={size}/>
        ))}
    </div>
  );
}