import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { RestoDataProps } from '../api/LocalBusinessDataAPI';

import RestaurantRating from './RestaurantRating';

type RestaurantItemProps = {
  dataResto: RestoDataProps;
}

export default function RestaurantItem({dataResto}: RestaurantItemProps) {
  let [currentOpenStatus, detail] = dataResto.opening_status !== null ? dataResto.opening_status.split(' ⋅ ') : 'no info';
  detail = '';
  const navigate = useNavigate();

  return (
    <Card className='' style={{ width: '18rem', height: '30rem', margin: 'auto'}}>
      <Card.Img variant="top" src={dataResto.photos_sample[0].photo_url} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
      <Card.Body className='d-flex flex-column gap-1'>
        <Card.Title>{dataResto.name}</Card.Title>
        <div className='d-flex align-items-center gap-1'>
          <RestaurantRating rating={dataResto.rating} size={18} />
          <Card.Text>
            {dataResto.rating}
          </Card.Text>
        </div>
        <div className='d-flex align-items-start justify-content-between mt-auto mb-auto'>
          <div>
            <Card.Text className='m-0'>
              {/* {dataResto.type.replace('restaurant', '')} */}
              {dataResto.subtypes
                .map((subtype: string) => subtype.replace(/restaurant/gi, ''))
                .join(', ')
                .trim()}
            </Card.Text>
            <Card.Text className='m-0'>
              {dataResto.price_level}
            </Card.Text>
          </div>
          <div className='d-flex align-items-center gap-1'>
            <span className={`rounded-circle ${currentOpenStatus.includes('Open') ? 'bg-success' : 'bg-danger'} `} style={{width: '.75rem', height: '.75rem'}}></span>
            <Card.Text>
              {currentOpenStatus}
            </Card.Text>
          </div>
        </div>
      </Card.Body>

      <Card.Body className='d-flex justify-content-end align-items-end'>
        <Button onClick={() => navigate(`/detail/${dataResto.business_id}`, { state: { detailResto: dataResto } })} variant="primary" className='w-100' style={{height: '60px'}}>
          Learn More →
        </Button>
      </Card.Body>
    </Card>
  );
}