import image from "../assets/image.png";

export function Login() {
  return (
    <div className="h-screen w-full bg-indigo-50">
      <div className="h-screen max-w-[1400px] mx-auto grid grid-cols-2 items-center gap-16 p-8">
        <img src={image} alt="Imagem de uma caixa com elementos de gráficos" />

        <form className="bg-white w-lg p-16 rounded-4xl flex flex-col ml-auto">
          <h1 className="font-bold text-2xl text-zinc-900">Acesse sua conta</h1>
          <p className="text-zinc-500 text-sm my-3">
            Informe seu email e senha para prosseguirmos
          </p>

          <div className="flex flex-col gap-6 my-11">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="text-indigo-600 font-semibold text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                className="px-4 py-3 bg-white border border-zinc-200 rounded-sm placeholder-zinc-500 text-sm focus:outline-1.5 outline-indigo-600"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="text-indigo-600 font-semibold text-sm"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                className="px-4 py-3 bg-white border border-zinc-200 rounded-sm placeholder-zinc-500 text-sm focus:outline-1.5 outline-indigo-600"
              />
            </div>

            <a
              href="/"
              className="font-semibold text-indigo-600 text-sm outline-none hover:underline focus:underline"
            >
              Esqueci a senha
            </a>

            <button className="px-4 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-sm transition hover:bg-indigo-900">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
