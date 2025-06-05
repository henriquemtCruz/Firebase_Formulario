// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_GG1vg6BKgU82k6vO9k4H9P9aVyn2K9E",
  authDomain: "formulario-de-login-e6959.firebaseapp.com",
  projectId: "formulario-de-login-e6959",
  storageBucket: "formulario-de-login-e6959.firebasestorage.app",
  messagingSenderId: "789683403470",
  appId: "1:789683403470:web:a18005a0fa53d072d8ae9f"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Função para traduzir mensagens de erro
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/wrong-password':
      return 'Senha incorreta. Tente novamente.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/invalid-email':
      return 'E-mail inválido.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente mais tarde.';
    case 'auth/popup-closed-by-user':
      return 'Login cancelado pelo usuário.'; // Mensagem genérica para qualquer popup (Google/GitHub)
    case 'auth/account-exists-with-different-credential':
      return 'Uma conta já existe com o mesmo e-mail, mas com credenciais diferentes.';
    case 'auth/auth-domain-config-required':
      return 'Configuração de domínio de autenticação é necessária.';
    default:
      return 'Erro ao fazer login. Tente novamente.';
  }
}

// Login com email e senha
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorMessage.textContent = getErrorMessage(error.code);
      errorMessage.style.display = "block";
    });
});

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerGithub = new firebase.auth.GithubAuthProvider();

// ... (código existente)

// Login com Google
document.getElementById("btnGoogle").addEventListener("click", () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";

  auth.signInWithPopup(providerGoogle)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorMessage.textContent = getErrorMessage(error.code);
      errorMessage.style.display = "block";
    });
});

// Login com GitHub
document.getElementById("btnGithub").addEventListener("click", () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";

  auth.signInWithPopup(providerGithub)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorMessage.textContent = getErrorMessage(error.code);
      errorMessage.style.display = "block";
    });
});

// Verifica se o usuário já está logado ao carregar a página
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});