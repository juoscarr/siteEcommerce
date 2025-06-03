//1. IMPORTE TODAS AS FUNÇÕES NECESSÁRIAS
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
    getAuth,//Inicializa e retorna uma instancia de serviços de Autenticação do firebase
    createUserWithEmailAndPassword, //Cria uma nova conta de usuário usando o endereço de e-mail e senha
    signInWithEmailAndPassword, //redefinir a senha
    sendPasswordResetEmail //Envia um link para o email fornecido para redefinir uma nova senha

} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDauD-bb834iaBLTdR1sdwSM7Q-yuzrgBo",
    authDomain: "projfloricultura.firebaseapp.com",
    projectId: "projfloricultura",
    storageBucket: "projfloricultura.firebasestorage.app",
    messagingSenderId: "834594777085",
    appId: "1:834594777085:web:4262567a6d5784cc3a1b94"
};
//fim

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Adiciona um listener para quando o  DOM estiver completamente carregado
document.addEventListener('DOMCOntentLoaded', function () {
    //Seletores dos elementos HTML (pegue todos aui uma vez)
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');
    const esqueceuSenhaLink = document.getElementById('esqueciSenha');
    const cadastrarUsuarioLink = document.getElementById('cadastrarUsuario');
    const logarButton = document.getElementById('entrar');

    // --- LÓGICA DE CADASTRO ---
    if (cadastrarUsuarioLink) {
        cadastrarUsuarioLink.addEventListener('click', function (event) {
            event.preventDefault(); // Previne o comportamento padrão do link

            const emailValue = emailInput.value.trim();//O método .trim() serve para tirar os espaços em branco
            const passwordValue = passwordInput.value.trim();
            if (!emailValue || !passwordValue) {
                alert("Por favor, preencha o email e a senha para cadastrar.");
                return;
            }
            if (passwordValue.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Usuário cadastrado com sucesso:', user.email);
                    alert(`Usuário ${user.email} cadastrado com sucesso!`);
                    emailInput.value = '';
                    passwordInput.value = '';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Erro ao cadastrar:", errorCode, errorMessage);
                    if (errorCode === 'auth/email-already-in-use') {
                        alert('Este email já está cadastrado.');
                    } else if (errorCode === 'auth/invalid-email') {
                        alert('O formato do email é inválido.');
                    } else if (errorCode === 'auth/weak-password') {
                        alert('A senha é muito fraca (deve ter no mínimo 6 caracteres).');
                    } else {
                        alert(`Erro ao cadastrar: ${errorMessage}`);
                    }
                });
        });
    } else {
        console.warn("Elemento 'cadastrarUsuario' não encontrado.");
    }
});

// --- LÓGICA ESQUECEU A SENHA --
if (esqueceuSenhaLink) {
    esqueceuSenhaLink.addEventListener('click', function (event) {
    event.preventDefault(); // Previne o comportamento padrao do link
    const emailValue = emaillnput.value.trim(); // Pega o e-mail do campo de e-mail principal
    if (!emailValue) {
    alert('Por favor, insira seu endereco de e-mail no campo "Email" para redefinir a senha.');
    // if (messageAreaElement) messageAreaElement.textContent = 'Por favor, insira seu e-mail.';
    emaillnput.focus(); // Coloca o foco no campo de e-mail
    return;
    }
    // if (messageAreaElement) messageAreaElement.textContent = 'Enviando e-mail de redefinição ... ';
    alert('Enviando e-mail de redefinicao ... '); // Feedback imediato
    sendPasswordResetEmail(auth, emailValue) // Usa a funcao importada e o objeto 'auth'
    .then(() => {
    console.log('E-mail de redefinição de senha enviado para:', emailValue);
    alert('E-mail de redefinicão de senha enviado! Verifique sua caixa de entrada (e spam).');
    // if (messageAreaElement) messageAreaElement.textContent ='E-mail de redefinicao enviado! Verifique sua caixa de entrada.';
    .catch((error)=> {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Erro ao enviar e-mail de redefinicao:", errorCode, errorMessage);
    // if (messageAreaElement) messageAreaElement.textContent = 'Erro: ${errorMessage};
    if (errorCode === 'auth/invalid-email') {
    alert('O formato do e-mail fornecido e invalido.');
    } else if (errorCode === 'auth/user-not-found') {
    // Por seguranca, pode ser melhor uma mensagem generica
    alert('Se este e-mail estiver cadastrado, um link de redefinição será enviado.');
    // Ou, para depuração/uso interno: alert('Nenhum usuario encontrado com este e-mail.');
    } else {
    alert('Erro ao enviar e-mail de redefinição: ${errorMessage}');
    }
});
    });
} else {
    console.warn("Elemento 'esqueceuSenha' não encontrado.");
    }
});

