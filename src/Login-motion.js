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
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/Login', { im, password });
      switch (response.data.Status) {
        case "succes_cir":
          navigate('/cir');
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
          navigate('/dbrfm');
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
        case "succes_secretaria":
          navigate('/secretaria');
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Bienvenue dans secrétariat',
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
            title: "Connecion incorrecte",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={animationComplete ? { opacity: 1 } : {}}
      className=" border shadow rounded p-3 align-items-center col-md-6 login_centrer"
    >
      <h2 className="text-center">Se connecter</h2>
      <form onSubmit={handleSubmit}>
        {/* Le reste du formulaire reste inchangé */}
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
      {/* ... */}
      </form>
    </motion.div>
  );
}

export default Login;
