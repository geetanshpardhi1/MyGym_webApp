import { BsThreeDots } from "react-icons/bs";
import userlogo from "../../assets/user01.png";
import { useSelector } from "react-redux";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const User = () => {
  const username = useSelector((state) => state.auth.user.username);
  const profile = useSelector((state) => state.profile.profileData);
  const age = profile.date_of_birth ? calculateAge(profile.date_of_birth) : null;
  return (
    <div
      className="flex gap-4 flex-col bg-white rounded-lg1
    p-4 dark:bg-gray-600"
    >
      <div className="flex flex-row justify-between items-center  ">
        <h2
          className="font-bold text-gray-700 text-l
    dark:text-gray-400"
        >
          Profile
        </h2>
        <BsThreeDots className="cursor-pointer dark:text-gray-400" />
      </div>
      <div className="flex flex-col items-center justify-center dark:text-gray-400">
        <img src={userlogo} alt="Sample Image" className="w-16 h-16 rounded-full" />
        <h3 className="font-semibold mt-3">@{username}</h3>
      </div>
      <div className="flex flex-row items-center justify-between p-5 dark:text-gray-400">
        <div className="flex flex-col items-center justify-center 0">
          <h2 className="font-bold ">{profile.weight} Kg</h2>
          <p>Weight</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold ">{profile.height} Cm</h2>
          <p>Height</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold ">{age !== null ? `${age} yrs` : 'N/A'}</h2>
          <p>Age</p>
        </div>
      </div>
    </div>
  );
};

export default User;
