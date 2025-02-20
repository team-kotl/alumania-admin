import { PiAddressBookLight } from "react-icons/pi";

const Profile = () => {
    return (
        <>
            <div className="flex flex-row h-[calc(100vh-2.5rem)] my-5 text-gray-700">
                <div className="flex flex-col w-[50%] pt-15 pl-15 border-r">
                    <div className="flex flex-row items-center gap-5">
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <div className="flex-col">
                            <p className="text-3xl">Administrator</p>
                            <p className="text-xl">U001</p>
                        </div>
                    </div>

                    <div className="flex flex-col pl-10 pr-25 pt-20">
                        <div className="flex flex-row items-center">
                            <PiAddressBookLight size="42px" />
                            <p className="text-xl">Admin Information</p>
                        </div>
                        <table className="table mt-3">
                            <tbody>
                                <tr className="hover:bg-base-300">
                                    <td className="text-right">User Name:</td>
                                    <td style={{width: '80%'}}>Administrator</td>
                                </tr>
                                <tr className="hover:bg-base-300">
                                    <td className="text-right">Joined:</td>
                                    <td style={{width: '80%'}}>August 5, 2025</td>
                                </tr>
                                <tr className="hover:bg-base-300">
                                    <td className="text-right">User Type:</td>
                                    <td style={{width: '80%'}}>Admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-row gap-2 justify-end pr-25 pt-12">
                        <input type="button" value="Generate Key" className="btn btn-outline btn-primary" />
                        <input type="button" value="Logout" className="btn btn-outline btn-error" />
                    </div>
                </div>

                <div className="w-[50%] pt-15 pl-12">
                    <p className="text-xl">Activities</p>
                </div>
            </div>
        </>
    );
};

export default Profile;
