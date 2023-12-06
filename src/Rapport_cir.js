import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModeIcon from '@mui/icons-material/Mode';
import DelIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import 'jspdf-autotable';
import { motion } from "framer-motion";
import './style.css';

function Accueil() {
  const [rapport, setRapport] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRapport, setFilteredRapport] = useState([]);
  const tableRef = useRef(null);
  const [statutRapport, setStatutRapport] = useState(''); // Ajout de l'état pour le statut

  useEffect(() => {
    axios
      .get('http://localhost:8081/cir')
      .then((res) => {
        setRapport(res.data);
        setFilteredRapport(res.data);
      })
      .catch((err) => console.log(err));
       // Requête pour récupérer le statut
    axios
    .get('http://localhost:8081/statutrapport_cir')
    .then((res) => {
      setStatutRapport(res.data[0].statut); // Assurez-vous que res.data[0].statut est la bonne propriété
    })
    .catch((err) => console.log(err));

  }, []);

  const deleterapport = async (idcir) => {
    try {
      await axios.delete('http://localhost:8081/delrapport/' + idcir);

      // ... (votre code de suppression)

      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (err) {
      console.log(err);
    }
  };


  //             OUI                   NON     
  function fin(event) {
    event.preventDefault();
    
    const a = document.getElementById("txt-fin");
    a.textContent = "Rapport finalisé";
    a.style.color = "green";

    axios.post('http://localhost:8081/fin_cir')
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Ajouté',
            text: 'Rapport finalisé avec succés',
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
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Effectué',
            text: 'Rapport déjà finalisé',
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




  //                     NON     
  function nonfin(event) {
    event.preventDefault();
    

    const b = document.getElementById("txt-fin");
    b.textContent = "Rapport incomplet";
    b.style.color = "red";

    axios.post('http://localhost:8081/nonfin_cir')
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Non finalisé',
            text: 'Rapport non finalisé',
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
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Non finalisé',
            text: 'Rapport non finalisé',
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



  const dateActuelle = new Date();

  const jourActuel = dateActuelle.getDate();
  const moisActuel1 = dateActuelle.getMonth() + 1; // Les mois sont indexés à partir de 0, donc on ajoute 1
  const anneeActuelle = dateActuelle.getFullYear();
  const heureActuelle = dateActuelle.getHours();
  const minuteActuelle = dateActuelle.getMinutes();
  const secondeActuelle = dateActuelle.getSeconds();

  const dateHeureActuelle = `${jourActuel}/${moisActuel1}/${anneeActuelle} ${heureActuelle}:${minuteActuelle}:${secondeActuelle}`;




  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('', 10, 10);

    doc.autoTable({
      html: tableRef.current,
      styles: {

        halign: 'center',
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        headStyles: {
          fillColor: [255, 255, 255],
        },
      },
      theme: 'plain',
      margin: { top: 30 },
    });
    doc.save('rapport_CIR_' + dateHeureActuelle + '.pdf');


    // Ouverture du PDF dans un nouvel onglet
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');


  };





  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredData = rapport.filter((data) => {
      return (
        data.produit.toLowerCase().includes(term.toLowerCase()) ||
        data.division.toLowerCase().includes(term.toLowerCase()) ||
        data.mois.toLowerCase().includes(term.toLowerCase()) ||
        data.probleme.toLowerCase().includes(term.toLowerCase()) ||
        data.solution.toLowerCase().includes(term.toLowerCase())
      );
    });

    setFilteredRapport(filteredData);
  };

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
        <h1 className="titre_division">CIR</h1>
        <button onClick={ () => window.history.back() } className='btn btn-success cover mb-3'  >Retour</button>
        
          <Link className=''><button
            onClick={generatePDF}
            className=' btn btn-danger  cover mb-3'
            style={{ float: 'right' }}
          >
            Générer le PDF
          </button>
          </Link>

          
          <Link to={`/discu_cir_cordo`} className='btn btn-primary m cover mb-3'>Message</Link>
          <Link to={`/`} className='btn btn-danger m cover mb-3'>Déconnexion</Link>
        </div>

        <div className="navright">

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className=' justify-content-center align-items-center'
          >

            <div className='m-2'>
              <div className='m-2'>
                <Link to={'/ajouter_rapport_cir'} className="btn btn-success ms-2">Ajouter des données</Link>
                <button
                  onClick={generatePDF}
                  className='btn btn-danger '
                  style={{ float: 'right' }}
                >
                  Générer le PDF
                </button>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control mt-2"
                />
              </div>

              {statutRapport === 'OUI' ? (
                <div><h3 id='txt-fin' className='bg-table p-2 m-2 green rounded'>Rapport finalisé</h3></div>
              ) : (
                <div><h3 id='txt-fin' className='bg-table p-2 m-2 red rounded'>Rapport incomplet</h3></div>
              )}

              

              <button onClick={fin} id='btn-fin' className='btn btn-success shadow m-2'>Marqué comme finalisé</button>
              
              <button onClick={nonfin} id='btn-nonfin' className='btn btn-danger shadow m-2'>Marqué comme incomplèt</button>


              <table ref={tableRef} className="rounded cover bg-table">
                <thead>
                  <tr>
                    <th colSpan="5" className='center display-6'>Réalisation mensuelle {moisActuel}  {anneeActuelle} : CIR</th>
                  </tr>
                  <tr>
                    <th >Produit</th>
                    <th>{moisActuel}</th>
                    <th>Division</th>
                    <th>Problème</th>
                    <th colSpan="1" >Solution</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRapport.map((data, idcir) => (
                    <tr key={idcir}>
                      <td>{data.produit}</td>
                      <td>{data.mois}</td>
                      <td>{data.division}</td>
                      <td>{data.probleme}</td>
                      <td>{data.solution}</td>
                      <td>
                        <div className='min-width-50'>
                        <Link className='dib' to={`/edit_rapport_cir/${data.id}`}>
                          <ModeIcon />
                        </Link>
                        <button
                          className='red non-btn dib'
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: 'Êtes-vous sûr de vouloir supprimer le rapport ?',
                              text: "Cette action est irréversible !",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Oui, supprimer',
                              cancelButtonText: 'Annuler',
                            });

                            if (result.isConfirmed) {
                              try {
                                await deleterapport(data.id);
                                Swal.fire('Supprimé !', 'Le rapport a été supprimé avec succès.', 'success',);
                              } catch (err) {
                                Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du personnel.', 'error');
                              }
                            }
                          }}
                        >
                          <DelIcon/>
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </motion.div>
        </div>

      </nav>
    </div>
  );
}

export default Accueil;
