
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"; // Importez motion
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';


function AccueilAdmin() {

  const [nbr_cir, setNbrCir] = useState('');
  const [nbr_dbrfm, setNbrDbrfm] = useState('');
  const [nbr_epn, setNbrEpn] = useState('');
  const [nbr_dpe, setNbrDpe] = useState('');
  const [statutRapport_cir, setStatutRapport_cir] = useState('');
  const [statutRapport_dbrfm, setStatutRapport_dbrfm] = useState('');
  const [statutRapport_epn, setStatutRapport_epn] = useState('');
  const [statutRapport_dpe, setStatutRapport_dpe] = useState('');

  useEffect(() => {

    axios
      .get('http://localhost:8081/nbr_cir')
      .then((res) => {
        setNbrCir(res.data[0].nbr);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8081/nbr_dbrfm')
      .then((res) => {
        setNbrDbrfm(res.data[0].nbr);
      })
      .catch((err) => console.log(err));


    axios
      .get('http://localhost:8081/nbr_epn')
      .then((res) => {
        setNbrEpn(res.data[0].nbr);
      })
      .catch((err) => console.log(err));


    axios
      .get('http://localhost:8081/nbr_dpe')
      .then((res) => {
        setNbrDpe(res.data[0].nbr);
      })
      .catch((err) => console.log(err));


    // Requête pour récupérer le statut
    axios
      .get('http://localhost:8081/statutrapport_cir')
      .then((res) => {
        setStatutRapport_cir(res.data[0].statut);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8081/statutrapport_dbrfm')
      .then((res) => {
        setStatutRapport_dbrfm(res.data[0].statut);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8081/statutrapport_epn')
      .then((res) => {
        setStatutRapport_epn(res.data[0].statut);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8081/statutrapport_dpe')
      .then((res) => {
        setStatutRapport_dpe(res.data[0].statut);
      })
      .catch((err) => console.log(err));



  }, []);




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
          <button onClick={() => window.history.back()} className='btn btn-success cover mb-3'>Retour</button>
          <Link to={`/log_services`} className='btn btn-primary  cover mb-3'>Services</Link>
          <Link to={`/log_about`} className='btn btn-secondary  cover mb-3'>A propos</Link>
          <Link to={`/`} className='btn btn-danger  cover mb-3'>Déconnexion</Link>





        </div>




        <div className="navright">

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className=' justify-content-center align-items-center'
          >

            <div className='carree'>
              <Link to={`/cordo_rapport_cir`} className='carree-mini'>
                <div className='carree-mini carree-mini1'>


                  <div className='interieur'>
                    <div className='cordo-division'>C I R</div>
                    {statutRapport_cir === 'OUI' ? (
                      <div className='cordo-statut-oui cordo-statut'>Rapport finalisé</div>
                    ) : (
                      <div className='cordo-statut-non cordo-statut'>Rapport non finalisé</div>
                    )}

                    <div className='cordo-nombre'>Nombre : {nbr_cir} </div>
                  </div>

                </div>
              </Link>
            </div>

            <div className='carree'>
              <Link to={`/cordo_rapport_dbrfm`} className='carree-mini'>
                <div className='carree-mini carree-mini2'>


                  <div className='interieur'>
                    <div className='cordo-division'>DBRFM</div>
                    {statutRapport_dbrfm === 'OUI' ? (
                      <div className='cordo-statut-oui cordo-statut'>Rapport finalisé</div>
                    ) : (
                      <div className='cordo-statut-non cordo-statut'>Rapport non finalisé</div>
                    )}

                    <div className='cordo-nombre'>Nombre : {nbr_dbrfm} </div>
                  </div>

                </div>
              </Link>
            </div>

            <div className='carree'>
              <Link to={`/cordo_rapport_epn`} className='carree-mini'>
                <div className='carree-mini carree-mini3'>


                  <div className='interieur'>
                    <div className='cordo-division'>EPN</div>
                    {statutRapport_epn === 'OUI' ? (
                      <div className='cordo-statut-oui cordo-statut'>Rapport finalisé</div>
                    ) : (
                      <div className='cordo-statut-non cordo-statut'>Rapport non finalisé</div>
                    )}

                    <div className='cordo-nombre'>Nombre : {nbr_epn} </div>
                  </div>

                </div>
              </Link>
            </div>

            <div className='carree'>
              <Link to={`/cordo_rapport_dpe`} className='carree-mini'>
                <div className='carree-mini carree-mini4'>


                  <div className='interieur'>
                    <div className='cordo-division'>DPE</div>
                    {statutRapport_dpe === 'OUI' ? (
                      <div className='cordo-statut-oui cordo-statut'>Rapport finalisé</div>
                    ) : (
                      <div className='cordo-statut-non cordo-statut'>Rapport non finalisé</div>
                    )}

                    <div className='cordo-nombre'>Nombre : {nbr_dpe} </div>
                  </div>

                </div>
              </Link>
            </div>




            <div className='carree'>
              <Link to={`/cordo_rapport_dpe`} className='carree-mini'>
                <div className='carree-mini carree-mini4'>


                  <div className='interieur'>
                    <div className='cordo-division'>DPE</div>
                    {statutRapport_dpe === 'OUI' ? (
                      <div className='cordo-statut-oui cordo-statut'>Rapport finalisé</div>
                    ) : (
                      <div className='cordo-statut-non cordo-statut'>Rapport non finalisé</div>
                    )}

                    <div className='cordo-nombre'>Nombre : {nbr_dpe} </div>
                  </div>

                </div>
              </Link>
            </div>








            <div className='separe_carree'>

            </div>











            

          </motion.div>

        </div>

      </nav >

      <footer className="footer bg-success cover">
        <div className=' cover'>
          <p>Tous droits réservés © 2023</p>
        </div>

      </footer>


    </div >
  );
}

export default AccueilAdmin;
