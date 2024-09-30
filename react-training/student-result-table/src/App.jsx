import { useMemo, useState } from "react";
import UserTable from "./components/UserTable";
import { StudentData } from "./data/Student";
import Student from "./components/Student";

function App() {
  const students = useMemo(() => StudentData, [StudentData]);
  const [student, setStudent] = useState({});
  const [isDataOpen, setIsDataOpen] = useState(true);

  const handleCLick = (id) => {
    const data = students.find((item) => item.id === id);
    setIsDataOpen(false);

    setStudent(data);
  };
  const handleBackCLick = (id) => {
    setIsDataOpen(true);
  };
  return (
    <>
      {isDataOpen && <Student student={students} handleCLick={handleCLick} />}
      {!isDataOpen && (
        <UserTable student={student} handleBackCLick={handleBackCLick} />
      )}
    </>
  );
}

export default App;
