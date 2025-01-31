import Logo from "../../assets/logo.svg";
import BannerText from "../../assets/banner-text.svg";
import Subtitle from "../../assets/subtitle.svg";

export default function Banner() {
    return (
        <>
            <div className="flex flex-row w-fit m-auto mt-52">
                <img src={Logo} alt="Alumania Logo" draggable="false" />
                <div className="flex flex-col justify-center">
                    <img
                        src={BannerText}
                        alt="Alumania"
                        className="w-80"
                        draggable="false"
                    />
                    <img
                        src={Subtitle}
                        alt="Admin"
                        className="w-20 self-end"
                        draggable="false"
                    />
                </div>
            </div>
        </>
    );
}
