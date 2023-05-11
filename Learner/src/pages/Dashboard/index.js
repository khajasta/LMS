import React , {useEffect,useState} from "react";
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap"

// Pages Components


//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const serverurl = "http://localhost:5000/";


import ViewCourse from "../Courses/ViewCourse";


const Dashboard = (props) => {


  const [learnerid,setLearnerid] = useState('629b610bedf25b3256bece40');
 useEffect(() => {
   console.log("Dashboard");
   getAllCoursesOfLearner();


 },[]);

  function getAllCoursesOfLearner(){

    const url  = serverurl+"enrollments/getallcoursesdata/"+learnerid;
    fetch(url, {
      method: "GET",
  
      // Adding headers to the request
      headers: {
        Accept: "application/json; charset=UTF-8",
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((result) => {
  
      if (result.status === 200) {
        result.json().then((data) => {
          console.log(data);
          setCoursesdata(data);

        })
      } else {
        console.log("Error");
        return ;
      }
  
  
        //console.log(resp);
      });    



  }



  const [coursesdata,setCoursesdata] = useState([]);



  const breadcrumbItems = [
    { title: "BrilliantPro", link: "#" },
    { title: "Dashboard Learner", link: "#" }
  ]


  //http://localhost:5000/materials/getcount

  useEffect(() => {
    props.setBreadcrumbItems('Dashboard' , breadcrumbItems)
  },)



  return (
    <React.Fragment>

      <MetaTags>
        <title>Dashboard | BrilliantPro</title>
      </MetaTags>



       <h2>Your Enrolled Courses</h2>

       {coursesdata ?
        // map each course data to ViewCourse
        coursesdata.map((course,index) => {
          return (
        <ViewCourse props={course}  /> ) 
        }): null}


      <Row>
        {/* <Col xl="6">
         
          <LatestTransactions />
        </Col> */}


          {/* <Latestasks /> */}
          
      </Row>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);