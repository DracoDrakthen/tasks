import React from "react";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";

export function App(): JSX.Element {
    return (
<<<<<<< HEAD
        <div className="App-header">
            <header></header>
            <Container>
                <Row>
                    <Col>
                        <div className="header">
                            <div id="rectangle"></div>
                            <br></br>
                            <h1> Here is my header, cos420</h1>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <div id="rectangle"></div>
                            <br></br>
                            Unordered List:
                            <ul>
                                <li>second Element</li>
                                <li>First Element</li>
                                <li>A third Element</li>

                                <li>First</li>
                                <li>second</li>
                                <li>A third</li>

                                <dt>Bean</dt>
                                <dd>Green beans</dd>
                                <dt>Milk</dt>
                                <dd>Chocolate milk</dd>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div id="rectangle"></div>
                        <br></br>
                        Third column
                        <br></br>
                        <img
                            src="./src/Images/tiger.jpg"
                            alt="Picture of a tiger"
                            width="500"
                            height="600"
                        />
                    </Col>

                    <Col>
                        <div id="rectangle"></div>
                        <br></br>
                        fourth column
                        <br></br>
                        <Button onClick={() => console.log("Hello World!")}>
                            Log Hello World
                        </Button>
                    </Col>
                </Row>
            </Container>
=======
        <div className="App">
            <header className="App-header">
                UM COS420 with React Hooks and TypeScript
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
>>>>>>> upstream/task-functions
        </div>
    );
}

//this is old code
// function App(): JSX.Element {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 UM hello world with React Hooks and TypeScript
//             </header>
//             <p>
//                 Edit <code>src/App.tsx</code> and save. This page will
//                 automatically reload. devon.beal@main.edu
//             </p>
//         </div>
//     );
// }

export default App;
