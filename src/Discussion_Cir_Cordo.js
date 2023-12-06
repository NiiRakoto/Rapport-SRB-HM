import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Link } from 'react-router-dom';


const MessageForm = () => {
  const [envoyeur, setEnvoyeur] = useState('');
  const [recepteur, setRecepteur] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/discussion_cir_cordo', {
        envoyeur,
        recepteur,
        message,
      });

      if (response.status === 201) {
        window.location.reload();
        setEnvoyeur('');
        setRecepteur('');
        setMessage('');
      } else {
        console.error("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
         

        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message :
          </label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary cover">
          Envoyer
        </button>
      </form>
    </div>
  );
};

const MessageList = () => {
  const [messageGlobal, setMessageGlobal] = useState([]);
  const scrollBoxRef = useRef();

  useEffect(() => {
    axios
      .get('http://localhost:8081/message_cir')
      .then((res) => {
        setMessageGlobal(res.data);
      })
      .catch((err) => console.log(err));
  }, []); // Use an empty dependency array to fetch messages only once

  useEffect(() => {
    const scrollBox = scrollBoxRef.current;
    if (scrollBox) {
      scrollBox.scrollTop = scrollBox.scrollHeight;
    }
  }, [messageGlobal]);

  const sortedMessages = [...messageGlobal].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="m-5 rounded">
      <div ref={scrollBoxRef} id="scroll-box" className="discu rounded center">
        {sortedMessages.map((data, id) => (
          <div className="contour-message" key={id}>
            <div className="ext-envoyeur dib">
              <div
                className={
                  data.envoyeur === 'cir' ? 'envoyeurB dib' : 'envoyeurA dib'
                }
              >
                <div
                  className={
                    data.envoyeur === 'cordo_cir' ? 'pdp pdp_cordo dib' : 'display-none'
                  }
                  key={id}
                >
                  .
                </div>

                <div className="txt-message dib">{data.message}</div>

                <span className="date-heure">
                  {new Date(data.date).toLocaleDateString()}{' '}
                  {new Date(data.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




const App = () => (


  <div>

    <header className='header-fix'>
      <div class="container">
        <div id="branding">
          <h1><span class="highlight">SRB</span> HM</h1>

        </div>

      </div>
    </header>


    <div className='nav-before'></div>

    <nav className='nav'>

      <div className='navleft-after'></div>

      <div className="navleft p-3">
        <h1 className="titre_division">CIR</h1>
        <button onClick={() => window.history.back()} className='btn btn-success cover mb-3'  >Retour</button>
        <button onClick={() => window.location.reload()} className='btn btn-primary cover mb-3'  >Actualiser</button>

        <Link to={`/`} className='btn btn-danger m cover mb-3'>Déconnexion</Link>
      </div>

      <div className="navright">





        <div className='p-4 d-flexs justify-content-center align-items-center '>

          <div className='w- rounded p- shadow bg-opacity '>


            <h1 className="text-center">CORDO</h1>


            <MessageList />
            <MessageForm />


          </div>
        </div>







      </div>

    </nav >





  </div>











);

export default App;
