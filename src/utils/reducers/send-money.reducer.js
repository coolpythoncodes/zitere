export const INITIAL_BANK_STATE = {
    amount: '',
    country: 'Nigeria',
    countryCurrency: 'NGN',
    bankName: '',
    bankCode: '',
    accountNumber: '',
    accountName: '',
    bankList: [],
    isAccountValidated: false,
    isTermsAccepted: false,
    rate: ''
}

export const ACTION_TYPES_SEND_MONEY = {
    CHANGE_INPUT: 'change_input',
    SELECT_OPTION: 'select_option',
    FORM_ONE_SUBMISSION: 'form_one_submission',
    GO_BACK: 'go_back',
    UPDATE_BANK_LIST: 'update_bank_list',
    SELECT_OPTION_BANK_NAME: 'select_option_bank_name',
    UPDATE_ACCOUNT_NAME: 'update_account_name',
    ACCOUNT_VALIDATED: 'account_validated',
    ACCOUNT_NOT_VALIDATED: 'account_not_validated',
    UPDATE_RATE: 'update_rate',
    ACCEPT_TERMS: 'accept_terms'
}

export const sendMoneyReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case ACTION_TYPES_SEND_MONEY.CHANGE_INPUT:
            return {
                ...state,
                [payload.name]: payload.value,
            };

        case ACTION_TYPES_SEND_MONEY.SELECT_OPTION:
            return {
                ...state,
                country: payload.option,
                countryCurrency: payload.countryCurrency
            }

        case ACTION_TYPES_SEND_MONEY.SELECT_OPTION_BANK_NAME:
            return {
                ...state,
                bankName: payload.option,
                bankCode: payload.bankCode
            }

        case ACTION_TYPES_SEND_MONEY.FORM_ONE_SUBMISSION:
            return {
                ...state,
                amount: payload,
            };

        case ACTION_TYPES_SEND_MONEY.GO_BACK:
            return INITIAL_BANK_STATE;

        case ACTION_TYPES_SEND_MONEY.UPDATE_BANK_LIST:
            return {
                ...state,
                bankList: payload
            }

        case ACTION_TYPES_SEND_MONEY.UPDATE_ACCOUNT_NAME:
            return {
                ...state,
                accountName: payload.accountName,
                accountNumber: payload.accountNumber
            }

        case ACTION_TYPES_SEND_MONEY.ACCOUNT_VALIDATED:
            return {
                ...state,
                isAccountValidated: true
            }

        case ACTION_TYPES_SEND_MONEY.ACCOUNT_NOT_VALIDATED:
            return {
                ...state,
                accountName: '',
                isAccountValidated: false
            }
        case ACTION_TYPES_SEND_MONEY.UPDATE_RATE:
            return {
                ...state,
                rate: payload
            }

        case ACTION_TYPES_SEND_MONEY.ACCEPT_TERMS:
            return {
                ...state,
                isTermsAccepted: !state.isTermsAccepted
            }

        default:
            return state
    }
}