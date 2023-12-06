import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';  // Assuming this is a custom CSS file for additional styling.
import {  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function NewPers() {
  const [im, setIm] = useState('');
  const [nom, setNom] = useState('');
  const [prenoms, setPrenoms] = useState('');
  const [adresse, setAdresse] = useState('');
  const [password, setPassword] = useState('');
  const [division, setDivision] = useState('');

  const allerVers = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/inscription', { im, nom, prenoms, adresse, password, division })
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Ajouté',
            text: 'Personnel ajouté avec succès.',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
              // Cette fonction sera appelée lorsque la boîte de dialogue se ferme
              // Vous pouvez ajouter du code ici si nécessaire
            }
          });



          
          allerVers('/login');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Le personnel existe déjà.',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
              // Cette fonction sera appelée lorsque la boîte de dialogue se ferme
              // Vous pouvez ajouter du code ici si nécessaire
            }
          });
        }
      })
      .catch(err => console.log(err));
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
              {/* 
              <li><Link to={`/`} className=' '>HOME</Link></li>
              <li><Link to={`/acc_services`} className=''>RAPPORT</Link></li>
              <li><Link to={`/acc_about`} className=''>ABOUT</Link></li>
              <li class="current"><Link to={`/login`} className=''>Login</Link></li>
              */}
            </ul>
          </nav>
        </div>
      </header>
<div className='nav-before'></div>
     
    <motion.div
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }} 
      className=' justify-content-center align-items-center'
    >

      <div className='p-5 d-flex justify-content-center align-items-center'>
      
        <div className='w-50 rounded p-4 shadow bg-opacity bg'>
          <h2>Ajouter un Personnel</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="im">Numéro:</label>
              <input
                type="text"
                className="form-control shadow "
                id="im"
                name="im"
                required
                aria-describedby="im"
                onChange={e => setIm(e.target.value)}
              />
            </div>

            <div className='form-group '>
              <label htmlFor="nom">Nom:</label>
              <input
                type="text"
                className="form-control shadow "
                id="nom"
                required
                aria-describedby="nom"
                onChange={e => setNom(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="prenoms">Prenoms:</label>
              <input
                type="text"
                className="form-control shadow "
                id="prenoms"
                required
                aria-describedby="prenoms"
                onChange={e => setPrenoms(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="adresse">Adresse:</label>
              <input
                type="email"
                className="form-control shadow "
                id="adresse"
                required  
                aria-describedby="adresse"
                onChange={e => setAdresse(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                className="form-control shadow "
                id="password"
                required
                aria-describedby="passwordHelpBlock"
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="division">Division:</label>
              <select
                className="form-control shadow "
                id="division"
                onChange={e => setDivision(e.target.value)}
                required // Ajoutez l'attribut required ici
              >
                <option value="">Selectionner la division</option>
                <option value="CIR">CIR</option>
                <option value="DBRFM">DBRFM</option>
                <option value="EPN">EPN</option>
                <option value="DPE">DPE</option>
              </select>
            </div>

            <br />

            <button type='submit' className='btn btn-primary  shadow cover '>Enregistrer</button>
            
            <br />
            <br />
            <button  onClick={
        () => window.history.back()
      } className="btn btn-success cover">
        Retour
      </button>
            
          </form>
        </div>
      </div>

    </motion.div>
    </div>
  );
}

export default NewPers;
