import ReactDOM from 'react-dom';
import React from 'react';
import owl from './owl.webp';
import './App.css';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

function LoginForm(props){
    const form = (
      <form class="pop-content animate" id="login_form" >
          
      <div class="imgcontainer">
        <span onClick={() => LogoutForm()}  class="close" title="Close Pop">&times;</span>
      </div>

      <div class="container">
        <label for="uname">Username</label>
        <input type="text" placeholder="Enter Username" name="uname" required/>

        <label for="psw">Password</label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
          
        <button type="submit"  onClick={() => AnalyzeMode()}>Login</button>
        <label>
          Remember Me
          <input type="checkbox" checked="checked" name="remember"/>
        </label>
      </div>

      <div class="container">
        <button type="button" onClick={() => LogoutForm()} class="cancelbtn">Cancel</button>
        <span class="psw"> <a href="#"> Forgot password?</a></span>
      </div>
      </form>
    );
    ReactDOM.render(form, document.getElementById('id01'));
}

function LogoutForm(props){
  const element = (<div> </div>);
  ReactDOM.render(element, document.getElementById('id01'));
}

function AnalyzeMode (props)
{
  const analyzePage = ( 

    <Container>
    <Row>
      <h1 class="head-1"> Analyze Mode </h1>
    </Row>
    <Row>
      <Col xs="8"><h2> Student Paper Block Text </h2></Col>
      <Col xs="4"><h2> Research Block Text </h2></Col>
    </Row>
    <Row>
      <Col class="student-text" xs="8">
        <p> 
          Spicy jalapeno bacon ipsum dolor amet meatloaf nulla pork belly elit boudin capicola exercitation nostrud consequat cupim alcatra bresaola in. Ad fugiat occaecat fatback. Short ribs ball tip excepteur esse in. Exercitation fugiat cupim beef, picanha leberkas nisi porchetta. Landjaeger ground round short loin dolor aliquip kevin quis tail. Sed turducken kevin nostrud andouille, ball tip officia mollit in short ribs. Ribeye pastrami pig nulla brisket jerky tenderloin fatback tongue consectetur ut commodo short ribs minim. ongue aliquip do lorem dolor. Brisket minim pork venison burgdoggen shankle, chuck nulla. Officia fatback commodo pancetta pork loin irure. Pork pork loin cupim, buffalo spare ribs nisi boudin sint ut cillum. Sirloin eu tenderloin frankfurter, nisi laboris commodo dolore lorem et deserunt. Enim spare ribs elit tongue tail veniam pork chop non jowl cupidatat. Esse kevin aliqua, adipisicing aute nostrud hamburger in commodo meatball jowl sed. Picanha bacon burgdoggen, adipisicing fatback ut proident pig ipsum aliqua. Culpa laboris ex pancetta aliqua meatball magna sint. Meatball flank laborum incididunt sausage ad shoulder, leberkas labore. Tail andouille ut, brisket beef turducken nisi ut incididunt. Burgdoggen enim irure, biltong bacon et fatback reprehenderit mollit anim eu ball tip. Qui biltong ribeye est t-bone enim mollit andouille swine minim ut ut adipisicing. Landjaeger bacon ut, venison picanha est occaecat adipisicing flank. Ut frankfurter ground round incididunt ad picanha nostrud sausage culpa ipsum. Shank leberkas tenderloin, anim velit sed burgdoggen adipisicing mollit ribeye ex. Ipsum chicken cupim, dolor adipisicing sunt cupidatat culpa dolore. Picanha sed adipisicing reprehenderit commodo exercitation kielbasa cupidatat anim flank filet mignon ham hock. Proident ex deserunt pariatur reprehenderit ham voluptate alcatra ad eiusmod. Venison aliqua ground round, quis nisi boudin jerky. Beef ribs capicola mollit quis boudin meatball cupim tenderloin.
        </p>
      </Col>
      <Col class="research-text" xs="4">
        <p>
          Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.  Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke. Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.
        </p>
      </Col>
    </Row>
  </Container>
  );

  ReactDOM.render(analyzePage, document.getElementById('id01'));

  
}

function App() {
  return (
    <div>

      <div class="head">
        <img class="owl" src={owl} alt="Owl"/>
        <h2 class="alt-text">Citing Insights Login Form</h2>
        <p class="alt-text">Welcome to Citing Insights Portal, Please Login:</p>
        <Button color="success" onClick={() => LoginForm()}>Login</Button>
      </div>
      <div id="id01" class="pop">
        
      </div>
    </div>
  );
}

export default App;
