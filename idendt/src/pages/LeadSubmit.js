import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import HeaderDash from '../components/Header-D';
import baseUrl from '../components/config'; // Adjust the path accordingly

function LeadSubmit() {
  const [businessname, setBusinessname] = useState('');
  const [note, setNote] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [contact, setContact] = useState('');
  const [email, setMail] = useState('');
  const [state, setState] = useState('');

  const [city, setCity] = useState('');
  const [BusinessType, setBusinessType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorphone, setErrorPhone] = useState('');

  const imageFieldMapping = {
    'brandingLeado.png': 'Branding',
    'logoLead.png': 'Logo',
    'webLead.png': 'Web Development',
    'dmLead.png': 'digital Marketing',
    'seoLead.png': 'SEO',
  };

  const [selectedFields, setSelectedFields] = useState([]);

  const handleImageClick = (imageName) => {
    setSelectedFields((prevSelectedFields) => {
      if (prevSelectedFields.includes(imageFieldMapping[imageName])) {
        const updatedFields = prevSelectedFields.filter((field) => field !== imageFieldMapping[imageName]);
        console.log(updatedFields);
        return updatedFields;
      } else {
        const updatedFields = [...prevSelectedFields, imageFieldMapping[imageName]];
        console.log(updatedFields);
        return updatedFields;
      }
    });
  };

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setMail(enteredEmail);

    // Clear the error message when the user starts correcting the email
    if (errorphone) {
      setErrorPhone('');
    }

    // Additional validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      setErrorMessage('Invalid email address');
    } else {
      // Clear the error message if the email is valid
      setErrorMessage('');
    }
  };

  const handlePhoneChange = (e) => {
    const enteredPhone = e.target.value;
    setPhone(enteredPhone);

    // Clear the error message when the user starts correcting the phone number
    if (errorMessage) {
      setErrorMessage('');
    }

    // Additional validation for phone number format
    const phoneRegex = /^\d{11,20}$/; // This ensures more than 10 and up to 20 digits
    if (!phoneRegex.test(enteredPhone)) {
      setErrorPhone('Invalid phone number');
    } else {
      // Clear the error message if the phone number is valid
      setErrorPhone('');
    }
  };

  const submitLead = async () => {
    try {


          if (!businessname || !note || !country || !phone || !email || !city || !contact || !state) {
        setErrorMessage('All fields are required');
        return;
      }
      // Additional validation rules
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid email address');
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        setErrorPhone('Invalid phone number');
        return;
      }

      // Basic input validation
  

      const response = await axios.post(`${baseUrl}/submit-lead`, {
        businessname,
        note,
        country,
        phone,
        email,
        city,
        contact,
        state,
        status: null,
        service: selectedFields,
      });

      console.log(response.data.message);

      if (response.data.message === 'Lead submitted successfully') {
        navigate('/view-status');
      } else {
        setErrorMessage('Signup failed. Please try again.');
        console.log(errorMessage, 'show error');
        console.log(errorphone, 'show error phone');
      }
    } catch (error) {
      console.error('Signup failed', error);
      setErrorMessage('Signup failed. Please try again.');
    }

    console.log('Error Phone:', errorphone);
  };

  return (
    <div>
      <HeaderDash />

      <div className="main-contain bg-black pt-10">
        <section class="flex flex-col gap-10 bg-black" id="contact">
          <div class="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">
            <h1 class="text-[24px] sm:text-[60px] font-bold text-white">Submit a Lead</h1>
          </div>
          <div class="form flexbox-col px-10 sm:px-14 lg:px-40 ">
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {errorphone && <p className="text-red-600">{errorphone}</p>}

            <div class="form-wrapper">
              <div id="form">
                <div class="form-input-max">
                  <label for="name" class="form-text">
                    Business Name
                  </label>
                  <div class="form-input-wrapper flexbox-left">
                    <input
                      class="form-input"
                      type="text"
                      placeholder="Name"
                      value={businessname}
                      onChange={(e) => setBusinessname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div class="form-input-grid">
                  <div>
                    <label for="email" class="form-text">
                      Mode Of Contact
                    </label>
                    <div class="form-input-wrapper flexbox-left">
                      <input
                        class="form-input"
                        type="text"
                        placeholder=""
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <p class="text-[14px] sm:text-[18px] text-white">Contact Detials</p>

                <div class="form-input-grid">
                  <div>
                    <div class="form-input-wrapper flexbox-left">
                      <input
                        class="form-input"
                        type="text"
                        placeholder="Phone Number*"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div class="form-input-wrapper flexbox-left">
                      <input
                        class="form-input"
                        placeholder="Mail id*"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="form-input-max">
                  <div class="form-input-wrapper flexbox-left">
                    <textarea
                      class="form-input"
                      rows={'3'}
                      type="password"
                      placeholder="Note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div class="form-input-grid">
                  <div>
                    <div class="form-input-wrapper flexbox-left">
                      <input
                        class="form-input"
                        type="text"
                        placeholder="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div class="form-input-wrapper flexbox-left">
                      <input
                        class="form-input"
                        placeholder="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="form-input-grid">
                  <div>
                    <div class="form-input-wrapper flexbox-left">
                      <input
                        class="form-input"
                        type="text"
                        placeholder="Business Type"
                        value={BusinessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='image-selector'>
                  {Object.keys(imageFieldMapping).map((imageName) => (
                    <div
                      key={imageName}
                      className={`image-container ${
                        selectedFields.includes(imageFieldMapping[imageName]) ? 'selected' : ''
                      }`}
                    >
                      <img
                        src={`assets/sales/${imageName}`}
                        alt=""
                        className='flex-1'
                        onClick={() => handleImageClick(imageName)}
                      />
                      {selectedFields.includes(imageFieldMapping[imageName]) && (
                        <div className='checkbox p-4  text-white'>✓</div>
                      )}
                    </div>
                  ))}
                </div>

                <div class="form-input-max flexbox-left">
                  <div class="button-wrapper">
                    <button id="form-button" class="button btn-primary" onClick={submitLead}>
                      Submit
                      <div class="btn-secondary"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LeadSubmit;
