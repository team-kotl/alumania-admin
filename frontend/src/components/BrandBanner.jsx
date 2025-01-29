import Logo from "../assets/logo.svg";
import BannerText from "../assets/banner-text.svg";

export default function Banner() {
    return (
        <>
            <div className="flex flex-row w-fit m-auto mt-52">
                <img src={Logo} alt="Alumania Logo" className="w-36" />
                <img
                    src={BannerText}
                    alt="Alumania"
                    className="w-80"
                />
            </div>
        </>
    );
};