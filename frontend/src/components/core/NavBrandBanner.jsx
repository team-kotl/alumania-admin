import Logo from "../../assets/logo.svg";
import BannerText from "../../assets/banner-text-inverted.svg";
import Subtitle from "../../assets/subtitle-inverted.svg";

export default function Banner() {
    return (
        <>
            <div className="flex flex-row w-fit mx-auto">
                <img src={Logo} alt="Alumania Logo" draggable="false" className="w-20"/>
                <div className="flex flex-col justify-center">
                    <img
                        src={BannerText}
                        alt="Alumania"
                        className="w-32"
                        draggable="false"
                    />
                    <img
                        src={Subtitle}
                        alt="Admin"
                        className="w-12 self-end"
                        draggable="false"
                    />
                </div>
            </div>
        </>
    );
}
