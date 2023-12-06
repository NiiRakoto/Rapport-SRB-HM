import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from "react-router-dom"; // Utilisation de useParams pour récupérer le paramètre de l'URL
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion



function EditPers() {
  const { id } = useParams(); //const [idcir] = useState('');
  const [produit, setProduit] = useState('');
  const [mois, setMois] = useState('');
  const [division, setDivision] = useState('');
  const [probleme, setProbleme] = useState('');
  const [solution, setSolution] = useState('');

  const allerVers = useNavigate();
  const { id: idresultat } = useParams(); // Récupérer l'IM depuis l'URL

  useEffect(() => {

    // Récupérer les anciennes valeurs du rapport CIR à partir de la base de données

    axios.get(`http://localhost:8081/edit_rapport_dbrfm/${idresultat}`)
      .then(res => {
        if (res.data.Status === "succes") {
          const rapport = res.data.Rapport; // Assurez-vous que votre backend renvoie les anciennes valeurs
          setProduit(rapport.produit);
          setMois(rapport.mois);
          setDivision(rapport.division);
          setProbleme(rapport.probleme);
          setSolution(rapport.solution);
        } else {
          alert('Erreur lors de la récupération des données du rapport CIR');
        }
      })
      .catch(err => console.log(err));
  }, [idresultat]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/edit_rapport_dbrfm/${id}`, { produit, mois, division, probleme, solution })
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Modifié',
            text: 'Rapport CIR modifié avec succès',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          allerVers('/rapport_dpe');
        } else {
          alert('Une erreur');
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
            <div className='h-50 d-flex justify-content-center align-items-center mt-5'>
              <div className='w-50 bg-white rounded shadow p-4 bg'>
                <h2>Modifier un rapport DBRFM</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="produit">Produit:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="produit"
                      required
                      aria-describedby="produit"
                      value={produit}
                      onChange={e => setProduit(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
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
                  <button type='submit' className='btn btn-primary cover'>Enregistrer</button>
                </form>
              </div>
            </div>

          </motion.div>
        </div>

      </nav>
    </div>
  );
}

export default EditPers;
