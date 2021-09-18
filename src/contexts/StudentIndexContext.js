import React, { createContext, useState, useEffect } from "react";
//this is currently not used: but it is my understanding of the use of useContext
const StudentIndex = React.createContext();
export function StudentIndexProvider({children}){
    const[student_index, setStudentIndex] = useState();

    useEffect(() => {



        return () => {

        }
    },[]);

    return(
        <StudentIndex.Provider value={student_index}>
            {children}
        </StudentIndex.Provider>
    )
}

