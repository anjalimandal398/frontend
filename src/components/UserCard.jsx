const UserCard = ({ user }) => {
    const { firstName, lastName,photoUrl, age, gender, about } = user;
    return (
      <div className="card bg-base-300 w-78 shadow-xl">
        <figure>
          <img className="w-[400px] h-[200px]" src={user.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    );
  };
  export default UserCard;