import react from 'React';
import { BASE_URL } from "../../config/index";

export default function StudentMemberModel(){

    return fetchMembers = (myStudentIndex) =>{
    
        fetch(`${BASE_URL}/student/${myStudentIndex}/members`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseJson) => {
        
            setStudentMembers(responseJson);
        
        });
    };

}