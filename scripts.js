import { auth, db, GoogleAuthProvider, signInWithPopup, signOut, doc, setDoc, getDoc } from './firebase-config.js';

window.loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    sessionStorage.setItem("user", JSON.stringify(result.user));
    window.location.href = "dashboard.html";
  } catch (e) {
    alert("Erro ao fazer login: " + e.message);
  }
};

window.logout = async () => {
  await signOut(auth);
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
};

if (document.getElementById("user-form")) {
  document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const idade = +document.getElementById("idade").value;
    const peso = +document.getElementById("peso").value;
    const altura = +document.getElementById("altura").value;
    const objetivo = document.getElementById("objetivo").value;
    const sexo = document.getElementById("sexo").value;
    const nivel = document.getElementById("nivel").value;

    const imc = peso / ((altura / 100) ** 2);
    const tmb = sexo === "masculino"
      ? 66 + (13.7 * peso) + (5 * altura) - (6.8 * idade)
      : 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * idade);

    let fator = objetivo === "perder" ? 0.85 : objetivo === "ganhar" ? 1.15 : 1;
    const calorias = tmb * fator;
    const proteina = peso * 2;
    const carbo = (calorias * 0.5) / 4;
    const gordura = (calorias * 0.25) / 9;

    const user = JSON.parse(sessionStorage.getItem("user"));
    await setDoc(doc(db, "usuarios", user.uid), {
      nome: user.displayName,
      email: user.email,
      idade, peso, altura, objetivo, nivel, sexo, imc: imc.toFixed(2), calorias: calorias.toFixed(0)
    });

    document.getElementById("resultado").innerHTML = `
      <h3>Resultados</h3>
      <p>IMC: ${imc.toFixed(2)}</p>
      <p>Calorias diárias: ${calorias.toFixed(0)}</p>
      <p>Proteína: ${proteina.toFixed(0)}g | Carboidrato: ${carbo.toFixed(0)}g | Gordura: ${gordura.toFixed(0)}g</p>
    `;
  });
}