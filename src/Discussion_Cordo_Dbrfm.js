import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client'; // Importez la bibliothèque socket.io-client

const MessageForm = ({ socket }) => {
  const [envoyeur, setEnvoyeur] = useState('');
  const [recepteur, setRecepteur] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/discussion_cordo_dbrfm', {
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
    <form onSubmit={handleSubmit}>
      <div className='message-input-envoyer center bg-opacity rounded'>


        <div className='input-envoyer'>
          <textarea
            className="message-input rounded  "
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="btn btn-success message-envoyer">
            Envoyer
          </button>
        </div>
      </div>
    </form >
  );
};

const MessageList = ({ socket }) => {
  const [messageGlobal, setMessageGlobal] = useState([]);
  const scrollBoxRef = useRef();

  useEffect(() => {
    axios
      .get('http://localhost:8081/message_dbrfm')
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

  useEffect(() => {
    // Écoutez les événements WebSocket pour les mises à jour
    if (socket) {
      socket.on('update', (newData) => {
        setMessageGlobal(newData);
      });
    }

    // Nettoyez l'écouteur lors du démontage du composant
    return () => {
      if (socket) {
        socket.off('update');
      }
    };
  }, [socket]);


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
                  data.envoyeur === 'cordo_dbrfm' ? 'envoyeurB dib' : 'envoyeurA dib'
                }
              >
                <div
                  className={
                    data.envoyeur === 'dbrfm' ? 'pdp pdp_dbrfm dib' : 'display-none'
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
      <MessageForm socket={socket} />
    </div>
  );
};




const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8081');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    // Déconnexion du WebSocket lors du démontage du composant
    return () => {
      newSocket.disconnect();
      console.log('WebSocket disconnected on component unmount');
    };
  }, []);

  return (
    <div>
      <header className="header-fix">
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
          <h1 className="titre_division">CORDO</h1>
          <button onClick={() => window.history.back()} className='btn btn-success cover mb-3'  >Retour</button>
          <button onClick={() => window.location.reload()} className='btn btn-primary cover mb-3'  >Actualiser</button>

          <Link to={`/`} className='btn btn-danger m cover mb-3'>Déconnexion</Link>
        </div>

        <div className="navright">





          <div className='p-4 d-flexs justify-content-center align-items-center '>

            <div className='w- rounded p- shadow bg-opacity '>


              <h1 className="text-center"> vers DBRFM</h1>


              <MessageList socket={socket} />


            </div>
          </div>







        </div>

      </nav >





    </div>











  );
}

export default App;
