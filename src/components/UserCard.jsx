const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-80 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="user photo"
          className="w-full h-48 object-cover object-fit rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        <p className="text-sm">{about}</p>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary btn-sm">Ignore</button>
          <button className="btn btn-secondary btn-sm">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
