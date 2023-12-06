import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importez motion
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Swal from 'sweetalert2'; // Importez SweetAlert2

function Login() {
  const [im, setNum] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    document.title="Stage";
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/Login', { im, password });
      switch (response.data.Status) {
        case "succes_cir":
          navigate('/rapport_cir');
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Bienvenue dans CIR',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          break;
        case "succes_dbrfm":
          navigate('/rapport_dbrfm');
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Bienvenue dans DBRFM',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          break;

        case "succes_epn":
          navigate('/rapport_epn');
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Bienvenue dans EPN',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          
          break;

          
          case "succes_dpe":
            navigate('/rapport_dpe');
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Bienvenue dans DPE',
              showConfirmButton: false, // Masquer le bouton de confirmation
              timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
              onBeforeOpen: () => {
                Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
              },
              onClose: () => {
              }
            });
            break;

          
            case "succes_admin":
              navigate('/list_pers');
              Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Connexion réussie',
                showConfirmButton: false, // Masquer le bouton de confirmation
                timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
                onBeforeOpen: () => {
                  Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
                },
                onClose: () => {
                }
              });
              break;


          
            case "succes_cordo":
              navigate('/accueil_cordo');
              Swal.fire({
                icon: 'success',
                title: 'Bienvenue',
                text: 'Connexion réussie',
                showConfirmButton: false, // Masquer le bouton de confirmation
                timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
                onBeforeOpen: () => {
                  Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
                },
                onClose: () => {
                }
              });
              break;
  
  
        default:
          Swal.fire({
            icon: 'error',
            title: "Connexion incorrecte",
            text: 'Veuillez verifier votre IM ou votre mot de passe...',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1000, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <header>
        <div class="container">
          <div id="branding">
            <h1><span class="highlight">SRB</span> HM</h1>
          </div>
          <nav>
            <ul>
              <li><Link to={`/`} className=' '>ACCUEIL</Link></li>
              <li><Link to={`/acc_services`} className=''>SERVICES</Link></li>
              <li><Link to={`/acc_about`} className=''>A PROPOS</Link></li>
              <li class="current"><Link to={`/login`} className=''>Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className='border shadow rounded p-3 align-items-center col-md-6 login_centrer bg '
      >

      <h2 className="text-center">Se connecter</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="im">UTILISATEUR</label>
          <input
            type="text"
            className="form-control shadow"
            name="im"
            required
            placeholder="Numéro d'immatriculation"
            onChange={e => setNum(e.target.value)}
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="password">MOT DE PASSE</label>
          <input
            type="password"
            className="form-control shadow "
            name="password"
            required
            placeholder="Mot de passe"
            onChange={e => setPass(e.target.value)}
          />
        </div>
        <br />
        <div className="deux-btn">
          <button type="submit" className="btn btn-success btn-block connexion shadow">Connexion</button>
          <br />
          <br />
          <Link to="/new_pers" className="btn btn-secondary btn-block ajouter shadow">Ajouter un Personnel</Link>
        </div>
      
      </form>
    </motion.div>
    </div>
  );
}

export default Login;
