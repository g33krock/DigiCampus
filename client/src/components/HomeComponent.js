import { Component } from 'react';
import Announcement from "./AnnouncementComponent";
import { Card, Row, Col, CardImg, CardBody, Label, Container } from "reactstrap";

class Home extends Component {
    render() {
        return(
            // <Announcement></Announcement>
            <img src="https://qyctrtcwtwasdktftmuy.supabase.co/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2MTg3NzMwNDksImV4cCI6MTkzNDEzMzA0OX0.Rz17BSP_eY9jSZYbevGMPXdQbH7G24PkrdZf-zf-zrQ" height="500" alt="Mr. Hootsworth" class="center" />
        )
    }
}

export default Home