import axios from 'axios';
import { decreaseLoader, increaseLoader } from '../../store';

const doAsync = ({
    url,
    method = 'get',
    body = {},
    loaderName,
    dispatch,
}) => {
    if (!url) {
        throw new Error('URL is required');
    }

    if (Boolean(loaderName)) dispatch(increaseLoader(loaderName));
    
    const makeRequest = async () => {
        return await axios({
            method,
            url,
            data: body,
        })
            .then((res) => {
                if (Boolean(loaderName)) {
                    dispatch(decreaseLoader(loaderName));
                }

                return res.data;
            })
            .catch((error) => console.log(`Unable to make API call for ${url}`, error));
    };

    return makeRequest();
};

export { doAsync };