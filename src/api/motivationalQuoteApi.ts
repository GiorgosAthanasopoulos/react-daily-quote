import axios, {AxiosResponse} from "axios";

const QUOTE_API_URL: string = "https://motivational-quote-api.herokuapp.com/";

export async function getQuote(): Promise<JSON> {
    const response: AxiosResponse = await axios.get(QUOTE_API_URL + "quotes/random");
    return await response.data;
}