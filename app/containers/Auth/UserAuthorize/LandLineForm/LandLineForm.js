import { Container,  Row} from "reactstrap";
import Button from '../../../../components/Button';
import React, {useEffect,useState} from "react";
import AuthBox from "../../../../components/AuthBox";
import Input from '../../../../components/Input';


const LandLineForm = ({ onChange}) => {
    const [m,setMsg] = useState(3);
    useEffect(() => {
        onChange(m);
    }, [m]);
    return <>
        <Container>
            <AuthBox>
                <Row>
                    <Input  name="phone" type="text" placeholder="تلفن ثابت"/>
                    <Button count={3}  className="btn btn-danger"  name="مرحله بعد" onChange={(m) => setMsg(m)}/>
                </Row>
            </AuthBox>
        </Container>

       
    </>

}


export {LandLineForm};

