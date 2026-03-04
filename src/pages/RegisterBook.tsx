import InputField from "../components/InputField"
import Button from "../components/Button";

interface Props{
    scanBookBarcode: () => void;
    backClick: () => void;
    registerClick: () => void;
}

function RegisterBook({ scanBookBarcode, backClick, registerClick }: Props) {
    return (<>
    <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              Register new Book
            </h1>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Book Title" placeholder="Enter book title" />
                <div className="flex flex-col items-center sm:flex-row sm:justify-center">
                  <div className="space-y-2">
                      <label className="block text-xs font-semibold tracking-widest text-heading/80">Book ISBN</label>
                      <div className="relative flex min-h-10 w-full min-w-[250px] max-w-[24rem]">
                          <button
                            className="!absolute right-1 top-1 rounded-lg bg-emerald-300 py-2.5 px-4 text-center align-middle text-xs font-semibold transition hover:bg-emerald-200"
                            style={{ color: 'black' }}
                            onClick={scanBookBarcode}
                            type="button"
                          >
                            Scan
                          </button>
                          <input
                          type="text"
                          id={"book-isbn"}
                          className="w-full rounded-xl border px-4 py-3 text-sm duration-200 focus:outline-none focus:ring-4"
                          placeholder={"Enter book ISBN"}
                          required
                          />
                      </div>
                  </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Book Author" placeholder="Enter book author" />
                <InputField label="Book Category" placeholder="Enter book category" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => backClick()} text="Back" />
              <Button onClick={() => registerClick()} text="Register" />
            </div>
            </>)
}

export default RegisterBook;