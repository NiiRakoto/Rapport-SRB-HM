import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion"; // Importez motion
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importez SweetAlert2

function AccueilCir() {

  useEffect(() => {

    axios.post('http://localhost:8081/list_pers')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erreur au niveau de : ' + error);
      });
  }, []);

  const [data, setData] = useState([]);

  const handleDelete = async (im) => {
    try {
      await axios.delete('http://localhost:8081/list_pers/' + im)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }



  //const division = "CIR"; 


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
          <button onClick={() => window.history.back()} className='btn btn-success cover mb-3'>Retour</button>
          <Link to={`/new_pers`} className='btn btn-primary  cover mb-3'>Ajouter +</Link>
          <Link to={`/chat`} className='btn btn-secondary  cover mb-3'>Message</Link>
          <Link to={`/`} className='btn btn-danger  cover mb-3'>Déconnexion</Link>

          




        </div>




        <div className="navright">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center'
      >
        <div className='w-30 rounded'>

          


          <table className="table rounded shadow rounded border-radius m-3">
            <thead  className='border'>
              <tr>
                <th>Numero</th>
                <th>Nom</th>
                <th>Prenoms</th>
                <th>Adresse</th>
                <th>Division</th>
                <th>Mot de passe</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.im}>
                  <td>{item.im}</td>
                  <td>{item.nom}</td>
                  <td>{item.prenoms}</td>
                  <td>{item.email}</td>
                  <td>{item.division}</td>
                  <td>{item.password}</td>

                  <td >

                    <Link to={`../edit_pers/${item.im}`} className='btn btn-primary ms-2'>Update</Link>
                    <button
                      className='btn btn-danger ms-2'
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: 'Êtes-vous sûr de vouloir supprimer le Personnel ?',
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
                            await handleDelete(item.im);
                            // Vous pouvez également ajouter une SweetAlert2 pour indiquer que la suppression a réussi
                            Swal.fire('Supprimé !', 'Le personnel a été supprimé avec succès.', 'success');
                          } catch (err) {
                            // En cas d'erreur, affichez une autre alerte SweetAlert2
                            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du personnel.', 'error');
                          }
                        }
                      }}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div></div>

</nav >




</div >
  );
}

export default AccueilCir;