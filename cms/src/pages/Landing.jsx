const Landing = () => {
  return (
    <div className="hero  bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://prod-us.byjusweb.com/images/home/header_kid_d.png?auto=format&fit=max&w=1920"
          alt="hero-img"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-600">
            Learn and Grow with Mastero
          </h2>
          <h1 className="text-4xl font-bold text-gray-800">
            Mastero - The Best Learning Platform
          </h1>
          <p className="py-6 text-lg text-gray-600">
            Mastero is a platform that provides you with the best education
            materials to help you learn and grow in your career.
          </p>
          <button className="btn bg-bgBtn btn-md text-white hover:bg-bgBtn hover:opacity-85">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
