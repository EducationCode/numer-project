import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';



const FalsePosition =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueX1(data.map((x)=>x.x1));
        setValueXr(data.map((x)=>x.Xr));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">X1</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.X1}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
        
   
    const Calbisection = (xl, xr) => {
        var x1,fX1,fXr,fXl,ea,scope,scopexr,scopexl;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};

        var x = [];
        var y = [];
        var X1= [];
        var y1= [];
        do
        {
            scopexr = {
                x:xr,
            }
            scopexl = {
                x:xl,
            }
            fXr = evaluate(Equation, scopexr)
            fXl = evaluate(Equation, scopexl)

            x1 = ((xl*fXr)-(xr*fXl))/(fXr-fXl);
            scope = {
                x:x1,
            }

            fX1 = evaluate(Equation, scope)

            iter ++;
            if (fX1*fXr > 0)
            {
                ea = error(xr, x1);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    X1:x1,
                    Xr:xr
                }
                x.push(iter)
                y.push(x1)
                X1.push(iter)
                y1.push(ea)
                data.push(obj)
                xr = x1;
            }
            else if (fX1*fXr < 0)
            {
                ea = error(xl, x1);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    X1:x1,
                    Xr:xr
                }
                x.push(iter)
                y.push(x1)
                X1.push(iter)
                y1.push(ea)
                data.push(obj)
                xl = x1;
            }
        }while(ea>e && iter<MAX)


        console.log("data");
        console.log(data);
        setX1(x1)
    }

    const data =[];

    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueXr, setValueXr] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X1,setX1] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueXl)
    }

    return (
            <Container>
                <h2 style={{textAlign:"center" ,padding:"20px"}}>False-Position Methods</h2>
                <Form >
                    <Form.Group className="mb-3" style={{textAlign:"center"}}>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <br></br>
                        <Form.Label>Input XL</Form.Label>
                        <input type="number" id="XL" onChange={inputXL} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <Form.Label>Input XR</Form.Label>
                        <input type="number" id="XR" onChange={inputXR} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" style={{ margin: '0 auto', display: 'block' }} onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5 style={{textAlign:"center"}}>Answer = {X1.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default FalsePosition