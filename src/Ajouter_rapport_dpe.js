import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';  // Assuming this is a custom CSS file for additional styling.
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function NewPers() {
  const [produit, setProduit] = useState('');
  const [mois, setMois] = useState('');
  const [division, setDivision] = useState('');
  const [probleme, setProbleme] = useState('');
  const [solution, setSolution] = useState('');

  const allerVers = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/new_rapport_dpe', { produit, mois, division, probleme, solution })
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Ajouté',
            text: 'Rapport ajouté avec succès.',
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




          allerVers('/rapport_dpe');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Le rapport existe déjà.',
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

  const moisActuellowercase = new Date().toLocaleString('default', { month: 'long' });
  const moisActuel = moisActuellowercase.charAt(0).toUpperCase() + moisActuellowercase.slice(1);


  return (

    <div>

      <header>
        <div class="container">
          <div id="branding">
            <h1><span class="highlight">SRB</span> HM</h1>

          </div>
          <nav>
            <ul>






            </ul>
          </nav>
        </div>
      </header>


      <div className='nav-before'></div>
     

      <nav className='nav'>
        <div className='navleft-after'></div>
        <div className="navleft p-3">
          <h1 className="titre_division">DPE</h1>
          <button onClick={() => window.history.back()} className='btn btn-success cover mb-3'>Retour</button>
          <Link to={`/`} className='btn btn-danger m cover mb-3'>Déconnexion</Link>
        </div>

        <div className="navright">

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className=' justify-content-center align-items-center'
          >

            <div className='p-5 d-flex justify-content-center align-items-center '>

              <div className='w-50 rounded p-4 shadow bg-opacity '>
                <h2>Ajouter un rapport</h2>
                <form onSubmit={handleSubmit}>


                  <div className="form-group">
                    <label htmlFor="produit">Produit:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="produit"
                      required
                      aria-describedby="mois"
                      value={produit}
                      onChange={e => setProduit(e.target.value)}
                    />
                  </div><div className="form-group">
                    <label htmlFor="mois">{moisActuel}:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mois"
                      required
                      aria-describedby="mois"
                      value={mois}
                      onChange={e => setMois(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="division">Division:</label>
                    <select
                      className="form-control"
                      id="division"
                      required
                      value={division}
                      onChange={e => setDivision(e.target.value)}
                    >
                      <option value="">Selectionner la division</option>
                      <option value="CIR">CIR</option>
                      <option value="DBRFM">DBRFM</option>
                      <option value="EPN">EPN</option>
                      <option value="DPE">DPE</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="probleme">Problème:</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="probleme"
                      required
                      aria-describedby="passwordHelpBlock"
                      value={probleme}
                      onChange={e => setProbleme(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="solution">Solution:</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="solution"
                      required
                      aria-describedby="passwordHelpBlock"
                      value={solution}
                      onChange={e => setSolution(e.target.value)}
                    />
                  </div>

                  <br />

                  <button type='submit' className='btn btn-primary cover shadow '>Enregistrer</button>

                </form>
              </div>
            </div>

          </motion.div>
        </div>

      </nav>
    </div>
  );
}

export default NewPers;
