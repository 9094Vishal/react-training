export const getStudents = () => {
  return JSON.parse(localStorage.getItem("students")) || [];
};
export const setStudents = (data) => {
  const students = getStudents();
  const isStudent = students?.find((item) => item.phone == data.phone);

  if (isStudent) {
    return false;
  }
  console.log([...students, data]);

  localStorage.setItem("students", JSON.stringify([...students, data]));
  return true;
};
export const editStudents = (data) => {
  let students = getStudents();

  students = students.map((item, id) => {
    if (item.id == data.id) {
      return { ...item, ...data };
    } else {
      return item;
    }
  });

  localStorage.setItem("students", JSON.stringify([...students]));
  return true;
};
export const getId = () => {
  const student = getStudents();
  if (student.length != 0) {
    return Math.max(...getStudents().map((item) => item.id)) + 1;
  } else {
    return 1;
  }
};
export const getStudentById = (id) => {
  const student = getStudents();
  if (student) {
    return student.find((item) => item.id == id) || {};
  }
};

export const getResult = (id) => {
  return (
    getStudents()?.find((item) => item.id == id).result || {
      math: "",
      science: "",
      english: "",
      physics: "",
      computer: "",
    }
  );
};
export const setResult = (data) => {
  let students = getStudents();
  students = students.map((item) => {
    if (item.id == data.id) {
      delete data.id;

      return {
        ...item,
        result: {
          ...item.result,
          ...data,
        },
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("students", JSON.stringify([...students]));
};
