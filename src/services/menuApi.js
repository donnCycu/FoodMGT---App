import axios from 'axios';

export const fetchMenuItems = () => {
    axios.get('https://api.spoonacular.com/recipes/random?number=10&apiKey=fa68cf1cb72841caa372f358e2ba1db8')
        .then((response) => {
            const menuItems = response.data.recipes;
            console.log('Data fetched successfully:', menuItems);
        }, (error) => {
            console.error('Error while fetching data:', error);
            if (error.response) {
                console.error('Data:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            }
        });
};
