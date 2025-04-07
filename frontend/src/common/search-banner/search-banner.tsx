import {Button} from "antd";
import "./search-banner.css";


type propsType = {
    placeholder?: string,
    setKeyword?: any,
    onClick?: any
}


const SearchBanner = (props: propsType) => {
    const onChangeHandler = (e: any) => {
        const searchKeyword = e.target.value;
        props.setKeyword(searchKeyword);
    };

    const onKeyDownHandler = (e:any) => {
        const enterKeyCode = 13;
        if(parseInt(e.which) === enterKeyCode){
            props.onClick();

            return window.scrollTo({
                top: 440,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    return <>
        <section className="banner-section">
            <input
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHandler}
                placeholder={props.placeholder}
                className='search-input'
                type="search"
            />

            <Button
                onClick={props.onClick}
                className={'search-btn btn-blue'}>Search</Button>
        </section>
    </>
};


export default SearchBanner;