import ImageCard from './components/ImageCard';
import ButtonLink from './components/ButtonLink';

function Homepage() {
    return (<>
      <div className="bg-gradient-to-br via-slate-800 to-emerald-900">
        <div className="mx-auto grid min-h-screen w-full max-w-full grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-16">
          <div className="space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
              Bibliotech Library
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Welcome to your library space
            </h1>
            <p className="text-base text-slate-200/90">
              Choose how you want to access the system to get started.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              
              <ButtonLink to="/student" text="Access as Student" />
              <ButtonLink to="/employee" text="Access as Employee" />
            </div>
          </div>
          <div className="flex justify-end">
            <ImageCard image="/src/assets/logo.png" />
          </div>
        </div>
      </div>
    </>)
}

export default Homepage;
