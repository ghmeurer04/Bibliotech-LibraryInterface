interface Props{
    headerText: string;
    paragraphText: string;
}
function Header({headerText, paragraphText}: Props) {
    return (
        <>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {headerText}
            </h1>
            <p className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {paragraphText}
        </p>
        </>
    );
}

export default Header;