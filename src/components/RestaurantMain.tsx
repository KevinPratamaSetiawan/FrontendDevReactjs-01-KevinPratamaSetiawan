import React, { useEffect } from 'react';
import RestaurantFilters from './RestaurantFilters';
import RestaurantList from './RestaurantList';
import { getListOfRestaurants } from '../api/LocalBusinessDataAPI';
import { dummyData } from '../api/dummyData';

export default function RestaurantMain() {
    const [priceRange, setPriceRange] = React.useState('any');
    const [category, setCategory] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [includeDummy, setIncludeDummy] = React.useState(false);

    const [restoData, setRestoData] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(5);

    const onPriceRangeChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(event.target.value);
        console.log(priceRange)
    };

    const onCategoryChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const onIsOpenChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsOpen(event.target.checked);
    };

    const onIncludeDummyChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeDummy(event.target.checked);
    };

    const onLimitChangeEventHandler = () => {
        setLimit(limit + 5);
    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            const data = await getListOfRestaurants('Jakarta', limit, 'en', category);
            if (data) {
                setRestoData(data);
            }
            setLoading(false);
        };

        fetchRestaurants();
    }, [limit, category]);

    return(
        <div>
            <div className='p-4'>
                <p className="h1">Restaurants around you...</p>
                <p className="">We'll provide you with the best restaurants around you that fit your taste and wallet.</p>
            </div>
            <RestaurantFilters 
            handlePriceRange={onPriceRangeChangeEventHandler}
            handleCategory={onCategoryChangeEventHandler}
            handleIsOpen={onIsOpenChangeEventHandler}
            handleIncludeDummy={onIncludeDummyChangeEventHandler}
            setPriceRange={setPriceRange}
            setCategory={setCategory}
            setIsOpen={setIsOpen}
            setIncludeDummy={setIncludeDummy}
            priceRange={priceRange}
            category={category}
            isOpen={isOpen}
            includeDummy={includeDummy}
            />
            <RestaurantList 
            restoData={includeDummy ? [...restoData, ...dummyData] : restoData}
            priceRange={priceRange}
            isOpen={isOpen}
            category={category}
            isLoading={loading}
            handleLimit={onLimitChangeEventHandler}
            />
        </div>
    )
}