import axios from 'axios';
import './style.css';



const AuthPage = (props) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const  username  = e.target[0].value;
      const  password  = e.target[1].value;
      axios.post(
        'http://localhost:8081/authenticate',
        {username : username}
      )
        .then( r => props.onAuth({ ...r.data , secret : password }))

        .catch( e => console.log('Erreur au nuveau de : ',e))

    };
  
    return (
      <div className="background">
        <form onSubmit={onSubmit} className="form-cardsss">
          <div className="form-title"> Bienvenue ! </div>
  
          <div className="form-subtitle">Pour se connecter ,
          <br/>
           Veuillez entrer votre mot de passe </div>
  
          <div className="auth">


          <label className="auth-label display-none">Mot de dd</label>
            <input className="auth-input display-none" name="username" value="CIR" />
            
            <label className="auth-label">Mot de passe</label>
            <input className="auth-input" name="username" />



            <button className="auth-button" type="submit">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthPage;