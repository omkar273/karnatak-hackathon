// wanted.tsx

// Example placeholder data (replace with actual data fetching logic)
const criminals = [
  {
    id: 1,
    name: "Dawood Ibrahim Kaskar",
    alias: "The Phantom",
    crime: "Bank Robbery",
    reward: 50000,
    profilePic: "https://sppunotes.in/1.jpeg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Syed sallahudin",
    alias: "Black Widow",
    crime: "Hacking",
    reward: 75000,
    profilePic: "https://sppunotes.in/2.jpeg", // Replace with actual image URL
  },
  // Add more criminals as needed
  // Add more data to make the list longer and more varied
  {
    id: 3,
    name: "Sajid mir",
    alias: "The Enforcer",
    crime: "Drug Trafficking",
    reward: 100000,
    profilePic: "https://sppunotes.in/3.jpeg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "Masood azhar",
    alias: "The Ghost",
    crime: "Corporate Espionage",
    reward: 80000,
    profilePic: "https://sppunotes.in/4.jpeg", // Replace with actual image URL
  },
];

const WantedList = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Most Wanted Criminals
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {criminals.map((criminal) => (
            <div
              key={criminal.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={criminal.profilePic}
                alt={criminal.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {criminal.name}
                </h2>
                <p className="text-gray-600 mb-2">Alias: {criminal.alias}</p>
                <p className="text-gray-600 mb-2">Crime: {criminal.crime}</p>
                <p className="text-gray-600 mb-2">
                  Reward: ${criminal.reward.toLocaleString()}
                </p>
                <div className="mt-4 flex justify-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WantedList;
