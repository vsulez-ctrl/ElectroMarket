import React, { useState } from "react";
import Form from "../components/formulario/Form";
import logo from "../assets/imagenes/ui/logo.png";
import IconsButton from "../components/layout/IconsButton";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(form);
      console.log("✅ Login exitoso:", response.data);

      // Guardar token
      localStorage.setItem("token", response.data.token);

      // Redirigir (ejemplo al home o dashboard)
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas o error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  const Flecha = () => (
    <svg
      className="fill-current text-white"
      width="28"
      height="8"
      viewBox="0 0 28 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(180deg)" }}
    >
      <path
        transform="scale(1 1)"
        d="M27.3536 4.35356C27.5488 4.15829 27.5488 3.84171 27.3536 3.64645L24.1716 0.464468C23.9763 0.269206 23.6597 0.269206 23.4645 0.464468C23.2692 0.65973 23.2692 0.976313 23.4645 1.17157L26.2929 4L23.4645 6.82843C23.2692 7.02369 23.2692 7.34027 23.4645 7.53554C23.6597 7.7308 23.9763 7.7308 24.1716 7.53554L27.3536 4.35356ZM0 4.5L27 4.5L27 3.5L0 3.5L0 4.5Z"
      />
    </svg>
  );

  const fields = [
    { name: "email", type: "email", placeholder: "Correo Electrónico" },
    { name: "password", type: "password", placeholder: "Contraseña" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="relative bg-gray-900 rounded-xl shadow-2xl p-10 w-full max-w-sm text-center">
        <img src={logo} className="mb-4 w-30 h-30" />
        <h2 className="text-white text-xl font-semibold mb-6">
          Bienvenidos a ElectroMarket
        </h2>
        <Link to="/" className="absolute top-5 left-5">
          <IconsButton Icon={Flecha} />
        </Link>

        <Form
          fields={fields}
          values={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          msg={error}
          submitText="INICIAR SESIÓN"
        />

        <div className="mt-4 text-sm text-blue-400 hover:underline">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>

        <div className="mt-6 text-gray-300 text-sm">
          ¿Eres nuevo?{" "}
          <Link to="/registro" className="text-blue-400 hover:underline">
            Crea tu cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
