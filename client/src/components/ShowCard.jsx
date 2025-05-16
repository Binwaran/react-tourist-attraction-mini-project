function ShowCard({ places, setText, text }) {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        alert("คัดลอกลิงก์สำเร็จ");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        alert("คัดลอกลิงก์ไม่สำเร็จ😢");
      });
  };

  return (
    <div className="flex flex-col gap-6">
      {Array.isArray(places) &&
        places.map((place, index) => (
          <div
            key={index}
            className="flex bg-white rounded-lg shadow-md overflow-hidden p-4 transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-1/3">
              <img
                src={place.photos?.[0] || "https://via.placeholder.com/200"}
                alt={place.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-2 px-4">
              <h2 className="text-lg font-bold text-start">
                <a
                  href={place.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-600 hover:underline"
                >
                  {place.title}
                </a>
              </h2>
              <p className="text-sm text-gray-600 text-start">
                {place.description?.length > 100
                  ? place.description.slice(0, 100) + "..."
                  : place.description}
              </p>
              <a
                href={place.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm text-start hover:underline"
              >
                อ่านต่อ
              </a>

              <div className="flex flex-wrap gap-2 text-xs text-blue-600">
                {Array.isArray(place.tags) &&
                  place.tags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (!text.includes(tag)) {
                          setText((prev) =>
                            prev.trim() === "" ? tag : prev + " " + tag
                          );
                        }
                      }}
                      className="text-xs bg-gray-200 rounded underline px-2 py-1"
                    >
                      {tag}
                    </button>
                  ))}
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  {place.photos?.slice(1).map((photo, i) => (
                    <div key={i}>
                      <img
                        src={photo}
                        alt={`photo ${i + 2}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(place.url)}
                  className="text-white bg-gray-100 hover:bg-blue-700 rounded-full px-3 py-1 text-sm font-medium transition"
                >
                  🔗
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ShowCard;
