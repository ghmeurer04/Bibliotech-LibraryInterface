import InputField from '../components/InputField';
import Button from '../components/Button';

interface Props{
    backClick: () => void;
    registerClick: () => void;
}

function RemoveBook({ backClick, registerClick }: Props) {
    return (
        <>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              Remove Book
            </h1>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Book ID" placeholder="Enter book ID" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Confirm Book ID" placeholder="Enter book ID" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => backClick()} text="Back" />
              <Button onClick={() => registerClick()} text="Remove" />
            </div>
            </>
    )
}

export default RemoveBook;