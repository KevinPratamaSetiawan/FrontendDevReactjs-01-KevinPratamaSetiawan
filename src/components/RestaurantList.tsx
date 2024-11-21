import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import RestaurantItem from './RestaurantItem';
import { RestoDataProps } from '../api/LocalBusinessDataAPI';

type RestaurantListProps = {
  restoData: RestoDataProps[];
  priceRange: string;
  isOpen: boolean;
  category: string;
  isLoading: boolean;
  handleLimit: () => void;
}

export default function RestaurantList({restoData, priceRange, isOpen, category, isLoading, handleLimit}: RestaurantListProps) {
  const openStatus = isOpen ? 'Open' : 'Closed';

  const filteredRestoData = restoData.filter((resto: RestoDataProps) => {
    let [currentOpenStatus, detail] = resto.opening_status !== null ? resto.opening_status.split(' ⋅ ') : ["no info", ""];
    detail = '';
    return (
      (priceRange === 'any' || resto.price_level.includes(priceRange)) &&
      (isOpen ? currentOpenStatus.includes(openStatus) : true) &&
      (category === '' ? true : resto.subtypes.includes(category))
    );
  });

  return (
    <div>
      <div className='d-flex align-items-center'>
        <p className='h3 ps-4 pe-1'>All Restaurants</p>
        <Badge bg='dark' className='fs-md'>{filteredRestoData.length.toString().padStart(3, '0')}</Badge>
      </div>

      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 pt-1 pb-4 m-0">
      {filteredRestoData.length !== 0 ? filteredRestoData.map((resto:any, idx:any) => (
        <Col key={idx}>
          <RestaurantItem dataResto={resto} />
        </Col>
      )):
      <p className='w-100 text-center'>No restaurant found</p>
      }
      </Row>

      <div className='d-flex align-items-center justify-content-center mt-3 mb-5'>
        {
          isLoading ? <p>Loading...</p> : <Button variant="secondary" style={{width: '200px'}} onClick={handleLimit}>Load More</Button>
        }
      </div>
    </div>
  );
}