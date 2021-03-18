import React, { useState } from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.css'


const Search = (props) => {
    const [searchText, setSearchText] = useState('')
    const searchTaskHandler1 = event => {
        event.preventDefault()
        switch(searchText){
            case 'shoes':
                props.history.push('/shoes')
                break
            case 'puma':
                props.onpumashoes()
                props.history.push('/shoes')
                break
            case 'nike':
                props.onnikeshoes()
                props.history.push('/shoes')
                break
            case 'adidas':
                props.onadidasshoes()
                props.history.push('/shoes')
                break
            case 'red':
                props.onredshoes()
                props.history.push('/shoes')
                break
            case 'blue':
                props.onblueshoes()
                props.history.push('/shoes')
                break
            case 'black':
                props.onblackshoes()
                props.history.push('/shoes')
                break
            default :
                break
        }
    }
    return (
        <form className="form1" onSubmit={searchTaskHandler1}>
            {/* <div className="searchicon">
                    <FontAwesomeIcon  icon={faSearch} />
                </div> */}
            <button className="buttonserach" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            <input
                className="searchbar1"
                placeholder="Search Ogle"
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
            />
        </form>
    )
}
const mapDispatchToState = dispatch => {
    return {
        onnikeshoes: () => { dispatch({ type: "NIKE_SHOES_ONLY" }) },
        onadidasshoes: () => { dispatch({ type: "ADIDAS_SHOES_ONLY" }) },
        onpumashoes: () => { dispatch({ type: "PUMA_SHOES_ONLY" }) },   
        onblueshoes: () => { dispatch({ type: "BLUE_SHOES_ONLY" }) },
        onredshoes: () => { dispatch({ type: "RED_SHOES_ONLY" }) },
        onblackshoes: () => { dispatch({ type: "BLACK_SHOES_ONLY" }) },
    }
}
export default connect(null, mapDispatchToState)(Search)
