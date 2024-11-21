import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import RestaurantRating from './RestaurantRating';
import RestaurantReadmore from './RestaurantReadMore';
import { FaChevronLeft } from 'react-icons/fa';
// import { dummyReview } from '../api/dummyData';
import { getReviewData } from '../api/LocalBusinessDataAPI';

export default function RestaurantDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const safeId = id ?? "0x2e69f423590651f7:0x983424b56075bd8";
    const { detailResto } = location.state || {};
    
    const [reviews, setReviews] = useState<any[]>([]);
    let [currentOpenStatus, detail] = detailResto.opening_status !== null ? detailResto.opening_status.split(' ⋅ ') : 'no info';
    detail = '';

    useEffect(() => {
        const fetchReview = async () => {
            const data = await getReviewData(safeId, 'en', 'most_relevant');
            if (data) {
                setReviews(data);
            }
        };
        
        fetchReview();
    }, [id]);

    return(
        <div className='px-2' style={{width: '100%'}}>
            <div className='position-relative ms-auto me-auto mt-4 rounded d-flex flex-column align-items-center justify-content-center' style={{width: '100%', maxWidth: '800px', maxHeight: '350px', overflowY: 'hidden'}}>
                <Image src={detailResto.photos_sample[0].photo_url} className='m-auto' style={{width: '100%', objectFit: 'cover', objectPosition: '50% 50%'}} />
                <Button variant="light" onClick={() => navigate('/')} className='rounded-circle position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center' style={{width: '40px', height: '40px'}}><FaChevronLeft size={20}/></Button>
            </div>
            <div className='d-flex flex-column align-items-start justify-content-between ms-auto me-auto mt-2' style={{width: '100%', maxWidth: '800px'}}>
                <div className='w-100 d-flex align-items-center justify-content-between'>
                    <p className='h2 m-0'>{detailResto.name}</p>
                    <div className='d-flex align-items-center gap-1'>
                        <span className={`rounded-circle ${currentOpenStatus.includes('Open') ? 'bg-success' : 'bg-danger'}`} style={{width: '.75rem', height: '.75rem'}}></span>
                        <p className='m-0 fs-6'>{detailResto.opening_status}</p>
                    </div>
                </div>
                <div className='d-flex align-items-center gap-1'>
                    <RestaurantRating rating={detailResto.rating} size={18} />
                    <p className='m-0 fs-6 text-nowrap'>{detailResto.rating}/5 • <strong className='text-success'>{detailResto.review_count}</strong> reviews</p>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-between gap-3 ms-auto me-auto mt-2' style={{width: '100%', maxWidth: '800px'}}>
                <div className='w-100 d-flex align-items-center justify-content-start gap-2'>
                    <i className="bi bi-geo-alt-fill fs-3 text-danger"></i>
                    <RestaurantReadmore text={detailResto.full_address} limit={70} />
                </div>

                <iframe
                width="95%"
                height="400"
                style={{border:"2px solid black"}}
                className='rounded'
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_MAPS_API_KEY}&q=${detailResto.latitude},${detailResto.longitude}&zoom=20`}
                ></iframe>
            </div>

            <div className='d-flex flex-column align-items-start justify-content-between ms-auto me-auto my-5' style={{width: '100%', maxWidth: '800px'}}>
                <h4>Reviews</h4>
                {reviews.length > 0 ? (
                <Carousel interval={null}>
                    {reviews.map((review) => (
                        <Carousel.Item>
                            <div key={review.review_id} className="my-2 border p-4 rounded d-flex flex-column align-items-left gap-3 mx-auto" style={{width: '85%'}}>
                                <div className='d-flex align-items-center justify-content-start gap-2'>
                                    <img src={review.author_photo_url} className='rounded-circle border' style={{width: '40px', height: '40px', objectFit: 'cover', objectPosition: '50% 50%'}} alt="Review Profile Picture"  />
                                    <p className='m-0'><strong>{review.author_name}</strong></p>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <RestaurantRating rating={review.rating} size={18} />
                                    <span>•</span>
                                    <p className='m-0'>{
                                        new Date(review.review_timestamp * 1000).getDate().toString().padStart(2, '0') + '-' +
                                        new Date(review.review_timestamp * 1000).getMonth().toString().padStart(2, '0') + '-' +
                                        new Date(review.review_timestamp * 1000).getFullYear().toString()
                                    }</p>
                                </div>
                                <RestaurantReadmore text={review.review_text} limit={150}/>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    )
}