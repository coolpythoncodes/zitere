import axios from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_PAYSTACK_BASE_URL
});

instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_NOT_PAYSTACK_SECRET_KEY}`;

const getBankDetails = async (
    accountNumber,
    bankCode
) => {
    console.log('accountNumber', accountNumber, 'bankCode', bankCode)
    const response = instance.get(`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`)
    return response;

}

export default getBankDetails;