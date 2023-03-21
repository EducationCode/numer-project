import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate,factorial,derivative} from 'mathjs';

const NewtonRaphson =()=>{
    const print = () =>{
        console.log(data)
        setI(data.map((x)=>x.iteration));
        setValuex(data.map((x)=>x.x));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="50%">Iteration</th>
                            <th width="50%">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.x}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const CalNewton = (x0) => {
        var fx,dx,X0,er,x1,d,dif;
        var iter = 0;

        var x = [];
        var y = [];
        var X1= [];
        var y1= [];
        
        var obj={};
        do{
            X0 = {
                x:x0
            }
            fx = evaluate(Equation , X0);
            d = derivative(Equation,'x');
            dif = d.toString();
            dx = evaluate(dif,X0);
            x1=x0-(fx/dx);
            console.log((fx/dx));
            er = error(x0, x1);
            iter++;
            obj = {
                iteration:iter,
                x:x1,
            }
            data.push(obj);
            x.push(iter)
            y.push(x1)
            X1.push(iter)
            y1.push(er)
            x0 = x1;
        }while(er>0.000001)
        
        console.log("data");
        console.log(data);            
        setX(x1);
    }

    const data =[];
    
    const [valuex, setValuex] = useState([]);
    const [valueI, setI] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }


    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        CalNewton(x0num);
     
        setHtml(print());
           
        console.log(valueI)
        console.log(valuex)
        
    }

    return (
            <Container>
                <h2 style={{textAlign:"center" ,padding:"20px"}}>Newton Rapshon Methods</h2>
                <Form >
                    <Form.Group className="mb-3" style={{textAlign:"center"}}>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <br></br>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" style={{ margin: '0 auto', display: 'block' }} onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5 style={{textAlign:"center"}}>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default NewtonRaphson