const HomePage = () => {
    return (
        <>
            <header className="ml-16 mt-10 flex flex-row">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-bold text-primary">
                        Dashboard
                    </h1>
                    <p className="font-light text-gray-400">
                        Everything, Everywhere. All at once.
                    </p>
                </div>
                <p className="ml-auto pr-10 text-3xl font-thin text-primary">
                    {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    })}
                </p>
            </header>
            <main>{/* Here! */}</main>
        </>
    );
};

export default HomePage;
