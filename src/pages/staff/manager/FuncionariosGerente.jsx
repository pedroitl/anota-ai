import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

function FuncionariosGerente() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarUsuarios();
  }, []);

  async function listarUsuarios() {
    try {
      setLoading(true);
      setErro("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.status}`);
      }

      const data = await response.json();
      console.log("usuarios:", data);
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      setErro("Erro ao carregar funcionários.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function obterLogin(usuario) {
    return (
      usuario.login ||
      usuario.username ||
      usuario.email ||
      usuario.usuario ||
      usuario.nomeUsuario ||
      "—"
    );
  }

  function obterPerfil(usuario) {
    return usuario.role || usuario.perfil || usuario.tipo || "—";
  }

  return (
    <section className="w-full space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-800">
            Funcionários
          </h1>
          <p className="text-sm text-stone-500">
            Visualize os usuários cadastrados no sistema.
          </p>
        </div>

        <button
          onClick={listarUsuarios}
          className="w-fit rounded-md bg-[#9db54c] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Atualizar
        </button>
      </header>

      {erro && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="rounded-xl border border-stone-200 bg-white">
        {loading ? (
          <div className="p-6">
            <p className="text-sm text-stone-500">Carregando funcionários...</p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="p-6">
            <p className="text-sm text-stone-500">
              Nenhum funcionário encontrado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-stone-200">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">
                    ID
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">
                    Login
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">
                    Perfil
                  </th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-stone-100 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm text-stone-700">
                      {usuario.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-700">
                      {usuario.nome || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-700">
                      {obterLogin(usuario)}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-700">
                      {obterPerfil(usuario)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default FuncionariosGerente;