import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { actionCreators } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      login: '',
      senha: '',
    };
  }

  handleChangeLogin = (event) => {
    this.setState({ login: event.target.value },
      this.buttonConditionsLogin);
  }

  handleChangePassword = (event) => {
    this.setState({ senha: event.target.value },
      this.buttonConditionsLogin);
  }

  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/(validação de email utilizando regex)
    buttonConditionsLogin = () => {
      const { login, senha } = this.state;
      const lengthMax = 6;
      const validaEmail = /\S+@\S+\.\S+/;
      const boolValid = validaEmail.test(login) && (senha.length >= lengthMax);
      this.setState({
        button: !boolValid,
      });
      console.log(validaEmail);
    }

    onSaveButtonClick = () => {
      const { saveEmail } = this.props;
      const { login } = this.state;

      saveEmail(login);
    }

    render() {
      const { button, login, senha } = this.state;
      return (
        <div>
          <p>Página de Login</p>
          <form>
            <label htmlFor="login">
              Email:
              <input
                data-testid="email-input"
                type="text"
                name="email"
                id="login"
                placeholder="Digite seu email"
                value={ login }
                onChange={ this.handleChangeLogin }
              />
            </label>
            <label htmlFor="senha">
              Senha:
              <input
                data-testid="password-input"
                id="senha"
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={ senha }
                onChange={ this.handleChangePassword }
              />
            </label>
            <Link to="/carteira">
              <button
                type="button"
                name="button"
                disabled={ button }
                onClick={ this.onSaveButtonClick }
              >
                Entrar
              </button>
            </Link>
          </form>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (value) => dispatch(actionCreators.saveInput(value)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
