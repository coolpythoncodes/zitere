export const INITIAL_BANK_STATE = {
    amount: '',
    country: 'Nigeria',
    bankName: '',
    accountNumber: '',
    accountName: '',
    isTermsAccepted: false
}

export const ACTION_TYPES_SEND_MONEY = {
    CHANGE_INPUT: 'change_input',
    SELECT_OPTION: 'select_option',
    FORM_ONE_SUBMISSION: 'form_one_submission',
    GO_BACK: 'go_back'
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
                country: payload
            }

        case ACTION_TYPES_SEND_MONEY.FORM_ONE_SUBMISSION:
            return {
                ...state,
                amount: payload,
            };

        case ACTION_TYPES_SEND_MONEY.GO_BACK:
            return INITIAL_BANK_STATE
        default:
            return state
    }
}