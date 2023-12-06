import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion } from "framer-motion";

function Accueil() {
  const [rapport, setRapport] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRapport, setFilteredRapport] = useState([]);
  const [statutRapport, setStatutRapport] = useState(''); // Ajout de l'état pour le statut
  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:8081/epn')
      .then((res) => {
        setRapport(res.data);
        setFilteredRapport(res.data);
      })
      .catch((err) => console.log(err));


    // Requête pour récupérer le statut
    axios
      .get('http://localhost:8081/statutrapport_epn')
      .then((res) => {
        setStatutRapport(res.data[0].statut); // Assurez-vous que res.data[0].statut est la bonne propriété
      })
      .catch((err) => console.log(err));
      

  }, []);




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
    doc.save('rapport_EPN_' + dateHeureActuelle + '.pdf');


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
              <li><Link to={`/log_index`} className=' '>ACCUEIL</Link></li>
              <li><Link to={`/log_services`} className=''>SERVICES</Link></li>
              <li><Link to={`/log_about`} className=''>A PROPOS</Link></li>
              <li className=" current"><Link to={`/accueil_cordo`} className=''>Cordo</Link></li>
            </ul>
          </nav>
        </div>
      </header>


      <div className='nav-before'></div>

      <nav className='nav'>

        <div className='navleft-after'></div>

        <div className="navleft p-3">
          <h1 className="titre_division">EPN</h1>
          
        <button onClick={ () => window.history.back() } className='btn btn-success cover mb-3'  >Retour</button>

          {statutRapport === 'OUI' ? (

            <Link className=''><button
              onClick={generatePDF}
              className=' btn btn-danger  cover mb-3'
              style={{ float: 'right' }}
            >
              Générer le PDF
            </button></Link>


          ) : (
            <p className=' btn btn-secondary  cover mb-3'>La division n'a pas encore activé le statut du rapport .</p>
          )}




          {/*<Link to={`/rapport_dbrfm`} className='btn btn-primary  cover mb-3'>Activer la modification</Link>*/}
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

                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control mt-2"
                />
              </div>

              <table ref={tableRef} className="rounded cover bg-table">
                <thead>
                  <tr>
                    <th colSpan="5" className='center display-6'>Réalisation mensuelle {moisActuel}  {anneeActuelle} : EPN</th>
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
