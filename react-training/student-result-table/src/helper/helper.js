export const getStudents = () => {
  return JSON.parse(localStorage.getItem("students"));
};
export const setStudents = (data) => {
  console.log("data: ", data);
  const students = getStudents();
  const isStudent = students.find((item) => item.number == data.number);
  if (isStudent) {
    return false;
  }

  localStorage.setItem("students", JSON.stringify([...students, data]));
  return true;
};
export const editStudents = (data) => {
  let students = getStudents();
  console.log(students);
  students = students.map((item, id) => {
    if (item.id == data.id) {
      return { ...item, ...data };
    } else {
      return item;
    }
  });
  console.log(students);

  localStorage.setItem("students", JSON.stringify([...students]));
  return true;
};
export const getId = () => {
  return Math.max(...getStudents().map((item) => item.id)) + 1;
};
export const getStudentById = (id) => {
  return getStudents().find((item) => item.id == id) || {};
};

export const getResult = (id) => {
  return (
    getStudents().find((item) => item.id == id).result || {
      math: "",
      science: "",
      english: "",
      physics: "",
      computer: "",
    }
  );
};
