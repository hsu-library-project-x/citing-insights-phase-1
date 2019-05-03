// Libraries that we imported

import ReactDOM from 'react-dom';
import React from 'react';
import owl from './owl.webp';
import './App.css';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

/* Login Form Function: Status: Not Fully Functioning
      input props (inherited properties). This function makes the login form that 
      has a username field a password field, a login button, a cancel button, a forgot
      password click on, and has a remember me check box */
function LoginForm(props){

     // declaring a constant JavaScript object to hold our form
    const form = (

      //html form starts here -- class pop-content animate (we will call this class in CSS to make it pop-up)
      <form class="pop-content animate" id="login_form" >
          
      //this div originally created to hold an avatar image
      // Right now imgcontainer has no image 

      <div class="imgcontainer">         

      // X button on top right hand corder of the login form
      <span onClick={() => LogoutForm()}  class="close" title="Close Pop">&times;</span>

      </div>

      // div element holding the username and password fields,our login 
      // button that will take the user to analyze mode, and the remember me checkbox
      <div class="container">
        <label for="uname">Username</label>
        <input type="text" placeholder="Enter Username" name="uname" required/>

        <label for="psw">Password</label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
          
        // Right now we made the onClick action for the submit to call our AnalyzeMode 
        // function -- this will eventually change as we get better at 
        // page navagation 
        <button type="submit"  onClick={() => AnalyzeMode()}>Login</button>
        
        // Remember Me feature -- currenlty non functional
        <label>
          Remember Me
          <input type="checkbox" checked="checked" name="remember"/>
        </label>
      </div>

      // another div element of the same class as above -- contains the cancel button
      // and the forgot password link. 

      <div class="container">

        // cancel button functional
        <button type="button" onClick={() => LogoutForm()} class="cancelbtn">Cancel</button>

        // forgot password not functional
        <span class="psw"> <a href="#"> Forgot password?</a></span>
      </div>
      </form>
    // close our constant that holds out HTML
    );

    // reacting with DOM to call our form
    ReactDOM.render(form, document.getElementById('id01'));
}

/*Logout Form Function: Status: Hacky (Are We Keeping it?)
    this function replaces our form with an empty element to unrender 
    our from */
function LogoutForm(props){
  const element = (<div> </div>);
  ReactDOM.render(element, document.getElementById('id01'));
}


/* Analyze Mode Function: Status: Under Construction
      this function doesn't take anything but will return 
      a webpage that has: 
      (1) Student Paper, (1.5) Student Citation-- not inline
      (2) The Research Article, (3) Options to highlight to get inline citaiton,
      (4) Features for functinoality --- like wordmap. */
function AnalyzeMode (props)
{
  // javaScript constaant analyzePage that holds our HTML
  const analyzePage = ( 

    // Reactstrap Container Element that encases everything so that we can format 
    // using Rows and Columns 
    <Container> 

    //Reactstrap Row element (1st row of our page)
    <Row>
      // HTML h1 element with our page header 
      <h1 class="head-1"> Analyze Mode </h1>
    </Row>

    //Reactstrap Row element (2nd row of our page)
    <Row>
      // Reactstrap Col elements in our second row

      // xs is used for positioning of column. 8th col of 12 possible 
      <Col xs="8"> 
        // HTML h2 element to make a header for Student Paper
        <h2> Student Paper Block Text </h2>
      </Col>

      // xs is used for positioning of column. 4th col of 12 possible
      <Col xs="4">
        // HTML h2 element to make a header for Research
        <h2> Research Block Text </h2>
      </Col>
    </Row>

    //Reactstrap Row element (3rd row of our page)
    <Row>
      // Reactstrap Col element in third second row...
      // note: it is in the same col as our h2 element but the next row
      <Col class="student-text" xs="8">

        // HTML paragraph element with hardcoded student paper
        <p> 
          Spicy jalapeno bacon ipsum dolor amet meatloaf nulla pork belly elit boudin capicola exercitation nostrud consequat cupim alcatra bresaola in. Ad fugiat occaecat fatback. Short ribs ball tip excepteur esse in. Exercitation fugiat cupim beef, picanha leberkas nisi porchetta. Landjaeger ground round short loin dolor aliquip kevin quis tail. Sed turducken kevin nostrud andouille, ball tip officia mollit in short ribs. Ribeye pastrami pig nulla brisket jerky tenderloin fatback tongue consectetur ut commodo short ribs minim. ongue aliquip do lorem dolor. Brisket minim pork venison burgdoggen shankle, chuck nulla. Officia fatback commodo pancetta pork loin irure. Pork pork loin cupim, buffalo spare ribs nisi boudin sint ut cillum. Sirloin eu tenderloin frankfurter, nisi laboris commodo dolore lorem et deserunt. Enim spare ribs elit tongue tail veniam pork chop non jowl cupidatat. Esse kevin aliqua, adipisicing aute nostrud hamburger in commodo meatball jowl sed. Picanha bacon burgdoggen, adipisicing fatback ut proident pig ipsum aliqua. Culpa laboris ex pancetta aliqua meatball magna sint. Meatball flank laborum incididunt sausage ad shoulder, leberkas labore. Tail andouille ut, brisket beef turducken nisi ut incididunt. Burgdoggen enim irure, biltong bacon et fatback reprehenderit mollit anim eu ball tip. Qui biltong ribeye est t-bone enim mollit andouille swine minim ut ut adipisicing. Landjaeger bacon ut, venison picanha est occaecat adipisicing flank. Ut frankfurter ground round incididunt ad picanha nostrud sausage culpa ipsum. Shank leberkas tenderloin, anim velit sed burgdoggen adipisicing mollit ribeye ex. Ipsum chicken cupim, dolor adipisicing sunt cupidatat culpa dolore. Picanha sed adipisicing reprehenderit commodo exercitation kielbasa cupidatat anim flank filet mignon ham hock. Proident ex deserunt pariatur reprehenderit ham voluptate alcatra ad eiusmod. Venison aliqua ground round, quis nisi boudin jerky. Beef ribs capicola mollit quis boudin meatball cupim tenderloin.
        </p>
      </Col>

       // Reactstrap Col element in third second row...
      // note: it is in the same col as our h2 element but the next row
      <Col class="research-text" xs="4">
        // HTML paragraph element with hardcoded research article
        <p>
          Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.  Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke. Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.
        </p>
      </Col>
    </Row>
  </Container>

  // closing our constant alayzePage
  );
  // reacting with DOM to call our page
  ReactDOM.render(analyzePage, document.getElementById('id01'));

  
}


/* Function App: Comes with React stuff asks as our main() in C++ */
 
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
