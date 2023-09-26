import React from 'react';

const GridComponent = () => {
  const items = [
    {
      id: 1,
      imageSrc: 'assets/Mains/Career1.png',
      heading: 'Leading-edge Innovation',
      description: "At idenDT, we're at the forefront of innovation in the digital technology field. Joining us means working with cutting-edge technologies, collaborating with industry experts and being part of pioneering projects that shape the future.",
    },
    {
      id: 2,
      imageSrc: 'assets/Mains/Career2.png',
      heading: 'Unlock Your Potential',
      description: "We believe that every individual has untapped abilities ready to be discovered. When you join idenDT, you'll gain access to various learning and growth opportunities, mentorship programs and a supportive work environment that encourages personal and professional development.",
    },
    {
      id: 3,
      imageSrc: 'assets/Mains/Career3.png',
      heading: 'Global Opportunities',
      description: "With a worldwide presence, idenDT offers you the chance to work on projects that span the globe. Our diverse and inclusive work culture promotes collaboration across different cultures and backgrounds, allowing you to make a global impact.",

},
    {
      id: 4,
      imageSrc: 'assets/Mains/Career4.png',
      heading: 'Work-Life Balance',
      description: " We understand the importance of a healthy work-life balance for your well-being and job satisfaction. At idenDT, we prioritize the health of our team members and provide flexible work options, comprehensive healthcare benefits and wellness programs to help you thrive both at work and in your personal life.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-5 lg:px-40 py-20 bg-black ">
      {items.map((item) => (
        <div key={item.id} className="bg-[#212121]    rounded shadow flex flex-col gap-4 p-6">
          <img
            src={item.imageSrc}
            alt={item.heading}
            className="w-[50px] h-auto mb-2"
          />

          
          <h2 className="text-xl font-semibold text-[#C4C4C4]">{item.heading}</h2>
          <p className="text-[#C4C4C4]">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
