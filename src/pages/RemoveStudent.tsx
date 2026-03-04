import InputField from '../components/InputField';
import Button from '../components/Button';

interface Props{
    backClick: () => void;
    registerClick: () => void;
}

function RemoveStudent({ backClick, registerClick }: Props) {
    return (
        <>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              Remove Student
            </h1>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Student RA" placeholder="Enter student ID" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Confirm Student RA" placeholder="Enter student ID" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => backClick()} text="Back" />
              <Button onClick={() => registerClick()} text="Remove" />
            </div>
            </>
    )
}

export default RemoveStudent;