import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

type RestaurantFiltersProps = {
    handlePriceRange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleIsOpen: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleIncludeDummy: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setPriceRange: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIncludeDummy: React.Dispatch<React.SetStateAction<boolean>>;
    priceRange: string;
    category: string;
    isOpen: boolean;
    includeDummy: boolean;
};

export default function RestaurantFilters({handlePriceRange, handleCategory, handleIsOpen, handleIncludeDummy, setPriceRange, setCategory, setIsOpen, setIncludeDummy, priceRange, category, isOpen, includeDummy}: RestaurantFiltersProps) {
    const ClearFilter = () => {
        setPriceRange('any');
        setCategory('');
        setIsOpen(false);
        setIncludeDummy(false);
    };

    return(
        <Accordion defaultActiveKey="0" className='w-100 d-flex align-items-center flex-wrap gap-2 mt-2 mb-2 p-4 pb-3 sticky-top border-bottom bg-white text-dark'>
            <Accordion.Item eventKey="0" className='w-100'>
                <Accordion.Header className='h5 text-nowrap p-0'>
                    <p className='m-0 pt-2 pb-2'>Filter by:</p>
                    {
                        priceRange !== 'any' ? <Badge bg="info" className='ms-2 p-2'>{' ' + priceRange}</Badge> : null
                    }
                    {
                        category !== '' ? <Badge bg="info" className='ms-2 p-2'>{' ' + category}</Badge> : null
                    }
                    {
                        isOpen ? <Badge bg="info" className='ms-2 p-2'>Currently Open</Badge> : null
                    }
                </Accordion.Header>
                <Accordion.Body>
                    <div className='d-flex align-items-center gap-2 w-100 flex-wrap'>
                        <Form.Select 
                        value={priceRange}
                        onChange={handlePriceRange}
                        className='w-100 p-2' 
                        style={{minWidth:'200px', maxWidth: '400px'}} 
                        aria-label="select price range"
                        >
                            <option value="any">Price Range</option>
                            <option value="Rp 1–25K">Rp 1-25K</option>
                            <option value="Rp 25–50K">Rp 25-50K</option>
                            <option value="Rp 50–75K">Rp 50-75K</option>
                            <option value="Rp 75–100K">Rp 75-100K</option>
                            <option value="Rp 100–125K">Rp 100-125K</option>
                            <option value="Rp 125–150K">Rp 125-150K</option>
                            <option value="Rp 150–175K">Rp 150-175K</option>
                            <option value="Rp 175–200K">Rp 175-200K</option>
                            <option value="Rp 200–225K">Rp 200-225K</option>
                            <option value="Rp 225–250K">Rp 225-250K</option>
                            <option value="250.000">Rp 250.000+</option>
                            <option value="$">$</option>
                            <option value="$$">$$</option>
                            <option value="$$$">$$$</option>
                            <option value="$$$$">$$$$</option>
                        </Form.Select>

                        <Form.Select 
                        value={category}
                        onChange={handleCategory}
                        className='w-100 p-2 order-1' 
                        style={{minWidth:'200px', maxWidth: '400px'}} 
                        aria-label="select restaurant categories"
                        >
                            <option value="">Categories</option>
                            <option value="Asian restaurant">Asian Food</option>
                            <option value="Southeast Asian restaurant">Southeast Asian Food</option>
                            <option value="Indonesian restaurant">Indonesian Food</option>
                            <option value="Balinese restaurant">Balinese Food</option>
                            <option value="Chinese restaurant">Chinese Food</option>
                            <option value="Japanese restaurant">Japanese Food</option>
                            <option value="Western restaurant">Western Food</option>
                            <option value="Italian restaurant">Italian Food</option>
                            <option value="European restaurant">European Food</option>
                            <option value="French restaurant">French Food</option>
                            <option value="Thai restaurant">Thai Food</option>

                            <option value="Satay restaurant">Satay</option>
                            <option value="Seafood restaurant">Seafood</option>
                            <option value="Bistro">Bistro</option>
                            <option value="Fine dining restaurant">Fine Dining</option>
                            <option value="Cafe">Cafe</option>
                            <option value="Buffet restaurant">Buffet</option>
                            <option value="Breakfast restaurant">Breakfast</option>
                        </Form.Select>
                    
                        <Form.Check
                            type="switch"
                            id="open-switch"
                            label="Open Now"
                            className='border p-2 rounded m-0 d-flex align-items-center gap-2 order-2'
                        >
                            <Form.Check.Input 
                            checked={isOpen}
                            onChange={handleIsOpen}
                            className="m-0" 
                            />
                            <Form.Check.Label className="m-0">Open Now</Form.Check.Label>
                        </Form.Check>

                        <Form.Check
                            type="switch"
                            id="open-switch"
                            label="Open Now"
                            className='border p-2 rounded m-0 d-flex align-items-center gap-2 order-2'
                        >
                            <Form.Check.Input 
                            checked={includeDummy}
                            onChange={handleIncludeDummy}
                            className="m-0" 
                            />
                            <Form.Check.Label className="m-0">Include Dummy Datas</Form.Check.Label>
                        </Form.Check>

                        <Button 
                        onClick={ClearFilter}
                        variant="primary" 
                        className='ms-auto p-2 order-3'
                        >
                            CLEAR ALL
                        </Button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}