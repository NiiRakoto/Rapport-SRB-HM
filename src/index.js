import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import AccIndex from './acc/index';
import Login from './Login';
import AccueilCordo from './Accueil_Cordo';
import AccServices from './acc/services';
import AccAbout from './acc/about';

import ListPers from './List_Pers';
import New from './Ajouter_personnel';
import EditPers from './Modifier_personnel';

import RapportCir from './Rapport_cir';
import RapportDbrfm from './Rapport_dbrfm';
import RapportDpe from './Rapport_dpe';
import RapportEpn from './Rapport_epn';

import AjouterRapportCir from './Ajouter_rapport_cir';
import AjouterRapportDbrfm from './Ajouter_rapport_dbrfm';
import AjouterRapportEpn from './Ajouter_rapport_epn';
import AjouterRapportDpe from './Ajouter_rapport_dpe';

import EditRapportCir from './Modifier_rapport_cir';
import EditRapportDbrfm from './Modifier_rapport_dbrfm';
import EditRapportEpn from './Modifier_rapport_epn';
import EditRapportDpe from './Modifier_rapport_dpe';

import LogAccIndex from './acc/log_index';
import LogAccAbout from './acc/log_about';
import LogAccServices from './acc/log_services';

import CordoRapportCir from './Cordo_Rapport_cir';
import CordoRapportDbrfm from './Cordo_Rapport_dbrfm';
import CordoRapportEpn from './Cordo_Rapport_epn';
import CordoRapportDpe from './Cordo_Rapport_dpe';

import Chat from './Message';
import DiscussionDbrfmCordo from './Discussion_Dbrfm_Cordo';
import DiscussionCordoDbrfm from './Discussion_Cordo_Dbrfm';
import DiscussionCirCordo from './Discussion_Cir_Cordo';
import DiscussionCordoCir from './Discussion_Cordo_Cir';







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
        <Route exact path="/" element={<AccIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accueil_cordo" element={<AccueilCordo />} />
        <Route path="/acc_services" element={<AccServices />} />
        <Route path="/acc_about" element={<AccAbout />} />

        <Route path="/list_pers" element={<ListPers />} />
        <Route path="/new_pers" element={<New />} />
        <Route path="/edit_pers/:im" element={<EditPers />} />

        <Route path="/rapport_cir" element={< RapportCir />} />
        <Route path="/rapport_dbrfm" element={< RapportDbrfm />} />
        <Route path="/rapport_epn" element={< RapportEpn />} />
        <Route path="/rapport_dpe" element={< RapportDpe />} />

        <Route path="/ajouter_rapport_cir" element={<AjouterRapportCir />} />
        <Route path="/ajouter_rapport_dbrfm" element={< AjouterRapportDbrfm />} />
        <Route path="/ajouter_rapport_epn" element={<AjouterRapportEpn />} />
        <Route path="/ajouter_rapport_dpe" element={< AjouterRapportDpe />} />
        
        <Route path="/edit_rapport_cir/:id" element={<EditRapportCir />} />
        <Route path="/edit_rapport_dbrfm/:id" element={<EditRapportDbrfm />} />
        <Route path="/edit_rapport_epn/:id" element={<EditRapportEpn />} />
        <Route path="/edit_rapport_dpe/:id" element={<EditRapportDpe />} />


        <Route path="/log_index" element={<LogAccIndex />} />
        <Route path="/log_about" element={< LogAccAbout />} />
        <Route path="/log_services" element={<  LogAccServices />} />

        <Route path="/cordo_rapport_cir" element={< CordoRapportCir />} />
        <Route path="/cordo_rapport_dbrfm" element={< CordoRapportDbrfm />} />
        <Route path="/cordo_rapport_epn" element={< CordoRapportEpn />} />
        <Route path="/cordo_rapport_dpe" element={< CordoRapportDpe />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/discu_dbrfm_cordo" element={<DiscussionDbrfmCordo />} />
        <Route path="/discu_cordo_dbrfm" element={<DiscussionCordoDbrfm />} />
        <Route path="/discu_cir_cordo" element={<DiscussionCirCordo/>} />
        <Route path="/discu_cordo_cir" element={<DiscussionCordoCir />} />






      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
