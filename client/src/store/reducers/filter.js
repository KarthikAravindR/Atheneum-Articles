// import * as actionTypes from '../actions/actionTypes'
// import searchfilter from '../../components/UI/Search/Searchfilter'

const initialState = {
    brandList: [
        {
            id: 11,
            name: "ADIDAS Originals",
            value: "ADIDAS Originals"
        },
        {
            id: 12,
            name: "Nike",
            value: "Nike"
        },
        {
            id: 13,
            name: "Puma",
            value: "Puma"
        },
    ],
    colorList: [
        {
            id: 11,
            name: "White",
            value: "White"
        },
        {
            id: 12,
            name: "Black",
            value: "Black"
        },
        {
            id: 13,
            name: "Grey",
            value: "Grey"
        },
        {
            id: 14,
            name: "Red",
            value: "Red"
        },
        {
            id: 15,
            name: "Blue",
            value: "Blue"
        },
        {
            id: 16,
            name: "Green",
            value: "Green"
        },
    ],
    priceList: [
        {
            id: 11,
            name: "Rs.1000 to Rs.2000",
            value: [1000, 2000]
        },
        {
            id: 12,
            name: "Rs.2000 to Rs.3000",
            value: [2000, 3000]
        },
        {
            id: 13,
            name: "Rs.3000 to Rs.4000",
            value: [3000, 4000]
        },
        {
            id: 14,
            name: "Rs.4000 to Rs.5000",
            value: [4000, 5000]
        },
        {
            id: 15,
            name: "Rs.5000 to Rs.10000",
            value: [5000, 10000]
        },
        {
            id: 16,
            name: "Rs.10000 +",
            value: [10000, 100000]
        },
    ],
    brandFilter: [],
    colorFilter: [],
    priceFilter: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "BRAND_FILTER_UPDATE":
            return {
                ...state,
                brandFilter: action.data,
            }
        case "COLOR_FILTER_UPDATE":
            return {
                ...state,
                colorFilter: action.data,
            }
        case "PRICE_FILTER_UPDATE":
            return {
                ...state,
                priceFilter: action.data,
            }
        case "NIKE_SHOES_ONLY":
            return {
                ...state,
                brandFilter: ['Nike'],
            }
        case "ADIDAS_SHOES_ONLY":
            return {
                ...state,
                brandFilter: ['ADIDAS Originals'],
            }
        case "PUMA_SHOES_ONLY":
            return {
                ...state,
                brandFilter: ['Puma'],
            }
        case "BLUE_SHOES_ONLY":
            return {
                ...state,
                colorFilter: ['Blue'],
            }
        case "RED_SHOES_ONLY":
            return {
                ...state,
                colorFilter: ['Red'],
            }
        case "BLACK_SHOES_ONLY":
            return {
                ...state,
                colorFilter: ['Black'],
            }
        case "CLEAR_ALL_FILTER":
            return {
                ...state,
                brandFilter: [],
                colorFilter: [],
                priceFilter: [],
            }
        default:
            return state
    }
}

export default reducer