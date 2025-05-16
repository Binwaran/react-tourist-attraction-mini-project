function SearchSection({text, setText}) {
    return (
        <div className="search-section flex flex-col items-center justify-center w-full h-1/6 p-4 rounded-lg shadow-md mb-4 bg-white"> 
            <div className="search-header w-full flex justify-center items-center mb-4">
                <h1 className="text-blue-500 w-full text-4xl font-extrabold ">เที่ยวไหนดี</h1>
            </div> 
            <div className="search-input-container w-full flex flex-col justify-center mb-4 gap-4"> 
            <h2 className="text-start text-black ">ค้นหาที่เที่ยว</h2>
                <input 
                type="text" 
                placeholder="-หาที่เที่ยวกัน-"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="search-input text-center text-gray-700"
                 />
            </div>
        </div>
    );
}

export default SearchSection;